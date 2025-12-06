import React, { useState } from "react";

interface InitialAssessmentPartAProps {
  patientData?: any;
  onSubmit?: (data: any) => void;
}

const InitialAssessmentPartA: React.FC<InitialAssessmentPartAProps> = ({ patientData, onSubmit }) => {
  const [formData, setFormData] = useState<any>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    console.log('Assessment form data updated:', newData);
    setFormData(newData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting Assessment form data:', formData);
    if (onSubmit) onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
    <div className="ia-card ia-part-a">
      {/* HEADER */}
      <header className="ia-header">
        <div className="ia-logo-left" />
        <div className="ia-hospital-details">
          <div className="ia-hospital-name">
            TRICHY SRM MEDICAL COLLEGE HOSPITAL AND RESEARCH CENTRE
          </div>
          <div className="ia-hospital-address">
            SRM Nagar, Trichy – Chennai Highways, Irungalur, Trichy – 621 105.
          </div>
          <div className="ia-hospital-accreditation">
            (Accredited with NAAC A+ Grade)
          </div>
          <div className="ia-form-title">DOCTORS INITIAL ASSESSMENT – EMERGENCY</div>
        </div>
        <div className="ia-logo-right" />
      </header>

      {/* PATIENT DETAILS */}
      <section className="ia-section">
        <h3 className="ia-section-title">
          Patient Details (Affix Label Here) – PART A (to be filled by Nurses)
        </h3>

        <div className="ia-row">
          <div className="ia-col-2">
            <label>Name</label>
            <input type="text" />
          </div>
          <div className="ia-col">
            <label>Age</label>
            <input type="text" />
          </div>
          <div className="ia-col">
            <label>Gender</label>
            <input type="text" />
          </div>
        </div>

        <div className="ia-row">
          <div className="ia-col">
            <label>UHID</label>
            <input type="text" />
          </div>
          <div className="ia-col">
            <label>IP No.</label>
            <input type="text" />
          </div>
          <div className="ia-col">
            <label>B.No.</label>
            <input type="text" />
          </div>
        </div>

        <div className="ia-row">
          <div className="ia-col">
            <label>Department</label>
            <input type="text" />
          </div>
          <div className="ia-col">
            <label>Unit</label>
            <input type="text" />
          </div>
          <div className="ia-col">
            <label>Ward</label>
            <input type="text" />
          </div>
        </div>

        <div className="ia-row">
          <div className="ia-col">
            <label>Date of Arrival</label>
            <input type="date" />
          </div>
          <div className="ia-col">
            <label>Time</label>
            <input type="time" />
          </div>
          <div className="ia-col">
            <label>MLC</label>
            <div className="ia-inline">
              <label>
                <input type="radio" name="mlc" /> Non MLC
              </label>
              <label>
                <input type="radio" name="mlc" /> MLC
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* VITAL SIGNS */}
      <section className="ia-section">
        <h3 className="ia-section-title">Vital Signs – Triage</h3>
        <div className="ia-row">
          <div className="ia-col">
            <label>Temperature (°F)</label>
            <input type="text" name="temperature" value={formData.temperature || ''} onChange={handleChange} />
          </div>
          <div className="ia-col">
            <label>Pulse / HR (beats/min)</label>
            <input type="text" name="pulseHR" value={formData.pulseHR || ''} onChange={handleChange} />
          </div>
          <div className="ia-col">
            <label>Respiration (breaths/min)</label>
            <input type="text" name="respiration" value={formData.respiration || ''} onChange={handleChange} />
          </div>
        </div>

        <div className="ia-row">
          <div className="ia-col">
            <label>BP (mmHg)</label>
            <div className="ia-inline">
              <input type="text" name="bpSystolic" value={formData.bpSystolic || ''} onChange={handleChange} className="ia-input-small" /> /
              <input type="text" name="bpDiastolic" value={formData.bpDiastolic || ''} onChange={handleChange} className="ia-input-small" />
            </div>
          </div>
          <div className="ia-col">
            <label>SpO₂ (%)</label>
            <input type="text" name="spo2" value={formData.spo2 || ''} onChange={handleChange} />
          </div>
          <div className="ia-col">
            <label>CBG / GRBS (mg/dl)</label>
            <input type="text" name="cbgGrbs" value={formData.cbgGrbs || ''} onChange={handleChange} />
          </div>
        </div>
      </section>

      {/* GLASGOW COMA SCALE (Simplified) */}
      <section className="ia-section">
        <h3 className="ia-section-title">Glasgow Coma Scale (GCS)</h3>
        <table className="ia-table ia-gcs-table">
          <thead>
            <tr>
              <th>Response</th>
              <th>Description</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Eye Opening (E)</td>
              <td>
                <input type="text" placeholder="Spontaneous / To sound / To pain / Nil" />
              </td>
              <td>
                <input type="number" min={1} max={4} />
              </td>
            </tr>
            <tr>
              <td>Verbal (V)</td>
              <td>
                <input type="text" placeholder="Oriented / Confused / Inappropriate / Incomprehensible / Nil" />
              </td>
              <td>
                <input type="number" min={1} max={5} />
              </td>
            </tr>
            <tr>
              <td>Motor (M)</td>
              <td>
                <input type="text" placeholder="Obeys / Localizes / Withdraws / Flexion / Extension / Nil" />
              </td>
              <td>
                <input type="number" min={1} max={6} />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>Total GCS Score</td>
              <td>
                <input type="number" min={3} max={15} />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* TRIAGE DECISION (simplified from printed flow chart) */}
      <section className="ia-section">
        <h3 className="ia-section-title">Triage Decision</h3>

        <div className="ia-row ia-triage-row">
          <div className="ia-col-2">
            <p>Requires immediate life-saving intervention?</p>
            <div className="ia-inline">
              <label>
                <input type="radio" name="lifeSaving" /> Yes
              </label>
              <label>
                <input type="radio" name="lifeSaving" /> No
              </label>
            </div>

            <p>High risk situation / confused / lethargic / disoriented / severe pain or distress?</p>
            <div className="ia-inline">
              <label>
                <input type="radio" name="highRisk" /> Yes
              </label>
              <label>
                <input type="radio" name="highRisk" /> No
              </label>
            </div>

            <p>How many different resources are needed?</p>
            <div className="ia-inline">
              <label>
                <input type="radio" name="resources" /> None
              </label>
              <label>
                <input type="radio" name="resources" /> One
              </label>
              <label>
                <input type="radio" name="resources" /> Many (&gt;=2)
              </label>
            </div>
          </div>

          <div className="ia-col">
            <p>Danger zone vital signs (for age) – if present, upgrade triage level.</p>
            <textarea rows={6} placeholder="Record any danger vital signs here" />
          </div>
        </div>

        <div className="ia-row ia-triage-level-row">
          <label>Triage Priority:</label>
          <div className="ia-inline">
            <label>
              <input type="radio" name="triageLevel" /> Level 1
            </label>
            <label>
              <input type="radio" name="triageLevel" /> Level 2
            </label>
            <label>
              <input type="radio" name="triageLevel" /> Level 3
            </label>
            <label>
              <input type="radio" name="triageLevel" /> Level 4
            </label>
            <label>
              <input type="radio" name="triageLevel" /> Level 5
            </label>
          </div>
        </div>

        <div className="ia-row ia-triage-completed">
          <div className="ia-col">
            <label>Triage completed by – Signature</label>
            <input type="text" />
          </div>
          <div className="ia-col">
            <label>Name</label>
            <input type="text" />
          </div>
          <div className="ia-col">
            <label>Emp. No.</label>
            <input type="text" />
          </div>
          <div className="ia-col">
            <label>Date</label>
            <input type="date" />
          </div>
          <div className="ia-col">
            <label>Time</label>
            <input type="time" />
          </div>
        </div>
      </section>
      {onSubmit && (
        <div style={{ padding: '1rem', textAlign: 'center' }}>
          <button type="submit" style={{ padding: '1rem 2rem', fontSize: '1.2rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
            Submit All Forms
          </button>
        </div>
      )}
    </div>
    </form>
  );
};

export default InitialAssessmentPartA;
