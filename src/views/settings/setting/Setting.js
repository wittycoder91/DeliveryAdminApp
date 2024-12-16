import React, { useState, useEffect } from 'react'
import TimePicker from 'react-bootstrap-time-picker'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CButton, CCard, CCardBody, CCol, CForm, CFormLabel, CFormInput } from '@coreui/react'

import api from 'src/services'
import { API_URLS } from 'src/config/Constants'
import { showSuccessMsg, showWarningMsg, showErrorMsg } from 'src/config/common'

const Profile = () => {
  // Sehedule time states
  const [curFirstTime, setCurFirstTime] = useState(0)
  const [curSecondTime, setCurSecondTime] = useState(0)
  const [curThirdTime, setCurThirdTime] = useState(0)
  const [curFourthTime, setCurFourthTime] = useState(0)
  // Loyalty states
  const [curGolden, setCurGolden] = useState(0)
  const [curSilver, setCurSilver] = useState(0)
  const [curBronze, setCurBronze] = useState(0)
  // Company Information states
  const [curAddress, setCurAddress] = useState('')
  const [curCity, setCurCity] = useState('')
  const [curState, setCurState] = useState('')
  const [curZipcode, setCurZipcode] = useState('')
  const [curTel, setCurTel] = useState('')

  useEffect(() => {
    getInitSetting()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getInitSetting = async () => {
    try {
      const response = await api.get(API_URLS.GETSETTING)

      if (response.data.success && response.data.data) {
        setCurFirstTime(response.data.data.firsttime)
        setCurSecondTime(response.data.data.secondtime)
        setCurThirdTime(response.data.data.thirdtime)
        setCurFourthTime(response.data.data.fourthtime)
        setCurGolden(response.data.data.loyalty_golden)
        setCurSilver(response.data.data.loyalty_silver)
        setCurBronze(response.data.data.loyalty_bronze)
        setCurAddress(response.data.data.address)
        setCurCity(response.data.data.city)
        setCurState(response.data.data.state)
        setCurZipcode(response.data.data.zipcode)
        setCurTel(response.data.data.telephone)
      } else {
        showWarningMsg(response.data.message)
      }
    } catch (error) {
      if (error.response.data.msg) {
        showErrorMsg(error.response.data.msg)
      } else {
        showErrorMsg(error.message)
      }
    }
  }

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

  const handleUpdate = async () => {
    if (
      curFirstTime < 0 ||
      curSecondTime < 0 ||
      curThirdTime < 0 ||
      curFourthTime < 0 ||
      curGolden <= 0 ||
      isNaN(parseInt(curGolden)) ||
      curSilver <= 0 ||
      isNaN(parseInt(curSilver)) ||
      curBronze <= 0 ||
      isNaN(parseInt(curBronze)) ||
      curAddress.length === 0 ||
      curCity.length === 0 ||
      curState.length === 0 ||
      curZipcode.length === 0 ||
      curTel.length === 0
    ) {
      showWarningMsg('It looks like some of the information you entered is incorrect.')
    } else if (
      curFirstTime > curSecondTime ||
      curSecondTime > curThirdTime ||
      curThirdTime > curFourthTime
    ) {
      showWarningMsg('It seems the schedule time you entered is incorrect.')
    } else if (
      parseInt(curSilver) > parseInt(curGolden) ||
      parseInt(curBronze) > parseInt(curSilver)
    ) {
      showWarningMsg('It seems the loyalty value you entered is incorrect.')
    } else {
      try {
        const response = await api.post(API_URLS.UPDATESETTING, {
          curFirstTime: parseInt(curFirstTime),
          curSecondTime: parseInt(curSecondTime),
          curThirdTime: parseInt(curThirdTime),
          curFourthTime: parseInt(curFourthTime),
          curGolden: parseInt(curGolden),
          curSilver: parseInt(curSilver),
          curBronze: parseInt(curBronze),
          curAddress: curAddress,
          curCity: curCity,
          curState: curState,
          curZipcode: curZipcode,
          curTel: curTel,
        })

        if (response.data.success) {
          showSuccessMsg(response.data.message)
        } else {
          showWarningMsg(response.data.message)
        }
      } catch (error) {
        if (error.response.data.msg) {
          showErrorMsg(error.response.data.msg)
        } else {
          showErrorMsg(error.message)
        }
      }
    }
  }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <h3 className="px-3 pt-3 mb-0">Schedule Time</h3>
        <CCardBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormLabel>First Time</CFormLabel>
              <TimePicker
                start="00:00"
                end="24:00"
                step={5}
                onChange={handleFirstTimeChange}
                value={curFirstTime}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Second Time</CFormLabel>
              <TimePicker
                start="00:00"
                end="24:00"
                step={5}
                onChange={handleSecondTimeChange}
                value={curSecondTime}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Third Time</CFormLabel>
              <TimePicker
                start="00:00"
                end="24:00"
                step={5}
                onChange={handleThirdTimeChange}
                value={curThirdTime}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Fourth Time</CFormLabel>
              <TimePicker
                start="00:00"
                end="24:00"
                step={5}
                onChange={handleFourthTimeChange}
                value={curFourthTime}
              />
            </CCol>
            <h4 className="px-2 pt-3 mb-0">Loyalty</h4>
            <CCol xs={12}>
              <CFormLabel>Golden</CFormLabel>
              <CFormInput
                placeholder="Golden"
                type="number"
                value={curGolden}
                onChange={(e) => setCurGolden(e.target.value)}
              />
            </CCol>
            <CCol xs={12}>
              <CFormLabel>Silver</CFormLabel>
              <CFormInput
                placeholder="Silver"
                type="number"
                value={curSilver}
                onChange={(e) => setCurSilver(e.target.value)}
              />
            </CCol>
            <CCol xs={12}>
              <CFormLabel>Bronze</CFormLabel>
              <CFormInput
                placeholder="Bronze"
                type="number"
                value={curBronze}
                onChange={(e) => setCurBronze(e.target.value)}
              />
            </CCol>
            <h4 className="px-2 pt-3 mb-0">Company Information</h4>
            <CCol xs={6}>
              <CFormLabel>Address</CFormLabel>
              <CFormInput
                placeholder="Address"
                value={curAddress}
                onChange={(e) => setCurAddress(e.target.value)}
              />
            </CCol>
            <CCol xs={6}>
              <CFormLabel>City</CFormLabel>
              <CFormInput
                placeholder="City"
                value={curCity}
                onChange={(e) => setCurCity(e.target.value)}
              />
            </CCol>
            <CCol xs={6}>
              <CFormLabel>State</CFormLabel>
              <CFormInput
                placeholder="State"
                value={curState}
                onChange={(e) => setCurState(e.target.value)}
              />
            </CCol>
            <CCol xs={6}>
              <CFormLabel>Zip code</CFormLabel>
              <CFormInput
                placeholder="Tel"
                value={curZipcode}
                onChange={(e) => setCurZipcode(e.target.value)}
              />
            </CCol>
            <CCol xs={6}>
              <CFormLabel>Tel</CFormLabel>
              <CFormInput
                placeholder="Tel"
                value={curTel}
                onChange={(e) => setCurTel(e.target.value)}
              />
            </CCol>
            <CCol xs={12} className="d-flex justify-content-end pe-4">
              <CButton color="primary" onClick={handleUpdate}>
                Update
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </CCol>
  )
}

export default Profile
