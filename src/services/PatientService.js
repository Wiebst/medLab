import connectDB from '../db';
import Patient from '../models/Patient';

class PatientsService {
  constructor() {
    this.initDB();
  }

  async initDB() {
    try {
      await connectDB();
      console.log('Сервис пациентов инициализирован');
    } catch (error) {
      console.error('Ошибка инициализации БД:', error);
    }
  }

  async getAllPatients() {
    try {
      await connectDB();
      const patients = await Patient.find({}).sort({ createdAt: -1 });
      return { success: true, data: patients };
    } catch (error) {
      console.error('Ошибка получения пациентов:', error);
      return { success: false, error: error.message };
    }
  }

  async getPatientById(id) {
    try {
      await connectDB();
      const patient = await Patient.findById(id);
      if (!patient) {
        return { success: false, error: 'Пациент не найден' };
      }
      return { success: true, data: patient };
    } catch (error) {
      console.error('Ошибка получения пациента:', error);
      return { success: false, error: error.message };
    }
  }

  async createPatient(patientData) {
    try {
      await connectDB();

      if (!patientData.fullName) {
        return { success: false, error: 'ФИО обязательно' };
      }
      if (!patientData.birthDate) {
        return { success: false, error: 'Дата рождения обязательна' };
      }

      const patient = new Patient(patientData);
      await patient.save();

      return { success: true, data: patient };
    } catch (error) {
      console.error('Ошибка создания пациента:', error);
      return { success: false, error: error.message };
    }
  }

  async updatePatient(id, updateData) {
    try {
      await connectDB();
      const patient = await Patient.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true },
      );

      if (!patient) {
        return { success: false, error: 'Пациент не найден' };
      }

      return { success: true, data: patient };
    } catch (error) {
      console.error('Ошибка обновления пациента:', error);
      return { success: false, error: error.message };
    }
  }

  async deletePatient(id) {
    try {
      await connectDB();
      const patient = await Patient.findByIdAndDelete(id);

      if (!patient) {
        return { success: false, error: 'Пациент не найден' };
      }

      return { success: true, message: 'Пациент удален' };
    } catch (error) {
      console.error('Ошибка удаления пациента:', error);
      return { success: false, error: error.message };
    }
  }

  async searchPatients(searchQuery) {
    try {
      await connectDB();
      const patients = await Patient.searchPatients(searchQuery);
      return { success: true, data: patients };
    } catch (error) {
      console.error('Ошибка поиска пациентов:', error);
      return { success: false, error: error.message };
    }
  }

  async getPatientsByBirthDateRange(startDate, endDate) {
    try {
      await connectDB();
      const patients = await Patient.find({
        birthDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      });
      return { success: true, data: patients };
    } catch (error) {
      console.error('Ошибка фильтрации пациентов:', error);
      return { success: false, error: error.message };
    }
  }
}

const patientsService = new PatientsService();
export default patientsService;
