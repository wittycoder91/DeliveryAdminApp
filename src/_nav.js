import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilUser,
  cilFactory,
  cilBabyCarriage,
  cilLayers,
  cilNotes,
  cilApplications,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Data',
  },
  {
    component: CNavItem,
    name: 'Delivery Process',
    to: '/data/deliveryprocess',
    icon: <CIcon icon={cilBabyCarriage} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Delivery History',
    to: '/data/deliverylogs',
    icon: <CIcon icon={cilFactory} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Supplier',
    to: '/data/supplier',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Settings',
  },
  {
    component: CNavItem,
    name: 'Materials',
    to: '/setting/materials',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Setting',
    to: '/setting/setting',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'FAQ',
    to: '/setting/faq',
    icon: <CIcon icon={cilApplications} customClassName="nav-icon" />,
  },
]

export default _nav
