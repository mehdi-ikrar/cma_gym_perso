document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour mettre à jour l'élément actif dans la sidebar
    function updateActiveSidebarItem() {
        // Récupère le chemin de la page actuelle
        const currentPath = window.location.pathname;
        
        // Sélectionne tous les éléments de la sidebar
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        
        // Retire la classe active de tous les éléments
        sidebarItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Trouve l'élément correspondant à la page actuelle et ajoute la classe active
        sidebarItems.forEach(item => {
            const link = item.querySelector('a');
            if (!link) return;
            
            const href = link.getAttribute('href');
            
            // Si le href correspond exactement au chemin actuel
            if (href === currentPath) {
                item.classList.add('active');
                return;
            }
            
            // Si nous sommes sur la page d'accueil
            if (currentPath === '/' && href === '/') {
                item.classList.add('active');
                return;
            }
            
            // Pour les sous-pages (par exemple /actuality/1 devrait activer le menu Actualité)
            if (currentPath.startsWith(href) && href !== '/') {
                item.classList.add('active');
            }
        });
    }
    
    // Exécute la fonction au chargement de la page
    updateActiveSidebarItem();
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const activityCards = document.querySelectorAll('.activity-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Style du bouton actif
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrer les activités
            activityCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-public') === filter) {
                    card.style.display = 'flex';
                    
                    // Animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const nextButton = document.querySelector('.carousel-next');
    const prevButton = document.querySelector('.carousel-prev');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    let autoplayInterval;
    
    // Fonction pour afficher une slide spécifique
    function goToSlide(index) {
        if (index < 0) {
            index = slideCount - 1;
        } else if (index >= slideCount) {
            index = 0;
        }
        
        // Mise à jour des classes actives
        document.querySelector('.carousel-slide.active').classList.remove('active');
        document.querySelector('.carousel-indicator.active').classList.remove('active');
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentIndex = index;
    }
    
    // Navigation avec les boutons
    nextButton.addEventListener('click', () => {
        resetAutoplay();
        goToSlide(currentIndex + 1);
    });
    
    prevButton.addEventListener('click', () => {
        resetAutoplay();
        goToSlide(currentIndex - 1);
    });
    
    // Navigation avec les indicateurs
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            resetAutoplay();
            goToSlide(index);
        });
    });
    
    // Autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000); // Change de slide toutes les 5 secondes
    }
    
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    // Démarrer l'autoplay
    startAutoplay();
    
    // Pause l'autoplay au survol
    track.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    track.addEventListener('mouseleave', () => {
        startAutoplay();
    });
});

// Diaporama galerie actuality (détail actu)
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('galerie-modal');
    const modalImg = document.getElementById('galerie-modal-img');
    const modalCaption = document.getElementById('galerie-modal-caption');
    const btnClose = document.getElementById('galerie-close');
    const btnPrev = document.getElementById('galerie-prev');
    const btnNext = document.getElementById('galerie-next');
    const thumbs = document.querySelectorAll('.galerie-thumb');

    // Récupère les images depuis les thumbs (utile si pas de variable globale)
    const galerieImages = Array.from(thumbs).map(thumb => ({
        src: thumb.querySelector('img').src,
        alt: thumb.querySelector('img').alt
    }));

    let currentIdx = 0;

    function showModal(idx) {
        currentIdx = idx;
        modal.style.display = 'flex';
        modalImg.src = galerieImages[idx].src;
        modalImg.alt = galerieImages[idx].alt;
        modalCaption.textContent = (idx+1) + ' / ' + galerieImages.length;
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    function showPrev() {
        currentIdx = (currentIdx - 1 + galerieImages.length) % galerieImages.length;
        showModal(currentIdx);
    }
    function showNext() {
        currentIdx = (currentIdx + 1) % galerieImages.length;
        showModal(currentIdx);
    }
    thumbs.forEach((thumb, idx) => {
        thumb.addEventListener('click', () => showModal(idx));
    });
    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (btnPrev) btnPrev.addEventListener('click', e => { e.stopPropagation(); showPrev(); });
    if (btnNext) btnNext.addEventListener('click', e => { e.stopPropagation(); showNext(); });
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });
    }
    document.addEventListener('keydown', function(e) {
        if (modal && modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'Escape') closeModal();
        }
    });
});

// Gestion spécifique pour la page de modification d'actualité
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si on est sur la page de modification
    const modifForm = document.querySelector('form[action*="/actualities/update/"]');
    if (!modifForm) return;

    console.log('Page de modification détectée');

    const inputGalerie = document.getElementById('galerie');
    const btnAddGalerie = document.getElementById('add-galerie-btn');
    const previewGalerie = document.getElementById('galerie-preview');
    let galerieFiles = [];
    let deletedImageIds = [];

    // Fonction pour créer les champs cachés de suppression
    function createDeleteInputs() {
        // Supprimer tous les anciens champs cachés
        document.querySelectorAll('input[name="delete_images[]"]').forEach(input => {
            input.remove();
        });

        // Créer de nouveaux champs cachés pour chaque image à supprimer
        deletedImageIds.forEach(imgId => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'delete_images[]';
            input.value = imgId;
            modifForm.appendChild(input);
            console.log(`Champ caché créé pour supprimer l'image ID: ${imgId}`);
        });
    }

    // Gestion du bouton d'ajout d'images
    if (btnAddGalerie) {
        btnAddGalerie.addEventListener('click', () => {
            console.log('Bouton galerie cliqué');
            inputGalerie.click();
        });
    }

    // Gestion de la sélection de nouveaux fichiers
    if (inputGalerie) {
        inputGalerie.addEventListener('change', (e) => {
            console.log('Fichiers sélectionnés:', e.target.files);
            const files = Array.from(e.target.files);
            
            // Ajouter les nouveaux fichiers à la liste
            files.forEach(file => {
                if (!galerieFiles.some(f => f.name === file.name && f.size === file.size)) {
                    galerieFiles.push(file);
                    console.log(`Fichier ajouté: ${file.name}`);
                }
            });
            
            console.log('Total fichiers en mémoire:', galerieFiles.length);
            updateGaleriePreview();
            
            // Reset input pour permettre de re-sélectionner
            inputGalerie.value = '';
        });
    }

    // Fonction pour mettre à jour l'aperçu des nouvelles images
    function updateGaleriePreview() {
        console.log('Mise à jour aperçu galerie, fichiers:', galerieFiles.length);
        
        // Supprimer l'ancien conteneur de nouvelles images s'il existe
        const oldNewGalerie = document.querySelector('.new-galerie');
        if (oldNewGalerie) {
            oldNewGalerie.remove();
        }

        if (galerieFiles.length === 0) {
            console.log('Aucun fichier à afficher');
            return;
        }

        const newPreviewContainer = document.createElement('div');
        newPreviewContainer.className = 'new-galerie';
        newPreviewContainer.style.marginTop = '20px';
        newPreviewContainer.style.width = '100%';
        
        const title = document.createElement('h4');
        title.style.color = '#666';
        title.style.fontSize = '0.9rem';
        title.style.width = '100%';
        title.style.margin = '10px 0 5px 0';
        title.textContent = 'Nouvelles images à ajouter';
        newPreviewContainer.appendChild(title);
        
        const imagesContainer = document.createElement('div');
        imagesContainer.style.display = 'flex';
        imagesContainer.style.flexWrap = 'wrap';
        imagesContainer.style.gap = '10px';
        imagesContainer.style.marginTop = '5px';
        
        galerieFiles.forEach((file, idx) => {
            const url = URL.createObjectURL(file);
            const div = document.createElement('div');
            div.style.position = 'relative';
            div.style.display = 'inline-block';
            div.innerHTML = `
                <img src="${url}" style="width:90px;height:70px;object-fit:cover;border-radius:6px;border:1px solid #ccc;">
                <button type="button" data-idx="${idx}" style="position:absolute;top:2px;right:2px;background:#e05642;color:#fff;border:none;border-radius:50%;width:22px;height:22px;cursor:pointer;font-size:14px;">&times;</button>
            `;
            imagesContainer.appendChild(div);
            
            // Libérer l'URL après chargement
            const img = div.querySelector('img');
            img.onload = () => URL.revokeObjectURL(url);
        });
        
        newPreviewContainer.appendChild(imagesContainer);
        previewGalerie.appendChild(newPreviewContainer);
        
        console.log('Aperçu mis à jour avec', galerieFiles.length, 'fichiers');
        
        // Ajouter les listeners pour supprimer les nouvelles images
        newPreviewContainer.querySelectorAll('button[data-idx]').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(this.getAttribute('data-idx'));
                console.log(`Suppression du fichier à l'index: ${idx}`);
                galerieFiles.splice(idx, 1);
                updateGaleriePreview();
            });
        });
    }

    // Configuration initiale des boutons de suppression pour les images existantes
    function setupDeleteButtons() {
        document.querySelectorAll('.delete-existing-img').forEach(btn => {
            // Supprimer l'ancien listener s'il existe
            btn.replaceWith(btn.cloneNode(true));
        });

        // Ajouter les nouveaux listeners
        document.querySelectorAll('.delete-existing-img').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const imgId = this.getAttribute('data-id');
                console.log(`Suppression demandée pour l'image ID: ${imgId}`);
                
                // Ajouter l'ID à la liste des images à supprimer (éviter les doublons)
                if (!deletedImageIds.includes(imgId)) {
                    deletedImageIds.push(imgId);
                    console.log('Images à supprimer mises à jour:', deletedImageIds);
                }
                
                // Retirer visuellement l'image
                const imageContainer = this.closest('.existing-image');
                if (imageContainer) {
                    imageContainer.style.opacity = '0.5';
                    imageContainer.style.pointerEvents = 'none';
                    
                    // Ajouter un indicateur visuel
                    const deletedLabel = document.createElement('div');
                    deletedLabel.style.position = 'absolute';
                    deletedLabel.style.top = '50%';
                    deletedLabel.style.left = '50%';
                    deletedLabel.style.transform = 'translate(-50%, -50%)';
                    deletedLabel.style.background = '#e05642';
                    deletedLabel.style.color = 'white';
                    deletedLabel.style.padding = '5px 10px';
                    deletedLabel.style.borderRadius = '4px';
                    deletedLabel.style.fontSize = '12px';
                    deletedLabel.style.zIndex = '10';
                    deletedLabel.textContent = 'À supprimer';
                    imageContainer.style.position = 'relative';
                    imageContainer.appendChild(deletedLabel);
                }
                
                // Créer immédiatement les champs cachés
                createDeleteInputs();
            });
        });
    }

    // Initialiser les boutons de suppression
    setupDeleteButtons();

    // Gestion de la soumission du formulaire
    modifForm.addEventListener('submit', function(e) {
        console.log('=== SOUMISSION DU FORMULAIRE ===');
        console.log('Images à supprimer:', deletedImageIds);
        console.log('Nouvelles images à ajouter:', galerieFiles.length);

        // Toujours créer les champs cachés avant soumission
        createDeleteInputs();

        // Vérifier que les champs cachés sont bien présents
        const deleteInputs = document.querySelectorAll('input[name="delete_images[]"]');
        console.log(`${deleteInputs.length} champs de suppression trouvés`);
        deleteInputs.forEach((input, index) => {
            console.log(`  Champ ${index + 1}: ${input.value}`);
        });

        // TOUJOURS intercepter si on a des nouvelles images OU des suppressions
        if (galerieFiles.length > 0 || deletedImageIds.length > 0) {
            e.preventDefault();
            console.log('Interception pour FormData personnalisé');

            const formData = new FormData(this);
            
            // Ajouter les nouvelles images
            galerieFiles.forEach((file, index) => {
                formData.append('galerie', file);
                console.log(`Ajout de l'image ${index + 1}: ${file.name} (${file.size} bytes)`);
            });

            // Vérifier le contenu final du FormData
            console.log('=== CONTENU FORMDATA ===');
            for (let pair of formData.entries()) {
                if (pair[1] instanceof File) {
                    console.log(`${pair[0]}: ${pair[1].name} (${pair[1].size} bytes)`);
                } else {
                    console.log(`${pair[0]}: ${pair[1]}`);
                }
            }

            // Envoyer la requête
            fetch(this.action, {
                method: this.method,
                body: formData
            }).then(response => {
                console.log('Réponse reçue:', response.status);
                if (response.ok) {
                    if (response.redirected) {
                        console.log('Redirection vers:', response.url);
                        window.location.href = response.url;
                    } else {
                        // Vérifier l'en-tête Location pour la redirection manuelle
                        const location = response.headers.get('Location');
                        if (location) {
                            console.log('Redirection manuelle vers:', location);
                            window.location.href = location;
                        } else {
                            window.location.reload();
                        }
                    }
                } else {
                    console.error('Erreur HTTP:', response.status);
                    alert('Erreur lors de la mise à jour de l\'actualité.');
                }
            }).catch(error => {
                console.error('Erreur lors de l\'envoi:', error);
                alert('Erreur lors de la mise à jour de l\'actualité.');
            });
        } else {
            console.log('Aucune modification d\'images, soumission normale');
        }
    });
});





