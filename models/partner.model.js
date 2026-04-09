// models/partner.model.js
import { query } from '../config/db.js';

// Модель для работы с партнерами
const PartnerModel = {
  // Получить всех партнеров с названием их типа
  async getAllPartners() {
    const sql = `
      SELECT p.*, pt.type_name 
      FROM partners p
      JOIN partner_types pt ON p.partner_type_id = pt.partner_type_id
      ORDER BY p.partner_id
    `;
    const result = await query(sql);
    return result.rows;
  },

  // Получить одного партнера по ID
  async getPartnerById(id) {
    const sql = `SELECT * FROM partners WHERE partner_id = $1`;
    const result = await query(sql, [id]);
    return result.rows[0];
  },

  // Создать нового партнера
  async createPartner(partnerData) {
    const { name, partner_type_id, rating, address, director_name, phone, email } = partnerData;
    const sql = `
      INSERT INTO partners (name, partner_type_id, rating, address, director_name, phone, email)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `;
    const values = [name, partner_type_id, rating, address, director_name, phone, email];
    const result = await query(sql, values);
    return result.rows[0];
  },

  // Обновить данные партнера
  async updatePartner(id, partnerData) {
    const { name, partner_type_id, rating, address, director_name, phone, email } = partnerData;
    const sql = `
      UPDATE partners
      SET name = $2, partner_type_id = $3, rating = $4, address = $5, 
          director_name = $6, phone = $7, email = $8
      WHERE partner_id = $1 RETURNING *
    `;
    const values = [id, name, partner_type_id, rating, address, director_name, phone, email];
    const result = await query(sql, values);
    return result.rows[0];
  },

  // Получить историю продаж партнера
  async getSalesHistory(partnerId) {
    const sql = `SELECT product_name, quantity, sale_date FROM product_sales WHERE partner_id = $1 ORDER BY sale_date DESC`;
    const result = await query(sql, [partnerId]);
    return result.rows;
  },

  // Получить общее количество проданной продукции партнером
  async getTotalSoldQuantity(partnerId) {
    const sql = `SELECT COALESCE(SUM(quantity), 0) as total FROM product_sales WHERE partner_id = $1`;
    const result = await query(sql, [partnerId]);
    return parseInt(result.rows[0].total);
  }
};

export default PartnerModel;