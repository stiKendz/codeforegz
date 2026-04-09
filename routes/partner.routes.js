// routes/partner.routes.js
import express from 'express';
import PartnerController from '../controllers/partner.controller.js';

const router = express.Router();

// Все маршруты начинаются с /api/partners

// GET /api/partners - получить список всех партнеров
router.get('/', PartnerController.getPartners);

// GET /api/partners/:id - получить данные одного партнера
router.get('/:id', PartnerController.getPartnerById);

// POST /api/partners - создать нового партнера
router.post('/', PartnerController.createPartner);

// PUT /api/partners/:id - обновить партнера
router.put('/:id', PartnerController.updatePartner);

// GET /api/partners/:id/sales - получить историю продаж партнера
router.get('/:id/sales', PartnerController.getPartnerSales);

export default router;