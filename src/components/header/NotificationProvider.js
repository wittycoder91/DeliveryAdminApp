import { useCookies } from 'react-cookie'
import React, { useState, useEffect, createContext, useContext, useRef } from 'react'
import PropTypes from 'prop-types' // Import PropTypes

// Create a Context for Notifications
const NotificationContext = createContext()

export const useNotification = () => {
  return useContext(NotificationContext) // Custom hook to access the context
}

const NotificationProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies()
  const [notificationCount, setNotificationCount] = useState(0)
  const notificationCountRef = useRef(notificationCount)
  const [newData, setNewData] = useState([])
  const newDataRef = useRef(newData)

  useEffect(() => {
    notificationCountRef.current = notificationCount
  }, [notificationCount])

  useEffect(() => {
    newDataRef.current = newData
  }, [newData])

  useEffect(() => {
    const initialCount = cookies['notification'] || 0
    setNotificationCount(initialCount)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies['notification']])

  useEffect(() => {
    const initialData = cookies['notificationdata'] || []
    setNewData(initialData)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies['notificationdata']])

  useEffect(() => {
    let socket
    let retryAttempts = 0

    const connect = () => {
      socket = new WebSocket('ws://localhost:7000')

      socket.onopen = () => {
        console.log('WebSocket connection established')
        retryAttempts = 0
      }

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data)

        if (data.type === 'ADD_DELIVERY') {
          setNotificationCount(data.count)
          setCookie('notification', data.count)

          setNewData(data.data)
          setCookie('notificationdata', JSON.stringify(data.data), { path: '/' })
        }
        //  else if (data.type === 'PING') {
        //   socket.send(JSON.stringify({ type: 'PONG' })) // Respond to server's PING
        // }
      }

      socket.onclose = () => {
        console.log('WebSocket connection closed')
        if (retryAttempts < 5) {
          retryAttempts++
          console.log(`Retrying connection in ${retryAttempts * 2} seconds...`)
          setTimeout(connect, retryAttempts * 2000) // Retry with exponential backoff
        } else {
          console.error('Failed to reconnect after 5 attempts')
        }
      }

      socket.onerror = (error) => {
        console.error('WebSocket error:', error)
        socket.close()
      }
    }

    connect()

    return () => {
      socket.close() // Cleanup on component unmount
    }
  }, [cookies, setCookie])

  return (
    <NotificationContext.Provider
      value={{ notificationCount, setNotificationCount, newData, setNewData }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

// Add PropTypes validation
NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children as a required prop
}

export default NotificationProvider
