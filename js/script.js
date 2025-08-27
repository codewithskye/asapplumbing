// ASAP Plumbing Pros - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initStickyHeader();
    initMobileMenu();
    initFaqAccordion();
    initScrollAnimation();
    initCounters();
    initChatAssistant();
});

// AI Chat Assistant
function initChatAssistant() {
    const chatButton = document.querySelector('.chat-button');
    const chatBox = document.querySelector('.chat-box');
    const chatClose = document.querySelector('.chat-close');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('#chat-input-field');
    const chatSendBtn = document.querySelector('#chat-send-btn');
    const openChatBtns = document.querySelectorAll('.open-chat');
    
    // Chat knowledge base for simple Q&A
    const chatKnowledge = {
        'hours': 'Our regular business hours are Monday through Friday from 7:00 AM to 7:00 PM, and Saturday and Sunday from 8:00 AM to 5:00 PM. However, we offer 24/7 emergency plumbing services.',
        'emergency': 'We offer 24/7 emergency plumbing services. For emergencies, please call us at (415) 728-6391 for immediate assistance. We typically arrive within 30-60 minutes.',
        'service area': 'We serve San Francisco and San Mateo County, including South San Francisco, Daly City, San Bruno, Millbrae, Burlingame, San Mateo, Pacifica, and surrounding areas.',
        'pricing': 'We offer upfront, transparent pricing for all our services. For most standard jobs, we provide a flat-rate price before beginning work. We also offer free estimates for most standard plumbing services.',
        'payment': 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), cash, checks, and digital payment methods like Apple Pay and Google Pay.',
        'discounts': 'Yes, we offer various discounts including new customer specials, seasonal offers, senior and military discounts, and a loyalty program. Check our Discounts page for current offers.',
        'guarantee': 'Yes, we offer a 100% satisfaction guarantee on all our services. If you\'re not completely satisfied, we\'ll make it right.',
        'license': 'Yes, all our plumbers are fully licensed, bonded, and insured. We maintain all required certifications and stay up-to-date with the latest plumbing codes.',
        'drain cleaning': 'Our drain cleaning services include high-pressure water jetting, mechanical snake/auger, video camera inspection, and enzymatic cleaners for certain types of organic blockages.',
        'water heater': 'We offer complete water heater services, including repair, maintenance, and replacement for both traditional tank water heaters and tankless systems.',
        'appointment': 'You can schedule an appointment by calling us at (415) 728-6391 or by filling out the service request form on our Contact page.',
        'estimate': 'We provide free estimates for most standard plumbing services. You can request an estimate by calling us or filling out the form on our Contact page.',
        'contact': 'You can reach us by phone at (415) 728-6391, by email at service@asapplumbingpro.com, or by filling out the contact form on our website.',
        'services': 'We offer a comprehensive range of plumbing services, including drain cleaning, leak detection and repair, toilet repair and installation, faucet and sink repair, garbage disposal services, sewer line repair, water heater services, and 24/7 emergency plumbing.',
        'commercial': 'Yes, we provide plumbing services for both residential and commercial properties, including restaurants, retail stores, office buildings, and apartment complexes.',
        'maintenance': 'We recommend having your plumbing system professionally inspected once a year. Our VIP Membership includes an annual inspection along with other benefits.'
    };
    
    // Toggle chat box visibility
    if (chatButton) {
        chatButton.addEventListener('click', function() {
            chatBox.classList.toggle('active');
        });
    }
    
    // Open chat from other buttons
    if (openChatBtns) {
        openChatBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                chatBox.classList.add('active');
                // Scroll to chat if on mobile
                if (window.innerWidth < 768) {
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Close chat box
    if (chatClose) {
        chatClose.addEventListener('click', function() {
            chatBox.classList.remove('active');
        });
    }
    
    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessage('user', message);
        chatInput.value = '';
        
        // Process the message and respond
        setTimeout(() => {
            const response = processMessage(message);
            addMessage('bot', response);
        }, 500);
    }
    
    // Add message to chat
    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        
        const contentElement = document.createElement('div');
        contentElement.classList.add('message-content');
        
        const textElement = document.createElement('p');
        textElement.textContent = message;
        
        contentElement.appendChild(textElement);
        messageElement.appendChild(contentElement);
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Process user message and return response
    function processMessage(message) {
        message = message.toLowerCase();
        
        // Check for greetings
        if (message.match(/^(hi|hello|hey|greetings)/i)) {
            return "Hello! How can I help you with your plumbing needs today?";
        }
        
        // Check for thanks
        if (message.match(/thank|thanks/i)) {
            return "You're welcome! Is there anything else I can help you with?";
        }
        
        // Check for goodbye
        if (message.match(/bye|goodbye|see you/i)) {
            return "Goodbye! Feel free to chat again if you have more questions.";
        }
        
        // Check knowledge base for relevant answers
        let bestMatch = null;
        let highestScore = 0;
        
        for (const [key, value] of Object.entries(chatKnowledge)) {
            if (message.includes(key)) {
                // Direct match
                return value;
            }
            
            // Calculate relevance score based on word overlap
            const keyWords = key.split(' ');
            let score = 0;
            
            keyWords.forEach(word => {
                if (message.includes(word)) {
                    score++;
                }
            });
            
            if (score > highestScore) {
                highestScore = score;
                bestMatch = value;
            }
        }
        
        // Return best match or default response
        if (bestMatch && highestScore > 0) {
            return bestMatch;
        }
        
        // Check for common questions
        if (message.includes('cost') || message.includes('price') || message.includes('how much')) {
            return chatKnowledge['pricing'];
        }
        
        if (message.includes('emergency') || message.includes('urgent') || message.includes('right away')) {
            return chatKnowledge['emergency'];
        }
        
        if (message.includes('schedule') || message.includes('book') || message.includes('appointment')) {
            return chatKnowledge['appointment'];
        }
        
        if (message.includes('service') || message.includes('offer') || message.includes('provide')) {
            return chatKnowledge['services'];
        }
        
        // Default response
        return "I'm not sure I understand your question. Please try rephrasing or ask about our services, pricing, emergency assistance, or contact information. You can also call us directly at (415) 728-6391 for immediate assistance.";
    }
    
    // Send message on button click
    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', sendMessage);
    }
    
    // Send message on Enter key
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// Sticky Header
function initStickyHeader() {
    const header = document.querySelector('.header');
    const headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
            document.body.style.paddingTop = headerHeight + 'px';
        } else {
            header.classList.remove('sticky');
            document.body.style.paddingTop = 0;
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle between menu and close icons
            const icon = this.querySelector('i');
            if (icon.classList.contains('bx-menu')) {
                icon.classList.remove('bx-menu');
                icon.classList.add('bx-x');
            } else {
                icon.classList.remove('bx-x');
                icon.classList.add('bx-menu');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('bx-x');
                icon.classList.add('bx-menu');
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = mobileToggle.querySelector('i');
                    icon.classList.remove('bx-x');
                    icon.classList.add('bx-menu');
                }
            });
        });
    }
}

// FAQ Accordion
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Scroll Animation
function initScrollAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = Math.ceil(target / (duration / 16)); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target;
                        observer.unobserve(counter);
                        return;
                    }
                    counter.textContent = current;
                    requestAnimationFrame(updateCounter);
                };
                
                updateCounter();
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form Validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                
                // Add error message if not exists
                let errorMessage = field.nextElementSibling;
                if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                    errorMessage = document.createElement('div');
                    errorMessage.classList.add('error-message');
                    errorMessage.textContent = 'This field is required';
                    field.parentNode.insertBefore(errorMessage, field.nextSibling);
                }
            } else {
                field.classList.remove('error');
                
                // Remove error message if exists
                const errorMessage = field.nextElementSibling;
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.remove();
                }
                
                // Email validation
                if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                    
                    let errorMessage = field.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.classList.add('error-message');
                        errorMessage.textContent = 'Please enter a valid email address';
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                }
                
                // Phone validation
                if (field.name === 'phone' && !/^[\d\s\(\)\-\+]+$/.test(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                    
                    let errorMessage = field.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.classList.add('error-message');
                        errorMessage.textContent = 'Please enter a valid phone number';
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                }
            }
        });
        
        if (!isValid) {
            e.preventDefault();
        }
    });
    
    // Clear error on input
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
            
            // Remove error message if exists
            const errorMessage = this.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.remove();
            }
        });
    });
});