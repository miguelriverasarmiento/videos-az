import React from 'react'
import { Navbar } from "../components/Navbar"
import { Sidebar } from "../components/Sidebar"

export const Home = () => {
  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex mt-4" style={{ height: "92.5vh" }}>
        <Sidebar />
      </div>
    </div>
  )
}
