import { useState } from 'react';
import QRScanner from './QRScanner';

const PatientDetails = () => {
  const [patientData, setPatientData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const handleQRScan = async (data: any) => {
    await fetch('http://localhost:5000/api/scan-qr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    setPatientData(data);
    setFormData(data);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/patient-details', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    alert('Patient details saved successfully!');
  };

  if (!patientData) {
    return <QRScanner onScanSuccess={handleQRScan} />;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Patient Details</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>UHID</label>
          <input type="text" name="uhid" value={formData.uhid || ''} readOnly style={{ width: '100%', padding: '0.5rem', background: '#f0f0f0' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name</label>
          <input type="text" name="name" value={formData.name || ''} onChange={handleChange} style={{ width: '100%', padding: '0.5rem' }} required />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label>Age</label>
            <input type="number" name="age" value={formData.age || ''} onChange={handleChange} style={{ width: '100%', padding: '0.5rem' }} required />
          </div>
          <div>
            <label>Gender</label>
            <select name="gender" value={formData.gender || ''} onChange={handleChange} style={{ width: '100%', padding: '0.5rem' }} required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Mobile</label>
          <input type="tel" name="mobile" value={formData.mobile || ''} onChange={handleChange} style={{ width: '100%', padding: '0.5rem' }} required />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Address</label>
          <textarea name="address" value={formData.address || ''} onChange={handleChange} rows={3} style={{ width: '100%', padding: '0.5rem' }} required />
        </div>
        <button type="submit" style={{ padding: '0.5rem 2rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Save Patient Details
        </button>
      </form>
    </div>
  );
};

export default PatientDetails;
