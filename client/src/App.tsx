import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login'
import NurseWorkflow from './components/NurseWorkflow'
import DoctorWorkflow from './components/DoctorWorkflow'
import PatientDetails from './components/PatientDetails'
import OutPatientCard from './form/OutPatientCard'
import InitialAssessmentPartA from './form/InitialAssessmentPartA'
import InitialAssessmentPartB from './form/InitialAssessmentPartB'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    const name = localStorage.getItem('name')
    if (token && role && name) {
      setIsLoggedIn(true)
      setUserRole(role)
      setUserName(name)
    }
  }, [])

  const handleLogin = (role: string, name: string) => {
    setIsLoggedIn(true)
    setUserRole(role)
    setUserName(name)
  }

  const handleLogout = () => {
    localStorage.clear()
    setIsLoggedIn(false)
    setUserRole('')
    setUserName('')
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  if (userRole === 'nurse') {
    return (
      <div>
        <nav style={{ padding: '1rem', background: '#f0f0f0', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div><h3>Nurse Dashboard</h3></div>
          <div>
            <span style={{ marginRight: '1rem' }}>{userName} ({userRole})</span>
            <button onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>Logout</button>
          </div>
        </nav>
        <NurseWorkflow />
      </div>
    );
  }

  if (userRole === 'doctor') {
    return (
      <div>
        <nav style={{ padding: '1rem', background: '#f0f0f0', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div><h3>Doctor Dashboard</h3></div>
          <div>
            <span style={{ marginRight: '1rem' }}>{userName} ({userRole})</span>
            <button onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>Logout</button>
          </div>
        </nav>
        <DoctorWorkflow />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', background: '#f0f0f0', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/" style={{ marginRight: '1rem' }}>Patient Details</Link>
          <Link to="/outpatient" style={{ marginRight: '1rem' }}>Out Patient Card</Link>
          {userRole === 'doctor' && <Link to="/assessment-b" style={{ marginRight: '1rem' }}>Initial Assessment Part B</Link>}
        </div>
        <div>
          <span style={{ marginRight: '1rem' }}>{userName} ({userRole})</span>
          <button onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>Logout</button>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<PatientDetails />} />
        <Route path="/outpatient" element={<OutPatientCard />} />
        {userRole === 'doctor' && <Route path="/assessment-b" element={<InitialAssessmentPartB />} />}
      </Routes>
    </BrowserRouter>
  )
}

export default App
