import React, { useState } from 'react'
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
  CFormInput,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilXCircle } from '@coreui/icons'

const FAQ = () => {
  const tableHeaders = ['No', 'Title', 'Content', 'Action']

  const tableData = Array.from({ length: 30 }, (_, index) => ({
    no: index + 1,
    title: `Title ${index + 1}`,
    content: `Content ${index + 1}`,
  }))

  const [visible, setVisible] = useState(false)
  const [visibleDel, setVisibleDel] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10) // Default rows per page
  const totalPages = Math.ceil(tableData.length / itemsPerPage)
  // Calculate the data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentTableData = tableData.slice(startIndex, startIndex + itemsPerPage)

  // Handle the Table pagination
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10)
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
  }
  const getPaginationItems = () => {
    const pages = []
    const maxVisiblePages = 3
    const delta = 1

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (currentPage > delta + 2) {
        pages.push('...')
      }

      const start = Math.max(2, currentPage - delta)
      const end = Math.min(totalPages - 1, currentPage + delta)
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - (delta + 1)) {
        pages.push('...')
      }

      pages.push(totalPages)
    }

    return pages
  }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <h3 className="px-3 pt-3 mb-0">FAQ</h3>
        <CCardBody>
          {/* Table */}
          <CCol className="d-flex justify-content-end mb-3 me-4">
            <CButton
              color="primary"
              className="wid-100 dark-blue"
              onClick={() => setVisible(!visible)}
            >
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
                {currentTableData.map((row, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell className="text-center" scope="row">
                      {startIndex + index + 1}
                    </CTableHeaderCell>
                    <CTableDataCell className="text-center">{row.title}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.content}</CTableDataCell>
                    <CTableDataCell>
                      <CCol className="d-flex justify-content-center align-items-center">
                        <CButton>
                          <CIcon icon={cilPencil} onClick={() => setVisible(!visible)} />
                        </CButton>
                        <CButton>
                          <CIcon icon={cilXCircle} onClick={() => setVisibleDel(!visibleDel)} />
                        </CButton>
                      </CCol>
                    </CTableDataCell>
                  </CTableRow>
                ))}
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
                  disabled={currentPage === totalPages}
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
          <CModalTitle id="VerticallyCenteredScrollableExample2">FAQ</CModalTitle>
        </CModalHeader>
        <CModalBody className="d-flex flex-column gap-2">
          <CCol>
            <CFormLabel>Title</CFormLabel>
            <CFormInput placeholder="Title" />
          </CCol>
          <CCol>
            <CFormLabel>Content</CFormLabel>
            <CFormTextarea rows={3}></CFormTextarea>
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => setVisible(false)}>
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
          <CModalTitle id="VerticallyCenteredExample">FAQ Remove</CModalTitle>
        </CModalHeader>
        <CModalBody>Do you want to remove current FAQ?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDel(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={() => setVisibleDel(false)}>
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>
    </CCol>
  )
}

export default FAQ
