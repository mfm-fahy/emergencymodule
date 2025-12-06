import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import Patient from './models/Patient.js';
import OutPatient from './models/OutPatient.js';
import InitialAssessment from './models/InitialAssessment.js';
import DoctorAssessment from './models/DoctorAssessment.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Initialize default users
const initializeUsers = async () => {
  const users = [
    { username: 'doctor1', password: 'doctor123', role: 'doctor', name: 'Dr. Smith' },
    { username: 'nurse1', password: 'nurse123', role: 'nurse', name: 'Nurse Johnson' }
  ];

  for (const user of users) {
    const exists = await User.findOne({ username: user.username });
    if (!exists) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({ ...user, password: hashedPassword });
      console.log(`Created ${user.role}: ${user.username}`);
    }
  }
};

initializeUsers();

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, role: user.role, name: user.name });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// QR scan route - store patient details
app.post('/api/scan-qr', async (req, res) => {
  try {
    const patientData = req.body;
    console.log('Scanning QR for patient:', patientData);
    
    const existing = await Patient.findOne({ uhid: patientData.uhid });
    
    if (existing) {
      console.log('Patient already exists:', existing);
      return res.json({ message: 'Patient already exists', patient: existing });
    }
    
    const patient = await Patient.create(patientData);
    console.log('Patient created:', patient);
    res.json({ message: 'Patient registered successfully', patient });
  } catch (error) {
    console.error('Error in scan-qr:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save OutPatient form
app.post('/api/outpatient', async (req, res) => {
  try {
    const { uhid, formData } = req.body;
    console.log('Saving OutPatient form for UHID:', uhid);
    console.log('Form data:', formData);
    
    const patient = await Patient.findOne({ uhid });
    if (!patient) {
      console.log('Patient not found for UHID:', uhid);
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    const outPatient = await OutPatient.create({ patientId: patient._id, uhid, formData });
    console.log('OutPatient form saved:', outPatient);
    res.json({ message: 'OutPatient form saved', data: outPatient });
  } catch (error) {
    console.error('Error saving OutPatient form:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save InitialAssessment form
app.post('/api/assessment', async (req, res) => {
  try {
    const { uhid, formData } = req.body;
    console.log('Saving Assessment form for UHID:', uhid);
    console.log('Form data:', formData);
    
    const patient = await Patient.findOne({ uhid });
    if (!patient) {
      console.log('Patient not found for UHID:', uhid);
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    const assessment = await InitialAssessment.create({ patientId: patient._id, uhid, formData });
    console.log('Assessment form saved:', assessment);
    res.json({ message: 'Assessment form saved', data: assessment });
  } catch (error) {
    console.error('Error saving Assessment form:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update patient details
app.post('/api/patient-details', async (req, res) => {
  try {
    const patientData = req.body;
    const patient = await Patient.findOneAndUpdate(
      { uhid: patientData.uhid },
      patientData,
      { new: true, upsert: true }
    );
    res.json({ message: 'Patient details saved', patient });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Save Doctor Assessment
app.post('/api/doctor-assessment', async (req, res) => {
  try {
    const { uhid, formData } = req.body;
    console.log('Saving Doctor Assessment for UHID:', uhid);
    console.log('Doctor form data:', formData);
    
    const patient = await Patient.findOne({ uhid });
    if (!patient) {
      console.log('Patient not found for UHID:', uhid);
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    const assessment = await DoctorAssessment.create({ patientId: patient._id, uhid, formData });
    console.log('Doctor assessment saved successfully:', assessment._id);
    res.json({ message: 'Doctor assessment saved', data: assessment });
  } catch (error) {
    console.error('Error saving Doctor assessment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get patient data by UHID
app.get('/api/patient/:uhid', async (req, res) => {
  try {
    const { uhid } = req.params;
    console.log('Fetching patient with UHID:', uhid);
    
    // Check all collections
    const patient = await Patient.findOne({ uhid });
    console.log('Patient found:', patient ? 'YES' : 'NO', patient);
    
    const outPatient = await OutPatient.findOne({ uhid }).sort({ createdAt: -1 });
    console.log('OutPatient found:', outPatient ? 'YES' : 'NO', outPatient);
    
    const assessment = await InitialAssessment.findOne({ uhid }).sort({ createdAt: -1 });
    console.log('Assessment found:', assessment ? 'YES' : 'NO', assessment);
    
    // Return data even if patient doesn't exist in Patient collection
    res.json({ 
      patient: patient || { uhid }, 
      outPatient, 
      assessment 
    });
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
