import { useState } from 'react';
import QRScanner from './QRScanner';
import InitialAssessmentPartB from '../form/InitialAssessmentPartB';

const DoctorWorkflow = () => {
  const [step, setStep] = useState(1);
  const [patientData, setPatientData] = useState<any>(null);
  const [nurseData, setNurseData] = useState<any>(null);

  const handleQRScan = async (data: any) => {
    try {
      console.log('Doctor - Scanned QR Data:', data);
      const res = await fetch(`http://localhost:5000/api/patient/${data.uhid}`);
      
      const records = await res.json();
      console.log('Doctor - Fetched Records:', records);
      console.log('Has OutPatient:', !!records.outPatient);
      console.log('Has Assessment:', !!records.assessment);
      
      if (!records.outPatient && !records.assessment) {
        alert('No nurse forms found for this patient. Please ensure nurse has completed the forms.');
        return;
      }
      
      setPatientData(data);
      setNurseData(records);
      setStep(2);
    } catch (error) {
      console.error('Error fetching patient data:', error);
      alert('Error loading patient data: ' + error);
    }
  };

  const handleNext = () => {
    setStep(3);
  };

  const handleAssessmentSubmit = async (formData: any) => {
    try {
      console.log('Doctor submitting assessment:', { uhid: patientData.uhid, formData });
      const res = await fetch('http://localhost:5000/api/doctor-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uhid: patientData.uhid, formData })
      });
      const result = await res.json();
      console.log('Doctor assessment result:', result);
      alert('Assessment submitted successfully!');
      setStep(1);
      setPatientData(null);
      setNurseData(null);
    } catch (error) {
      console.error('Error submitting doctor assessment:', error);
      alert('Error submitting assessment');
    }
  };

  if (step === 1) return <QRScanner onScanSuccess={handleQRScan} />;

  if (step === 2) {
    const opdData = nurseData.outPatient?.formData || {};
    const assessData = nurseData.assessment?.formData || {};
    
    return (
      <div style={{ maxWidth: '900px', margin: '50px auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Patient Records - UHID: {patientData.uhid}</h2>
        
        {nurseData.outPatient && (
          <div style={{ marginBottom: '2rem', padding: '1rem', background: '#e8f5e9', borderRadius: '4px' }}>
            <h3 style={{ color: 'black' }}>OutPatient Card Data (Filled by Nurse)</h3>
            <p style={{ color: 'black' }}><strong>Submitted:</strong> {new Date(nurseData.outPatient.createdAt).toLocaleString()}</p>
            <div style={{ background: 'white', padding: '1rem', borderRadius: '4px', color: 'black' }}>
              {Object.keys(opdData).length > 0 ? (
                Object.entries(opdData).map(([key, value]) => (
                  <p key={key} style={{ color: 'black' }}><strong>{key}:</strong> {String(value)}</p>
                ))
              ) : (
                <p style={{ color: 'black' }}>No data available</p>
              )}
            </div>
          </div>
        )}

        {nurseData.assessment && (
          <div style={{ marginBottom: '2rem', padding: '1rem', background: '#e3f2fd', borderRadius: '4px' }}>
            <h3 style={{ color: 'black' }}>Initial Assessment Part A (Filled by Nurse)</h3>
            <p style={{ color: 'black' }}><strong>Submitted:</strong> {new Date(nurseData.assessment.createdAt).toLocaleString()}</p>
            <div style={{ background: 'white', padding: '1rem', borderRadius: '4px', color: 'black' }}>
              {Object.keys(assessData).length > 0 ? (
                Object.entries(assessData).map(([key, value]) => (
                  <p key={key} style={{ color: 'black' }}><strong>{key}:</strong> {String(value)}</p>
                ))
              ) : (
                <p style={{ color: 'black' }}>No data available</p>
              )}
            </div>
          </div>
        )}

        {!nurseData.outPatient && !nurseData.assessment && (
          <div style={{ padding: '1rem', background: '#fff3cd', borderRadius: '4px', marginBottom: '2rem' }}>
            <p>No nurse forms found for this patient.</p>
          </div>
        )}

        <button onClick={handleNext} style={{ padding: '1rem 2rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1.1rem' }}>
          Next: Fill Assessment Part B
        </button>
      </div>
    );
  }

  if (step === 3) {
    return <InitialAssessmentPartB patientData={patientData} onSubmit={handleAssessmentSubmit} />;
  }

  return null;
};

export default DoctorWorkflow;
