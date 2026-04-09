// config/db.js
// Импортируем библиотеку pg для работы с PostgreSQL
import pkg from 'pg';
const { Pool } = pkg;
// Загружаем переменные окружения из файла .env
import dotenv from 'dotenv';
dotenv.config();

// Создаем пул соединений с базой данных.
// Пул заранее создает несколько соединений, что ускоряет работу.
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Экспортируем метод для выполнения запросов.
// Этот метод будет использоваться во всех моделях.
export const query = (text, params) => pool.query(text, params);