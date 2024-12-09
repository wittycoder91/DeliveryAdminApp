import React, { useEffect, useState, useRef } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CButton,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import FormWizard from 'react-form-wizard-component'
import 'react-form-wizard-component/dist/style.css'

const DeliveryprocessDetail = () => {
  const formWizardRef = useRef()
  const formWizardRejectRef = useRef()

  // Delivery States
  const [curDeliveryType, setCurDeliveryType] = useState(0)
  const [curDeliveryIndex, setCurDeliveryIndex] = useState(0)
  const [curDeliveryRejectIndex, setCurDeliveryRejectIndex] = useState(0)
  const [curSupplierStatus, setCurSupplierStatus] = useState(0)
  const [curSupplier, setCurSupplier] = useState('')
  const [curMaterial, setCurMaterial] = useState(0)
  const [curWeight, setCurWeight] = useState(0)
  const [curPackaging, setCurPackaging] = useState(0)
  const [curCountPackage, setCurCountPackage] = useState(0)
  const [curResidue, setCurResidue] = useState('')
  const [curColor, setCurColor] = useState('')
  const [curCondition, setCurCondition] = useState('')
  const [curLogoPreview, setCurLogoPreview] = useState(null)
  const [curDate, setCurDate] = useState('')
  const [curTime, setCurTime] = useState('')

  useEffect(() => {
    getInitialValue()
  }, [])

  const getInitialValue = () => {
    setCurDeliveryType(0)
    setCurDeliveryIndex(0)
    setCurDeliveryRejectIndex(0)
    setCurSupplierStatus(0)
    setCurSupplier('')
    setCurMaterial(0)
    setCurWeight(0)
    setCurPackaging(0)
    setCurCountPackage(0)
    setCurColor('')
    setCurResidue('')
    setCurCondition('')
    setCurLogoPreview('./images/login_back.png')
    setCurTime('10:00 AM')
    setCurDate('')
  }

  const handleSupplierStatus = (e) => {
    const value = parseInt(e.target.value)
    setCurSupplierStatus(value)

    setTimeout(() => {
      if (value === 3) {
        setCurDeliveryType(1)
        setCurDeliveryRejectIndex(1)
        formWizardRejectRef.current?.goToTab(1)
      } else {
        setCurDeliveryType(0)
        setCurDeliveryIndex(value)
        formWizardRef.current?.goToTab(value)
      }
    }, 100) // Add a short delay
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <h3 className="px-3 pt-3 mb-0">Delivery Process Information</h3>
          {curDeliveryType === 0 ? (
            <FormWizard
              key={`formWizard-${curDeliveryType}`} // Unique key for re-mounting
              ref={formWizardRef}
              startIndex={curDeliveryIndex}
              color="#094899"
            >
              <FormWizard.TabContent title="Pending" icon="fa-solid fa-hourglass-half">
                <h3>Pending</h3>
                <p>Your delivery status is pending.</p>
              </FormWizard.TabContent>
              <FormWizard.TabContent title="Accepted" icon="fa-solid fa-check">
                <h3>Accepted</h3>
                <p>Your delivery status is accepted.</p>
              </FormWizard.TabContent>
              <FormWizard.TabContent title="Delivered" icon="fa fa-city">
                <h3>Delivered</h3>
                <p>Your delivery status is delivered</p>
              </FormWizard.TabContent>
            </FormWizard>
          ) : (
            <FormWizard
              key={`formWizard-${curDeliveryType}`} // Unique key for re-mounting
              ref={formWizardRejectRef}
              startIndex={curDeliveryRejectIndex}
              color="#094899"
            >
              <FormWizard.TabContent title="Pending" icon="fa-solid fa-hourglass-half">
                <h3>Pending</h3>
                <p>Your delivery status is pending.</p>
              </FormWizard.TabContent>
              <FormWizard.TabContent title="Rejected" icon="fa-solid fa-eject">
                <h3>Rejected</h3>
                <p>Your delivery status is rejected</p>
              </FormWizard.TabContent>
            </FormWizard>
          )}
          <CCardBody className="d-flex flex-column gap-2">
            <CCol className="d-flex align-items-center gap-3">
              <CFormLabel className="w-max">Delivery Status</CFormLabel>
              <CFormSelect
                options={[
                  { label: 'Pending', value: 0 },
                  { label: 'Accepted', value: 1 },
                  { label: 'Delivered', value: 2 },
                  { label: 'Rejected', value: 3 },
                ]}
                value={curSupplierStatus}
                onChange={handleSupplierStatus}
              />
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Supplier</CFormLabel>
                <CFormInput
                  placeholder="Supplier"
                  value={curSupplier}
                  onChange={(e) => setCurSupplier(e.target.value)}
                />
              </CCol>
              <CCol>
                <CFormLabel>Material</CFormLabel>
                <CFormSelect
                  options={[
                    { label: 'One', value: 0 },
                    { label: 'Two', value: 1 },
                  ]}
                  value={curMaterial}
                  onChange={(e) => setCurMaterial(e.target.value)}
                />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Weight(lbs)</CFormLabel>
                <CFormInput
                  placeholder="Weight(lbs)"
                  value={curWeight}
                  type="number"
                  onChange={(e) => setCurWeight(e.target.value)}
                />
              </CCol>
              <CCol>
                <CFormLabel>Packaging</CFormLabel>
                <CFormSelect
                  options={[
                    { label: 'Baled', value: 0 },
                    { label: 'Stacked on Skids', value: 1 },
                    { label: 'Loosed in Boxes', value: 2 },
                  ]}
                  value={curPackaging}
                  onChange={(e) => setCurPackaging(e.target.value)}
                />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>The Total of packages</CFormLabel>
                <CFormInput
                  placeholder="The Total of packages"
                  value={curCountPackage}
                  type="number"
                  onChange={(e) => setCurCountPackage(e.target.value)}
                />
              </CCol>
              <CCol>
                <CFormLabel>Color</CFormLabel>
                <CFormInput
                  placeholder="Color"
                  value={curColor}
                  onChange={(e) => setCurColor(e.target.value)}
                />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Residue Material</CFormLabel>
                <CFormInput
                  placeholder="Residue"
                  value={curResidue}
                  onChange={(e) => setCurResidue(e.target.value)}
                />
              </CCol>
              <CCol>
                <CFormLabel>Conditions</CFormLabel>
                <CFormInput
                  placeholder="Conditions"
                  value={curCondition}
                  onChange={(e) => setCurCondition(e.target.value)}
                />
              </CCol>
            </CCol>
            {curLogoPreview && (
              <div className="mb-4 text-center">
                <p className="text-body-secondary">Material Uploaded Image:</p>
                <img
                  src={curLogoPreview}
                  alt="Logo Preview"
                  style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '5px' }}
                />
              </div>
            )}
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Date</CFormLabel>
                <CFormInput
                  placeholder="Date"
                  value={curDate}
                  onChange={(e) => setCurDate(e.target.value)}
                />
              </CCol>
              <CCol>
                <CFormLabel>Time</CFormLabel>
                <CFormInput
                  placeholder="Time"
                  value={curTime}
                  onChange={(e) => setCurTime(e.target.value)}
                />
              </CCol>
            </CCol>
            <CCol className="d-flex justify-content-end me-4">
              <Link to="/data/delivery" className="text-decoration-none">
                <CButton color="primary" className="wid-100 dark-blue">
                  Confirm
                </CButton>
              </Link>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DeliveryprocessDetail
