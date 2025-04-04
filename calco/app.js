// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    // Menu Toggle
    const menuButton = document.querySelector('.menu');
    const nav = document.querySelector('.nav-container');
    
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
        });
    }

    // Grid Item Hover Effects
    const gridItems = document.querySelectorAll('.grid-item, .feature-item');
    
    gridItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.02)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form Submission
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const button = form.querySelector('button');
            const email = form.querySelector('input[type="email"]').value;

            // Add loading state
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Success message
                button.innerHTML = '<i class="fas fa-check"></i> Success!';
                button.style.backgroundColor = '#28a745';
                
                // Store email in localStorage for future autocomplete
                const emails = JSON.parse(localStorage.getItem('calco_emails') || '[]');
                if (!emails.includes(email)) {
                    emails.push(email);
                    localStorage.setItem('calco_emails', JSON.stringify(emails));
                }

                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    button.disabled = false;
                    button.innerHTML = 'Get Early Access <i class="fas fa-arrow-right"></i>';
                    button.style.backgroundColor = '';
                }, 2000);

            } catch (error) {
                // Error message
                button.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
                button.style.backgroundColor = '#dc3545';
                
                setTimeout(() => {
                    button.disabled = false;
                    button.innerHTML = 'Get Early Access <i class="fas fa-arrow-right"></i>';
                    button.style.backgroundColor = '';
                }, 2000);
            }
        });
    }

    // Email Autocomplete
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        const emails = JSON.parse(localStorage.getItem('calco_emails') || '[]');
        
        if (emails.length > 0) {
            emailInput.setAttribute('list', 'email-suggestions');
            const datalist = document.createElement('datalist');
            datalist.id = 'email-suggestions';
            
            emails.forEach(email => {
                const option = document.createElement('option');
                option.value = email;
                datalist.appendChild(option);
            });
            
            emailInput.parentNode.appendChild(datalist);
        }
    }

    // Stats Animation
    const stats = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 30; // Animate over 30 steps
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 50);
        });
    };

    // Intersection Observer for Stats Animation
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // Add active class to the current navigation item
    function updateActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`a[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`a[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    }

    // Update active nav item on scroll
    window.addEventListener('scroll', updateActiveNavItem);
}); 