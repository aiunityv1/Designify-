// DOM Elements
const particlesContainer = document.querySelector('.particles');
const promptInput = document.querySelector('.prompt-input');
const exampleShowcase = document.querySelector('.example-showcase');
const exampleContents = document.querySelectorAll('.example-content');
const exampleTransformsContainer = document.querySelector('.example-transforms-container');

// Animation Configuration
const placeholders = [
    'Create a design in vertical...',
    'Create a design in horizontal...',
    'Create a design in circular...',
    'Create a design in flowing...',
    'Create a design in grid...',
    'Create a design in organic...',
    'Create a transforming particle design...'
];

let currentPlaceholder = 0;
let transformsAnimation = null;
let transformDotsCreated = false;

// Particle Animation Setup
const particleColors = ['#4ecdc4', '#556270', '#ff6b6b'];
const particleCount = 50;

// Initialize Animations
function initializeAnimations() {
    setupParticles();
    setupPlaceholderRotation();
    setupInputAnimations();
    setupExampleAnimations();
}

// Particle System
function setupParticles() {
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.backgroundColor = particleColors[Math.floor(Math.random() * particleColors.length)];
        particlesContainer.appendChild(particle);

        anime({
            targets: particle,
            translateX: () => anime.random(-500, 500),
            translateY: () => anime.random(-500, 500),
            scale: () => anime.random(1, 3),
            opacity: [0.4, 0.1],
            duration: () => anime.random(1000, 3000),
            delay: () => anime.random(0, 1000),
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutQuad'
        });
    }
}

// Placeholder Rotation
function setupPlaceholderRotation() {
    setInterval(() => {
        currentPlaceholder = (currentPlaceholder + 1) % placeholders.length;
        promptInput.placeholder = placeholders[currentPlaceholder];
        updateExampleLayout(placeholders[currentPlaceholder]);
    }, 3000);
}

// Input Animations
function setupInputAnimations() {
    promptInput.addEventListener('focus', () => {
        anime({
            targets: particlesContainer,
            scale: 1.1,
            duration: 1000,
            easing: 'easeOutElastic(1, .5)'
        });
    });

    promptInput.addEventListener('blur', () => {
        anime({
            targets: particlesContainer,
            scale: 1,
            duration: 1000,
            easing: 'easeOutElastic(1, .5)'
        });
    });
}

// Example Animations
function setupExampleAnimations() {
    // Flowing animation
    anime({
        targets: '.example-flowing .example-element',
        translateY: () => anime.random(-30, 30),
        translateX: () => anime.random(-30, 30),
        scale: [0.8, 1.2],
        opacity: [0.6, 1],
        easing: 'easeInOutSine',
        duration: 2000,
        delay: anime.stagger(200),
        loop: true,
        direction: 'alternate'
    });

    // Organic shape animation
    anime({
        targets: '.organic-shape path',
        d: [
            'M100,100 C130,90 150,80 160,100 C170,120 150,150 100,150 C50,150 30,120 40,100 C50,80 70,90 100,100',
            'M100,100 C150,80 180,100 160,130 C140,160 110,160 100,150 C90,160 60,160 40,130 C20,100 50,80 100,100',
            'M100,100 C130,90 150,80 160,100 C170,120 150,150 100,150 C50,150 30,120 40,100 C50,80 70,90 100,100'
        ],
        easing: 'cubicBezier(0.4, 0, 0.2, 1)',
        duration: 3000,
        loop: true
    });
}

// Example Layout Updates
function updateExampleLayout(promptText) {
    if (transformsAnimation) {
        anime.remove('.example-transform-dot');
        transformsAnimation = null;
        document.querySelectorAll('.example-transform-dot').forEach(dot => dot.style.opacity = 0);
    }

    exampleContents.forEach(content => {
        content.classList.remove('active');
    });

    if (promptText.includes('vertical')) {
        document.querySelector('.example-vertical').classList.add('active');
    } else if (promptText.includes('horizontal')) {
        document.querySelector('.example-horizontal').classList.add('active');
    } else if (promptText.includes('circular')) {
        const circular = document.querySelector('.example-circular');
        circular.classList.add('active');
        
        const elements = circular.querySelectorAll('.example-element');
        elements.forEach((el, i) => {
            const angle = (i / elements.length) * Math.PI * 2;
            const radius = 80;
            anime({
                targets: el,
                left: `${Math.cos(angle) * radius + 100}px`,
                top: `${Math.sin(angle) * radius + 100}px`,
                scale: [0, 1],
                opacity: [0, 1],
                easing: 'spring(1, 80, 10, 0)',
                delay: i * 100
            });
        });
    } else if (promptText.includes('flowing')) {
        document.querySelector('.example-flowing').classList.add('active');
    } else if (promptText.includes('grid')) {
        document.querySelector('.example-grid').classList.add('active');
    } else if (promptText.includes('organic')) {
        document.querySelector('.example-organic').classList.add('active');
    } else if (promptText.includes('transforming')) {
        const transformContent = document.querySelector('.example-transforms');
        transformContent.classList.add('active');
        startExampleTransformsAnimation();
    }
}

// Function to handle transforms animation *within* the example showcase
function startExampleTransformsAnimation() {
    if (!exampleTransformsContainer) return;

    if (!transformDotsCreated) {
        const numberOfDots = 150;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < numberOfDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('example-transform-dot');
            dot.style.top = '50%';
            dot.style.left = '50%';
            fragment.appendChild(dot);
        }
        exampleTransformsContainer.appendChild(fragment);
        transformDotsCreated = true;
    }

    document.querySelectorAll('.example-transform-dot').forEach(dot => {
        dot.style.opacity = 0;
        dot.style.transform = 'translate(-50%, -50%)';
    });

    transformsAnimation = anime({
        targets: '.example-transform-dot',
        translateX: () => anime.random(-180, 180),
        translateY: () => anime.random(-150, 150),
        scale: [
            { value: 0, duration: 0 },
            { value: anime.random(0.5, 1.2), duration: 1500 },
            { value: anime.random(0.3, 0.8), duration: 1500 }
        ],
        rotate: () => anime.random(0, 360),
        opacity: [
            { value: 0, duration: 0 },
            { value: 1, duration: 1000 },
            { value: anime.random(0.4, 0.7), duration: 1000 },
            { value: 0, duration: 1000, easing: 'linear' }
        ],
        easing: 'easeInOutSine',
        delay: anime.stagger(15),
        duration: 4000,
        loop: false
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAnimations); 