import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// data
const Deliveryprocess = React.lazy(() => import('./views/data/deliveryprocess/Deliveryprocess'))
const DeliveryprocessDetail = React.lazy(
  () => import('./views/data/deliveryprocess/DeliveryprocessDetail'),
)
const Supplier = React.lazy(() => import('./views/data/supplier/Supplier'))
const DeliveryLogs = React.lazy(() => import('./views/data/deliverylogs/Deliverylogs'))
const DeliverylogDetail = React.lazy(() => import('./views/data/deliverylogs/DeliverylogDetail'))

// Settings
const Materials = React.lazy(() => import('./views/settings/materials/Materials'))
const Industry = React.lazy(() => import('./views/settings/industry/Industry'))
const Colors = React.lazy(() => import('./views/settings/color/Colors'))
const Residues = React.lazy(() => import('./views/settings/residue/Residues'))
const Conditions = React.lazy(() => import('./views/settings/condition/Conditions'))
const Setting = React.lazy(() => import('./views/settings/setting/Setting'))
const FAQ = React.lazy(() => import('./views/settings/faq/FAQ'))
const Date = React.lazy(() => import('./views/settings/date/Date'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/data', name: 'Data', element: Materials, exact: true },
  { path: '/data/deliveryprocess', name: 'Deliveryprocess', element: Deliveryprocess },
  {
    path: '/data/deliveryprocessdetail/:id',
    name: 'DeliveryProcess Detail',
    element: DeliveryprocessDetail,
  },
  { path: '/data/supplier', name: 'Supplier', element: Supplier },
  { path: '/data/deliverylogs', name: 'DeliveryLogs', element: DeliveryLogs },
  { path: '/data/deliverylogdetail/:id', name: 'DeliveryLogDetail', element: DeliverylogDetail },
  { path: '/setting', name: 'Setting', element: Materials, exact: true },
  { path: '/setting/materials', name: 'Materials', element: Materials },
  { path: '/setting/industry', name: 'Industry', element: Industry },
  { path: '/setting/color', name: 'Industry', element: Colors },
  { path: '/setting/residue', name: 'Industry', element: Residues },
  { path: '/setting/condition', name: 'Industry', element: Conditions },
  { path: '/setting/setting', name: 'Setting', element: Setting },
  { path: '/setting/faq', name: 'FAQ', element: FAQ },
  { path: '/setting/date', name: 'Date', element: Date },
]

export default routes
