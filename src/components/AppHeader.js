import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CRow,
  CCol,
  CHeaderToggler,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu, cilMoon, cilSun, cilBell, cilBabyCarriage } from '@coreui/icons'

import api from 'src/services'
import { API_URLS } from 'src/config/Constants'
import { AppHeaderDropdown } from './header/index'
import { useNotification } from './header/NotificationProvider'
import { showWarningMsg, showErrorMsg } from 'src/config/common'

const AppHeader = () => {
  const headerRef = useRef()
  const navigate = useNavigate()
  const { newData, setNewData, notificationCount, setNotificationCount } = useNotification()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  const handleGoToDelivery = async () => {
    try {
      const response = await api.post(API_URLS.SETREADDELIVERY, {})

      if (response.data.success) {
        setNotificationCount(0)
        setNewData(0)
        navigate('/data/deliveryprocess')
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

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="ms-auto position-relative">
          {/* <CNavItem>
            <CNavLink
              href="/#/data/deliveryprocess"
              className="position-relative"
              onClick={handleGoToDelivery}
            >
              <CIcon icon={cilBell} size="lg" />
              {notificationCount > 0 && (
                <span className="badge bg-danger rounded-pill position-absolute top-0 end-0">
                  {notificationCount}
                </span>
              )}
            </CNavLink>
          </CNavItem> */}
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              <CIcon icon={cilBell} size="lg" />
              {notificationCount > 0 && (
                <span className="badge bg-danger rounded-pill position-absolute top-0 end-0">
                  {notificationCount}
                </span>
              )}
            </CDropdownToggle>
            {newData?.length > 0 && (
              <CDropdownMenu>
                {newData.slice(0, 4).map((row, index) => (
                  <CDropdownItem
                    key={index}
                    className="d-flex align-items-center"
                    as="button"
                    type="button"
                    onClick={handleGoToDelivery}
                  >
                    <CRow>
                      <CCol className="fw-bold">
                        <CIcon className="me-2" icon={cilBabyCarriage} size="lg" />
                        {row?.userName}
                      </CCol>
                      <CCol className="ms-4">
                        {row?.materialName} &nbsp; {row?.packagingName}
                      </CCol>
                      <CCol className="ms-4 fw-bolder">{row?.weight} lbs</CCol>
                    </CRow>
                  </CDropdownItem>
                ))}
                {newData.length > 4 && (
                  <CDropdownItem
                    className="text-center text-primary"
                    as="button"
                    type="button"
                    onClick={handleGoToDelivery}
                  >
                    See more
                  </CDropdownItem>
                )}
              </CDropdownMenu>
            )}
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
        </CHeaderNav>
        <CHeaderNav>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
