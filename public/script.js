// public/script.js
// Ждем полной загрузки HTML-документа
document.addEventListener('DOMContentLoaded', () => {
    const partnersListElement = document.getElementById('partners-list');
    const addPartnerBtn = document.getElementById('add-partner-btn');

    // Функция для загрузки и отображения списка партнеров
    async function loadPartners() {
        // Показываем индикатор загрузки
        if (partnersListElement) {
            partnersListElement.innerHTML = '<p>Загрузка списка партнеров...</p>';
        }
        
        try {
            // Отправляем GET-запрос на сервер
            const response = await fetch('/api/partners');
            
            // Проверяем, успешен ли ответ
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            
            const partners = await response.json();
            
            // Очищаем контейнер
            partnersListElement.innerHTML = '';
            
            // Если партнеров нет, показываем сообщение
            if (partners.length === 0) {
                partnersListElement.innerHTML = '<p>Список партнеров пуст.</p>';
                return;
            }
            
            // Для каждого партнера создаем HTML-карточку
            partners.forEach(partner => {
                const card = document.createElement('div');
                card.className = 'partner-card';
                
                // Вся карточка кликабельна для редактирования
                card.addEventListener('click', (e) => {
                    // Если клик был по кнопке истории — не редактируем
                    if (e.target.classList && e.target.classList.contains('btn-history')) return;
                    window.location.href = `/edit-partner.html?id=${partner.partner_id}`;
                });
                
                // Формируем содержимое карточки
                card.innerHTML = `
                    <div class="card-header">
                        <h3>${escapeHtml(partner.name)}</h3>
                        <span class="discount-badge">Скидка ${partner.discount_percentage}%</span>
                    </div>
                    <div class="card-details">
                        <p><strong>Тип:</strong> ${escapeHtml(partner.type_name)}</p>
                        <p><strong>Рейтинг:</strong> ${partner.rating}</p>
                        <p><strong>Директор:</strong> ${escapeHtml(partner.director_name)}</p>
                        <p><strong>Телефон:</strong> ${escapeHtml(partner.phone)}</p>
                        <p><strong>Email:</strong> ${escapeHtml(partner.email)}</p>
                        <p><strong>Общий объем продаж:</strong> ${partner.total_sold_quantity} шт.</p>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-history" data-id="${partner.partner_id}">📜 История продаж</button>
                    </div>
                `;
                partnersListElement.appendChild(card);
            });

            // Навешиваем обработчики на кнопки истории
            document.querySelectorAll('.btn-history').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const partnerId = btn.getAttribute('data-id');
                    window.location.href = `/sales-history.html?id=${partnerId}`;
                });
            });
        } catch (error) {
            console.error('Ошибка при загрузке партнеров:', error);
            partnersListElement.innerHTML = '<p>Не удалось загрузить список партнеров. Попробуйте позже.</p>';
        }
    }
    
    // Загружаем партнеров при загрузке страницы
    loadPartners();
    
    // Обработчик для кнопки "Добавить партнера"
    if (addPartnerBtn) {
        addPartnerBtn.addEventListener('click', () => {
            window.location.href = '/edit-partner.html';  // без id — режим добавления
        });
    }
});

// Простая защита от XSS
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}