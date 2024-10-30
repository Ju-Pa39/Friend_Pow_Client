import React from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from './../../stores/AuthStore';

export default function Navbar() {

    const user = useAuthStore((state) => state.user)
    const actionLogout = useAuthStore((state) => state.actionLogout);



    console.log("Current user data:", user);

    const hdlClickLogout = () => {
        actionLogout();
    };

    return (
        <div>
            <nav className="top-0 left-0 w-full flex justify-between px-4 md:px-8 h-24 items-center bg-red-500 fixed z-20">

                <div className="w-32 h-20 md:flex gap-8 flex items-center ">
                    <h1 className='text-3xl'>LOGO</h1>
                </div>


                <div className="hidden md:flex gap-8 text-white">
                    <Link to="/" className="font-head">Home</Link>
                    <Link to="/about" className="font-head">About</Link>
                    <Link to="/adopt" className="font-head">Adopt</Link>
                    <Link to="/donate" className="font-head">Donate</Link>
                    <Link to="/event" className="font-head">Event</Link>
                    <Link to="/contact" className="font-head">Contact</Link>
                </div>
                <div className="hidden md:flex gap-8 text-white">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            {/* วงกลมที่แสดงตัวอักษร */}
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white font-bold">
                                <span className="text-white">
                                    {((user?.user?.firstname?.charAt(0).toUpperCase() || user?.user?.role?.charAt(0).toUpperCase())) || ((user?.firstname?.charAt(0).toUpperCase() || user?.role?.charAt(0).toUpperCase()))}
                                </span>

                            </div>

                            <Link onClick={hdlClickLogout} to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Logout
                            </Link>
                        </div>
                    )
                        : (
                            <div className='flex gap-10'>
                                <Link to="/register" className="font-head">Register</Link>
                                <Link to="/login" className="font-head">Login</Link>
                            </div>
                        )}

                </div>
            </nav>
        </div>
    )
}
