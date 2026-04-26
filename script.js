document.addEventListener("DOMContentLoaded", () => {

    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    
    localStorage.setItem('os_info', platform);
    localStorage.setItem('browser_info', userAgent);

    const footer = document.getElementById('info-footer');
    footer.innerHTML = `<strong>Система:</strong> ${localStorage.getItem('os_info')} <br> <strong>Браузер:</strong> ${localStorage.getItem('browser_info')}`;

    const variantNumber = 4; 
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`;
    const commentsContainer = document.getElementById('comments-container');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            commentsContainer.innerHTML = ''; 
            data.forEach(comment => {
                const commentEl = document.createElement('div');
                commentEl.className = 'comment-box';
                commentEl.innerHTML = `
                    <h4>Від: ${comment.email}</h4>
                    <p>${comment.body}</p>
                `;
                commentsContainer.appendChild(commentEl);
            });
        })
        .catch(error => {
            commentsContainer.innerHTML = '<p>Помилка завантаження відгуків.</p>';
            console.error('Помилка:', error);
        });

    const modal = document.getElementById('feedback-modal');
    const closeBtn = document.getElementById('close-modal');

    setTimeout(() => {
        modal.style.display = 'flex';
    }, 30000);

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    function autoSetTheme() {
        const currentHour = new Date().getHours();
        if (currentHour >= 7 && currentHour < 21) {
            body.classList.remove('dark-theme');
            themeToggleBtn.textContent = '🌙 Нічна тема';
        } else {
            body.classList.add('dark-theme');
            themeToggleBtn.textContent = '☀️ Денна тема';
        }
    }

    autoSetTheme();

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) {
            themeToggleBtn.textContent = '☀️ Денна тема';
        } else {
            themeToggleBtn.textContent = '🌙 Нічна тема';
        }
    });
});