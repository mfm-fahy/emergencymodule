import React, { useState } from "react";

interface OutPatientCardProps {
  patientData?: any;
  onSubmit?: (data: any) => void;
}

const OutPatientCard: React.FC<OutPatientCardProps> = ({ patientData, onSubmit }) => {
  const [formData, setFormData] = useState<any>({ uhid: patientData?.uhid || '' });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const newData = {
      ...formData,
      [name]: type === 'checkbox' || type === 'radio' ? checked : value
    };
    console.log('Form data updated:', newData);
    setFormData(newData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting OutPatient form data:', formData);
    if (onSubmit) onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
    <div className="opd-card">
      {/* HEADER */}
      <div className="opd-header">
        <div className="opd-hospital-logo" />
        <div className="opd-hospital-details">
          <div className="opd-hospital-name">
            TRICHY SRM MEDICAL COLLEGE HOSPITAL AND RESEARCH CENTRE
          </div>
          <div className="opd-hospital-address">
            SRM Nagar, Trichy – Chennai Highways, Irungalur, Trichy – 621 105.
            <br />
            Contact: 0431 – 2455555
          </div>
          <div className="opd-hospital-accreditation">
            (Accredited with NAAC A+ Grade)
          </div>
        </div>
        <div className="opd-hospital-logo-right" />
      </div>

      <h2 className="opd-title">OUT PATIENT CARD</h2>

      {/* PATIENT DETAILS */}
      <section className="opd-section">
        <div className="opd-row">
          <div className="opd-col">
            <label>Barcode Sticker</label>
            <div className="opd-barcode-box" />
          </div>
          <div className="opd-col">
            <label>ABHA ID</label>
            <input type="text" name="abhaId" value={formData.abhaId || ''} onChange={handleChange} />
          </div>
          <div className="opd-col">
            <label>Department</label>
            <input type="text" name="department" value={formData.department || ''} onChange={handleChange} />
          </div>
        </div>

        <div className="opd-row">
          <div className="opd-col-2">
            <label>Patient Name</label>
            <input type="text" name="name" value={formData.name || ''} onChange={handleChange} />
          </div>
          <div className="opd-col">
            <label>Mobile</label>
            <input type="tel" name="mobile" value={formData.mobile || ''} onChange={handleChange} />
          </div>
          <div className="opd-col">
            <label>Units</label>
            <input type="text" name="units" value={formData.units || ''} onChange={handleChange} />
          </div>
        </div>

        <div className="opd-row">
          <div className="opd-col">
            <label>Age</label>
            <input type="text" name="age" value={formData.age || ''} onChange={handleChange} />
          </div>
          <div className="opd-col">
            <label>Gender</label>
            <input type="text" name="gender" value={formData.gender || ''} onChange={handleChange} />
          </div>
          <div className="opd-col">
            <label>Dept / Unit</label>
            <input type="text" name="deptUnit" value={formData.deptUnit || ''} onChange={handleChange} />
          </div>
          <div className="opd-col">
            <label>UHID No.</label>
            <input type="text" name="uhid" value={formData.uhid || ''} readOnly style={{ background: '#f0f0f0' }} />
          </div>
        </div>

        <div className="opd-row">
          <div className="opd-col">
            <label>Date &amp; Time</label>
            <input type="datetime-local" />
          </div>
          <div className="opd-col">
            <label>Consultant: Dr.</label>
            <input type="text" />
          </div>
          <div className="opd-col">
            <label>MLC</label>
            <div className="opd-inline">
              <label>
                <input type="checkbox" /> Non MLC
              </label>
              <label>
                <input type="checkbox" /> MLC
              </label>
            </div>
          </div>
        </div>

        <div className="opd-row">
          <div className="opd-col-2">
            <label>Address</label>
            <input type="text" name="address" value={formData.address || ''} onChange={handleChange} />
          </div>
          <div className="opd-col">
            <label>Pincode</label>
            <input type="text" name="pincode" value={formData.pincode || ''} onChange={handleChange} />
          </div>
        </div>
      </section>

      {/* VITAL SIGNS */}
      <section className="opd-section">
        <h3 className="opd-section-title">VITAL SIGNS</h3>
        <div className="opd-row">
          <div className="opd-col">
            <label>Height (cms)</label>
            <input type="text" name="height" value={formData.height || ''} onChange={handleChange} />
          </div>
          <div className="opd-col">
            <label>Weight (kg)</label>
            <input type="text" name="weight" value={formData.weight || ''} onChange={handleChange} />
          </div>
          <div className="opd-col">
            <label>BMI (kg/m²)</label>
            <input type="text" name="bmi" value={formData.bmi || ''} onChange={handleChange} />
          </div>
          <div className="opd-col">
            <label>SpO₂ (%)</label>
            <input type="text" name="spo2" value={formData.spo2 || ''} onChange={handleChange} />
          </div>
        </div>

        <div className="opd-row">
          <div className="opd-col">
            <label>Pulse (bpm)</label>
            <input type="text" name="pulse" value={formData.pulse || ''} onChange={handleChange} />
          </div>
          <div className="opd-col">
            <label>Temp</label>
            <input type="text" name="temp" value={formData.temp || ''} onChange={handleChange} />
          </div>
          <div className="opd-col">
            <label>Resp Rate (mins)</label>
            <input type="text" name="respRate" value={formData.respRate || ''} onChange={handleChange} />
          </div>
          <div className="opd-col">
            <label>BP (mm of Hg)</label>
            <div className="opd-inline">
              <input type="text" name="bpSystolic" value={formData.bpSystolic || ''} onChange={handleChange} className="opd-input-small" /> /
              <input type="text" name="bpDiastolic" value={formData.bpDiastolic || ''} onChange={handleChange} className="opd-input-small" />
            </div>
          </div>
        </div>

        {/* Pain rating scale (simplified as radio buttons) */}
        <div className="opd-pain-scale">
          <span>Wong-Baker FACES™ Pain Rating Scale:</span>
          <div className="opd-pain-options">
            {[0, 2, 4, 6, 8, 10].map((value) => (
              <label key={value}>
                <input type="radio" name="painScale" value={value} /> {value}
              </label>
            ))}
          </div>
        </div>

        <div className="opd-row">
          <div className="opd-col">
            <label>Date</label>
            <input type="date" />
          </div>
          <div className="opd-col">
            <label>Time</label>
            <input type="time" />
          </div>
          <div className="opd-col">
            <label>S/B Dr.</label>
            <input type="text" />
          </div>
        </div>
      </section>

      {/* ALLERGY / PRESENT COMPLAINTS */}
      <section className="opd-section">
        <div className="opd-row">
          <div className="opd-col-2">
            <label>ALLERGY HISTORY</label>
            <div className="opd-inline">
              <label>
                <input type="radio" name="allergyHistory" /> Yes
              </label>
              <label>
                <input type="radio" name="allergyHistory" /> No
              </label>
              <label>
                <input type="radio" name="allergyHistory" /> Not known
              </label>
            </div>
            <div>
              <span>If Yes, specify:</span>
              <input type="text" />
            </div>
          </div>
        </div>

        <div className="opd-row">
          <div className="opd-col-2">
            <label>PRESENT COMPLAINTS</label>
            <textarea rows={3} name="presentComplaints" value={formData.presentComplaints || ''} onChange={handleChange} />
            <small>
              (If pain is present, please describe location, character, score
              etc.)
            </small>
          </div>
        </div>
      </section>

      {/* PAST HISTORY */}
      <section className="opd-section">
        <h3 className="opd-section-title">PAST HISTORY</h3>
        <div className="opd-checkbox-grid">
          {[
            "HTN",
            "CAD",
            "DM",
            "COPD",
            "APD",
            "Seizure Disorder",
            "CKD",
            "Thyroid Disorder",
          ].map((item) => (
            <label key={item}>
              <input type="checkbox" /> {item}
            </label>
          ))}
        </div>
        <div className="opd-checkbox-grid">
          {[
            "Any Previous Hospitalization",
            "Any Previous Surgery Undergone",
            "Others",
          ].map((item) => (
            <label key={item}>
              <input type="checkbox" /> {item}
            </label>
          ))}
        </div>
      </section>

      {/* MENSTRUAL HISTORY */}
      <section className="opd-section">
        <h3 className="opd-section-title">
          MENSTRUAL HISTORY (ONLY FOR FEMALE)
        </h3>
        <div className="opd-row">
          <div className="opd-col">
            <div className="opd-inline">
              <label>
                <input type="radio" name="menstrualHistory" /> Normal
              </label>
              <label>
                <input type="radio" name="menstrualHistory" /> Abnormal
              </label>
            </div>
            <div>
              <span>Specify (if abnormal):</span>
              <input type="text" />
            </div>
          </div>
          <div className="opd-col">
            <label>LMP</label>
            <input type="date" />
          </div>
        </div>
      </section>

      {/* PERSONAL HISTORY */}
      <section className="opd-section">
        <h3 className="opd-section-title">PERSONAL HISTORY</h3>
        <div className="opd-checkbox-grid">
          {["Smoking", "Tobacco", "Alcohol", "Drug Abuse", "Others"].map(
            (item) => (
              <label key={item}>
                <input type="checkbox" /> {item}
              </label>
            )
          )}
        </div>
      </section>

      {/* NUTRITIONAL SCREENING */}
      <section className="opd-section">
        <h3 className="opd-section-title">NUTRITIONAL SCREENING</h3>
        <div className="opd-inline">
          <label>
            <input type="radio" name="nutrition" /> Adequate
          </label>
          <label>
            <input type="radio" name="nutrition" /> Underweight
          </label>
          <label>
            <input type="radio" name="nutrition" /> Overweight
          </label>
        </div>
      </section>

      {/* BACK SIDE */}

      {/* PHYSICAL EXAMINATION */}
      <section className="opd-section">
        <h3 className="opd-section-title">
          PHYSICAL EXAMINATION (NE – NOT EXAMINED; N – NORMAL; ABN – ABNORMAL)
        </h3>
        <table className="opd-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>NE</th>
              <th>N</th>
              <th>ABN</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {["CNS", "CVS", "RS", "GIT", "UGT", "MS"].map((cat) => (
              <tr key={cat}>
                <td>{cat}</td>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* DIAGNOSIS / INVESTIGATIONS / CARE PLAN */}
      <section className="opd-section">
        <label>PROVISIONAL DIAGNOSIS</label>
        <textarea rows={2} />

        <label>INVESTIGATIONS ADVICE</label>
        <textarea rows={2} />

        <label>PROPOSED CARE PLAN</label>
        <textarea rows={2} />
      </section>

      {/* DIETERY / FALL RISK */}
      <section className="opd-section">
        <h3 className="opd-section-title">DIETERY ADVICE</h3>
        <div className="opd-checkbox-grid">
          {[
            "Normal",
            "Diabetic",
            "Renal",
            "High Protein",
            "Low Fat",
            "Hypertensive",
            "Weight Loss",
            "Others",
          ].map((item) => (
            <label key={item}>
              <input type="checkbox" /> {item}
            </label>
          ))}
        </div>

        <h3 className="opd-section-title">FALL RISK SCREENING</h3>
        <div className="opd-inline">
          <label>
            <input type="radio" name="fallRisk" /> Applicable
          </label>
          <label>
            <input type="radio" name="fallRisk" /> Not Applicable
          </label>
        </div>
        <div className="opd-checkbox-grid">
          {[
            "≥ 65 Years",
            "Walks with Assistance",
            "H/O Fall in 3 Months",
            "Any Neurological Problems",
          ].map((item) => (
            <label key={item}>
              <input type="checkbox" /> {item}
            </label>
          ))}
        </div>
        <small>
          (In case 2 or more criteria are met explain OPD Fall Prevention
          Protocol)
        </small>
      </section>

      {/* MEDICATION ADVICE */}
      <section className="opd-section">
        <h3 className="opd-section-title">MEDICATION ADVICE</h3>
        <table className="opd-table">
          <thead>
            <tr>
              <th>Name of the Drug (IN CAPITALS)</th>
              <th>Dose</th>
              <th>Route</th>
              <th colSpan={4}>Frequency (M / A / E / N)</th>
              <th>Duration (Days)</th>
              <th colSpan={2}>Food Instructions</th>
            </tr>
            <tr>
              <th />
              <th />
              <th />
              <th>M</th>
              <th>A</th>
              <th>E</th>
              <th>N</th>
              <th />
              <th>Before</th>
              <th>After</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, idx) => (
              <tr key={idx}>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* NON MEDICATION ADVICE */}
      <section className="opd-section">
        <h3 className="opd-section-title">NON MEDICATION ADVICE</h3>
        <textarea rows={3} />
      </section>

      {/* EXPECTED OUTCOME / COST / SIGNATURE */}
      <section className="opd-section">
        <div className="opd-row">
          <div className="opd-col-2">
            <div>
              <strong>EXPECTED OUTCOME EXPLAINED?</strong>
              <div className="opd-inline">
                <label>
                  <input type="radio" name="outcomeExplained" /> Yes
                </label>
                <label>
                  <input type="radio" name="outcomeExplained" /> No
                </label>
              </div>
            </div>

            <div className="opd-inline">
              <label>
                <input type="checkbox" /> ADMISSION
              </label>
              <label>
                <input type="checkbox" /> DAY CARE
              </label>
              <label>
                <input type="checkbox" /> LAMA
              </label>
            </div>

            <div>
              <strong>EXPECTED COST EXPLAINED?</strong>
              <div className="opd-inline">
                <label>
                  <input type="radio" name="costExplained" /> Yes
                </label>
                <label>
                  <input type="radio" name="costExplained" /> No
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="opd-row">
          <div className="opd-col-2">
            <label>Doctor Name &amp; Seal</label>
            <input type="text" />
          </div>
        </div>

        <div className="opd-row">
          <div className="opd-col">
            <label>Date</label>
            <input type="date" />
          </div>
          <div className="opd-col">
            <label>Time</label>
            <input type="time" />
          </div>
        </div>

        <div className="opd-row">
          <div className="opd-col-2">
            <label>Signature</label>
            <input type="text" />
          </div>
        </div>

        <div className="opd-footnote">
          * Subject to change in course of disease
        </div>
      </section>
      {onSubmit && (
        <div style={{ padding: '1rem', textAlign: 'center' }}>
          <button type="submit" style={{ padding: '1rem 2rem', fontSize: '1.2rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
            Next: Initial Assessment
          </button>
        </div>
      )}
    </div>
    </form>
  );
};

export default OutPatientCard;
