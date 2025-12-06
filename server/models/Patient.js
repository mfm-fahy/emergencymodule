import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  uhid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Patient', patientSchema);
