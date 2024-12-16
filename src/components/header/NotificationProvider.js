import React, { useState, useEffect, createContext, useContext } from 'react'
import PropTypes from 'prop-types' // Import PropTypes

// Create a Context for Notifications
const NotificationContext = createContext()

export const useNotification = () => {
  return useContext(NotificationContext) // Custom hook to access the context
}

const NotificationProvider = ({ children }) => {
  const [notificationCount, setNotificationCount] = useState(0)
  const [newData, setNewData] = useState([])

  useEffect(() => {
    let socket
    let retryAttempts = 0

    const connect = () => {
      socket = new WebSocket('ws://135.181.241.84:7000')

      socket.onopen = () => {
        console.log('WebSocket connection established')
        retryAttempts = 0 // Reset retry attempts on successful connection
      }

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data)

        if (data.type === 'ADD_DELIVERY') {
          console.log('add delivery notification received:', data)
          setNotificationCount(data.count)
          setNewData(data.data)
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
        socket.close() // Close the socket on error to trigger reconnection
      }
    }

    connect()

    return () => {
      socket.close() // Cleanup on component unmount
    }
  }, [])

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
