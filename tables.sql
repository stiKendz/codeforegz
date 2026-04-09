-- Создание таблицы с типами партнеров
CREATE TABLE partner_types (
    partner_type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL UNIQUE
);

-- Создание основной таблицы партнеров
CREATE TABLE partners (
    partner_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    partner_type_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 0),
    address TEXT NOT NULL,
    director_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (partner_type_id) REFERENCES partner_types(partner_type_id)
);

-- Создание таблицы для истории продаж
CREATE TABLE product_sales (
    sale_id SERIAL PRIMARY KEY,
    partner_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    sale_date DATE NOT NULL,
    FOREIGN KEY (partner_id) REFERENCES partners(partner_id) ON DELETE CASCADE
);



INSERT INTO partner_types (type_name) VALUES ('ЗАО'), ('ООО'), ('ИП'), ('ПАО');

INSERT INTO partners (name, partner_type_id, rating, address, director_name, phone, email)
VALUES ('ООО "Ромашка"', 2, 85, 'г. Москва, ул. Ленина, 1', 'Иванов И.И.', '+7 495 123-45-67', 'info@romashka.ru');

INSERT INTO product_sales (partner_id, product_name, quantity, sale_date)
VALUES (1, 'Продукт А', 15000, '2025-01-15'),
       (1, 'Продукт Б', 8000, '2025-02-10');

SELECT * FROM partners;