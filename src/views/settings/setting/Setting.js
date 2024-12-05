import React, { useState } from 'react'
import TimePicker from 'react-bootstrap-time-picker'
import { CButton, CCard, CCardBody, CCol, CForm, CFormLabel, CFormInput } from '@coreui/react'

const Profile = () => {
  const [curFirstTime, setCurFirstTime] = useState('8:30')
  const [curSecondTime, setCurSecondTime] = useState('10:00')
  const [curThirdTime, setCurThirdTime] = useState('15:00')
  const [curFourthTime, setCurFourthTime] = useState('17:30')

  const handleFirstTimeChange = (e) => {
    setCurFirstTime(e)
  }
  const handleSecondTimeChange = (e) => {
    setCurSecondTime(e)
  }
  const handleThirdTimeChange = (e) => {
    setCurThirdTime(e)
  }
  const handleFourthTimeChange = (e) => {
    setCurFourthTime(e)
  }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <h3 className="px-3 pt-3 mb-0">Setting</h3>
        <CCardBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormLabel>First Time</CFormLabel>
              <TimePicker
                start="08:00"
                end="21:00"
                step={30}
                onChange={handleFirstTimeChange}
                value={curFirstTime}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Second Time</CFormLabel>
              <TimePicker
                start="08:00"
                end="21:00"
                step={30}
                onChange={handleSecondTimeChange}
                value={curSecondTime}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Third Time</CFormLabel>
              <TimePicker
                start="08:00"
                end="21:00"
                step={30}
                onChange={handleThirdTimeChange}
                value={curThirdTime}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Fourth Time</CFormLabel>
              <TimePicker
                start="08:00"
                end="21:00"
                step={30}
                onChange={handleFourthTimeChange}
                value={curFourthTime}
              />
            </CCol>
            <h4 className="px-2 pt-3 mb-0">Loyalty</h4>
            <CCol xs={12}>
              <CFormLabel>Golden</CFormLabel>
              <CFormInput placeholder="Golden" type="number" />
            </CCol>
            <CCol xs={12}>
              <CFormLabel>Silver</CFormLabel>
              <CFormInput placeholder="Silver" type="number" />
            </CCol>
            <CCol xs={12}>
              <CFormLabel>Bronze</CFormLabel>
              <CFormInput placeholder="Bronze" type="number" />
            </CCol>
            <CCol xs={12} className="d-flex justify-content-end pe-4">
              <CButton color="primary">Update</CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default Profile
