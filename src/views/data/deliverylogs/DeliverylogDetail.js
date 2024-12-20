import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CCarousel,
  CCarouselItem,
  CImage,
  CButton,
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import api from 'src/services'
import { API_URLS } from 'src/config/Constants'
import { showWarningMsg, showErrorMsg } from 'src/config/common'

const DeliverylogDetail = () => {
  const { id: selId } = useParams()

  // Delivery States
  const [curSupplier, setCurSupplier] = useState('')
  const [curMaterial, setCurMaterial] = useState('')
  const [curWeight, setCurWeight] = useState('')
  const [curPackaging, setCurPackaging] = useState('')
  const [curCountPackage, setCurCountPackage] = useState('')
  const [curResidue, setCurResidue] = useState('')
  const [curColor, setCurColor] = useState('')
  const [curCondition, setCurCondition] = useState('')
  const [curDeliveryPreview, setCurDeliveryPreview] = useState('')
  const [curDate, setCurDate] = useState('')
  const [curTime, setCurTime] = useState('')
  const [curPO, setCurPO] = useState('')
  const [curStatus, setCurStatus] = useState(-1)
  const [curFeedback, setCurFeedback] = useState('')
  const [curTareWeight, setCurTareWeight] = useState('')
  const [curNetWeight, setCurNetWeight] = useState('')
  const [curQuality, setCurQuality] = useState('')
  const [curInspection, setCurInspection] = useState('')
  const [curSDS, setCurSDS] = useState('')
  const [curFeebackImage, setCurFeebackImage] = useState('')
  const [curRejectImages, setCurRejectImages] = useState([])

  console.log(curTareWeight)
  useEffect(() => {
    getSelDelivery()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getSelDelivery = async () => {
    getInitialValue()

    try {
      const response = await api.get(API_URLS.GETSELDELIVERYLOG, {
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
        setCurResidue(response.data.data?.residue)
        setCurCondition(response.data.data?.condition)
        setCurDeliveryPreview(response.data.data?.avatarPath)
        setCurDate(response.data.data?.date)
        setCurTime(new Date(response.data.data?.time * 1000).toISOString().substr(11, 8))
        setCurPO(response.data.data?.po)
        setCurStatus(response.data.data?.status)
        setCurFeedback(response.data.data?.feedback)
        setCurTareWeight(response.data.data?.tareamount)
        setCurNetWeight(response.data.data?.netamount)
        setCurQuality(response.data.data?.quality)
        setCurInspection(response.data.data?.insepction)
        setCurSDS(response.data.data?.sdsPath)
        if (response.data.data?.feedbackImage) {
          const rawAvatarPath = response.data.data?.feedbackImage
          const normalizedAvatarPath = rawAvatarPath.replace(/\\/g, '/')
          setCurFeebackImage(normalizedAvatarPath)
        }
        if (response.data.data?.rejectImages && response.data.data?.rejectImages?.length > 0) {
          let tempRejectImages = []
          for (let i = 0; i < response.data.data?.rejectImages.length; i++) {
            const rawRejectImage = response.data.data?.rejectImages[i]
            const rawRejectImagePath = rawRejectImage.replace(/\\/g, '/')
            tempRejectImages.push(rawRejectImagePath)
          }

          setCurRejectImages(tempRejectImages)
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
    setCurDeliveryPreview('')
    setCurDate('')
    setCurTime('')
    setCurPO('')
    setCurStatus(-1)
    setCurFeedback('')
    setCurTareWeight('')
    setCurNetWeight('')
    setCurQuality('')
    setCurInspection('')
    setCurFeedback('')
    setCurFeebackImage('')
    setCurRejectImages([])
    setCurSDS('')
  }

  const handleDownload = async () => {
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
          <h3 className="px-3 pt-3 mb-4">Delivery Information</h3>
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
                <CFormLabel>Weight(lbs)</CFormLabel>
                <CFormInput value={curWeight} readOnly />
              </CCol>
              <CCol>
                <CFormLabel>Packaging</CFormLabel>
                <CFormInput value={curPackaging} readOnly />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
              <CCol>
                <CFormLabel>The Total of packages</CFormLabel>
                <CFormInput placeholder=" Total of packages" value={curCountPackage} readOnly />
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
                <CFormLabel>Status</CFormLabel>
                <CFormInput value={curStatus === -1 ? 'Rejected' : 'Accepted'} readOnly />
              </CCol>
              <CCol>
                <CFormLabel>PO</CFormLabel>
                <CFormInput value={curPO > 0 ? curPO : ''} readOnly />
              </CCol>
            </CCol>
            {curStatus === 3 && (
              <>
                <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
                  <CCol>
                    <CFormLabel>Tare Weight</CFormLabel>
                    <CFormInput value={curTareWeight} readOnly />
                  </CCol>
                  <CCol>
                    <CFormLabel>Net Weight</CFormLabel>
                    <CFormInput value={curNetWeight} readOnly />
                  </CCol>
                </CCol>
                <CCol className="d-flex flex-wrap flex-md-row flex-column gap-4">
                  <CCol>
                    <CFormLabel>Inspection Results</CFormLabel>
                    <CFormInput value={curInspection} readOnly />
                  </CCol>
                  <CCol>
                    <CFormLabel>Quality grade</CFormLabel>
                    <CFormInput value={curQuality} readOnly />
                  </CCol>
                </CCol>
              </>
            )}
            <CCol>
              <CFormLabel>Feedback</CFormLabel>
              <CFormTextarea value={curFeedback} readOnly />
            </CCol>
            <CCol className="d-flex align-items-center justify-content-center flex-wrap flex-md-row flex-column gap-4">
              {curDeliveryPreview && (
                <div className="text-center">
                  <p className="text-body-secondary">Delivery Uploaded Image:</p>
                  <img
                    src={`${process.env.REACT_APP_UPLOAD_URL}${curDeliveryPreview}`}
                    alt="Delivery"
                    style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '5px' }}
                  />
                </div>
              )}
              {curFeebackImage && (
                <div className="text-center">
                  <p className="text-body-secondary">Delivery Feedback Image:</p>
                  <img
                    src={`${process.env.REACT_APP_UPLOAD_URL}${curFeebackImage}`}
                    alt="Delivery"
                    style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '5px' }}
                  />
                </div>
              )}
            </CCol>
            {curRejectImages.length > 0 && (
              <CCol className="mb-4">
                <div className="text-center">
                  <p className="text-body-secondary m-0 mb-2">Delivery Reject Feedback Image:</p>
                  <CCarousel controls indicators dark>
                    {curRejectImages.map((image, index) => (
                      <CCarouselItem key={index}>
                        <CImage
                          className="d-block w-100 image-slider"
                          src={`${process.env.REACT_APP_UPLOAD_URL}${image}`}
                          alt={`Uploaded slide ${index + 1}`}
                        />
                      </CCarouselItem>
                    ))}
                  </CCarousel>
                </div>
              </CCol>
            )}
            {curSDS.length > 0 && (
              <CCol className="d-flex justify-content-end gap-3 me-4">
                <CButton color="primary" className="wid-110" onClick={handleDownload}>
                  Download
                </CButton>
              </CCol>
            )}
          </CCardBody>
        </CCard>
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

export default DeliverylogDetail
