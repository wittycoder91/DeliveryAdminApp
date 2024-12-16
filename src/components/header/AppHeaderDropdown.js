import React from 'react'
import {
  CAvatar,
  CCol,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import avatar from './../../assets/images/avatars/avatar.jpg'

const AppHeaderDropdown = () => {
  return (
    <CCol className="d-flex">
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
          <CAvatar src={avatar} size="md" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
          <CDropdownItem href="/#/setting/setting">
            <CIcon icon={cilUser} className="me-2" />
            Setting
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem href="#/login">
            <CIcon icon={cilLockLocked} className="me-2" />
            Log out
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </CCol>
  )
}

export default AppHeaderDropdown
