// services/partner.service.js
import PartnerModel from '../models/partner.model.js';

// Функция для расчета скидки на основе общего объема продаж.
// Правила расчета: до 10000 – 0%, от 10000 до 50000 – 5%,
// от 50000 до 300000 – 10%, более 300000 – 15%.
const calculateDiscount = (totalSold) => {
  if (totalSold < 10000) return 0;
  if (totalSold < 50000) return 5;
  if (totalSold < 300000) return 10;
  return 15;
};

const PartnerService = {
  // Получить всех партнеров с рассчитанной для каждого скидкой
  async getAllPartnersWithDiscount() {
    // 1. Получаем сырые данные из модели
    const partners = await PartnerModel.getAllPartners();
    
    // 2. Для каждого партнера:
    //    a. Получаем сумму продаж
    //    b. Рассчитываем скидку
    //    c. Добавляем поле скидки в объект партнера
    const partnersWithDiscount = await Promise.all(partners.map(async (partner) => {
      const totalSold = await PartnerModel.getTotalSoldQuantity(partner.partner_id);
      const discount = calculateDiscount(totalSold);
      return {
        ...partner,
        total_sold_quantity: totalSold,
        discount_percentage: discount
      };
    }));
    
    return partnersWithDiscount;
  },

  // Получить данные одного партнера по ID (для редактирования)
  async getPartnerById(id) {
    return await PartnerModel.getPartnerById(id);
  },

  // Создать нового партнера
  async createPartner(partnerData) {
    return await PartnerModel.createPartner(partnerData);
  },

  // Обновить существующего партнера
  async updatePartner(id, partnerData) {
    return await PartnerModel.updatePartner(id, partnerData);
  },

  // Получить историю продаж партнера
  async getPartnerSalesHistory(partnerId) {
    return await PartnerModel.getSalesHistory(partnerId);
  }
};

export default PartnerService;