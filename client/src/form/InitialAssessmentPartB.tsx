import React, { useState } from "react";

interface InitialAssessmentPartBProps {
  patientData?: any;
  onSubmit?: (data: any) => void;
}

const InitialAssessmentPartB: React.FC<InitialAssessmentPartBProps> = ({ patientData, onSubmit }) => {
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
    <div className="ia-card ia-part-b">
      <div style={{ padding: '1rem', background: '#f0f0f0', marginBottom: '1rem' }}>
        <strong>UHID:</strong> {patientData?.uhid}
      </div>
      <h2 className="ia-form-title">
        DOCTORS INITIAL ASSESSMENT – EMERGENCY (PART B – to be filled by Doctors)
      </h2>

      {/* CHIEF COMPLAINTS */}
      <section className="ia-section">
        <h3 className="ia-section-title">Chief Complaints</h3>
        <textarea rows={3} />
      </section>

      {/* GENERAL EXAMINATION */}
      <section className="ia-section">
        <h3 className="ia-section-title">General Examination</h3>
        <div className="ia-checkbox-grid">
          {["Pallor", "Icterus", "Clubbing", "Cyanosis", "Lymph Adenopathy", "Dehydration"].map(
            (item) => (
              <label key={item}>
                <input type="checkbox" /> {item}
              </label>
            )
          )}
        </div>

        <div className="ia-row">
          <div className="ia-col">
            <label>Edema</label>
            <div className="ia-inline">
              <label>
                <input type="radio" name="edema" /> Yes
              </label>
              <label>
                <input type="radio" name="edema" /> No
              </label>
            </div>
          </div>
          <div className="ia-col-2">
            <label>If Yes, specify details</label>
            <input type="text" />
          </div>
        </div>

        <div className="ia-row">
          <div className="ia-col">
            <label>Pregnancy</label>
            <div className="ia-inline">
              <label>
                <input type="radio" name="pregnancy" /> Yes
              </label>
              <label>
                <input type="radio" name="pregnancy" /> No
              </label>
            </div>
          </div>
          <div className="ia-col">
            <label>LMP</label>
            <input type="date" />
          </div>
          <div className="ia-col">
            <label>Breast Feeding</label>
            <div className="ia-inline">
              <label>
                <input type="radio" name="bf" /> Yes
              </label>
              <label>
                <input type="radio" name="bf" /> No
              </label>
            </div>
          </div>
        </div>

        <div className="ia-row">
          <div className="ia-col-2">
            <label>Others</label>
            <input type="text" />
          </div>
        </div>
      </section>

      {/* SYSTEMIC EXAMINATION */}
      <section className="ia-section">
        <h3 className="ia-section-title">Systemic Examination</h3>

        <label>Head, Neck &amp; Face</label>
        <textarea rows={2} />

        <label>CVS</label>
        <textarea rows={2} />

        <label>Chest</label>
        <textarea rows={2} />

        <label>CNS</label>
        <div className="ia-row">
          <div className="ia-col">
            <label>Right Pupil – Size / Reaction</label>
            <input type="text" />
          </div>
          <div className="ia-col">
            <label>Left Pupil – Size / Reaction</label>
            <input type="text" />
          </div>
        </div>
        <textarea rows={2} placeholder="Other CNS findings" />

        <label>Abdomen</label>
        <textarea rows={2} />

        <label>Extremities</label>
        <div className="ia-row">
          <div className="ia-col">
            <label>Arms – Left</label>
            <input type="text" />
          </div>
          <div className="ia-col">
            <label>Arms – Right</label>
            <input type="text" />
          </div>
        </div>
        <div className="ia-row">
          <div className="ia-col">
            <label>Leg – Left</label>
            <input type="text" />
          </div>
          <div className="ia-col">
            <label>Leg – Right</label>
            <input type="text" />
          </div>
        </div>

        <label>Local Examination</label>
        <textarea rows={3} />

        <label>Communicable disease(s), if any</label>
        <textarea rows={2} />

        <label>Provisional Diagnosis</label>
        <textarea rows={2} />
      </section>

      {/* ALLERGIES / PAIN SCORE */}
      <section className="ia-section">
        <h3 className="ia-section-title">Allergies &amp; Pain Assessment</h3>

        <label>Allergies</label>
        <textarea rows={2} />

        <label>Pain Score</label>
        <input type="text" />

        <div className="ia-row">
          <div className="ia-col-2">
            <span>Pain scale used:</span>
            <div className="ia-checkbox-grid">
              <label>
                <input type="checkbox" /> PBPS (28 weeks to &lt; 38 weeks)
              </label>
              <label>
                <input type="checkbox" /> CRIES (38 weeks – 2 months)
              </label>
              <label>
                <input type="checkbox" /> FLACC Scale (2 months – 7 years)
              </label>
              <label>
                <input type="checkbox" /> Wong–Baker FACES (7 years – 12 years)
              </label>
              <label>
                <input type="checkbox" /> Numerical Rating Scale (&gt; 12 years)
              </label>
              <label>
                <input type="checkbox" /> CPOT (ventilator / comatose)
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* HISTORY */}
      <section className="ia-section">
        <h3 className="ia-section-title">History</h3>

        <label>Past History</label>
        <textarea rows={2} />

        <label>Personal / Social History</label>
        <textarea rows={2} />

        <label>Treatment History</label>
        <textarea rows={2} />
      </section>

      {/* ABCDE ASSESSMENT */}
      <section className="ia-section">
        <h3 className="ia-section-title">Primary Survey – ABCDE</h3>
        <table className="ia-table ia-abcde-table">
          <thead>
            <tr>
              <th>System</th>
              <th>Assessment</th>
              <th>Management</th>
            </tr>
          </thead>
          <tbody>
            {["Airway", "Breathing", "Circulation", "Disability", "Exposure"].map(
              (label) => (
                <tr key={label}>
                  <td>{label}</td>
                  <td>
                    <textarea rows={2} />
                  </td>
                  <td>
                    <textarea rows={2} />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>

      {/* INVESTIGATIONS LIST */}
      <section className="ia-section">
        <h3 className="ia-section-title">Investigations</h3>

        <div className="ia-investigations-grid">
          {[
            "CBC",
            "ECG",
            "Viral Marker",
            "CT Brain",
            "Blood Grouping & Typing",
            "Renal Profile 2",
            "ABG",
            "Thyroid Profile",
            "Blood Culture",
            "PAN-CT",
            "LFT",
            "Urine Routine",
            "2D ECHO",
            "Urine Culture",
            "Troponin-I",
            "APTT / INR",
            "Serum Electrolytes",
            "Chest X-ray",
            "USG",
          ].map((inv) => (
            <label key={inv}>
              <input type="checkbox" /> {inv}
            </label>
          ))}
        </div>

        <div className="ia-row">
          <div className="ia-col-2">
            <label>Others</label>
            <input type="text" />
          </div>
        </div>

        <label>Abnormality &amp; Findings (Investigations)</label>
        <textarea rows={3} />
      </section>

      {/* TREATMENT PLAN */}
      <section className="ia-section">
        <h3 className="ia-section-title">Treatment Plan</h3>
        <textarea rows={5} />
      </section>

      {/* INITIAL ASSESSMENT SIGN-OFF */}
      <section className="ia-section">
        <h3 className="ia-section-title">Initial Assessment Completed By</h3>
        <div className="ia-row">
          <div className="ia-col">
            <label>Signature</label>
            <input type="text" />
          </div>
          <div className="ia-col">
            <label>Name</label>
            <input type="text" />
          </div>
          <div className="ia-col">
            <label>Reg. No.</label>
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

      {/* REFERRAL / OUTCOME */}
      <section className="ia-section">
        <h3 className="ia-section-title">Referral &amp; Outcome</h3>

        <div className="ia-row">
          <div className="ia-col-2">
            <label>Referral – Referred to Speciality</label>
            <input type="text" />
          </div>
          <div className="ia-col">
            <label>Consultant Name</label>
            <input type="text" />
          </div>
        </div>

        <div className="ia-row">
          <div className="ia-col">
            <label>Informed Time</label>
            <input type="time" />
          </div>
          <div className="ia-col">
            <label>Seen at</label>
            <input type="time" />
          </div>
        </div>

        <div className="ia-row">
          <div className="ia-col-2">
            <label>Outcome</label>
            <div className="ia-checkbox-grid">
              {["Admission", "Discharge", "Transfer", "LAMA", "Others"].map(
                (o) => (
                  <label key={o}>
                    <input type="checkbox" /> {o}
                  </label>
                )
              )}
            </div>
          </div>
        </div>

        <div className="ia-row">
          <div className="ia-col-2">
            <label>Transferred to</label>
            <div className="ia-checkbox-grid">
              <label>
                <input type="checkbox" /> Ward
              </label>
              <label>
                <input type="checkbox" /> ICU
              </label>
              <label>
                <input type="checkbox" /> OT
              </label>
              <label>
                <input type="checkbox" /> OP
              </label>
              <label>
                <input type="checkbox" /> Others
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* ED DOCTORS / RECEIVING DOCTOR */}
      <section className="ia-section">
        <h3 className="ia-section-title">ED Doctors</h3>
        <div className="ia-row">
          <div className="ia-col">
            <label>Signature</label>
            <input type="text" />
          </div>
          <div className="ia-col">
            <label>Name</label>
            <input type="text" />
          </div>
          <div className="ia-col">
            <label>Reg. No.</label>
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

        <h3 className="ia-section-title">Receiving Doctor</h3>
        <div className="ia-row">
          <div className="ia-col">
            <label>Signature</label>
            <input type="text" />
          </div>
          <div className="ia-col">
            <label>Name</label>
            <input type="text" />
          </div>
          <div className="ia-col">
            <label>Reg. No.</label>
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
            Submit Assessment
          </button>
        </div>
      )}
    </div>
    </form>
  );
};

export default InitialAssessmentPartB;
