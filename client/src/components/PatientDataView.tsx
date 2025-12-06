interface PatientDataViewProps {
  data: any;
  onClose: () => void;
}

const PatientDataView = ({ data, onClose }: PatientDataViewProps) => {
  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Patient Records Found</h2>
      
      <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f0f0f0', borderRadius: '4px' }}>
        <h3>Patient Information</h3>
        <p><strong>UHID:</strong> {data.patient.uhid}</p>
        <p><strong>Name:</strong> {data.patient.name}</p>
        <p><strong>Age:</strong> {data.patient.age}</p>
        <p><strong>Gender:</strong> {data.patient.gender}</p>
        <p><strong>Mobile:</strong> {data.patient.mobile}</p>
        <p><strong>Address:</strong> {data.patient.address}</p>
      </div>

      {data.outPatient && (
        <div style={{ marginBottom: '2rem', padding: '1rem', background: '#e8f5e9', borderRadius: '4px' }}>
          <h3>OutPatient Card Data</h3>
          <p><strong>Submitted:</strong> {new Date(data.outPatient.createdAt).toLocaleString()}</p>
          <pre style={{ background: 'white', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
            {JSON.stringify(data.outPatient.formData, null, 2)}
          </pre>
        </div>
      )}

      {data.assessment && (
        <div style={{ marginBottom: '2rem', padding: '1rem', background: '#e3f2fd', borderRadius: '4px' }}>
          <h3>Initial Assessment Data</h3>
          <p><strong>Submitted:</strong> {new Date(data.assessment.createdAt).toLocaleString()}</p>
          <pre style={{ background: 'white', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
            {JSON.stringify(data.assessment.formData, null, 2)}
          </pre>
        </div>
      )}

      <button onClick={onClose} style={{ padding: '0.5rem 2rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
        Close
      </button>
    </div>
  );
};

export default PatientDataView;
