import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoMdArrowDropdown } from "react-icons/io";

import useAuthStore from '../../stores/AuthStore';

export default function AdminNavbar() {

    const user = useAuthStore((state) => state.user)
    const actionLogout = useAuthStore((state) => state.actionLogout);
    const [isDropdownUserOpen, setDropdownUserOpen] = useState(false);
    const [isDropdownManageOpen, setDropdownManageOpen] = useState(false);
    const [isDropdownReportOpen, setDropdownReportOpen] = useState(false);





    

    const hdlClickLogout = () => {
        actionLogout();
    };

    const toggleDropdownUser = () => {
        setDropdownUserOpen(!isDropdownUserOpen);
    };
    const toggleDropdownManage = () => {
        setDropdownManageOpen(!isDropdownManageOpen);
    };
    const toggleDropdownReport = () => {
        setDropdownReportOpen(!isDropdownReportOpen);
    };



    return (
        <div>
            <nav className="top-0 left-0 w-full flex justify-between px-4 md:px-8 h-24 items-center bg-red-500 fixed z-20">

                <div className="w-32 h-20 md:flex gap-8 flex items-center ">
                    <h1 className='text-3xl'>LOGO</h1>
                </div>


                <div className="hidden md:flex gap-8 text-white">
                    <Link to="/admin" >หน้าแรก</Link>
                    <div className="relative flex items-center" onClick={toggleDropdownManage}>
                        <h1 >จัดการ</h1>
                        <IoMdArrowDropdown className="cursor-pointer" />
                        {isDropdownManageOpen && (
                            <div className="absolute mt-5 w-32 top-2 right-0 bg-white rounded-md shadow-lg">
                                <ul className="py-2">
                                    <li>
                                        <Link to="/admin/manage-user" onClick={() => setDropdownManageOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            ข้อมูลผู้ใช้งาน
                                        </Link>
                                        <Link to="/admin/manage-pet" onClick={() => setDropdownManageOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            สัตว์เลี้ยง
                                        </Link>
                                        <Link to="/admin/manage-event" onClick={() => setDropdownManageOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            อีเวนท์
                                        </Link>
                                        <Link to="/admin/manage-donation" onClick={() => setDropdownManageOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            ระดมทุน
                                        </Link>
                                        <Link to="/admin/manage-adopt" onClick={() => setDropdownManageOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            รับเลี้ยงสัตว์
                                        </Link>
                                        <Link to="/admin/edit-page-home" onClick={() => setDropdownReportOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            แก้ไขหน้าหลัก
                                        </Link>
                                        <Link to="/admin/edit-page-about" onClick={() => setDropdownReportOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            แก้ไขหน้าเกี่ยวกับเรา
                                        </Link>
                                        <Link to="/admin/edit-page-donation" onClick={() => setDropdownReportOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            แก้ไขหน้าบริจาค
                                        </Link>
                                        <Link to="/admin/edit-page-event" onClick={() => setDropdownReportOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            แก้ไขหน้ากิจกรรม
                                        </Link>
                                        <Link to="/admin/edit-page-contact" onClick={() => setDropdownReportOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            แก้ไขหน้าติดต่อเรา
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="relative flex items-center" onClick={toggleDropdownReport}>
                        <h1 >รายงาน</h1>
                        <IoMdArrowDropdown className="cursor-pointer" />
                        {isDropdownReportOpen && (
                            <div className="absolute mt-5 w-32 top-2 right-0 bg-white rounded-md shadow-lg">
                                <ul className="py-2">
                                    <li>
                                        <Link to="/admin/report-pet-list" onClick={() => setDropdownReportOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            สัตว์เลี้ยง
                                        </Link>
                                        <Link to="/admin/report-event" onClick={() => setDropdownReportOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            อีเวนท์
                                        </Link>
                                        <Link to="/admin/report-donation" onClick={() => setDropdownReportOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            ระดมทุน
                                        </Link>
                                        <Link to="/admin/report-adopt" onClick={() => setDropdownReportOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            รับเลี้ยงสัตว์
                                        </Link>
  
                                    </li>

                                </ul>
                            </div>
                        )}
                    </div>
                    <Link >ระดมทุน</Link>

                </div>
                <div className="hidden md:flex gap-8 text-black">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <div className='flex items-center relative'>
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white font-bold">
                                    <h1 className="text-black">
                                        {((user?.user?.firstname?.charAt(0).toUpperCase() || user?.user?.role?.charAt(0).toUpperCase()))}
                                    </h1>


                                </div>
                                <IoMdArrowDropdown className="cursor-pointer" onClick={toggleDropdownUser} />
                                {isDropdownUserOpen && (
                                    <div className="absolute mt-5 w-32 top-6 right-0 bg-white rounded-md shadow-lg">
                                        <ul className="py-2">
                                            <li>
                                                <Link to="/admin/profile" onClick={() => setDropdownUserOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                    แก้ไขโปรไฟล์
                                                </Link>
                                            </li>

                                        </ul>
                                    </div>
                                )}
                            </div>

                            <Link onClick={hdlClickLogout} to="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                ออกจากระบบ
                            </Link>
                        </div>
                    )
                        : (
                            <div className='flex gap-10'>
                                <Link to="/register" className="font-head">ลงทะเบียน</Link>
                                <Link to="/login" className="font-head">เข้าสู่ระบบ</Link>
                            </div>
                        )}

                </div>
            </nav>
        </div>
    )
}
