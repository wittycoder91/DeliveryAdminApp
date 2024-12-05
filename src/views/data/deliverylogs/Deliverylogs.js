import React, { useState } from 'react'
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

const Tables = () => {
  const tableHeaders = [
    'No',
    'Supplier',
    'Material',
    'Image',
    'Description',
    'Quality',
    'Amount',
    'Send Date',
    'location',
    'Status',
    'Note',
    'Feedback',
  ]

  const tableData = Array.from({ length: 500 }, (_, index) => ({
    no: index + 1,
    supplier: `Supplier ${index + 1}`,
    material: `Material ${index + 1}`,
    image: `Image ${index + 1}`,
    description: `Description ${index + 1}`,
    quality: `Quality ${index + 1}`,
    amount: (index + 1) * 10,
    sendDate: `2020-09-${String(index + 10).padStart(2, '0')}`,
    location: `Location ${index + 1}`,
    status: index % 2 === 0 ? 'Accepted' : 'Rejected',
    note: `Note ${index + 1}`,
    feedback: index % 2 === 0 ? 'Good' : 'Average',
  }))

  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10) // Default rows per page
  const totalPages = Math.ceil(tableData.length / itemsPerPage)

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

  // Calculate the data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentTableData = tableData.slice(startIndex, startIndex + itemsPerPage)

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <h3 className="px-4 pt-3 mb-0">Delivery History</h3>
        <CCardBody>
          {/* Table */}
          <CCol className="d-flex flex-wrap flex-md-row flex-column gap-3 mb-3">
            <CCol className="d-flex flex-row justify-content-center align-items-center gap-3">
              <CFormLabel>Supplier</CFormLabel>
              <CFormSelect
                options={[
                  { label: 'All', value: '1' },
                  { label: 'Supplier 1', value: '2' },
                  { label: 'Supplier 2', value: '3' },
                ]}
              />
            </CCol>
            <CCol className="d-flex flex-row justify-content-center align-items-center gap-3">
              <CFormLabel>Material</CFormLabel>
              <CFormSelect
                options={[
                  { label: 'All', value: '1' },
                  { label: 'Material 1', value: '2' },
                  { label: 'Material 2', value: '3' },
                ]}
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
                aria-label="Search Index"
                aria-describedby="addon-wrapping"
                className="w-max"
              />
            </CInputGroup>
            <CButton color="primary" className="dark-blue">
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
                {currentTableData.map((row, index) => (
                  <CTableRow
                    key={index}
                    onClick={() => navigate(`/data/deliverylogdetail`)}
                    className="cursor-pointer"
                  >
                    <CTableHeaderCell className="text-center" scope="row">
                      {startIndex + index + 1}
                    </CTableHeaderCell>
                    <CTableDataCell className="text-center">{row.supplier}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.material}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.image}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.description}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.quality}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.amount}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.sendDate}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.location}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {row.status === 'Accepted' ? (
                        <span className="delivery-accept">{row.status}</span>
                      ) : (
                        <span className="delivery-reject">{row.status}</span>
                      )}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">{row.note}</CTableDataCell>
                    <CTableDataCell className="text-center">{row.feedback}</CTableDataCell>
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
    </CCol>
  )
}

export default Tables
