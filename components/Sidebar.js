import { useEffect,useRef,useState } from 'react'
import {Menu} from '@headlessui/react'
import MessageIcon from '@mui/icons-material/Message';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
import Link from 'next/link'


function Sidebar() {
    const {username,logout,user} = useAuth()
    const router = useRouter()
    const [addUserModal,setAddUserModal] = useState(false)
    const handleLogout = () => {
        logout()
        if (user.is) {
            alert('Seems like we have some problem, Try again later')
        }
        else{
            router.push('/')
        }
    }
    return (
        <div className="bg-[#2A2F32] overflow-y-auto no-scrollbar flex-[0.35] flex flex-col divide-y divide-[#B1B3B5]">
            {/* sidebar header */}
            <div className='flex justify-between items-center py-4 px-4 '>
                {/* profile */}
                <Link href="/profile">
                    <img src={`https://avatars.dicebear.com/api/bottts/${username}.svg`} alt="" className="border-2 p-2  border-lime-400 rounded-full w-12 cursor-pointer" />
                </Link>
                {/* icons */}
                <div className='space-x-4 flex'>
                    <Link href="/profile">
                        <AccountCircleRoundedIcon className="text-[#B1B3B5] w-10 cursor-pointer"/>
                    </Link>
                    {/* <MessageIcon className="text-[#B1B3B5] w-10"/> */}
                    <div className=''>
                        <PeopleRoundedIcon onClick={() =>setAddUserModal(!addUserModal)} className="text-[#B1B3B5] w-10 cursor-pointer"/>
                        <div id="authentication-modal" aria-hidden="true" class={`${addUserModal? "": "hidden"} overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 flex justify-center items-center h-modal md:h-full md:inset-0 shadow-2xl`}>
                            <div class="relative px-4 w-full max-w-md h-full md:h-auto">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div class="flex justify-end p-2">
                                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal"  onClick={()=> setAddUserModal(!addUserModal)}>
                                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                                        </button>
                                    </div>
                                    <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8" action="#">
                                        <h3 class="text-xl font-medium text-gray-900 dark:text-white">Add A New User</h3>
                                        <div>
                                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">User Public Key</label>
                                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required />
                                        </div>
                                        <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add User
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className="relative">
                        {/* <Link href="/profile">Logout</Link> */}
                        <Menu>
                            <Menu.Button>
                                <MoreVertIcon className="text-[#B1B3B5] w-12 cursor-pointer"/>
                            </Menu.Button>
                            <Menu.Items className='absolute right-5 mt-1 bg-[#090E11]'>
                                <Menu.Item>
                                    <button className='block text-white px-4 py-2' onClick={handleLogout}>Logout</button>
                                </Menu.Item>
                            </Menu.Items>

                        </Menu>
                    </div>

                </div>
            </div>

            {/* sidebar search box */}
            <div className='bg-[#131C21] flex items-center p-4'>
                <div className='flex items-center w-full py-2 px-4 rounded-full bg-[#323739]'>
                    <SearchIcon className="text-[#B1B3B5] w-10 "/>
                    <input  type="text" className="bg-[#323739] text-gray-200 pl-4 focus:outline-none flex-grow" placeholder='Search or start new chat'/>
                </div>
            </div>
            {/* people */}
            <div className='bg-[#131C21]  divide-y divide-[#B1B3B5]'>
                <div className="cursor-pointer flex items-center py-4 px-4">
                    {/* profile photo */}
                    <div className="">
                        <img src="./Narottam-Profile.jpeg" alt="" className="w-12 rounded-full object-fill" />
                    </div>
                    {/* Person-Info */}
                    <div className="w-full px-4">
                        <div className="flex justify-between">
                            <h1 className='text-gray-200'>{username && username}</h1>
                            <p className="text-gray-200 ">2:58pm</p>
                        </div>
                        <p className='text-gray-200'>Lorem ipsum dolor sit, amet consectetur</p>
                    </div>
                </div>
                
                

            </div>
        </div>
    )
}
export default Sidebar
