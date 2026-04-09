// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  // Логируем ошибку для разработчика
  console.error('Ошибка сервера:', err);

  // Определяем статус-код: используем код ошибки или 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;
  
  // Формируем понятное сообщение для пользователя
  const message = err.message || 'Внутренняя ошибка сервера. Пожалуйста, попробуйте позже.';

  // Отправляем JSON-ответ с ошибкой
  res.status(statusCode).json({ 
    error: true, 
    message: message,
    // В режиме разработки можно также передать стек ошибки для отладки
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export default errorHandler;