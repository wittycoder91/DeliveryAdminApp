export const API_URLS = {
  LOGIN: `${process.env.REACT_APP_API_URL}/auth/admin/login`,
  // Dashboard
  GETDASHBOARDWIDGET: `${process.env.REACT_APP_API_URL}/dashboard/admin/get-dashboard-widget`,
  GETDASHBOARDDELIERY: `${process.env.REACT_APP_API_URL}/dashboard/admin/get-dashboard-delivery`,
  GETDASHBOARDWEIGHT: `${process.env.REACT_APP_API_URL}/dashboard/admin/get-dashboard-weight`,
  GETDASHBOARDLOYALTY: `${process.env.REACT_APP_API_URL}/dashboard/admin/get-dashboard-loyalty`,
  // Material
  GETMATERIAL: `${process.env.REACT_APP_API_URL}/setting/admin/get-materials`,
  ADDMATERIAL: `${process.env.REACT_APP_API_URL}/setting/admin/add-material`,
  EDITMATERIAL: `${process.env.REACT_APP_API_URL}/setting/admin/edit-material`,
  REMOVEMATERIAL: `${process.env.REACT_APP_API_URL}/setting/admin/remove-material`,
  // Setting
  GETSETTING: `${process.env.REACT_APP_API_URL}/setting/admin/get-setting`,
  UPDATESETTING: `${process.env.REACT_APP_API_URL}/setting/admin/update-setting`,
  GETALLMATERIALS: `${process.env.REACT_APP_API_URL}/setting/admin/get-allmaterials`,
  GETALLUSERS: `${process.env.REACT_APP_API_URL}/setting/admin/get-allusers`,
  GETALLPACKAGES: `${process.env.REACT_APP_API_URL}/setting/admin/get-allpackages`,
  // FAG
  GETFAQ: `${process.env.REACT_APP_API_URL}/setting/admin/get-faq`,
  ADDFAQ: `${process.env.REACT_APP_API_URL}/setting/admin/add-faq`,
  EDITFAQ: `${process.env.REACT_APP_API_URL}/setting/admin/edit-faq`,
  REMOVEFAQ: `${process.env.REACT_APP_API_URL}/setting/admin/remove-faq`,
  // Supplier
  GETSUPPLIER: `${process.env.REACT_APP_API_URL}/setting/admin/get-supplier`,
  EDITSUPPLIER: `${process.env.REACT_APP_API_URL}/setting/admin/edit-supplier`,
  REMOVESUPPLIER: `${process.env.REACT_APP_API_URL}/setting/admin/remove-supplier`,
  // Delivery
  SETREADDELIVERY: `${process.env.REACT_APP_API_URL}/delivery/admin/set-read-delivery`,
  GETDELIVERY: `${process.env.REACT_APP_API_URL}/delivery/admin/get-delivery`,
  GETSELDELIVERY: `${process.env.REACT_APP_API_URL}/delivery/admin/get-sel-delivery`,
  UPDATESELDELIVERY: `${process.env.REACT_APP_API_URL}/delivery/admin/update-sel-delivery`,
  ADDFEEDBACKDELIVERY: `${process.env.REACT_APP_API_URL}/delivery/admin/add-feedback-delivery`,
  // Delivery Logs
  GETAllDELIVERYLOGS: `${process.env.REACT_APP_API_URL}/delivery/admin/get-all-deliverylogs`,
  GETSELDELIVERYLOG: `${process.env.REACT_APP_API_URL}/delivery/admin/get-sel-deliverylog`,
}
