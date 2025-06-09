import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { Admin } from "../models/adminModel.js";

export const authController = {
  renderLogin(req, res) {
    res.render('../front/views/pages/login', { error: null, success: req.query.success, user: req.user || null });
  },

  loginUser: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await Admin.findOne({ where: { name: username } });

      if (!user) {
        return res.status(401).render('../front/views/pages/login', { error: 'Identifiants incorrects', success: null, user: null });
      }

      let validPassword = false;
      if (user.password && user.password.startsWith('$argon2')) {
        validPassword = await argon2.verify(user.password, password);
      } else {
        validPassword = password === user.password;
      }

      if (!validPassword) {
        return res.status(401).render('../front/views/pages/login', { error: 'Identifiants incorrects', success: null, user: null });
      }

      const jwtSecret = process.env.JWT_SECRET || 'dev_secret_key';
      if (!jwtSecret) {
        throw new Error('JWT_SECRET non défini dans les variables d\'environnement');
      }

      const token = jwt.sign({ id: user.id, name: user.name }, jwtSecret, { expiresIn: '1h' });

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
        sameSite: 'strict',
      });

      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).render('../front/views/pages/login', { error: 'Erreur serveur', success: null, user: null });
    }
  },

  renderChangePassword(req, res) {
    // Tu peux vérifier que l'user est bien connecté avant de l'afficher (middleware auth)
    if (!req.user) {
      return res.redirect('/login');
    }
    res.render('../front/views/pages/profil', { error: null, success: null, user: req.user });
  },

  changePassword: async (req, res) => {
    if (!req.user) {
      return res.redirect('/login');
    }

    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.render('../front/views/pages/profil', { error: 'Tous les champs sont obligatoires.', success: null, user: req.user });
    }

    if (newPassword !== confirmPassword) {
      return res.render('../front/views/pages/profil', { error: 'Les nouveaux mots de passe ne correspondent pas.', success: null, user: req.user });
    }

    try {
      const user = await Admin.findOne({ where: { id: req.user.id } });
      if (!user) {
        return res.redirect('/login');
      }

      const validOldPassword = user.password && user.password.startsWith('$argon2')
        ? await argon2.verify(user.password, oldPassword)
        : oldPassword === user.password;

      if (!validOldPassword) {
        return res.render('../front/views/pages/profil', { error: 'Le mot de passe actuel est incorrect.', success: null, user: req.user });
      }

      const hashedPassword = await argon2.hash(newPassword);
      user.password = hashedPassword;
      await user.save();

      res.render('../front/views/pages/profil', { error: null, success: 'Mot de passe changé avec succès !', user: req.user });
    } catch (err) {
      console.error(err);
      res.status(500).render('../front/views/pages/profil', { error: 'Erreur serveur.', success: null, user: req.user });
    }
  },

  renderProfil(req, res) {
    if (!req.user) {
      return res.redirect('/login');
    }
    res.render('../front/views/pages/profil', { user: req.user, error: null, success: null });
  },

  async changePasswordFromProfil(req, res) {
    if (!req.user) {
      return res.redirect('/login');
    }

    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.render('../front/views/pages/profil', { user: req.user, error: 'Tous les champs sont obligatoires.', success: null });
    }

    if (newPassword !== confirmPassword) {
      return res.render('../front/views/pages/profil', { user: req.user, error: 'Les nouveaux mots de passe ne correspondent pas.', success: null });
    }

    try {
      const user = await Admin.findOne({ where: { id: req.user.id } });
      if (!user) {
        return res.redirect('/login');
      }

      const validOldPassword = user.password && user.password.startsWith('$argon2')
        ? await argon2.verify(user.password, oldPassword)
        : oldPassword === user.password;

      if (!validOldPassword) {
        return res.render('../front/views/pages/profil', { user: req.user, error: 'Le mot de passe actuel est incorrect.', success: null });
      }

      const hashedPassword = await argon2.hash(newPassword);
      user.password = hashedPassword;
      await user.save();

      res.render('../front/views/pages/profil', { user: req.user, error: null, success: 'Mot de passe changé avec succès !' });
    } catch (err) {
      console.error(err);
      res.status(500).render('../front/views/pages/profil', { user: req.user, error: 'Erreur serveur.', success: null });
    }
  }
};
