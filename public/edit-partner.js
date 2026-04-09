// public/edit-partner.js
document.addEventListener('DOMContentLoaded', async () => {
    // Определяем, в каком режиме мы находимся
    const urlParams = new URLSearchParams(window.location.search);
    const partnerId = urlParams.get('id');
    const isEditMode = !!partnerId;
    
    const formTitle = document.getElementById('form-title');
    const partnerForm = document.getElementById('partner-form');
    const typeSelect = document.getElementById('partner_type_id');
    
    // 1. Загружаем возможные типы партнёров (с сервера или fallback)
    await loadPartnerTypes();
    
    if (isEditMode) {
        formTitle.textContent = 'Редактирование партнера';
        // Загружаем данные партнера и заполняем форму
        try {
            const response = await fetch(`/api/partners/${partnerId}`);
            if (!response.ok) throw new Error('Не удалось загрузить данные');
            const partner = await response.json();
            
            // Заполняем поля формы
            document.getElementById('name').value = partner.name || '';
            document.getElementById('partner_type_id').value = partner.partner_type_id || '';
            document.getElementById('rating').value = partner.rating;
            document.getElementById('address').value = partner.address || '';
            document.getElementById('director_name').value = partner.director_name || '';
            document.getElementById('phone').value = partner.phone || '';
            document.getElementById('email').value = partner.email || '';
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            alert('Не удалось загрузить данные партнера для редактирования.');
        }
    } else {
        formTitle.textContent = 'Добавление нового партнера';
    }
    
    // Обработка отправки формы
    partnerForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Отменяем стандартную отправку формы
        
        // Собираем данные из формы
        const formData = {
            name: document.getElementById('name').value.trim(),
            partner_type_id: parseInt(document.getElementById('partner_type_id').value),
            rating: parseInt(document.getElementById('rating').value),
            address: document.getElementById('address').value.trim(),
            director_name: document.getElementById('director_name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim()
        };
        
        // Простая валидация
        if (formData.rating < 0 || isNaN(formData.rating)) {
            alert('Рейтинг не может быть отрицательным и должен быть числом.');
            return;
        }
        if (!formData.partner_type_id) {
            alert('Выберите тип партнёра.');
            return;
        }
        
        try {
            let response;
            if (isEditMode) {
                // Если редактируем, отправляем PUT запрос
                response = await fetch(`/api/partners/${partnerId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            } else {
                // Если добавляем, отправляем POST запрос
                response = await fetch('/api/partners', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка при сохранении');
            }
            
            // При успехе перенаправляем на главную
            alert(isEditMode ? 'Партнер успешно обновлен!' : 'Партнер успешно добавлен!');
            window.location.href = '/';
        } catch (error) {
            console.error('Ошибка сохранения:', error);
            alert(`Ошибка: ${error.message}`);
        }
    });
    
    // Кнопки навигации
    const goBack = () => window.location.href = '/';
    document.getElementById('backBtn').addEventListener('click', goBack);
    document.getElementById('cancelBtn').addEventListener('click', goBack);
    
    // --- Вспомогательная функция загрузки типов партнёров ---
    async function loadPartnerTypes() {
        try {
            // Пытаемся получить типы с сервера (если реализован эндпоинт)
            const response = await fetch('/api/partner-types');
            if (response.ok) {
                const types = await response.json();
                types.forEach(type => {
                    const option = document.createElement('option');
                    option.value = type.partner_type_id;
                    option.textContent = type.type_name;
                    typeSelect.appendChild(option);
                });
                return;
            }
        } catch (e) {
            console.warn('Не удалось загрузить типы с сервера, используем fallback');
        }
        // Fallback: стандартные типы
        const fallbackTypes = [
            { id: 1, name: 'ЗАО' },
            { id: 2, name: 'ООО' },
            { id: 3, name: 'ИП' },
            { id: 4, name: 'ПАО' }
        ];
        fallbackTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type.id;
            option.textContent = type.name;
            typeSelect.appendChild(option);
        });
    }
});