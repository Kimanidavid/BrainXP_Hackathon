document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-message');
    const completeLessonButton = document.getElementById('complete-lesson');
    const xpElement = document.getElementById('xp');
    const levelElement = document.getElementById('level');
    const pointsElement = document.getElementById('points');
    const xpProgressBar = document.getElementById('xp-progress');
    const yourPointsElement = document.getElementById('your-points');

    // Chat functionality
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessageToChat('user', message);
            userInput.value = '';
            
            // Simulate teacher response
            setTimeout(() => {
                addMessageToChat('teacher', "Thank you for your question. As a teacher, I'm here to help you learn and grow. Could you please provide more context or specify what aspect of this topic you'd like me to explain further?");
            }, 1000);
        }
    }

    function addMessageToChat(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', role);
        
        const messageContent = document.createElement('p');
        messageContent.textContent = role === 'teacher' ? `Teacher: ${content}` : content;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Progress functionality
    completeLessonButton.addEventListener('click', completeLesson);

    function completeLesson() {
        let xp = parseInt(xpElement.textContent);
        let level = parseInt(levelElement.textContent);
        let points = parseInt(pointsElement.textContent);

        xp += 50;
        points += 100;

        if (xp >= 500) {
            level++;
            xp -= 500;
        }

        xpElement.textContent = xp;
        levelElement.textContent = level;
        pointsElement.textContent = points;
        yourPointsElement.textContent = points + ' pts';

        // Update XP progress bar
        const progressPercentage = (xp / 500) * 100;
        xpProgressBar.style.width = `${progressPercentage}%`;

        // Show a congratulatory message
        alert('Congratulations! You completed a lesson and earned 50 XP and 100 points!');

        // Here you would typically make an API call to save the user's progress
        // For now, we'll just log it to the console
        console.log('Progress saved:', { level, xp, points });

        // Check if we should navigate to the learning materials page
        // This is where you'd implement the navigation to the new page
        if (level >= 5) {
            alert('You\'ve reached level 5! New learning materials are now available.');
            // Here you would typically navigate to the learning materials page
            // For example:
            // window.location.href = 'learning_materials.html';
        }
    }
});
