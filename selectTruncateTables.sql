SELECT * FROM product_sales;
SELECT * FROM partner_types;
SELECT * FROM partners;

-- DELETE FROM product_sales WHERE sale_id >= 1;

TRUNCATE TABLE product_sales CASCADE;
TRUNCATE TABLE partner_types CASCADE;
TRUNCATE TABLE partners CASCADE;
