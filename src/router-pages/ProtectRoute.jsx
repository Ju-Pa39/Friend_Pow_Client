import React, { useEffect, useState } from 'react'

import useAuthStore from '../stores/AuthStore';

import { Navigate } from 'react-router-dom';


const ProtectRoute = ({ element, allow }) => {

    const [isAllowed, setIsAllowed] = useState(null)

    const token = useAuthStore((state) => state.token)
    const user = useAuthStore((state) => state.user)

    useEffect(() => {
        checkRole()
    }, [])


    const checkRole = async () => {

        try {

            const role = user.user.role || user.role

            if (allow.includes(role)) {

                setIsAllowed(true)
            } else {
                setIsAllowed(false)

            }

        } catch (err) {
            setIsAllowed(false)

        }
    }

    if (isAllowed === null) {
        return <div>Loading...</div>
    }

    if (!isAllowed) {
        return <Navigate to={'/login'} />
    }

    return element
}

export default ProtectRoute
