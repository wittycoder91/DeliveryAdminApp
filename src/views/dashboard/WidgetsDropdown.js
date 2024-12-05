import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import { getStyle } from '@coreui/utils'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <CRow className={props.className}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          className="dashboard-widget"
          color="info"
          value={<>6,200</>}
          title="Total Supplier"
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          className="dashboard-widget"
          color="info"
          value={<>1234</>}
          title="Total Amount"
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          className="dashboard-widget"
          color="warning"
          value={<>32</>}
          title="Pending"
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          className="dashboard-widget"
          color="danger"
          value={<>4,014 </>}
          title="Appeared"
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
