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
  CFormSelect,
  CForm,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilImage } from '@coreui/icons'
import { GrClose } from 'react-icons/gr'
import { useNavigate, useParams } from 'react-router-dom'
import FormWizard from 'react-form-wizard-component'
import 'react-form-wizard-component/dist/style.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Modal } from 'react-bootstrap'

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
  const [curDate, setCurDate] = useState('')
  const [curTime, setCurTime] = useState('')
  const [curPO, setCurPO] = useState('')
  const [curImageUrl, setCurImageUrl] = useState([])

  // Delivery Accept States
  const inspecResultDatas = [
    {
      value: 'Pass',
      label: 'Pass',
    },
    {
      value: 'Pass with Conditions',
      label: 'Pass with Conditions',
    },
  ]
  const [validated, setValidated] = useState(false)
  const [allPackages, setAllPackages] = useState([])
  const [allQualitys, setAllQualitys] = useState([])
  const [visible, setVisible] = useState(false)
  const [curDeliveryTotalAmount, setDeliveryTotalAmount] = useState(0)
  const [curDeliveryTareAmount, setDeliveryTareAmount] = useState(0)
  const [curDeliveryQuality, setDeliveryQuality] = useState('')
  const [curDeliveryPkgsCount, setDeliveryPkgsCount] = useState(0)
  const [curDeliveryPackaging, setDeliveryPackaging] = useState('')
  const [curDeliveryInspection, setDeliveryInspection] = useState('pass')
  const [curDeliveryFeedback, setDeliveryFeedback] = useState('')
  const [uploadedAcceptImages, setUploadedAcceptImages] = useState([])
  const [uploadedAcceptImageDatas, setUploadedAcceptImageDatas] = useState([])
  const [curSDS, setCurSDS] = useState('')
  const [curNote, setCurNote] = useState('')
  const [activeAcceptIndex, setActiveAcceptIndex] = useState(0)

  // Delivery Price states
  const [priceVisible, setPriceVisible] = useState(false)
  const [curPrice, setCurPrice] = useState(0)

  // Delivery disapprove states
  const [disApproveVisible, setDisApproveVisible] = useState(false)
  const [curDisApproveFeedback, setDisApproveFeedback] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
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
        const updatedAvatarPaths = response.data.data?.avatarPath.map((path) =>
          path.replace(/\\/g, '/'),
        )
        setCurImageUrl(updatedAvatarPaths)
        setCurDate(response.data.data?.date)
        setCurTime(new Date(response.data.data?.time * 1000).toISOString().substr(11, 8))
        setCurDeliveryIndex(response.data.data?.status)
        setCurPO(response.data.data?.po)
        setCurSDS(response.data.data?.sdsPath)
        setCurNote(response.data.data?.note)
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
    setCurImageUrl([])
    setCurDate('')
    setCurTime('')
    setCurPO('')
    setCurSDS('')
    setCurNote('')
  }

  // Preview the upload Disapprove Image
  const handleReject = () => {
    setDisApproveVisible(!disApproveVisible)
    setActiveIndex(0)
    setDisApproveFeedback('')
    setUploadedImages([])
    setUploadedImageDatas([])
  }
  const handleImageChange = (event) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const newFiles = Array.from(files)
      setUploadedImageDatas((prev) => [...prev, ...newFiles])

      const newImages = newFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      })

      Promise.all(newImages)
        .then((images) => {
          setUploadedImages((prev) => [...prev, ...images])
          setActiveIndex((prev) => (prev === 0 ? 0 : prev))
        })
        .catch((err) => console.error(err))
    }
  }

  const handleRemoveImage = (index) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index))
    setUploadedImageDatas((prevDatas) => {
      if (Array.isArray(prevDatas)) {
        return prevDatas.filter((_, i) => i !== index)
      }
      return []
    })

    let newActiveIndex = activeIndex
    if (uploadedImages.length === 1) {
      newActiveIndex = 0
    } else if (index === uploadedImages.length - 1) {
      newActiveIndex = activeIndex - 1
    } else if (index < activeIndex) {
      newActiveIndex = activeIndex - 1
    }

    setActiveIndex(newActiveIndex)
  }
  const handleDisApproveSave = async () => {
    if (uploadedImageDatas.length === 0) {
      showErrorMsg('Please upload the images')
      return
    }
    if (curDisApproveFeedback.length === 0) {
      showErrorMsg('Please input the disapporve reason')
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

  // Delivery Accept
  const setInitialDeliveryVal = () => {
    setDeliveryTotalAmount(0)
    setDeliveryTareAmount(0)
    setDeliveryQuality('')
    setDeliveryPkgsCount(0)
    setDeliveryPackaging('')
    setDeliveryInspection('')
    setDeliveryFeedback('')
    setUploadedAcceptImageDatas([])
    setUploadedAcceptImages([])
    setActiveAcceptIndex(0)

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
    if (curPrice.length === 0 || isNaN(parseFloat(curPrice))) {
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
  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)

    if (uploadedAcceptImages.length === 0) return

    const formData = new FormData()
    for (let i = 0; i < uploadedAcceptImageDatas.length; i++) {
      formData.append('images', uploadedAcceptImageDatas[i])
    }
    formData.append('selID', selId)
    formData.append('status', curDeliveryIndex)
    formData.append('totalamount', curDeliveryTotalAmount)
    formData.append('tareamount', curDeliveryTareAmount)
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
    const files = event.target.files
    if (files && files.length > 0) {
      const newFiles = Array.from(files)

      setUploadedAcceptImageDatas((prev) => [...prev, ...newFiles])

      const newImages = newFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      })

      Promise.all(newImages)
        .then((images) => {
          setUploadedAcceptImages((prev) => [...prev, ...images])
          setActiveAcceptIndex((prev) => (prev === 0 ? 0 : prev))
        })
        .catch((err) => console.error(err))
    }
  }

  const handleAcceptRemoveImage = (index) => {
    setUploadedAcceptImages((prevImages) => prevImages.filter((_, i) => i !== index))
    setUploadedAcceptImageDatas((prevDatas) => {
      if (Array.isArray(prevDatas)) {
        return prevDatas.filter((_, i) => i !== index)
      }
      return []
    })

    let newActiveIndex = activeIndex
    if (uploadedImages.length === 1) {
      newActiveIndex = 0
    } else if (index === uploadedImages.length - 1) {
      newActiveIndex = activeIndex - 1
    } else if (index < activeIndex) {
      newActiveIndex = activeIndex - 1
    }

    setActiveAcceptIndex(newActiveIndex)
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

  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')

  const handleImageClick = (image) => {
    setSelectedImage(image)
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedImage('')
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
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>Note</CFormLabel>
                <CFormTextarea rows={3} value={curNote} readOnly />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-2">
              <CFormLabel>Material Photo Upload</CFormLabel>
              <Carousel showThumbs={false} className="w-100">
                {curImageUrl.length > 0 &&
                  curImageUrl.map((image, index) => (
                    <div
                      key={index}
                      className="position-relative"
                      onClick={() => handleImageClick(image)}
                    >
                      <img
                        src={`${process.env.REACT_APP_UPLOAD_URL}${image}`}
                        style={{ height: '300px', objectFit: 'contain' }}
                        alt=""
                      />
                    </div>
                  ))}
              </Carousel>
            </CCol>
            <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
              <Modal.Body className="p-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <img
                  src={`${process.env.REACT_APP_UPLOAD_URL}${selectedImage}`}
                  alt="Selected"
                  style={{ width: '100%', maxHeight: '100vh', objectFit: 'contain' }}
                />
              </Modal.Body>
            </Modal>
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
          <CForm
            className="g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CModalHeader>
              <CModalTitle id="VerticallyCenteredScrollableExample2">Delivery</CModalTitle>
            </CModalHeader>
            <CModalBody className="d-flex flex-column gap-2" style={{ height: '500px' }}>
              <CCol>
                <CFormLabel>Total Weight (LBS)</CFormLabel>
                <CFormInput
                  placeholder="Total Weight"
                  type="number"
                  value={curDeliveryTotalAmount}
                  onChange={(e) => setDeliveryTotalAmount(e.target.value)}
                  feedbackInvalid="Please input the total weight."
                  required
                />
              </CCol>
              <CCol>
                <CFormLabel>Tare Weight (LBS)</CFormLabel>
                <CFormInput
                  placeholder="Tare Weight"
                  type="number"
                  value={curDeliveryTareAmount}
                  onChange={(e) => setDeliveryTareAmount(e.target.value)}
                  feedbackInvalid="Please input the tare weight."
                  required
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
                  feedbackInvalid="Please select the quality grade."
                  required
                />
              </CCol>
              <CCol>
                <CFormLabel># of Pkgs</CFormLabel>
                <CFormInput
                  placeholder="# of Pkgs"
                  type="number"
                  value={curDeliveryPkgsCount}
                  onChange={(e) => setDeliveryPkgsCount(e.target.value)}
                  feedbackInvalid="Please input the # of pkgs."
                  required
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
                  feedbackInvalid="Please select the packaging."
                  required
                />
              </CCol>
              <CCol>
                <CFormLabel>Inspection Results</CFormLabel>
                <CFormSelect
                  options={inspecResultDatas?.map((quality) => ({
                    label: quality.label,
                    value: quality.value,
                  }))}
                  value={curDeliveryInspection}
                  onChange={(e) => setDeliveryInspection(e.target.value)}
                  feedbackInvalid="Please select the inspection results."
                  required
                />
              </CCol>
              <CCol>
                <CFormLabel>Delivery Feedback</CFormLabel>
                <CFormTextarea
                  rows={3}
                  value={curDeliveryFeedback}
                  onChange={(e) => setDeliveryFeedback(e.target.value)}
                />
              </CCol>
              <CCol>
                <CFormLabel>Upload copy of BOL, scale tickets and material photos</CFormLabel>
                <CInputGroup className="">
                  <CInputGroupText>
                    <CIcon icon={cilImage} />
                  </CInputGroupText>
                  <CFormInput
                    type="file"
                    placeholder="Upload Delivery Feedback Images "
                    accept="image/*"
                    multiple
                    onChange={handleDeliveryImageChange}
                    required
                  />
                </CInputGroup>
              </CCol>
              <Carousel
                showThumbs={false}
                selectedItem={Math.min(activeAcceptIndex, uploadedAcceptImages.length - 1)}
                onChange={setActiveAcceptIndex}
                className="mt-4"
              >
                {uploadedAcceptImages.length > 0 &&
                  uploadedAcceptImages.map((image, index) => (
                    <div key={index} className="position-relative">
                      <div
                        className="position-absolute top-0 cursor-pointer zindex-100"
                        style={{ right: '40px' }}
                        onClick={() => handleAcceptRemoveImage(index)}
                      >
                        <GrClose />
                      </div>
                      <div>
                        <img src={image} style={{ height: '300px', objectFit: 'contain' }} alt="" />
                      </div>
                    </div>
                  ))}
              </Carousel>
              {uploadedAcceptImages.length <= 0 && (
                <div className="text-danger">Please upload the images.</div>
              )}
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton color="primary" type="submit">
                Accept
              </CButton>
            </CModalFooter>
          </CForm>
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
            <CModalTitle id="VerticallyCenteredScrollableExample2">
              Please input Unit Price
            </CModalTitle>
          </CModalHeader>
          <CModalBody className="d-flex flex-column gap-2">
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
            <CButton color="secondary" onClick={() => setPriceVisible(false)}>
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
              <CInputGroup className="mt-2">
                <CInputGroupText>
                  <CIcon icon={cilImage} />
                </CInputGroupText>
                <CFormInput
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </CInputGroup>
            </CInputGroup>
            <Carousel
              showThumbs={false}
              selectedItem={Math.min(activeIndex, uploadedImages.length - 1)}
              onChange={setActiveIndex}
            >
              {uploadedImages.length > 0 &&
                uploadedImages.map((image, index) => (
                  <div key={index} className="position-relative">
                    <div
                      className="position-absolute top-0 cursor-pointer zindex-100"
                      style={{ right: '40px' }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <GrClose />
                    </div>
                    <div>
                      <img src={image} style={{ height: '300px', objectFit: 'contain' }} alt="" />
                    </div>
                  </div>
                ))}
            </Carousel>
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
