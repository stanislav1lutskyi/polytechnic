document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Інфо про систему
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    localStorage.setItem('os_info', platform);
    localStorage.setItem('browser_info', userAgent);
    const footer = document.getElementById('info-footer');
    if (footer) {
        footer.innerHTML = `<strong>Система:</strong> ${platform} <br> <strong>Браузер:</strong> ${userAgent}`;
    }

    // 2. ОБРОБКА ФОРМИ
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(data)
                });

                if (response.ok) {
                    alert('Дякую! Ваше повідомлення надіслано успішно.');
                    contactForm.reset();
                    const modal = document.getElementById('feedback-modal');
                    if (modal) modal.style.display = 'none';
                } else {
                    alert('Сталася помилка при відправці.');
                }
            } catch (err) {
                console.error('Помилка:', err);
                alert('Не вдалося з’єднатися з сервером.');
            }
        });
    }

    // 3. Відгуки (JSONPlaceholder)
    const variantNumber = 4;
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`;
    const commentsContainer = document.getElementById('comments-container');

    if (commentsContainer) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                commentsContainer.innerHTML = '';
                data.forEach(comment => {
                    const commentEl = document.createElement('div');
                    commentEl.className = 'comment-box';
                    commentEl.innerHTML = `<h4>Від: ${comment.email}</h4><p>${comment.body}</p>`;
                    commentsContainer.appendChild(commentEl);
                });
            })
            .catch(error => {
                commentsContainer.innerHTML = '<p>Помилка завантаження відгуків.</p>';
            });
    }

    // 4. Модальне вікно (Поява через 3 секунди для швидкого тестування)
    const modal = document.getElementById('feedback-modal');
    const closeBtn = document.getElementById('close-modal');

    setTimeout(() => {
        if (modal) modal.style.display = 'flex';
    }, 3000); // <-- Змінено на 3 секунди

    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.style.display = 'none');
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) modal.style.display = 'none';
    });

    // 5. Теми
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    function autoSetTheme() {
        const currentHour = new Date().getHours();
        if (currentHour >= 7 && currentHour < 21) {
            body.classList.remove('dark-theme');
            if (themeToggleBtn) themeToggleBtn.textContent = '🌙 Нічна тема';
        } else {
            body.classList.add('dark-theme');
            if (themeToggleBtn) themeToggleBtn.textContent = '☀️ Денна тема';
        }
    }

    autoSetTheme();

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            themeToggleBtn.textContent = body.classList.contains('dark-theme') ? '☀️ Денна тема' : '🌙 Нічна тема';
        });
    }
});