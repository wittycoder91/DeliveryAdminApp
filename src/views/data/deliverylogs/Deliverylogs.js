import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CFormSelect,
  CRow,
  CInputGroup,
  CFormInput,
  CInputGroupText,
  CButton,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

import api from 'src/services'
import { API_URLS } from 'src/config/Constants'
import { useNotification } from 'src/components/header/NotificationProvider'
import { showWarningMsg, showErrorMsg } from 'src/config/common'

const Tables = () => {
  const tableHeaders = [
    'No',
    'Supplier',
    'PO #',
    'Material',
    'Weight',
    'Tare Weight',
    'Net Weight',
    'Packaging',
    '# of Packages',
    'Residue Material',
    'Color',
    'Conditions',
    'Date',
    'Time',
    'Status',
    'Quality grade',
    'Inspection',
  ]

  const navigate = useNavigate()
  const { notificationCount } = useNotification()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [curSearh, setCurSearch] = useState('')
  const [curData, setCurData] = useState([])
  const [totalCount, setTotalCount] = useState(0)

  const [curSupplier, setCurSupplier] = useState(0)
  const [allSuppliers, setAllSuppliers] = useState([])
  const [curMaterial, setCurMaterial] = useState(0)
  const [allMaterials, setAllMaterials] = useState([])
  const [curPackage, setCurPackage] = useState(0)
  const [allPackages, setAllPackages] = useState([])

  useEffect(() => {
    getAllSuppliers()
    getAllMaterials()
    getAllPackages()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getDelivery(curSupplier, curMaterial, curPackage, curSearh, itemsPerPage, currentPage)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationCount])

  const getAllSuppliers = async () => {
    try {
      const response = await api.get(API_URLS.GETALLUSERS)

      if (response.data.success) {
        let users = response.data.data || []
        const allOption = {
          _id: '0',
          name: 'All',
          email: 'All',
        }
        users = [allOption, ...users]
        setAllSuppliers(users)
        setCurSupplier(0)
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
  const getAllMaterials = async () => {
    try {
      const response = await api.get(API_URLS.GETALLMATERIALS)

      if (response.data.success) {
        let materials = response.data.data || []
        const allOption = {
          _id: '0',
          materialName: 'All',
          materialDesc: '',
          note: '',
        }
        materials = [allOption, ...materials]
        setAllMaterials(materials)
        setCurMaterial(0)
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
  const getAllPackages = async () => {
    try {
      const response = await api.get(API_URLS.GETALLPACKAGES)

      if (response.data.success) {
        let packages = response.data.data || []
        const allOption = {
          _id: '0',
          name: 'All',
        }
        packages = [allOption, ...packages]
        setAllPackages(packages)
        setCurPackage(0)
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
  const getDelivery = async (
    curSupplier,
    curMaterial,
    curPackage,
    curSearh,
    itemsPerPage,
    currentPage,
  ) => {
    try {
      const response = await api.get(API_URLS.GETAllDELIVERYLOGS, {
        params: {
          curSupplier: curSupplier,
          curMaterial: curMaterial,
          curPackage: curPackage,
          curSearh: curSearh,
          itemsPerPage: itemsPerPage,
          currentPage: currentPage,
        },
      })

      if (response.data.success) {
        setCurData(response.data.data)
        setTotalCount(response.data.totalCount)
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

  const handleSearch = () => {
    setCurrentPage(1)

    getDelivery(curSupplier, curMaterial, curPackage, curSearh, itemsPerPage, 1)
  }

  // Handle the Table pagination
  const handlePageChange = (page) => {
    setCurrentPage(page)

    getDelivery(curSupplier, curMaterial, curPackage, curSearh, itemsPerPage, page)
  }
  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10)
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)

    getDelivery(curSupplier, curMaterial, curPackage, curSearh, newItemsPerPage, 1)
  }
  const getPaginationItems = () => {
    const totalPageCount = Math.ceil(totalCount / itemsPerPage)
    const pages = []
    const maxVisiblePages = 3
    const delta = 1

    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (currentPage > delta + 2) {
        pages.push('...')
      }

      const start = Math.max(2, currentPage - delta)
      const end = Math.min(totalPageCount - 1, currentPage + delta)
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPageCount - (delta + 1)) {
        pages.push('...')
      }

      pages.push(totalPageCount)
    }

    return pages
  }

  const handleGotoDetail = (selId) => {
    navigate(`/data/deliverylogdetail/${selId}`)
  }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <h3 className="px-3 pt-3 mb-0">Delivery History</h3>
        <CCardBody>
          {/* Table */}
          <CCol className="d-flex flex-wrap flex-md-row flex-column gap-3 mb-3">
            <CCol className="d-flex flex-row justify-content-center align-items-center gap-3">
              <CFormLabel>Supplier</CFormLabel>
              <CFormSelect
                options={allSuppliers?.map((user) => ({
                  label: user.name,
                  value: user._id,
                }))}
                value={curSupplier}
                onChange={(e) => setCurSupplier(e.target.value)}
              />
            </CCol>
            <CCol className="d-flex flex-row justify-content-center align-items-center gap-3">
              <CFormLabel>Material</CFormLabel>
              <CFormSelect
                options={allMaterials?.map((material) => ({
                  label: material.materialName,
                  value: material._id,
                }))}
                value={curMaterial}
                onChange={(e) => setCurMaterial(e.target.value)}
              />
            </CCol>
            <CCol className="d-flex flex-row justify-content-center align-items-center gap-3">
              <CFormLabel>Package</CFormLabel>
              <CFormSelect
                options={allPackages?.map((packageItem) => ({
                  label: packageItem.name,
                  value: packageItem._id,
                }))}
                value={curPackage}
                onChange={(e) => setCurPackage(e.target.value)}
              />
            </CCol>
          </CCol>
          <CCol className="d-flex justify-content-center align-items-start gap-3">
            <CInputGroup className="flex-nowrap mb-4">
              <CInputGroupText id="addon-wrapping">
                <CIcon icon={cilSearch} />
              </CInputGroupText>
              <CFormInput
                placeholder="Search Index"
                className="w-max"
                value={curSearh}
                onChange={(e) => setCurSearch(e.target.value)}
              />
            </CInputGroup>
            <CButton color="primary dark-blue" onClick={handleSearch}>
              Search
            </CButton>
          </CCol>
          <CCol className="table-responsive">
            <CTable>
              <CTableHead>
                <CTableRow>
                  {tableHeaders.map((header, index) => (
                    <CTableHeaderCell className="text-center" scope="col" key={index}>
                      {header}
                    </CTableHeaderCell>
                  ))}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {curData?.length > 0 ? (
                  curData.map((row, index) => (
                    <CTableRow
                      key={index}
                      onClick={() => handleGotoDetail(row?._id)}
                      className="cursor-pointer"
                    >
                      <CTableHeaderCell className="text-center" scope="row">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </CTableHeaderCell>
                      <CTableDataCell className="text-center">{row?.userName}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        {row?.po > 0 ? row?.po : ''}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">{row?.materialName}</CTableDataCell>
                      <CTableDataCell className="text-center">{row?.weight}</CTableDataCell>
                      <CTableDataCell className="text-center">{row?.tareamount}</CTableDataCell>
                      <CTableDataCell className="text-center">{row?.netamount}</CTableDataCell>
                      <CTableDataCell className="text-center">{row?.packageName}</CTableDataCell>
                      <CTableDataCell className="text-center">{row?.countpackage}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        {row?.residueName === 'Other' ? row?.other : row?.residueName}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">{row?.colorName}</CTableDataCell>
                      <CTableDataCell className="text-center">{row?.conditionName}</CTableDataCell>
                      <CTableDataCell className="text-center">{row?.date}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        {new Date(row?.time * 1000).toISOString().substr(11, 8)}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {row?.status === -1 ? 'Rejected' : 'Accepted'}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">{row?.qualityName}</CTableDataCell>
                      <CTableDataCell className="text-center">{row?.insepction}</CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan={17} className="text-center">
                      There is no result
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
          </CCol>
          {/* Pagination */}
          <CRow className="mt-2">
            <CCol
              xs={12}
              sm={6}
              className="mb-2 mb-sm-0 d-flex justify-content-center justify-content-sm-start"
            >
              <CFormSelect
                value={itemsPerPage}
                className="w-max h-max"
                onChange={handleItemsPerPageChange}
              >
                <option value={10}>10 rows</option>
                <option value={15}>15 rows</option>
                <option value={20}>20 rows</option>
                <option value={30}>30 rows</option>
                <option value={50}>50 rows</option>
                <option value={100}>100 rows</option>
              </CFormSelect>
            </CCol>
            <CCol xs={12} sm={6} className="d-flex justify-content-center justify-content-sm-end">
              <CPagination className="d-flex flex-wrap align-items-center justify-content-center">
                {/* Previous Button */}
                <CPaginationItem
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  &laquo;
                </CPaginationItem>

                {/* Pagination Numbers */}
                {getPaginationItems().map((page, index) =>
                  page === '...' ? (
                    <CPaginationItem key={`ellipsis-${index}`} disabled>
                      ...
                    </CPaginationItem>
                  ) : (
                    <CPaginationItem
                      key={page}
                      active={page === currentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </CPaginationItem>
                  ),
                )}

                {/* Next Button */}
                <CPaginationItem
                  disabled={currentPage === Math.ceil(totalCount / itemsPerPage)}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  &raquo;
                </CPaginationItem>
              </CPagination>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default Tables
