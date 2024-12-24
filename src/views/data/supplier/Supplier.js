import React, { useState, useEffect } from 'react'
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormCheck,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilXCircle, cilHandshake, cilArrowThickBottom } from '@coreui/icons'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import api from 'src/services'
import { API_URLS } from 'src/config/Constants'
import { showSuccessMsg, showWarningMsg, showErrorMsg } from 'src/config/common'

const Supplier = () => {
  const tableHeaders = [
    '',
    'No',
    'Supplier',
    'Contact',
    'Phone number',
    'Street Address',
    'City',
    'Province',
    'Zip Code',
    'Email',
    'Total delivered (lbs)',
    'Loyalty',
    'Trust',
    'W9',
    'Action',
  ]

  const [visibleDel, setVisibleDel] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [curSearh, setCurSearch] = useState('')
  const [curData, setCurData] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [selId, setSelId] = useState('')

  // Unit Price Modal States
  const [curPriceVisible, setCurPriceVisible] = useState(false)
  const [curPrice, setCurPrice] = useState(0)
  const [curSelUserId, setCurSelUserID] = useState('')

  // Calculate the data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage

  useEffect(() => {
    getSuppliers(curSearh, itemsPerPage, currentPage)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getSuppliers = async (curSearh, itemsPerPage, currentPage) => {
    try {
      const response = await api.get(API_URLS.GETSUPPLIER, {
        params: {
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

    getSuppliers(curSearh, itemsPerPage, 1)
  }
  // Handle the Table pagination
  const handlePageChange = (page) => {
    setCurrentPage(page)

    getSuppliers(curSearh, itemsPerPage, page)
  }
  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10)
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)

    getSuppliers(curSearh, newItemsPerPage, 1)
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

  const handleEditSupplier = async (e, selId) => {
    const checkedStatus = e.target.checked

    try {
      const response = await api.post(API_URLS.EDITSUPPLIER, {
        selID: selId,
        trust: checkedStatus ? 1 : 0,
      })

      if (response.data.success) {
        showSuccessMsg(response.data.message)

        setCurrentPage(1)
        getSuppliers(curSearh, itemsPerPage, 1)
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

    if (checkedStatus) {
      setInitPriceVal()

      setCurSelUserID(selId)
      setCurPriceVisible(!curPriceVisible)

      if (selId.length > 0) {
        try {
          const response = await api.post(API_URLS.GETPRICESUPPLIER, {
            selID: selId,
          })

          if (response.data.success) {
            setCurPrice(response.data.data?.price)
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
    }
  }
  const setInitPriceVal = () => {
    setCurPrice(0)
    setCurSelUserID('')
  }
  const handlePriceSave = async () => {
    if (curPrice.length === 0 || isNaN(parseInt(curPrice))) {
      showErrorMsg('Please input the price')
    } else {
      try {
        const response = await api.post(API_URLS.SETPRICESUPPLIER, {
          selID: curSelUserId,
          price: curPrice,
        })

        if (response.data.success) {
          setCurPriceVisible(false)
          showSuccessMsg(response.data.message)
        } else {
          showWarningMsg(response.data.message)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
  const handleSelDelSupplier = (selId) => {
    setVisibleDel(!visibleDel)
    setSelId('')

    const selectedItem = curData.find((item) => item._id === selId)
    if (selectedItem) {
      setSelId(selectedItem?._id)
    }
  }
  const handleSelRemove = async () => {
    try {
      const response = await api.post(API_URLS.REMOVESUPPLIER, {
        selID: selId,
      })

      if (response.data.success) {
        showSuccessMsg(response.data.message)
        setVisibleDel(false)

        setCurrentPage(1)
        getSuppliers(curSearh, itemsPerPage, 1)
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
  const handleDownLoadW9 = (w9Path) => {
    DownLoadW9(w9Path)
  }
  const DownLoadW9 = async (w9Path) => {
    const fileUrl = `${process.env.REACT_APP_UPLOAD_URL}${w9Path.replace(/\\/g, '/')}`
    try {
      const response = await fetch(fileUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch file')
      }
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = w9Path.split('\\').pop()
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(blobUrl)
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <h3 className="px-3 pt-3 mb-0">Supplier</h3>
        <CCardBody>
          {/* Table */}
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
                    <CTableRow key={index}>
                      <CTableDataCell className="text-center">
                        {row.trust ? <CIcon icon={cilHandshake} className="me-2" /> : <></>}
                      </CTableDataCell>
                      <CTableHeaderCell className="text-center" scope="row">
                        {startIndex + index + 1}
                      </CTableHeaderCell>
                      <CTableDataCell className="text-center">{row.name}</CTableDataCell>
                      <CTableDataCell className="text-center">{row.contact}</CTableDataCell>
                      <CTableDataCell className="text-center">{row.phonenumber}</CTableDataCell>
                      <CTableDataCell className="text-center">{row.address}</CTableDataCell>
                      <CTableDataCell className="text-center">{row.city}</CTableDataCell>
                      <CTableDataCell className="text-center">{row.state}</CTableDataCell>
                      <CTableDataCell className="text-center">{row.zipcode}</CTableDataCell>
                      <CTableDataCell className="text-center">{row.email}</CTableDataCell>
                      <CTableDataCell className="text-center">{row.totalweight}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        {row.loyalty === 3 ? (
                          <img src="/icons/gold.png" alt="" width={42} height={50} />
                        ) : row.loyalty === 2 ? (
                          <img src="/icons/silver.png" alt="" width={42} height={50} />
                        ) : row.loyalty === 1 ? (
                          <img src="/icons/bronz.png" alt="" width={42} height={50} />
                        ) : (
                          <></>
                        )}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CFormCheck
                          label=""
                          checked={row.trust ? true : false}
                          onChange={(e) => handleEditSupplier(e, row._id)}
                        />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {row?.w9Path.length > 0 ? (
                          <CIcon
                            icon={cilArrowThickBottom}
                            onClick={() => handleDownLoadW9(row.w9Path)}
                          />
                        ) : (
                          ''
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CCol className="d-flex justify-content-center align-items-center">
                          <CButton onClick={() => handleSelDelSupplier(row?._id)}>
                            <CIcon icon={cilXCircle} />
                          </CButton>
                        </CCol>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan={11} className="text-center">
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
      {/* Unit Price Modal */}
      <CModal
        alignment="center"
        visible={curPriceVisible}
        onClose={() => setCurPriceVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Unit Price</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCol>
            <CFormLabel>Unit Price</CFormLabel>
            <CFormInput
              placeholder="Unit Price"
              type="number"
              value={curPrice}
              onChange={(e) => setCurPrice(e.target.value)}
            />
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setCurPriceVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handlePriceSave}>
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>
      {/* Remove Modal */}
      <CModal
        alignment="center"
        visible={visibleDel}
        onClose={() => setVisibleDel(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Supplier Remove</CModalTitle>
        </CModalHeader>
        <CModalBody>Do you want to remove supplier information</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDel(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleSelRemove}>
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </CCol>
  )
}

export default Supplier
