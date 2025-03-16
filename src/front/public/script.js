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

// Calculer la hauteur disponible et l'appliquer à l'iframe Facebook
function resizeFacebookWidget() {
    // Attendre que l'iframe soit chargé
    setTimeout(function() {
        const mainContent = document.querySelector('.main-content');
        const facebookHero = document.querySelector('.facebook-hero');
        const availableHeight = mainContent.offsetHeight - facebookHero.offsetHeight;
        
        const fbIframe = document.querySelector('.facebook-fullwidth iframe');
        if (fbIframe) {
            fbIframe.style.height = availableHeight + 'px';
        }
    }, 2000); // Délai pour s'assurer que le widget est chargé
}

// Exécuter au chargement et au redimensionnement
window.addEventListener('load', resizeFacebookWidget);
window.addEventListener('resize', resizeFacebookWidget);
