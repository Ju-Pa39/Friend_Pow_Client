import React, { useState, useEffect } from 'react'
import { getAllPetData } from '@/src/apis/AdminReportApi';
import { getExportPetsExcel } from '../../apis/AdminExportExcelApi';



export default function ReportPet() {

    const [pets, setPets] = useState([])

    console.log(pets, "Pet tetet")
    const handleFetchAllReport = async () => {
        try {
            const response = await getAllPetData();
            setPets(response.data);

        } catch (error) {
            console.error("Error fetching report data:", error);
        }
    };
    useEffect(() => {
        handleFetchAllReport();
    }, [])
    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        return `${years} ปี ${months} เดือน`;
    };


    const handleExportExcel = async () => {
        if (pets.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'กรุณาเลือกข้อมูล',
                text: 'โปรดเลือกข้อมูลก่อนทำการบันทึก',
                confirmButtonText: 'ตกลง'
            });
            return;
        }

        try {
            const response = await getExportPetsExcel(pets)

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'pets-report.xlsx');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error exporting to Excel:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex gap-4 mb-6">

                <button
                    onClick={handleExportExcel}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    บันทึกข้อมูล
                </button>
            </div>

            {pets && pets.length > 0 ? (
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">ไอดี</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">ชื่อน้อง</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">อายุ</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">สี</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">เพศ</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">ประเภท</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">สถานะ</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">สายพันธุ์</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">รายละเอียด</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">ประวัติการรักษา</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">วัคซีน</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">ทำหมัน</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">น้ำหนัก</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">วันที่เพิ่มข้อมูล</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {pets.map(pet => (
                                <tr key={pet.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">{pet.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{pet.name_th}</td>
                                    <td className="px-6 py-4">{calculateAge(pet.age)}</td>
                                    <td className="px-6 py-4">{pet.color}</td>
                                    <td className="px-6 py-4">{pet.gender}</td>
                                    <td className="px-6 py-4">{pet.type}</td>
                                    <td className={`px-6 py-4 ${pet.status === 'PENDING'
                                        ? 'text-yellow-500'
                                        : pet.status === 'FOSTERED'
                                            ? 'text-red-500'
                                            : pet.status === 'UNAVAILABLE'
                                                ? 'text-red-500'
                                                : pet.status === 'ADOPTED'
                                                    ? 'text-green-500'
                                                    : pet.status === 'AVAILABLE'
                                                        ? 'text-blue-500'
                                                        : ''
                                        }`}>{pet.status}</td>
                                    <td className="px-6 py-4">{pet.breed_th}</td>
                                    <td className="px-6 py-4">{pet.description_th}</td>
                                    <td className="px-6 py-4">{pet.medical_history}</td>
                                    <td className="px-6 py-4">{pet.is_vaccinated === 1 ? 'Yes' : 'No'}</td>
                                    <td className="px-6 py-4">{pet.is_neutered === 1 ? 'Yes' : 'No'}</td>
                                    <td className="px-6 py-4">{pet.weight.toFixed(2)}</td>
                                    <td className="px-6 py-4">{new Date(pet.created_at).toLocaleDateString()}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
                : (
                    <div className="bg-gray-800 h-96 mt-20 flex justify-center items-center">
                        <p className="text-gray-500">ไม่พบข้อมูล</p>
                    </div>
                )}
        </div>
    )
}


