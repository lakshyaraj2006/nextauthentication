"use client"

import logout from '@/app/serverActions/logout'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { LogOutIcon } from 'lucide-react'

export default function LogOutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        const response = await logout();
        const { success, message } = response;

        if (success) {
            toast.success(message, {
                autoClose: 2500
            });

            setTimeout(() => {
                router.replace('/signin');
            }, 2700);
        } else {
            toast.error(message, {
                autoClose: 2500
            })
        }
    }
    return (
        <Button className="cursor-pointer mx-0" onClick={handleLogout}><LogOutIcon /> Logout</Button>
    )
}