// server.js
// 1. Импортируем необходимые библиотеки
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// 2. Импортируем наши маршруты (роуты)
import partnerRoutes from './routes/partner.routes.js';
import errorHandler from './middlewares/errorHandler.js';

// 3. Загружаем переменные окружения из файла .env
dotenv.config();

// 4. Создаем экземпляр приложения Express
const app = express();
const PORT = process.env.PORT || 3000;

// 5. Настраиваем middleware (промежуточные обработчики)
//    - cors: разрешает запросы с других доменов (для удобства разработки)
//    - express.json(): позволяет серверу понимать JSON в теле запроса
app.use(cors());
app.use(express.json());

// 6. Подключаем статические файлы (HTML, CSS, JS клиента)
//    Все файлы из папки 'public' будут доступны по корневому URL
app.use(express.static('public'));

// 7. Подключаем наши маршруты для работы с партнерами
//    Все запросы, начинающиеся с '/api/partners', будут обработаны в partnerRoutes
app.use('/api/partners', partnerRoutes);

// 8. Глобальный обработчик ошибок (должен быть подключен ПОСЛЕ всех маршрутов)
app.use(errorHandler);

// 9. Запускаем сервер
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен и слушает порт ${PORT}`);
  console.log(`📦 API доступно по адресу: http://localhost:${PORT}/api/partners`);
  console.log(`🌐 Главная страница: http://localhost:${PORT}`);
});