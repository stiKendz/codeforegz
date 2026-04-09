// public/sales-history.js
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const partnerId = urlParams.get('id');
    const backBtn = document.getElementById('backBtn');
    const partnerNameTitle = document.getElementById('partner-name-title');
    const tableBody = document.getElementById('sales-table-body');

    if (!partnerId) {
        tableBody.innerHTML = '<tr><td colspan="3">Не указан ID партнёра</td></tr>';
        return;
    }

    backBtn.addEventListener('click', () => {
        window.location.href = '/';
    });

    try {
        // Сначала получим имя партнёра (для заголовка)
        const partnerRes = await fetch(`/api/partners/${partnerId}`);
        if (partnerRes.ok) {
            const partner = await partnerRes.json();
            partnerNameTitle.textContent = `История продаж: ${partner.name}`;
        } else {
            partnerNameTitle.textContent = `История продаж (партнёр ID ${partnerId})`;
        }

        // Загружаем историю продаж
        const salesRes = await fetch(`/api/partners/${partnerId}/sales`);
        if (!salesRes.ok) throw new Error('Не удалось загрузить историю');

        const sales = await salesRes.json();

        if (!sales.length) {
            tableBody.innerHTML = '<tr><td colspan="3" class="empty-cell">Нет данных о продажах для этого партнёра.</td></tr>';
            return;
        }

        renderSales(sales);
    } catch (error) {
        console.error(error);
        tableBody.innerHTML = '<tr><td colspan="3" class="error-cell">⚠️ Ошибка загрузки истории. Попробуйте позже.</td></tr>';
    }

    function renderSales(sales) {
        tableBody.innerHTML = '';
        sales.forEach(sale => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${escapeHtml(sale.product_name)}</td>
                <td>${sale.quantity}</td>
                <td>${formatDate(sale.sale_date)}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('ru-RU');
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }
});