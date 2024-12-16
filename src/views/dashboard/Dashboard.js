import React, { useEffect, useState } from 'react'

import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { CChartBar, CChartLine, CChartPie } from '@coreui/react-chartjs'

import api from 'src/services'
import WidgetsDropdown from './WidgetsDropdown'
import { API_URLS } from 'src/config/Constants'
import { showWarningMsg, showErrorMsg } from 'src/config/common'

const Dashboard = () => {
  const [curDeliveryData, setDeliveryData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Delivery History',
        backgroundColor: '#f87979',
        data: [],
      },
    ],
  })
  const [weightData, setWeightData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Weight History',
        backgroundColor: '#f87979',
        data: [],
      },
    ],
  })
  const [loyaltyData, setLoyaltyData] = useState([0, 0, 0, 0])

  useEffect(() => {
    getDeliveryData()
    getWeightData()
    getLoyaltyData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDeliveryData = async () => {
    try {
      const response = await api.get(API_URLS.GETDASHBOARDDELIERY)

      if (response.data.success && response.data.data) {
        const chartData = response.data.data

        // Process the data to populate the chart
        const updatedData = {
          labels: chartData.map((item) => item.month),
          datasets: [
            {
              label: 'Delivery History',
              backgroundColor: '#f87979',
              data: chartData.map((item) => item.count),
            },
          ],
        }

        setDeliveryData(updatedData)
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
  const getWeightData = async () => {
    try {
      const response = await api.get(API_URLS.GETDASHBOARDWEIGHT)

      if (response.data.success && response.data.data) {
        const chartData = response.data.data

        // Process the data to populate the chart
        const updatedData = {
          labels: chartData.map((item) => item.month),
          datasets: [
            {
              label: 'Weight History',
              backgroundColor: '#79f879',
              data: chartData.map((item) => item.totalWeight),
            },
          ],
        }

        setWeightData(updatedData)
      } else {
        showWarningMsg(response.data.message)
      }
    } catch (error) {
      if (error.response?.data?.msg) {
        showErrorMsg(error.response.data.msg)
      } else {
        showErrorMsg(error.message)
      }
    }
  }
  const getLoyaltyData = async () => {
    try {
      const response = await api.get(API_URLS.GETDASHBOARDLOYALTY)

      if (response.data.success && response.data.data) {
        if (response.data.success) {
          const data = [
            response.data.data['0'] || 0,
            response.data.data['1'] || 0,
            response.data.data['2'] || 0,
            response.data.data['3'] || 0,
          ]
          setLoyaltyData(data)
        }
      } else {
        showWarningMsg(response.data.message)
      }
    } catch (error) {
      if (error.response?.data?.msg) {
        showErrorMsg(error.response.data.msg)
      } else {
        showErrorMsg(error.message)
      }
    }
  }

  return (
    <CCol className="d-flex flex-column gap-3">
      <CCard className="p-4 gap-2">
        <h3>Total Information</h3>
        <WidgetsDropdown />
      </CCard>
      <CRow>
        {/* Delivery Chart */}
        <CCol md={6}>
          <CCard className="mb-4">
            <h3 className="px-4 pt-3">Delivery Chart</h3>
            <CCardBody>
              <CChartBar data={curDeliveryData} labels="months" />
            </CCardBody>
          </CCard>
        </CCol>
        {/* Weight Chart */}
        <CCol md={6}>
          <CCard className="mb-4">
            <h3 className="px-4 pt-3">Weight Chart</h3>
            <CCardBody>
              <CChartLine data={weightData} labels="months" />
            </CCardBody>
          </CCard>
        </CCol>
        {/* Loyalty Chart */}
        <CCol md={6}>
          <CCard className="mb-4">
            <h3 className="px-4 pt-3">Loyalty Chart</h3>
            <CCardBody>
              <CChartPie
                data={{
                  labels: ['Default', 'Bronze', 'Silver', 'Golden'],
                  datasets: [
                    {
                      data: loyaltyData,
                      backgroundColor: ['#E46651', '#FFCE56', '#36A2EB', '#FF6384'],
                      hoverBackgroundColor: ['#E46651', '#FFCE56', '#36A2EB', '#FF6384'],
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
