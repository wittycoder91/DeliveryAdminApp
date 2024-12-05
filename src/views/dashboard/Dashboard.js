import React from 'react'

import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { CChartBar, CChartDoughnut, CChartLine, CChartPie } from '@coreui/react-chartjs'
import WidgetsDropdown from './WidgetsDropdown'

const Dashboard = () => {
  const random = () => Math.round(Math.random() * 100)

  return (
    <CCol className="d-flex flex-column gap-3">
      <CCard className="p-4 gap-2">
        <h3>Total Information</h3>
        <WidgetsDropdown />
      </CCard>
      <CRow>
        {/* Supplier Chart */}
        <CCol xs={6}>
          <CCard className="mb-4">
            <h3 className="px-4 pt-3">Supplier Chart</h3>
            <CCardBody>
              <CChartBar
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'Supplier History',
                      backgroundColor: '#f87979',
                      data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                    },
                  ],
                }}
                labels="months"
              />
            </CCardBody>
          </CCard>
        </CCol>
        {/* Amount Chart */}
        <CCol xs={6}>
          <CCard className="mb-4">
            <h3 className="px-4 pt-3">Amount Chart</h3>
            <CCardBody>
              <CChartLine
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'Amount History',
                      backgroundColor: 'rgba(151, 187, 205, 0.2)',
                      borderColor: 'rgba(151, 187, 205, 1)',
                      pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                      pointBorderColor: '#fff',
                      data: [random(), random(), random(), random(), random(), random(), random()],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        {/* Delivery Chart */}
        <CCol xs={6}>
          <CCard className="mb-4">
            <h3 className="px-4 pt-3">Delivery Chart</h3>
            <CCardBody>
              <CChartDoughnut
                data={{
                  labels: ['Total Delivery', 'Approved', 'Rejected', 'Pending'],
                  datasets: [
                    {
                      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                      data: [40, 20, 80, 10],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        {/* Loyalty Chart */}
        <CCol xs={6}>
          <CCard className="mb-4">
            <h3 className="px-4 pt-3">Loyalty Chart</h3>
            <CCardBody>
              <CChartPie
                data={{
                  labels: ['Golden', 'Silver', 'Bronze'],
                  datasets: [
                    {
                      data: [300, 50, 100],
                      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CCol>
  )
}

export default Dashboard
