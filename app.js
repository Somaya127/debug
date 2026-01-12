document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.getElementById('cta-button');
    const getStartedButton = document.getElementById('get-started-button');
    const themeToggle = document.createElement('button');
    themeToggle.classList.add('theme-toggle');
    themeToggle.innerHTML = '<span class="icon">&#9728;</span>';  
    document.body.appendChild(themeToggle);

    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const faqItems = document.querySelectorAll('.faq-item h3');
    const teamGrid = document.querySelector('.team-grid');
    
    // Carousel elements
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const teamMembers = document.querySelectorAll('.carousel .team-member');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const membersPerSlide = 4;
    const totalSlides = Math.ceil(teamMembers.length / membersPerSlide);
    const totalCards = teamMembers.length;
    
    // Modal elements for enroll button
    const modal = document.getElementById('enroll-modal');
    const closeBtn = document.querySelector('.close');
    const closeModalBtn = document.querySelector('.close-modal');
    
    // Modal elements for get started button
    const getStartedModal = document.getElementById('get-started-modal');
    const closeGetStartedBtn = document.querySelector('.close-get-started');
    const closeGetStartedModalBtn = document.querySelector('.close-get-started-modal');

    themeToggle.addEventListener('click', () => {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        themeToggle.innerHTML = document.body.dataset.theme === 'dark' ? '<span class="icon">&#9789;</span>' : '<span class="icon">&#9728;</span>';  
    });

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.dataset.theme = 'dark';
        themeToggle.innerHTML = '<span class="icon">&#9789;</span>';
    } else {
        document.body.dataset.theme = 'light';
        themeToggle.innerHTML = '<span class="icon">&#9728;</span>';
    }

    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    }

    if (getStartedButton) {
        getStartedButton.addEventListener('click', () => {
            getStartedModal.style.display = 'block';
        });
    }

    // Close modal when clicking X
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking "Got it!" button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
        if (event.target === getStartedModal) {
            getStartedModal.style.display = 'none';
        }
    });

    // Close Get Started modal when clicking X
    if (closeGetStartedBtn) {
        closeGetStartedBtn.addEventListener('click', () => {
            getStartedModal.style.display = 'none';
        });
    }

    // Close Get Started modal when clicking OK button
    if (closeGetStartedModalBtn) {
        closeGetStartedModalBtn.addEventListener('click', () => {
            getStartedModal.style.display = 'none';
        });
    }

    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('active');
            });
        });
    }

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
            const answer = item.nextElementSibling;
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {
                answer.style.display = 'block';
            }
        });
    });

    if (teamGrid) {
        // Add team member hover effects or other interactions
        console.log('Team grid functionality ready');
    }

    // Carousel functionality
    function updateCarousel() {
        // Calculate offset to center the selected card
        const cardWidth = 100 / membersPerSlide; // Each card takes 25% on desktop
        const containerWidth = 100; // Container is 100%
        const cardOffset = (containerWidth - cardWidth) / 2; // Center position
        const offset = -(currentIndex * cardWidth) + cardOffset;
        carousel.style.transform = `translateX(${offset}%)`;
        
        // Update dots to track individual cards
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update active card styling
        teamMembers.forEach((member, index) => {
            member.classList.toggle('active', index === currentIndex);
        });
    }

    function goToCard(cardIndex) {
        if (cardIndex >= 0 && cardIndex < totalCards) {
            currentIndex = cardIndex;
            updateCarousel();
        }
    }

    function showNextCard() {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to first card
        }
        updateCarousel();
    }

    function showPrevCard() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalCards - 1; // Loop to last card
        }
        updateCarousel();
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', showPrevCard);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', showNextCard);
    }

    // Add click event listeners to dots for individual card navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToCard(index);
        });
    });

    // Add click event listeners to team member cards
    teamMembers.forEach((member, index) => {
        member.addEventListener('click', () => {
            goToCard(index);
        });
    });

    // Auto-advance carousel every 6 seconds (slower for better viewing)
    setInterval(showNextCard, 6000);
    
    // Initialize first card as active
    updateCarousel();
});