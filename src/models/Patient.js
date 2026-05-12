import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'ФИО обязательно'],
      trim: true,
    },
    birthDate: {
      type: Date,
      required: [true, 'Дата рождения обязательна'],
    },
    phone: {
      type: String,
      required: [true, 'Номер телефона обязателен'],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

patientSchema.index({ fullName: 'text' });
patientSchema.index({ phone: 1 });

patientSchema.virtual('age').get(function () {
  const today = new Date();
  const birthDate = new Date(this.birthDate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

patientSchema.methods.formatBirthDate = function () {
  const date = new Date(this.birthDate);
  return date.toLocaleDateString('ru-RU');
};

patientSchema.statics.searchPatients = function (searchQuery) {
  if (!searchQuery) return this.find({});
  return this.find({
    $or: [
      { fullName: { $regex: searchQuery, $options: 'i' } },
      { phone: { $regex: searchQuery, $options: 'i' } },
    ],
  });
};

const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);

export default Patient;
