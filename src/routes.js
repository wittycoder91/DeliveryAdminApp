import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// data
const Materials = React.lazy(() => import('./views/data/materials/Materials'))
const Deliveryprocess = React.lazy(() => import('./views/data/deliveryprocess/Deliveryprocess'))
const Supplier = React.lazy(() => import('./views/data/supplier/Supplier'))
const DeliveryLogs = React.lazy(() => import('./views/data/deliverylogs/Deliverylogs'))
const DeliverylogDetail = React.lazy(() => import('./views/data/deliverylogs/DeliverylogDetail'))

// Settings
const Setting = React.lazy(() => import('./views/settings/setting/Setting'))
const FAQ = React.lazy(() => import('./views/settings/faq/FAQ'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/data', name: 'Data', element: Materials, exact: true },
  { path: '/data/materials', name: 'Materials', element: Materials },
  { path: '/data/deliveryprocess', name: 'Deliveryprocess', element: Deliveryprocess },
  { path: '/data/supplier', name: 'Supplier', element: Supplier },
  { path: '/data/deliverylogs', name: 'DeliveryLogs', element: DeliveryLogs },
  { path: '/data/deliverylogdetail', name: 'DeliveryLogDetail', element: DeliverylogDetail },
  { path: '/setting', name: 'Setting', element: Setting, exact: true },
  { path: '/setting/setting', name: 'Setting', element: Setting },
  { path: '/setting/faq', name: 'FAQ', element: FAQ },
]

export default routes
