import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CCol,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilBell } from '@coreui/icons'

import avatar8 from './../../assets/images/avatars/avatar.jpg'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <CCol className="d-flex">
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
          <CAvatar src={avatar8} size="md" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
          <CDropdownItem href="/#/data/deliveryprocess">
            <CIcon icon={cilBell} className="me-2" />
            Notifications
            <CBadge color="info" className="ms-2">
              5
            </CBadge>
          </CDropdownItem>
          <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
          <CDropdownItem href="/#/setting/setting">
            <CIcon icon={cilUser} className="me-2" />
            Setting
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem href="#/login" onClick={handleLogout}>
            <CIcon icon={cilLockLocked} className="me-2" />
            Log out
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </CCol>
  )
}

export default AppHeaderDropdown
