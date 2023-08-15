import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import styles from './App.module.scss'
import { getUser } from '../../utilities/users-service'

// Components
import AuthPage from '../AuthPage/AuthPage'
import NewOrderPage from '../NewOrderPage/NewOrderPage'
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage'

/* This React component serves as the main entry point of the application. 
It sets up routes using the react-router-dom library based on the user's 
authentication status and navigates users to different pages accordingly. */


export default function App() {
  const [user, setUser] = useState(getUser()) // gets user and stores in in user state
  return (
    <main className={styles.App}>
      { user ?
        <>
          <Routes>
            {/* client-side route that renders the component instance if the path matches the url in the address bar */}
            <Route path="/orders/new" element={<NewOrderPage user={user} setUser={setUser} />} />
            <Route path="/orders" element={<OrderHistoryPage user={user} setUser={setUser} />} />
            {/* redirect to /orders/new if path in address bar hasn't matched a <Route> above */}
            <Route path="/*" element={<Navigate to="/orders/new" />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  )
}