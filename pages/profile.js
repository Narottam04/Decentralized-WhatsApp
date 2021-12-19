import Head from 'next/head'
import { useEffect,useRef,useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import Link from 'next/link'

function profile() {
    const [showkey,setShowKey] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const {user,username,publicKey,deleteAccount,userPassword} = useAuth()
 
    const router = useRouter()
    const publicKeyRef = useRef()
    useEffect(() => {
        if(!user.is){
            router.push('/')
        }
    }, [])

    const showValue = ()=> {
        setShowKey(!showkey)
    }

    const copyValue = () => {
        navigator.clipboard.writeText(publicKey)
        alert('Copied to clipboard!')
    }
    // console.log(username,userPassword)

    const handleSubmit = ()=> {
        console.log("Deletiion process has begun")
        deleteAccount()
    }

    return (
        <div className="bg-[#090E11] h-screen grid place-items-center">
            <Head>
                <title>Decentralized WhatsApp</title>
                <meta name="description" content="Decentralized WhatsApp Clone Created By @NarottamCodez" />
                <link rel="icon" href="https://img.icons8.com/color/48/000000/whatsapp--v1.png" />
            </Head>
            <div className="bg-[#262d31] w-[80vw] h-[95vh] shadow-2xl flex flex-col justify-center items-center">
                <div className="">
                    <Link href="/app">
                        <ArrowBackRoundedIcon className='text-white w-20 cursor-pointer'/>
                    </Link>
                    <img src={`https://avatars.dicebear.com/api/bottts/${username}.svg`} alt=""  className='h-[40vh] border-4 p-6 border-lime-400 rounded-full m-4' />
                </div>

                <h1 className='text-white text-4xl'>Username: {username}</h1>

                <div className=' flex  items-center flex-col  '>
                    <div>
                        <label htmlFor="username" className="text-white block dark:text-coolGray-400 font-bold">Public Key</label>
                        <div className='flex items-center w-full py-2 px-4 space-x-4 rounded-md bg-[#131C21] '>
                            <input  type={showkey ? "text":"password"} ref={publicKeyRef} className="bg-[#131C21] text-gray-200 pl-2 pr-2 focus:outline-none flex-grow w-[40vw] select-all" value={`${publicKey}`} disabled />
                            <button onClick={copyValue} className="text-[#B1B3B5] w-10 cursor-pointer font-bold  py-2 " >Copy</button>
                            <p onClick={showValue} className="text-[#B1B3B5] w-10 cursor-pointer font-bold  py-2" >{showkey ? "Hide":"Show"}</p>
                        </div>
                    </div>
                    {/* password */}
                    <div className = "mt-4">
                        <label htmlFor="username" className="text-white block dark:text-coolGray-400 font-bold">Password</label>
                        <div className='flex items-center w-full py-2 px-4 space-x-4 rounded-md bg-[#131C21] '>
                            <input  type={showkey ? "text":"password"} ref={publicKeyRef} className="bg-[#131C21] text-gray-200 pl-2 pr-2 focus:outline-none flex-grow w-[40vw] select-all" value={`${userPassword}`} disabled />
                            <button onClick={copyValue} className="text-[#B1B3B5] w-10 cursor-pointer font-bold  py-2 " >Copy</button>
                            <p onClick={showValue} className="text-[#B1B3B5] w-10 cursor-pointer font-bold  py-2" >{showkey ? "Hide":"Show"}</p>
                        </div>
                    </div>
                </div>
                {/* modal permanently delete account */}
                <button class="block mt-8 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" type="button" onClick={()=> setShowModal(!showModal)}>
                Delete Account
                </button>

                <div id="default-modal"  class={`${showModal? "": "hidden"} overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-50 z-50 flex flex-col  items-center h-modal md:h-full md:inset-0 mt-12`}>
                    <div class="relative px-4 w-full max-w-2xl h-full md:h-auto ">

                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
                            <div class="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                                    Delete Account
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="default-modal">
                                    <CloseIcon className='' onClick={()=> setShowModal(!showModal)}/>  
                                </button>
                            </div>

                            <div class="p-6 space-y-6">
                                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                If you would like to remove the app because you encountered a problem, please contact me at <a className='underline text-gray-200' href="mailto:webdripdev@gmail.com">webdripdev@gmail.com</a> or Twitter <a className='underline text-gray-200' href="https://twitter.com/NarottamCodez" target="_blank">@NarottamCodez</a>  so we can work together to resolve them! Tap on the Delete button (bottom left corner) if you still want to delete your account.
                                <br />
                                <b>Note:</b> You will lose all data permanently and it cannot be recovered
                                </p>
                            </div>
                            <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                <button onClick={()=>handleSubmit()} class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button>

                                <button onClick={()=>setShowModal(!showModal)} class="text-blue-500 bg-white hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 rounded-lg border border-blue-200 text-sm font-medium px-5 py-2.5 hover:text-blue-900 focus:z-10 dark:bg-blue-700 dark:text-blue-300 dark:border-blue-500 dark:hover:text-white dark:hover:bg-blue-600">Decline</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default profile



