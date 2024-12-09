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
            <CCol>
              <CFormLabel>Supplier</CFormLabel>
              <CFormInput placeholder="Supplier" />
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Scale Ticket</CFormLabel>
                <CFormInput placeholder="Scale Ticket" />
              </CCol>
              <CCol>
                <CFormLabel>Material</CFormLabel>
                <CFormSelect
                  options={[
                    { label: 'One', value: '1' },
                    { label: 'Two', value: '2' },
                  ]}
                />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Weight(lbs)</CFormLabel>
                <CFormInput placeholder="Weight(lbs)" />
              </CCol>
              <CCol>
                <CFormLabel>Packaging</CFormLabel>
                <CFormSelect
                  options={[
                    { label: 'Baled', value: 0 },
                    { label: 'Stacked on Skids', value: 1 },
                    { label: 'Loosed in Boxes', value: 2 },
                  ]}
                />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>The Total of packages</CFormLabel>
                <CFormInput placeholder="The Total of packages" />
              </CCol>
              <CCol>
                <CFormLabel>Residue Material</CFormLabel>
                <CFormInput type="number" placeholder="Residue Material" />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Color</CFormLabel>
                <CFormInput placeholder="Color" />
              </CCol>
              <CCol>
                <CFormLabel>Conditions</CFormLabel>
                <CFormInput placeholder="Conditions" />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-column">
              <CFormLabel>Image</CFormLabel>
              <img
                src="./images/login_back.png"
                alt="Logo Preview"
                style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '5px' }}
              />
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Date</CFormLabel>
                <CFormInput placeholder="Date" />
              </CCol>
              <CCol className="d-flex flex-column">
                <CFormLabel>Status</CFormLabel>
                <CFormLabel className="delivery-accept w-max">Delivered</CFormLabel>
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
