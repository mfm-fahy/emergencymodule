import mongoose from 'mongoose';

const doctorAssessmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  uhid: { type: String, required: true },
  formData: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('DoctorAssessment', doctorAssessmentSchema);
