import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const navigate = useNavigate()
  const [curUserId, setCurUserId] = useState('')
  const [curPassword, setCurPassword] = useState('')

  const handleLogin = () => {
    if (curUserId.length === 0 || curPassword.length === 0) {
      toast.warn('Please enter both username and password', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    } else {
      navigate(`/dashboard`)
      localStorage.setItem('login', 'success')
    }
  }

  return (
    <div className="auth-back bakground-no-repeat background-size-cover bg-body-tertiary h-100 min-vh-100 d-flex flex-row align-items-center">
      <CContainer className="h-75">
        <CRow className="h-100 justify-content-center">
          <CCardGroup>
            <CCard className="p-4">
              <CCardBody className="d-flex justify-content-center align-items-center">
                <CForm className="w-100">
                  <h1>Log in to your Account</h1>
                  <p className="text-body-secondary">Welcome back! Select method to log in</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      onChange={(e) => setCurUserId(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      onChange={(e) => setCurPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CCol className="w-100 mt-4">
                    <CButton className="w-100 px-4 dark-blue" onClick={handleLogin}>
                      Login
                    </CButton>
                  </CCol>
                  <CCol className="w-100 mt-4 text-center">
                    <p className="text-body-secondary">
                      Don&#39;t have an account?
                      <Link to="/register" className="text-decoration-none">
                        <strong> Create an account</strong>
                      </Link>
                    </p>
                  </CCol>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard className="border-0 text-white authlogo-back bakground-no-repeat background-size-cover authlogo-back d-none d-sm-flex py-5">
              <CCardBody className="d-flex justify-content-center align-items-center text-center">
                <CRow className="justify-content-center align-items-center gap-3">
                  <img src="./logo_transparent.png" className="authlogo" alt="" />
                  <h1>Welcome Admin Page</h1>
                </CRow>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CRow>
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
      </CContainer>
    </div>
  )
}

export default Login
