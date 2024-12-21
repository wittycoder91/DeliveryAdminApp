import React, { useEffect, useState } from 'react'

import { CCard, CCardBody, CCol, CRow, CButtonGroup, CFormCheck } from '@coreui/react'
import { CChartBar, CChartLine, CChartPie } from '@coreui/react-chartjs'

import api from 'src/services'
import WidgetsDropdown from './WidgetsDropdown'
import { API_URLS } from 'src/config/Constants'
import { showWarningMsg, showErrorMsg } from 'src/config/common'

const Dashboard = () => {
  const [curDeliveryData, setDeliveryData] = useState({
    labels: [],
    datasets: [{ label: 'Delivery History', backgroundColor: '#f87979', data: [] }],
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
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('year')
  const [selectedWeightOption, setSelectedWeightOption] = useState('year')

  useEffect(() => {
    getDeliveryData('year')
    getWeightData('year')
    getLoyaltyData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDeliveryData = async (view) => {
    try {
      const response = await api.get(`${API_URLS.GETDASHBOARDDELIERY}?view=${view}`)

      if (response.data.success && response.data.data) {
        const chartData = response.data.data

        const updatedData = {
          labels: chartData.map((item) => item.period),
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
      showErrorMsg(error.response?.data?.msg || error.message)
    }
  }
  const getWeightData = async (view) => {
    try {
      const response = await api.get(`${API_URLS.GETDASHBOARDWEIGHT}?view=${view}`)

      if (response.data.success && response.data.data) {
        const chartData = response.data.data

        // Process the data to populate the chart
        const updatedData = {
          labels: chartData.map((item) => item.period),
          datasets: [
            {
              label: 'Weight History',
              backgroundColor: '#79f879',
              data: chartData.map((item) => item.count),
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

  const handleDeliveryOptions = (event) => {
    const selectedValue = event.target.value
    setSelectedDeliveryOption(selectedValue)
    getDeliveryData(selectedValue)
  }
  const handleWeightOptions = (event) => {
    const selectedValue = event.target.value
    setSelectedWeightOption(selectedValue)
    getWeightData(selectedValue)
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
            <CCol className="d-flex justify-content-center align-items-center mt-3">
              <CButtonGroup role="group" aria-label="Delivery range group" className="w-max">
                <CFormCheck
                  type="radio"
                  button={{ color: 'primary', variant: 'outline' }}
                  name="delivery-group"
                  id="range1"
                  label="Month"
                  value="month"
                  checked={selectedDeliveryOption === 'month'}
                  onChange={handleDeliveryOptions}
                />
                <CFormCheck
                  type="radio"
                  button={{ color: 'primary', variant: 'outline' }}
                  name="delivery-group"
                  id="range2"
                  label="Quarter"
                  value="quarter"
                  checked={selectedDeliveryOption === 'quarter'}
                  onChange={handleDeliveryOptions}
                />
                <CFormCheck
                  type="radio"
                  button={{ color: 'primary', variant: 'outline' }}
                  name="delivery-group"
                  id="range3"
                  label="Year"
                  value="year"
                  checked={selectedDeliveryOption === 'year'}
                  onChange={handleDeliveryOptions}
                />
              </CButtonGroup>
            </CCol>
            <h3 className="px-4 pt-3">Delivery Chart</h3>
            <CCardBody>
              <CChartBar data={curDeliveryData} labels="periods" />
            </CCardBody>
          </CCard>
        </CCol>
        {/* Weight Chart */}
        <CCol md={6}>
          <CCard className="mb-4">
            <CCol className="d-flex justify-content-center align-items-center mt-3">
              <CButtonGroup role="group" aria-label="Delivery range group" className="w-max">
                <CFormCheck
                  type="radio"
                  button={{ color: 'primary', variant: 'outline' }}
                  name="weight-group"
                  id="weight1"
                  label="Month"
                  value="month"
                  checked={selectedWeightOption === 'month'}
                  onChange={handleWeightOptions}
                />
                <CFormCheck
                  type="radio"
                  button={{ color: 'primary', variant: 'outline' }}
                  name="weight-group"
                  id="weight2"
                  label="Quarter"
                  value="quarter"
                  checked={selectedWeightOption === 'quarter'}
                  onChange={handleWeightOptions}
                />
                <CFormCheck
                  type="radio"
                  button={{ color: 'primary', variant: 'outline' }}
                  name="weight-group"
                  id="weight3"
                  label="Year"
                  value="year"
                  checked={selectedWeightOption === 'year'}
                  onChange={handleWeightOptions}
                />
              </CButtonGroup>
            </CCol>
            <h3 className="px-4 pt-3">Estimated Weight Chart</h3>
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
                      backgroundColor: ['#E46651', '#FFCE56', '#36A2EB', '#5856d6'],
                      hoverBackgroundColor: ['#E46651', '#FFCE56', '#36A2EB', '#5856d6'],
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
