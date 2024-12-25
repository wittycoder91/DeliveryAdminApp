import React, { useEffect, useState } from 'react'
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
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilXCircle } from '@coreui/icons'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

import api from 'src/services'
import { API_URLS } from 'src/config/Constants'
import { showSuccessMsg, showWarningMsg, showErrorMsg } from 'src/config/common'

const Dates = () => {
  const tableHeaders = ['No', 'Date', 'Action']

  const [visible, setVisible] = useState(false)
  const [visibleDel, setVisibleDel] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [curData, setCurData] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [selId, setSelId] = useState('')

  // Date Dialog States
  const [curDate, setCurDate] = useState('')

  useEffect(() => {
    getDates(itemsPerPage, currentPage)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDates = async (itemsPerPage, currentPage) => {
    try {
      const response = await api.get(API_URLS.GETDATE, {
        params: {
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

  // Handle the Table pagination
  const handlePageChange = (page) => {
    setCurrentPage(page)

    getDates(itemsPerPage, page)
  }
  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10)
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)

    getDates(newItemsPerPage, 1)
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

  const handleAdd = () => {
    setSelId('')
    setCurDate('')

    setVisible(!visible)
  }
  const handleAddDate = async () => {
    if (curDate.length === 0) {
      showErrorMsg('Please select the date')
    } else {
      var apiURL = ''
      if (selId.length > 0) apiURL = API_URLS.EDITDATE
      else apiURL = API_URLS.ADDDATE

      try {
        const date = new Date(curDate)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const updateDate = `${year}-${month}-${day}`

        const response = await api.post(apiURL, {
          selID: selId,
          selDate: updateDate,
        })

        if (response.data.success) {
          showSuccessMsg(response.data.message)
          setVisible(false)

          setCurrentPage(1)
          getDates(itemsPerPage, 1)
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
  const handleSelEditDate = (selId, selDate) => {
    setVisible(!visible)
    setSelId('')
    setCurDate('')

    const selectedItem = curData.find((item) => item._id === selId)
    console.log(selectedItem)
    if (selectedItem) {
      setSelId(selectedItem?._id)
      setCurDate(selectedItem?.date)
    }
  }
  const handleSelDelDate = (selId) => {
    setVisibleDel(!visibleDel)
    setSelId('')

    const selectedItem = curData.find((item) => item._id === selId)
    if (selectedItem) {
      setSelId(selectedItem?._id)
    }
  }
  const handleSelRemove = async () => {
    try {
      const response = await api.post(API_URLS.REMOVEDATE, {
        selID: selId,
      })

      if (response.data.success) {
        showSuccessMsg(response.data.message)
        setVisibleDel(false)

        setCurrentPage(1)
        getDates(itemsPerPage, 1)
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
    <CCol xs={12}>
      <CCard className="mb-4">
        <h3 className="px-3 pt-3 mb-0">Unavailable Date List</h3>
        <CCardBody>
          {/* Table */}
          <CCol className="mb-3">
            <CButton color="primary" className="wid-110 dark-blue" onClick={handleAdd}>
              Add
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
                      <CTableHeaderCell className="text-center" scope="row">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </CTableHeaderCell>
                      <CTableDataCell className="text-center">{row?.date}</CTableDataCell>
                      <CTableDataCell>
                        <CCol className="d-flex justify-content-center align-items-center">
                          <CButton onClick={() => handleSelEditDate(row?._id, row?.date)}>
                            <CIcon icon={cilPencil} />
                          </CButton>
                          <CButton onClick={() => handleSelDelDate(row?._id)}>
                            <CIcon icon={cilXCircle} />
                          </CButton>
                        </CCol>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan={3} className="text-center">
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
      {/* Add Modal */}
      <CModal
        alignment="center"
        scrollable
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredScrollableExample2"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredScrollableExample2">Unavailble Date</CModalTitle>
        </CModalHeader>
        <CModalBody className="d-flex flex-column gap-2">
          <CCol className="d-flex align-items-center justify-content-center">
            <DayPicker
              mode="single"
              selected={curDate}
              onSelect={setCurDate}
              month={curDate}
              onMonthChange={setCurDate}
            />
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleAddDate}>
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
          <CModalTitle id="VerticallyCenteredExample">Date Remove</CModalTitle>
        </CModalHeader>
        <CModalBody>Do you want to remove current date?</CModalBody>
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

export default Dates
