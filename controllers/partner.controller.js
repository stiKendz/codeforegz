// controllers/partner.controller.js
import PartnerService from '../services/partner.service.js';

const PartnerController = {
  // GET /api/partners
  async getPartners(req, res, next) {
    try {
      const partners = await PartnerService.getAllPartnersWithDiscount();
      res.status(200).json(partners);
    } catch (error) {
      // Передаем ошибку в глобальный обработчик
      next(error);
    }
  },

  // GET /api/partners/:id
  async getPartnerById(req, res, next) {
    try {
      const { id } = req.params;
      const partner = await PartnerService.getPartnerById(id);
      if (!partner) {
        return res.status(404).json({ message: `Партнер с ID ${id} не найден` });
      }
      res.status(200).json(partner);
    } catch (error) {
      next(error);
    }
  },

  // POST /api/partners
  async createPartner(req, res, next) {
    try {
      // Валидация входных данных
      const { name, rating, phone, email } = req.body;
      if (!name || rating === undefined || !phone || !email) {
        return res.status(400).json({ 
          message: 'Ошибка валидации: Имя, рейтинг, телефон и email обязательны для заполнения.' 
        });
      }
      if (rating < 0 || !Number.isInteger(rating)) {
        return res.status(400).json({ 
          message: 'Рейтинг должен быть целым неотрицательным числом.' 
        });
      }
      // В реальном проекте здесь бы использовалась отдельная библиотека валидации,
      // например Joi или celebrate.
      
      const newPartner = await PartnerService.createPartner(req.body);
      res.status(201).json(newPartner);
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/partners/:id
  async updatePartner(req, res, next) {
    try {
      const { id } = req.params;
      const updatedPartner = await PartnerService.updatePartner(id, req.body);
      if (!updatedPartner) {
        return res.status(404).json({ message: `Партнер с ID ${id} не найден для обновления.` });
      }
      res.status(200).json(updatedPartner);
    } catch (error) {
      next(error);
    }
  },

  // GET /api/partners/:id/sales
  async getPartnerSales(req, res, next) {
    try {
      const { id } = req.params;
      const salesHistory = await PartnerService.getPartnerSalesHistory(id);
      res.status(200).json(salesHistory);
    } catch (error) {
      next(error);
    }
  }
};

export default PartnerController;