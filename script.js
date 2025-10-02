// Interactive Moving Button Game
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('moveButton');
    const imageContainer = document.getElementById('imageContainer');
    
    let clickCount = 0;
    const maxClicks = 20;
    
    // Array of button texts to randomly choose from
    const buttonTexts = [
        "Clica aqui",
        "Zueira clica aqui", 
        "Agora clica aqui"
    ];
    
    // Get safe boundaries for button positioning
    function getSafeBoundaries() {
        const buttonRect = button.getBoundingClientRect();
        const buttonWidth = buttonRect.width || 120;
        const buttonHeight = buttonRect.height || 50;
        
        return {
            minX: buttonWidth / 2 + 20,
            maxX: window.innerWidth - buttonWidth / 2 - 20,
            minY: buttonHeight / 2 + 150, // Account for title box
            maxY: window.innerHeight - buttonHeight / 2 - 20
        };
    }
    
    // Generate random position within safe boundaries
    function getRandomPosition() {
        const boundaries = getSafeBoundaries();
        
        const x = Math.random() * (boundaries.maxX - boundaries.minX) + boundaries.minX;
        const y = Math.random() * (boundaries.maxY - boundaries.minY) + boundaries.minY;
        
        return { x, y };
    }
    
    // Get random button text
    function getRandomButtonText() {
        const randomIndex = Math.floor(Math.random() * buttonTexts.length);
        return buttonTexts[randomIndex];
    }
    
    // Move button to new random position
    function moveButton() {
        const newPos = getRandomPosition();
        
        button.classList.add('moving');
        button.style.left = newPos.x + 'px';
        button.style.top = newPos.y + 'px';
        button.style.transform = 'translate(-50%, -50%)';
        
        // Remove moving class after animation
        setTimeout(() => {
            button.classList.remove('moving');
        }, 200);
    }
    
    // Handle button click
    function handleButtonClick() {
        clickCount++;
        
        // Change button text randomly
        button.textContent = getRandomButtonText();
        
        // Add click feedback
        button.style.transform = 'translate(-50%, -50%) scale(0.9)';
        setTimeout(() => {
            button.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 50);
        
        if (clickCount < maxClicks) {
            // Move button to new position
            setTimeout(() => {
                moveButton();
            }, 100);
        } else {
            // Show success message and hide button
            setTimeout(() => {
                button.style.display = 'none';
                imageContainer.classList.remove('hidden');
                
                // Add some celebration effects
                createConfetti();
            }, 150);
        }
    }
    
    // Create simple confetti effect
    function createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'absolute';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '100';
                
                document.body.appendChild(confetti);
                
                // Animate confetti falling
                const fallDuration = Math.random() * 3000 + 2000;
                const fallDistance = window.innerHeight + 20;
                const rotation = Math.random() * 360;
                
                confetti.animate([
                    { 
                        transform: `translateY(0px) rotate(0deg)`,
                        opacity: 1
                    },
                    { 
                        transform: `translateY(${fallDistance}px) rotate(${rotation}deg)`,
                        opacity: 0
                    }
                ], {
                    duration: fallDuration,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }).onfinish = () => {
                    confetti.remove();
                };
            }, i * 100);
        }
    }
    
    // Add click event listener
    button.addEventListener('click', handleButtonClick);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (clickCount > 0 && clickCount < maxClicks) {
            // Reposition button if it's outside new boundaries
            const boundaries = getSafeBoundaries();
            const buttonRect = button.getBoundingClientRect();
            const buttonCenterX = buttonRect.left + buttonRect.width / 2;
            const buttonCenterY = buttonRect.top + buttonRect.height / 2;
            
            if (buttonCenterX < boundaries.minX || buttonCenterX > boundaries.maxX ||
                buttonCenterY < boundaries.minY || buttonCenterY > boundaries.maxY) {
                moveButton();
            }
        }
    });
    
    console.log('Interactive Moving Button Game loaded!');
    console.log('Click the button to start the challenge!');
});