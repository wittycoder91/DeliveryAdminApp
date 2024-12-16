import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCol, CFormInput, CFormLabel, CFormTextarea, CRow } from '@coreui/react'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import api from 'src/services'
import { API_URLS } from 'src/config/Constants'
import { showWarningMsg, showErrorMsg } from 'src/config/common'

const DeliverylogDetail = () => {
  const { id: selId } = useParams()

  // Delivery States
  const [curSupplier, setCurSupplier] = useState('')
  const [curMaterial, setCurMaterial] = useState('')
  const [curWeight, setCurWeight] = useState('')
  const [curPackaging, setCurPackaging] = useState('')
  const [curCountPackage, setCurCountPackage] = useState('')
  const [curResidue, setCurResidue] = useState('')
  const [curColor, setCurColor] = useState('')
  const [curCondition, setCurCondition] = useState('')
  const [curLogoPreview, setCurLogoPreview] = useState('')
  const [curDate, setCurDate] = useState('')
  const [curTime, setCurTime] = useState('')
  const [curPO, setCurPO] = useState('')
  const [curStatus, setCurStatus] = useState(-1)
  const [curFeedback, setCurFeedback] = useState('')

  useEffect(() => {
    getSelDelivery()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getSelDelivery = async () => {
    getInitialValue()

    try {
      const response = await api.get(API_URLS.GETSELDELIVERYLOG, {
        params: {
          selDeliveryId: selId,
        },
      })

      if (response.data.success && response.data.data) {
        setCurSupplier(response.data.data?.username)
        setCurMaterial(response.data.data?.material)
        setCurWeight(response.data.data?.weight)
        setCurPackaging(response.data.data?.packaging)
        setCurCountPackage(response.data.data?.countpackage)
        setCurColor(response.data.data?.color)
        setCurResidue(response.data.data?.residue)
        setCurCondition(response.data.data?.condition)
        setCurLogoPreview(response.data.data?.avatarPath)
        setCurDate(response.data.data?.date)
        setCurTime(new Date(response.data.data?.time * 1000).toISOString().substr(11, 8))
        setCurPO(response.data.data?.po)
        setCurStatus(response.data.data?.status)
        setCurFeedback(response.data.data?.feedback)
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
  const getInitialValue = () => {
    setCurSupplier('')
    setCurMaterial('')
    setCurWeight('')
    setCurPackaging('')
    setCurCountPackage('')
    setCurResidue('')
    setCurColor('')
    setCurCondition('')
    setCurLogoPreview('')
    setCurDate('')
    setCurTime('')
    setCurPO('')
    setCurStatus(-1)
    setCurFeedback('')
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <h3 className="px-3 pt-3 mb-4">Delivery Information</h3>
          <CCardBody className="d-flex flex-column pt-0 gap-2">
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Supplier</CFormLabel>
                <CFormInput value={curSupplier} readOnly />
              </CCol>
              <CCol>
                <CFormLabel>Material</CFormLabel>
                <CFormInput value={curMaterial} readOnly />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Weight(lbs)</CFormLabel>
                <CFormInput value={curWeight} readOnly />
              </CCol>
              <CCol>
                <CFormLabel>Packaging</CFormLabel>
                <CFormInput value={curPackaging} readOnly />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>The Total of packages</CFormLabel>
                <CFormInput placeholder=" Total of packages" value={curCountPackage} readOnly />
              </CCol>
              <CCol>
                <CFormLabel>Color</CFormLabel>
                <CFormInput value={curColor} readOnly />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Residue Material</CFormLabel>
                <CFormInput value={curResidue} readOnly />
              </CCol>
              <CCol>
                <CFormLabel>Conditions</CFormLabel>
                <CFormInput value={curCondition} readOnly />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Date</CFormLabel>
                <CFormInput value={curDate} readOnly />
              </CCol>
              <CCol>
                <CFormLabel>Time</CFormLabel>
                <CFormInput value={curTime} readOnly />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Status</CFormLabel>
                <CFormInput value={curStatus === -1 ? 'Rejected' : 'Accepted'} readOnly />
              </CCol>
              <CCol>
                <CFormLabel>PO</CFormLabel>
                <CFormInput value={curPO > 0 ? curPO : ''} readOnly />
              </CCol>
            </CCol>
            <CCol>
              <CFormLabel>Feedback</CFormLabel>
              <CFormTextarea value={curFeedback} readOnly />
            </CCol>
            {curLogoPreview && (
              <div className="mb-4 text-center">
                <p className="text-body-secondary">Delivery Uploaded Image:</p>
                <img
                  src={`${process.env.REACT_APP_UPLOAD_URL}${curLogoPreview}`}
                  alt="Logo Preview"
                  style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '5px' }}
                />
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
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
    </CRow>
  )
}

export default DeliverylogDetail
