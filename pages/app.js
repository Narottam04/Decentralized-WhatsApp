import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'
import { useRouter } from 'next/router'

import { useAuth } from '../context/AuthContext'
function app() {
    const {user} = useAuth()
    const router = useRouter()
    
    useEffect(() => {
        if(!user.is){
            router.push('/')
        }
    }, [])
    return (
        <div className="bg-[#090E11] h-screen grid place-items-center">
            <Head>
                <title>Decentralized WhatsApp</title>
                <meta name="description" content="Decentralized WhatsApp Clone Created By @NarottamCodez" />
                <link rel="icon" href="https://img.icons8.com/color/48/000000/whatsapp--v1.png" />
            </Head>
            <div className="bg-white w-[80vw] h-[95vh] shadow-2xl flex">
                <Sidebar/>
                <Chat/>
            </div>
            {/*Sidebar  */}
            {/* Main messaging area */}
        </div>
    )
}

export default app
