import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CCarousel,
  CCarouselItem,
  CImage,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilImage } from '@coreui/icons'
import { useNavigate, useParams } from 'react-router-dom'
import FormWizard from 'react-form-wizard-component'
import 'react-form-wizard-component/dist/style.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import api from 'src/services'
import { API_URLS } from 'src/config/Constants'
import { showWarningMsg, showErrorMsg } from 'src/config/common'

const DeliveryprocessDetail = () => {
  const { id: selId } = useParams()
  const navigate = useNavigate()

  // Delivery States
  const [curDeliveryIndex, setCurDeliveryIndex] = useState(0)
  const [curSupplier, setCurSupplier] = useState('')
  const [curMaterial, setCurMaterial] = useState('')
  const [curWeight, setCurWeight] = useState('')
  const [curPackaging, setCurPackaging] = useState('')
  const [curCountPackage, setCurCountPackage] = useState('')
  const [curResidue, setCurResidue] = useState('')
  const [curColor, setCurColor] = useState('')
  const [curCondition, setCurCondition] = useState('')
  const [curLogoPreview, setCurLogoPreview] = useState('')
  const [curDate, setCurDate] = useState('')
  const [curTime, setCurTime] = useState('')
  const [curPO, setCurPO] = useState('')
  // Delivery States
  const [allPackages, setAllPackages] = useState([])
  const [allQualitys, setAllQualitys] = useState([])
  const [visible, setVisible] = useState(false)
  const [curDeliveryTotalAmount, setDeliveryTotalAmount] = useState(0)
  const [curDeliveryTareAmount, setDeliveryTareAmount] = useState(0)
  const [curDeliveryNetAmount, setDeliveryNetAmount] = useState(0)
  const [curDeliveryQuality, setDeliveryQuality] = useState('')
  const [curDeliveryPkgsCount, setDeliveryPkgsCount] = useState(0)
  const [curDeliveryPackaging, setDeliveryPackaging] = useState('')
  const [curDeliveryInspection, setDeliveryInspection] = useState('')
  const [curDeliveryFeedback, setDeliveryFeedback] = useState('')
  const [curDeliveryImage, setcurDeliveryImage] = useState(null)
  const [curImage, setCurImage] = useState('')
  const [curSDS, setCurSDS] = useState('')
  // Delivery Price states
  const [priceVisible, setPriceVisible] = useState(false)
  const [curPrice, setCurPrice] = useState(0)
  // Delivery disapprove states
  const [disApproveVisible, setDisApproveVisible] = useState(false)
  const [curDisApproveFeedback, setDisApproveFeedback] = useState('')
  const [uploadedImages, setUploadedImages] = useState([])
  const [uploadedImageDatas, setUploadedImageDatas] = useState([])

  useEffect(() => {
    getAllPackages()
    getAllQualitys()
    getSelDelivery()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAllPackages = async () => {
    try {
      const response = await api.get(API_URLS.GETALLPACKAGES)

      if (response.data.success) {
        setAllPackages(response.data.data)

        if (response.data.data?.length > 0) setDeliveryPackaging(response.data.data[0]._id)
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
  const getAllQualitys = async () => {
    try {
      const response = await api.get(API_URLS.GETALLQUALITYS)

      if (response.data.success) {
        setAllQualitys(response.data.data)

        if (response.data.data?.length > 0) setDeliveryQuality(response.data.data[0]._id)
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
  const getSelDelivery = async () => {
    getInitialValue()

    try {
      const response = await api.get(API_URLS.GETSELDELIVERY, {
        params: {
          selDeliveryId: selId,
        },
      })

      if (response.data.success && response.data.data) {
        setCurSupplier(response.data.data?.username)
        setCurMaterial(response.data.data?.material)
        setCurWeight(response.data.data?.weight)
        setCurPackaging(response.data.data?.packaging)
        setCurCountPackage(response.data.data?.countpackage)
        setCurColor(response.data.data?.color)
        setCurCondition(response.data.data?.condition)
        setCurLogoPreview(response.data.data?.avatarPath)
        setCurDate(response.data.data?.date)
        setCurTime(new Date(response.data.data?.time * 1000).toISOString().substr(11, 8))
        setCurDeliveryIndex(response.data.data?.status)
        setCurPO(response.data.data?.po)
        setCurSDS(response.data.data?.sdsPath)
        if (response.data.data?.residue === 'Other') {
          setCurResidue(response.data.data?.other)
        } else {
          setCurResidue(response.data.data?.residue)
        }
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
  const getInitialValue = () => {
    setCurSupplier('')
    setCurMaterial('')
    setCurWeight('')
    setCurPackaging('')
    setCurCountPackage('')
    setCurResidue('')
    setCurColor('')
    setCurCondition('')
    setCurLogoPreview('')
    setCurDate('')
    setCurTime('')
    setCurPO('')
    setCurSDS('')
  }

  // Preview the upload Disapprove Image
  const handleReject = () => {
    setDisApproveVisible(!disApproveVisible)
    setDisApproveFeedback('')
    setUploadedImages([])
    setUploadedImageDatas([])
  }
  const handleImageChange = (event) => {
    const files = event.target.files

    if (files && files.length > 0) {
      setUploadedImageDatas(files)

      const newImages = Array.from(files).map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      })

      Promise.all(newImages)
        .then((images) => {
          setUploadedImages((prevImages) => [...prevImages, ...images])
        })
        .catch((err) => console.error(err))
    }
  }
  const handleDisApproveSave = async () => {
    if (uploadedImageDatas.length === 0 || curDisApproveFeedback.length === 0) {
      showErrorMsg('There are some missing fields')
      return
    }

    const formData = new FormData()
    for (let i = 0; i < uploadedImageDatas.length; i++) {
      formData.append('images', uploadedImageDatas[i])
    }
    formData.append('reason', curDisApproveFeedback)
    formData.append('selID', selId)

    try {
      const response = await api.post(API_URLS.ADDREJECTDELIVERY, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success) {
        setDisApproveVisible(false)

        navigate('/data/deliverylogs')
      } else {
        showErrorMsg(response.data.message)
      }
    } catch (error) {
      console.error(error)
      showErrorMsg('An error occurred while saving disapproval')
    }
  }

  const setInitialDeliveryVal = () => {
    setDeliveryTotalAmount(0)
    setDeliveryTareAmount(0)
    setDeliveryNetAmount(0)
    setDeliveryQuality('')
    setDeliveryPkgsCount(0)
    setDeliveryPackaging('')
    setDeliveryInspection('')
    setDeliveryFeedback('')
    setcurDeliveryImage(null)
    setCurImage('')

    if (allPackages.length > 0) {
      setDeliveryPackaging(allPackages[0]._id)
    }
    if (allQualitys.length > 0) {
      setDeliveryQuality(allQualitys[0]._id)
    }
  }
  const setInitialPriceVal = () => {
    setCurPrice(0)
  }
  const handleConfirm = async () => {
    if (curDeliveryIndex === 0) {
      setPriceVisible(!priceVisible)
      setInitialPriceVal()
    } else if (curDeliveryIndex === 2) {
      setVisible(!visible)
      setInitialDeliveryVal()
    } else {
      try {
        const response = await api.post(API_URLS.UPDATESELDELIVERY, {
          selDeliveryId: selId,
          status: curDeliveryIndex,
          price: 0,
        })

        if (response.data.success) {
          navigate('/data/deliveryprocess')
        } else {
          showWarningMsg(response.data.message)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
  const handlePriceSave = async () => {
    if (curPrice.length === 0 || isNaN(parseInt(curPrice))) {
      showErrorMsg('Please input the price')
    } else {
      try {
        const response = await api.post(API_URLS.UPDATESELDELIVERY, {
          selDeliveryId: selId,
          status: curDeliveryIndex,
          price: curPrice,
        })

        if (response.data.success) {
          navigate('/data/deliveryprocess')
        } else {
          showWarningMsg(response.data.message)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
  const handleSave = async () => {
    if (
      curDeliveryTotalAmount < 0 ||
      isNaN(parseFloat(curDeliveryTotalAmount)) ||
      curDeliveryTareAmount < 0 ||
      isNaN(parseFloat(curDeliveryTareAmount)) ||
      curDeliveryNetAmount < 0 ||
      isNaN(parseFloat(curDeliveryNetAmount)) ||
      curDeliveryPkgsCount < 0 ||
      isNaN(parseFloat(curDeliveryPkgsCount)) ||
      curDeliveryQuality.length === 0 ||
      curDeliveryPackaging.length === 0 ||
      curDeliveryInspection.length === 0 ||
      curDeliveryFeedback.length === 0 ||
      curImage.length === 0
    ) {
      showErrorMsg('There are some missing fields')
      return
    }

    const formData = new FormData()
    formData.append('image', curImage)
    formData.append('selID', selId)
    formData.append('status', curDeliveryIndex)
    formData.append('totalamount', curDeliveryTotalAmount)
    formData.append('tareamount', curDeliveryTareAmount)
    formData.append('netamount', curDeliveryNetAmount)
    formData.append('quality', curDeliveryQuality)
    formData.append('pkgscount', curDeliveryPkgsCount)
    formData.append('package', curDeliveryPackaging)
    formData.append('insepction', curDeliveryInspection)
    formData.append('feedback', curDeliveryFeedback)
    try {
      const response = await api.post(API_URLS.ADDFEEDBACKDELIVERY, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success) {
        setVisible(false)
        navigate('/data/deliverylogs')
      } else {
        showErrorMsg(response.data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleDeliveryImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setCurImage(file)

      const reader = new FileReader()
      reader.onload = () => {
        setcurDeliveryImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  const handleDownloadSDS = async () => {
    const fileUrl = `${process.env.REACT_APP_UPLOAD_URL}${curSDS.replace(/\\/g, '/')}`

    try {
      const response = await fetch(fileUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch file')
      }
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download = curSDS.split('\\').pop()
      document.body.appendChild(link)
      link.click()

      URL.revokeObjectURL(blobUrl)
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <h3 className="px-3 pt-3 mb-0">Delivery Process Information</h3>
          <FormWizard key={curDeliveryIndex} startIndex={curDeliveryIndex} color="#094899">
            <FormWizard.TabContent title="Waiting" icon="fa-solid fa-hourglass-half">
              <h3>Waiting</h3>
              <p>Your delivery status is Waiting.</p>
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Pending for Receiving" icon="fa-solid fa-check">
              <h3>Pending for Receiving</h3>
              <p>Your delivery status is Pending for Receiving.</p>
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Received" icon="fa fa-city">
              <h3>Received</h3>
              <p>Your delivery status is Received</p>
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Accepted" icon="fa-solid fa-caravan">
              <h3>Accepted</h3>
              <p>Your delivery status is Accepted</p>
            </FormWizard.TabContent>
          </FormWizard>
          <CCardBody className="d-flex flex-column pt-0 gap-2">
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Supplier</CFormLabel>
                <CFormInput value={curSupplier} readOnly />
              </CCol>
              <CCol>
                <CFormLabel>Material</CFormLabel>
                <CFormInput value={curMaterial} readOnly />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Estimated Weight(lbs)</CFormLabel>
                <CFormInput value={curWeight} readOnly />
              </CCol>
              <CCol>
                <CFormLabel>Packaging</CFormLabel>
                <CFormInput value={curPackaging} readOnly />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Estimated # of Packages </CFormLabel>
                <CFormInput value={curCountPackage} readOnly />
              </CCol>
              <CCol>
                <CFormLabel>Color</CFormLabel>
                <CFormInput value={curColor} readOnly />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Residue Material</CFormLabel>
                <CFormInput value={curResidue} readOnly />
              </CCol>
              <CCol>
                <CFormLabel>Conditions</CFormLabel>
                <CFormInput value={curCondition} readOnly />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Date</CFormLabel>
                <CFormInput value={curDate} readOnly />
              </CCol>
              <CCol>
                <CFormLabel>Time</CFormLabel>
                <CFormInput value={curTime} readOnly />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>PO</CFormLabel>
                <CFormInput value={curPO > 0 ? curPO : ''} readOnly />
              </CCol>
              {curSDS.length > 0 && (
                <CCol className="d-flex flex-column">
                  <CFormLabel>SDS sheet</CFormLabel>
                  <CButton color="primary" className="w-max" onClick={handleDownloadSDS}>
                    Download
                  </CButton>
                </CCol>
              )}
            </CCol>
            {curLogoPreview && (
              <div className="mb-4 text-center">
                <p className="text-body-secondary">Delivery Uploaded Image:</p>
                <img
                  src={`${process.env.REACT_APP_UPLOAD_URL}${curLogoPreview}`}
                  alt="Delivery"
                  style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '5px' }}
                />
              </div>
            )}
            <CCol className="d-flex justify-content-end gap-3 me-4">
              {(curDeliveryIndex === 0 || curDeliveryIndex === 2) && (
                <CButton color="warning" className="wid-110" onClick={handleReject}>
                  {curDeliveryIndex === 0 ? 'Disapprove' : curDeliveryIndex === 2 ? 'Reject' : ''}
                </CButton>
              )}
              <CButton color="primary" className="wid-110 dark-blue" onClick={handleConfirm}>
                {curDeliveryIndex === 0
                  ? 'Approve'
                  : curDeliveryIndex === 1
                    ? 'Received'
                    : curDeliveryIndex === 2
                      ? 'Accept'
                      : 'Confirm'}
              </CButton>
            </CCol>
          </CCardBody>
        </CCard>
        {/* Delivery Modal */}
        <CModal
          alignment="center"
          scrollable
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="VerticallyCenteredScrollableExample2"
        >
          <CModalHeader>
            <CModalTitle id="VerticallyCenteredScrollableExample2">Delivery</CModalTitle>
          </CModalHeader>
          <CModalBody className="d-flex flex-column gap-2">
            <CCol>
              <CFormLabel>Total Weight (LBS)</CFormLabel>
              <CFormInput
                placeholder="Total Weight"
                type="number"
                value={curDeliveryTotalAmount}
                onChange={(e) => setDeliveryTotalAmount(e.target.value)}
              />
            </CCol>
            <CCol>
              <CFormLabel>Tare Weight (LBS)</CFormLabel>
              <CFormInput
                placeholder="Tare Weight"
                type="number"
                value={curDeliveryTareAmount}
                onChange={(e) => setDeliveryTareAmount(e.target.value)}
              />
            </CCol>
            <CCol>
              <CFormLabel>Net Weight (LBS)</CFormLabel>
              <CFormInput
                placeholder="Net Weight"
                type="number"
                value={curDeliveryNetAmount}
                onChange={(e) => setDeliveryNetAmount(e.target.value)}
              />
            </CCol>
            <CCol>
              <CFormLabel>Quality grade</CFormLabel>
              <CFormSelect
                options={allQualitys?.map((quality) => ({
                  label: quality.name,
                  value: quality._id,
                }))}
                value={curDeliveryQuality}
                onChange={(e) => setDeliveryQuality(e.target.value)}
              />
            </CCol>
            <CCol>
              <CFormLabel># of Pkgs</CFormLabel>
              <CFormInput
                placeholder="# of Pkgs"
                type="number"
                value={curDeliveryPkgsCount}
                onChange={(e) => setDeliveryPkgsCount(e.target.value)}
              />
            </CCol>
            <CCol>
              <CFormLabel>packaging</CFormLabel>
              <CFormSelect
                options={allPackages?.map((pkg) => ({
                  label: pkg.name,
                  value: pkg._id,
                }))}
                value={curDeliveryPackaging}
                onChange={(e) => setDeliveryPackaging(e.target.value)}
              />
            </CCol>
            <CCol>
              <CFormLabel>Inspection Results</CFormLabel>
              <CFormInput
                placeholder="Inspection Results"
                value={curDeliveryInspection}
                onChange={(e) => setDeliveryInspection(e.target.value)}
              />
            </CCol>
            <CCol>
              <CFormLabel>Delivery Feedback</CFormLabel>
              <CFormTextarea
                rows={3}
                value={curDeliveryFeedback}
                onChange={(e) => setDeliveryFeedback(e.target.value)}
              ></CFormTextarea>
            </CCol>
            <CInputGroup className="mb-4">
              <CInputGroupText>
                <CIcon icon={cilImage} />
              </CInputGroupText>
              <CFormInput
                type="file"
                placeholder="Upload Supplier Logo"
                accept="image/*"
                onChange={handleDeliveryImageChange}
              />
            </CInputGroup>
            {curDeliveryImage && (
              <div className="mb-4 text-center">
                <p className="text-body-secondary">Delivery Image Preview:</p>
                <img
                  src={curDeliveryImage}
                  alt="Delivery"
                  style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '5px' }}
                />
              </div>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={handleSave}>
              Save changes
            </CButton>
          </CModalFooter>
        </CModal>
        {/* Delivery Price Modal */}
        <CModal
          alignment="center"
          scrollable
          visible={priceVisible}
          onClose={() => setPriceVisible(false)}
          aria-labelledby="VerticallyCenteredScrollableExample2"
        >
          <CModalHeader>
            <CModalTitle id="VerticallyCenteredScrollableExample2">Delivery Price</CModalTitle>
          </CModalHeader>
          <CModalBody className="d-flex flex-column gap-2">
            <CCol>
              <CFormLabel>Price</CFormLabel>
              <CFormInput
                placeholder="Price"
                type="number"
                value={curPrice}
                onChange={(e) => setCurPrice(e.target.value)}
              />
            </CCol>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={handlePriceSave}>
              Confirm
            </CButton>
          </CModalFooter>
        </CModal>
        {/* Disapprove Modal */}
        <CModal
          alignment="center"
          scrollable
          visible={disApproveVisible}
          onClose={() => setDisApproveVisible(false)}
          aria-labelledby="VerticallyCenteredScrollableExample2"
        >
          <CModalHeader>
            <CModalTitle id="VerticallyCenteredScrollableExample2">
              Disapprove Information
            </CModalTitle>
          </CModalHeader>
          <CModalBody className="d-flex flex-column gap-2">
            <CCol>
              <CFormLabel>Disapprove Reason</CFormLabel>
              <CFormTextarea
                rows={3}
                value={curDisApproveFeedback}
                onChange={(e) => setDisApproveFeedback(e.target.value)}
              ></CFormTextarea>
            </CCol>
            <CInputGroup className="mt-2">
              <CInputGroupText>
                <CIcon icon={cilImage} />
              </CInputGroupText>
              <CFormInput type="file" multiple accept="image/*" onChange={handleImageChange} />
            </CInputGroup>
            {uploadedImages.length > 0 && (
              <CCarousel controls indicators dark>
                {uploadedImages.map((image, index) => (
                  <CCarouselItem key={index}>
                    <CImage
                      className="d-block w-100 image-slider"
                      src={image}
                      alt={`Uploaded slide ${index + 1}`}
                    />
                  </CCarouselItem>
                ))}
              </CCarousel>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setDisApproveVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={handleDisApproveSave}>
              Confirm
            </CButton>
          </CModalFooter>
        </CModal>
      </CCol>
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
    </CRow>
  )
}

export default DeliveryprocessDetail
