import Header from '../Header/Header';
import './App.css';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import GameList from '../Games/Games';
import { Routes, Route } from 'react-router-dom';
import Game from '../Game/Game';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import Rules from '../Rules/Rules';
import AllChallenges from '../AllChallenges/AllChallenges';
import Page404 from '../Page404/Page404';
import AboutUs from '../AboutUs/AboutUs';
import Challenge from '../Challenge/Challenge';
import Run from '../Run/Run';
import Snake from '../Snake/Snake';
import Gamer from '../Gamer/Gamer';
import Leader from '../Leader/Leader';
import { AuthProvider } from '../contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/games" element={<GameList />} />
        <Route path="/games/:id" element={<Game />} />
        <Route path="/snake" element={<Snake />} />
        <Route path="/run/:id" element={<Run />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/Allchallenges" element={<AllChallenges />} />
        <Route path="/challenge/:id" element={<Challenge />} />
        <Route path="/gamer/:id" element={<Gamer />} />
        <Route path="/leader" element={<Leader />} />
        <Route path="/*" element={<Page404 />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;