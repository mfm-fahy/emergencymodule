import { useState } from 'react';
import QRScanner from './QRScanner';
import PatientDataView from './PatientDataView';
import OutPatientCard from '../form/OutPatientCard';
import InitialAssessmentPartA from '../form/InitialAssessmentPartA';

const NurseWorkflow = () => {
  const [step, setStep] = useState(1);
  const [patientData, setPatientData] = useState<any>(null);
  const [existingData, setExistingData] = useState<any>(null);

  const handleQRScan = async (data: any) => {
    try {
      console.log('Nurse scanning QR:', data);
      const res = await fetch('http://localhost:5000/api/scan-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      console.log('QR scan result:', result);

      setPatientData(data);
      setStep(2);
    } catch (error) {
      console.error('Error scanning QR:', error);
      alert('Error scanning QR code');
    }
  };

  const handleOutPatientSubmit = async (formData: any) => {
    try {
      console.log('Submitting OutPatient form:', { uhid: patientData.uhid, formData });
      const res = await fetch('http://localhost:5000/api/outpatient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uhid: patientData.uhid, formData })
      });
      const result = await res.json();
      console.log('OutPatient submit result:', result);
      setStep(3);
    } catch (error) {
      console.error('Error submitting OutPatient form:', error);
      alert('Error submitting form');
    }
  };

  const handleAssessmentSubmit = async (formData: any) => {
    try {
      console.log('Submitting Assessment form:', { uhid: patientData.uhid, formData });
      const res = await fetch('http://localhost:5000/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uhid: patientData.uhid, formData })
      });
      const result = await res.json();
      console.log('Assessment submit result:', result);
      alert('All forms submitted successfully!');
      setStep(1);
      setPatientData(null);
    } catch (error) {
      console.error('Error submitting Assessment form:', error);
      alert('Error submitting form');
    }
  };

  const handleCloseDataView = () => {
    setStep(1);
    setExistingData(null);
    setPatientData(null);
  };

  if (step === 1) return <QRScanner onScanSuccess={handleQRScan} />;
  if (step === 2) return <OutPatientCard patientData={patientData} onSubmit={handleOutPatientSubmit} />;
  if (step === 3) return <InitialAssessmentPartA patientData={patientData} onSubmit={handleAssessmentSubmit} />;
  if (step === 4) return <PatientDataView data={existingData} onClose={handleCloseDataView} />;

  return null;
};

export default NurseWorkflow;
