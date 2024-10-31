import Navbar from '@/src/components/admin-components/AdminNavbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function HomePageAdmin() {
    return (
        <div className='pt-24' >
            <Navbar />
            <Outlet />
        </div>
    )
}