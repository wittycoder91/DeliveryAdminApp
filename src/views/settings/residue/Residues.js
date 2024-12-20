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
  CInputGroup,
  CFormInput,
  CInputGroupText,
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
import { cilPencil, cilSearch, cilXCircle } from '@coreui/icons'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import api from 'src/services'
import { API_URLS } from 'src/config/Constants'
import { showSuccessMsg, showWarningMsg, showErrorMsg } from 'src/config/common'

const Residues = () => {
  const tableHeaders = ['No', 'Residue Material Name', 'Description', 'Note', 'Action']

  const [visible, setVisible] = useState(false)
  const [visibleDel, setVisibleDel] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [curSearh, setCurSearch] = useState('')
  const [curData, setCurData] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [selId, setSelId] = useState('')

  // Residues Dialog States
  const [curResidueName, setCurResidueName] = useState('')
  const [curResidueDesc, setCurResidueDesc] = useState('')
  const [curResidueNote, setCurResidueNote] = useState('')

  useEffect(() => {
    getResidues(curSearh, itemsPerPage, currentPage)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getResidues = async (curSearh, itemsPerPage, currentPage) => {
    try {
      const response = await api.get(API_URLS.GETRESIDUE, {
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

    getResidues(curSearh, itemsPerPage, 1)
  }

  // Handle the Table pagination
  const handlePageChange = (page) => {
    setCurrentPage(page)

    getResidues(curSearh, itemsPerPage, page)
  }
  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10)
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)

    getResidues(curSearh, newItemsPerPage, 1)
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
    setCurResidueName('')
    setCurResidueDesc('')
    setCurResidueNote('')

    setVisible(!visible)
  }
  const handleAddColor = async () => {
    if (curResidueName.length === 0 || curResidueDesc.length === 0) {
      showErrorMsg('Please enter the Residue Material name or description')
    } else {
      var apiURL = ''
      if (selId.length > 0) apiURL = API_URLS.EDITRESIDUE
      else apiURL = API_URLS.ADDRESIDUE

      try {
        const response = await api.post(apiURL, {
          selID: selId,
          residueName: curResidueName,
          residueDesc: curResidueDesc,
          note: curResidueNote,
        })

        if (response.data.success) {
          showSuccessMsg(response.data.message)
          setVisible(false)

          setCurrentPage(1)
          getResidues(curSearh, itemsPerPage, 1)
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
  const handleSelEditResidue = (selId) => {
    setVisible(!visible)
    setSelId('')

    const selectedItem = curData.find((item) => item._id === selId)
    if (selectedItem) {
      setSelId(selectedItem?._id)
      setCurResidueName(selectedItem?.residueName)
      setCurResidueDesc(selectedItem?.residueDesc)
      setCurResidueNote(selectedItem?.note)
    }
  }
  const handleSelDelResidue = (selId) => {
    setVisibleDel(!visibleDel)
    setSelId('')

    const selectedItem = curData.find((item) => item._id === selId)
    if (selectedItem) {
      setSelId(selectedItem?._id)
    }
  }
  const handleSelRemove = async () => {
    try {
      const response = await api.post(API_URLS.REMOVERESIDUE, {
        selID: selId,
      })

      if (response.data.success) {
        showSuccessMsg(response.data.message)
        setVisibleDel(false)

        setCurrentPage(1)
        getResidues(curSearh, itemsPerPage, 1)
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
        <h3 className="px-3 pt-3 mb-0">Residue Materials</h3>
        <CCardBody>
          {/* Table */}
          <CCol className="mb-3">
            <CButton color="primary" className="wid-110 dark-blue" onClick={handleAdd}>
              Add
            </CButton>
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
                    <CTableRow key={index}>
                      <CTableHeaderCell className="text-center" scope="row">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </CTableHeaderCell>
                      <CTableDataCell className="text-center">{row?.residueName}</CTableDataCell>
                      <CTableDataCell className="text-center">{row?.residueDesc}</CTableDataCell>
                      <CTableDataCell className="text-center">{row?.note}</CTableDataCell>
                      <CTableDataCell>
                        <CCol className="d-flex justify-content-center align-items-center">
                          <CButton onClick={() => handleSelEditResidue(row?._id)}>
                            <CIcon icon={cilPencil} />
                          </CButton>
                          <CButton onClick={() => handleSelDelResidue(row?._id)}>
                            <CIcon icon={cilXCircle} />
                          </CButton>
                        </CCol>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan={5} className="text-center">
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
          <CModalTitle id="VerticallyCenteredScrollableExample2">Residue Materials</CModalTitle>
        </CModalHeader>
        <CModalBody className="d-flex flex-column gap-2">
          <CCol>
            <CFormLabel>Residue Material Name</CFormLabel>
            <CFormInput
              placeholder="Residue Material Name"
              value={curResidueName}
              onChange={(e) => setCurResidueName(e.target.value)}
            />
          </CCol>
          <CCol>
            <CFormLabel>Description</CFormLabel>
            <CFormTextarea
              rows={3}
              value={curResidueDesc}
              onChange={(e) => setCurResidueDesc(e.target.value)}
            ></CFormTextarea>
          </CCol>
          <CCol>
            <CFormLabel>Note</CFormLabel>
            <CFormInput
              placeholder="Note"
              value={curResidueNote}
              onChange={(e) => setCurResidueNote(e.target.value)}
            />
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleAddColor}>
            Save changes
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
          <CModalTitle id="VerticallyCenteredExample">Residue Materials Remove</CModalTitle>
        </CModalHeader>
        <CModalBody>Do you want to remove current residue material?</CModalBody>
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

export default Residues
