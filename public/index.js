// script.js — загрузка и отображение списка партнёров
document.addEventListener('DOMContentLoaded', () => {
    const partnersList = document.getElementById('partnersList');
    const addBtn = document.getElementById('addPartnerBtn');

    // Перенаправление на страницу добавления
    addBtn.addEventListener('click', () => {
        window.location.href = '/edit-partner.html';
    });

    // Загрузка партнёров с сервера
    async function loadPartners() {
        try {
            const response = await fetch('/api/partners');
            if (!response.ok) throw new Error('Ошибка загрузки данных');
            const partners = await response.json();

            if (partners.length === 0) {
                partnersList.innerHTML = '<div class="empty-state">Нет добавленных партнёров. Нажмите "Добавить партнёра".</div>';
                return;
            }

            renderPartners(partners);
        } catch (error) {
            console.error(error);
            partnersList.innerHTML = `<div class="error-state">⚠️ Не удалось загрузить список. Проверьте соединение с сервером.</div>`;
        }
    }

    // Отрисовка карточек партнёров
    function renderPartners(partners) {
        partnersList.innerHTML = '';
        partners.forEach(partner => {
            const card = document.createElement('div');
            card.className = 'partner-card';
            // Клик по карточке открывает редактирование
            card.addEventListener('click', (e) => {
                // Чтобы клик по кнопке истории не открывал редактирование
                if (e.target.classList.contains('btn-history')) return;
                window.location.href = `/edit-partner.html?id=${partner.partner_id}`;
            });

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
                    <p><strong>Объём продаж:</strong> ${partner.total_sold_quantity} шт.</p>
                </div>
                <div class="card-actions">
                    <button class="btn btn-history" data-id="${partner.partner_id}">📜 История продаж</button>
                </div>
            `;
            partnersList.appendChild(card);
        });

        // Добавляем обработчики для кнопок истории
        document.querySelectorAll('.btn-history').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const partnerId = btn.getAttribute('data-id');
                window.location.href = `/sales-history.html?id=${partnerId}`;
            });
        });
    }

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

    loadPartners();
});