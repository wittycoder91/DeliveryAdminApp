import React, { useState, useEffect } from 'react'
import TimePicker from 'react-bootstrap-time-picker'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
} from '@coreui/react'

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
  const [curGoldenBenefit, setCurGoldenBenefit] = useState('')
  const [curSilver, setCurSilver] = useState(0)
  const [curSilverBenefit, setCurSilverBenefit] = useState('')
  const [curBronze, setCurBronze] = useState(0)
  const [curBronzeBenefit, setCurBronzeBenefit] = useState('')
  // Company Information states
  const [curAddress, setCurAddress] = useState('')
  const [curCity, setCurCity] = useState('')
  const [curState, setCurState] = useState('')
  const [curZipcode, setCurZipcode] = useState('')
  const [curTel, setCurTel] = useState('')
  // Privacy Satement
  const [curPrivacy, setCurPrivacy] = useState('')
  // Report
  const [curReport, setCurReport] = useState('')

  useEffect(() => {
    getInitSetting()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getInitSetting = async () => {
    try {
      const response = await api.get(API_URLS.GETSETTING)

      if (response.data.success && response.data.data) {
        setCurFirstTime(response.data.data?.firsttime)
        setCurSecondTime(response.data.data?.secondtime)
        setCurThirdTime(response.data.data?.thirdtime)
        setCurFourthTime(response.data.data?.fourthtime)
        setCurGolden(response.data.data?.loyalty_golden)
        setCurGoldenBenefit(response.data.data?.loyalty_golden_benefit)
        setCurSilver(response.data.data?.loyalty_silver)
        setCurSilverBenefit(response.data.data?.loyalty_silver_benefit)
        setCurBronze(response.data.data?.loyalty_bronze)
        setCurBronzeBenefit(response.data.data?.loyalty_bronze_benefit)
        setCurAddress(response.data.data?.address)
        setCurCity(response.data.data?.city)
        setCurState(response.data.data?.state)
        setCurZipcode(response.data.data?.zipcode)
        setCurTel(response.data.data?.telephone)
        setCurPrivacy(response.data.data?.terms)
        setCurReport(response.data.data?.report)
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
      curTel.length === 0 ||
      curPrivacy.length === 0 ||
      curReport.length === 0 ||
      curGoldenBenefit.length === 0 ||
      curSilverBenefit.length === 0 ||
      curBronzeBenefit.length === 0
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
          curGoldenBenefit: curGoldenBenefit,
          curSilver: parseInt(curSilver),
          curSilverBenefit: curSilverBenefit,
          curBronze: parseInt(curBronze),
          curBronzeBenefit: curBronzeBenefit,
          curAddress: curAddress,
          curCity: curCity,
          curState: curState,
          curZipcode: curZipcode,
          curTel: curTel,
          curPrivacy: curPrivacy,
          curReport: curReport,
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
              <CFormLabel>Golden Benefit</CFormLabel>
              <CFormTextarea
                value={curGoldenBenefit}
                onChange={(e) => setCurGoldenBenefit(e.target.value)}
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
              <CFormLabel>Silver Benefit</CFormLabel>
              <CFormTextarea
                value={curSilverBenefit}
                onChange={(e) => setCurSilverBenefit(e.target.value)}
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
            <CCol xs={12}>
              <CFormLabel>Bronze Benefit</CFormLabel>
              <CFormTextarea
                value={curBronzeBenefit}
                onChange={(e) => setCurBronzeBenefit(e.target.value)}
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
            <h4 className="px-2 pt-3 mb-0">Terms and Conditions</h4>
            <CCol>
              <CFormTextarea
                placeholder="Terms and Conditions"
                rows={3}
                value={curPrivacy}
                onChange={(e) => setCurPrivacy(e.target.value)}
              />
            </CCol>
            <h4 className="px-2 pt-3 mb-0">Report</h4>
            <CCol>
              <CFormTextarea
                placeholder="Report"
                rows={3}
                value={curReport}
                onChange={(e) => setCurReport(e.target.value)}
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
