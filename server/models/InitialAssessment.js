import mongoose from 'mongoose';

const initialAssessmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  uhid: { type: String, required: true },
  formData: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('InitialAssessment', initialAssessmentSchema);
