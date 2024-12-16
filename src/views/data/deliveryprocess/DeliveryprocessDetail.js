import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormTextarea,
} from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import FormWizard from 'react-form-wizard-component'
import 'react-form-wizard-component/dist/style.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import api from 'src/services'
import { API_URLS } from 'src/config/Constants'
import { showWarningMsg, showErrorMsg } from 'src/config/common'

const DeliveryprocessDetail = () => {
  const { id: selId } = useParams()
  const navigate = useNavigate()

  // Delivery States
  const [curDeliveryIndex, setCurDeliveryIndex] = useState(0)
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
  // Delivery States
  const [visible, setVisible] = useState(false)
  const [curDeliveryAmount, setDeliveryAmount] = useState(0)
  const [curDeliveryFeedback, setDeliveryFeedback] = useState('')

  useEffect(() => {
    getSelDelivery()
    // document.querySelector('.react-form-wizard-component')?.setActiveIndex?.(curDeliveryIndex)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getSelDelivery = async () => {
    getInitialValue()

    try {
      const response = await api.get(API_URLS.GETSELDELIVERY, {
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
        setCurDeliveryIndex(response.data.data?.status)
        setCurPO(response.data.data?.po)
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
  }

  const handleReject = async () => {
    try {
      const response = await api.post(API_URLS.UPDATESELDELIVERY, {
        selDeliveryId: selId,
        status: -1,
      })

      if (response.data.success) {
        navigate('/data/deliverylogs')
      } else {
        showWarningMsg(response.data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleConfirm = async () => {
    // generateBillOfLadingPDF()

    if (curDeliveryIndex === 2) {
      setVisible(!visible)

      setDeliveryAmount(0)
      setDeliveryFeedback('')
    } else {
      try {
        const response = await api.post(API_URLS.UPDATESELDELIVERY, {
          selDeliveryId: selId,
          status: curDeliveryIndex,
        })

        if (response.data.success) {
          navigate('/data/deliveryprocess')
        } else {
          showWarningMsg(response.data.message)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
  const handleSave = async () => {
    if (
      curDeliveryAmount < 0 ||
      isNaN(parseFloat(curDeliveryAmount)) ||
      curDeliveryFeedback.length === 0
    ) {
      showErrorMsg('Please enter the Delivery amount or feedback')
    } else {
      try {
        const response = await api.post(API_URLS.ADDFEEDBACKDELIVERY, {
          selID: selId,
          curStatus: parseInt(curDeliveryIndex),
          curDeliveryAmount: parseFloat(curDeliveryAmount),
          curDeliveryFeedback: curDeliveryFeedback,
        })

        if (response.data.success) {
          setVisible(false)

          navigate('/data/deliverylogs')
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
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <h3 className="px-3 pt-3 mb-0">Delivery Process Information</h3>
          <FormWizard key={curDeliveryIndex} startIndex={curDeliveryIndex} color="#094899">
            <FormWizard.TabContent title="Waiting" icon="fa-solid fa-hourglass-half">
              <h3>Waiting</h3>
              <p>Your delivery status is Waiting.</p>
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Pending" icon="fa-solid fa-check">
              <h3>Pending</h3>
              <p>Your delivery status is Pending.</p>
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Received" icon="fa fa-city">
              <h3>Received</h3>
              <p>Your delivery status is Received</p>
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Accepted" icon="fa-solid fa-caravan">
              <h3>Accepted</h3>
              <p>Your delivery status is Accepted</p>
            </FormWizard.TabContent>
          </FormWizard>
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
            <CCol>
              <CFormLabel>PO</CFormLabel>
              <CFormInput value={curPO > 0 ? curPO : ''} readOnly />
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
            <CCol className="d-flex justify-content-end gap-3 me-4">
              {(curDeliveryIndex === 0 || curDeliveryIndex === 2) && (
                <CButton color="warning" className="wid-100" onClick={handleReject}>
                  Reject
                </CButton>
              )}
              <CButton color="primary" className="wid-100 dark-blue" onClick={handleConfirm}>
                Confirm
              </CButton>
            </CCol>
          </CCardBody>
        </CCard>
        {/* Delivery Modal */}
        <CModal
          alignment="center"
          scrollable
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="VerticallyCenteredScrollableExample2"
        >
          <CModalHeader>
            <CModalTitle id="VerticallyCenteredScrollableExample2">Delivery</CModalTitle>
          </CModalHeader>
          <CModalBody className="d-flex flex-column gap-2">
            <CCol>
              <CFormLabel>Delivery Amount (lbs)</CFormLabel>
              <CFormInput
                placeholder="Delivery Amount"
                value={curDeliveryAmount}
                onChange={(e) => setDeliveryAmount(e.target.value)}
              />
            </CCol>
            <CCol>
              <CFormLabel>Delivery Feedback</CFormLabel>
              <CFormTextarea
                rows={3}
                value={curDeliveryFeedback}
                onChange={(e) => setDeliveryFeedback(e.target.value)}
              ></CFormTextarea>
            </CCol>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={handleSave}>
              Save changes
            </CButton>
          </CModalFooter>
        </CModal>
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

export default DeliveryprocessDetail
