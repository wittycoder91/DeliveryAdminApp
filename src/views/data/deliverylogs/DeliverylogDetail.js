import React from 'react'
import { Link } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CButton,
  CRow,
} from '@coreui/react'

const DeliverylogDetail = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <h3 className="px-3 pt-3 mb-0">Delivery History Detail</h3>
          <CCardBody className="d-flex flex-column gap-2">
            <CCol className="d-flex flex-column">
              <CFormLabel>Supplier </CFormLabel>
              <CFormInput placeholder="Supplier" />
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Material</CFormLabel>
                <CFormSelect
                  options={[
                    { label: 'One', value: '1' },
                    { label: 'Two', value: '2' },
                  ]}
                />
              </CCol>
              <CCol>
                <CFormLabel>Amount</CFormLabel>
                <CFormInput placeholder="Amount" />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Color</CFormLabel>
                <CFormInput placeholder="Color" />
              </CCol>
              <CCol>
                <CFormLabel>Quality</CFormLabel>
                <CFormInput type="number" placeholder="Quality" />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Location</CFormLabel>
                <CFormInput placeholder="Location" />
              </CCol>
              <CCol>
                <CFormLabel>Note</CFormLabel>
                <CFormInput placeholder="Note" />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol className="d-flex flex-column">
                <CFormLabel>Description</CFormLabel>
                <CFormTextarea className="h-100"></CFormTextarea>
              </CCol>
              <CCol className="d-flex flex-column">
                <CFormLabel>Image</CFormLabel>
                <img
                  src="./images/login_back.png"
                  alt="Logo Preview"
                  style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '5px' }}
                />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Date</CFormLabel>
                <CFormInput placeholder="Date" />
              </CCol>
              <CCol className="d-flex flex-column">
                <CFormLabel>Status</CFormLabel>
                <CFormLabel className="delivery-accept w-max">Accepted</CFormLabel>
              </CCol>
            </CCol>
            <CCol className="d-flex flex-column">
              <CFormLabel>Feedback</CFormLabel>
              <CFormTextarea rows={3}></CFormTextarea>
            </CCol>
            <CCol className="d-flex justify-content-end me-4">
              <Link to="/data/deliverylogs" className="text-decoration-none">
                <CButton color="primary" className="dark-blue">
                  Go to Delivery History
                </CButton>
              </Link>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DeliverylogDetail
