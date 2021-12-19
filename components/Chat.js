import MessageIcon from '@mui/icons-material/Message';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallIcon from '@mui/icons-material/Call';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import GUN, { SEA } from 'gun'
import { useEffect,useRef,useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Chat() {
    const [messages,setMessages] = useState([])
    const newMessageRef = useRef()
    const db = GUN({
      peers: ['https://gun-manhattan.herokuapp.com/gun','http://localhost:3030/gun']    
    })
    const {user,username} = useAuth()

    useEffect(() => {
        console.log("hey I am useEffect")
        db.get('devChat').map().once(async (data,id) => {
            if(data) {
                const key = "WGrvKjbPI4gNuNjs6OtjpQPmWUho5w86LhdzfgBSeRE.KzjhZRQ3P4aAEKN5wiuobfLUFFTvDdWkCxd_vO_UxtU"
                console.log(data)
                let message = {
                    who: await db.user(data).get('alias'),
                    what: (await SEA.decrypt(data.what,key)) + '',
                    when: GUN.state.is(data,'what')
                }
                if(message.what) {
                    setMessages(prevMessages => [...prevMessages,message].sort((a, b) => a.when - b.when))
                }
            }
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const secret = await SEA.encrypt(newMessageRef.current.value,'WGrvKjbPI4gNuNjs6OtjpQPmWUho5w86LhdzfgBSeRE.KzjhZRQ3P4aAEKN5wiuobfLUFFTvDdWkCxd_vO_UxtU')
        const message = user.get('all').set({what:secret})
        const index = new Date().toISOString()
        console.log(message)
        db.get('devChat').get(index).put(message)
        newMessageRef.current.value=""

        
    }
    return (
        <div className='flex-[0.65] flex flex-col'>
            {/* header */}
            <div className='bg-[#2A2F32] flex justify-between items-center py-4 px-4 '>
                {/* profile */}
                <div className='flex items-center'>
                    <img src="./Narottam-Profile.jpeg" alt="" className="rounded-full w-10" />
                    <div className="px-4">
                        <h1 className='text-gray-200 font-bold'>Narottam Sahu: Chat With Developer</h1>
                        {/* <p className="text-gray-400 text-sm">Last Seen:</p> */}
                    </div>
                </div>
                {/* icons */}
                <div className='space-x-4'>
                    <VideocamIcon className="text-[#B1B3B5] w-12"/>
                    <CallIcon className="text-[#B1B3B5] w-12"/>
                    <SearchIcon className="text-[#B1B3B5] w-12"/>
                    <MoreVertIcon className="text-[#B1B3B5] w-12"/>
                </div>
            </div>
            {/* body */}
            <div className="bg-[#0D1418]  flex-1 scrollbar overflow-y-auto">
                {/* received message */}
                {/* <p className={`
                     text-white relative text-[16px] p-2 bg-[#262D31] w-[fit-content]
                     rounded-lg mb-6 mx-4 mt-4 before:absolute  before:bottom-3
                    before:w-[10px] before:h-[10px] before:rotate-45 before:right-[-5px]
                    before:bg-[#262D31] max-w-[30vw]
                    
                    ${false && `ml-auto bg-[#056162] before:bg-[#056162]`}
                `}>
                    <span className='absolute top-[-18px] left-1 text-[12px] font-bold text-[#6bcbef]'>Narottam Sahu</span>
                    Lorem ipsum, dolor Lorem 
                    <span className='ml-2 text-[11px] font-bold text-gray-500 '>03.30 am</span>
                </p> */}
                {
                    messages.map((message) => {
                        return (
                            <p className={`
                                text-white relative text-[16px] p-2 bg-[#262D31] w-[fit-content]
                                rounded-lg mb-6 mx-4 mt-4 before:absolute  before:bottom-3
                                before:w-[10px] before:h-[10px] before:rotate-45 before:right-[-5px]
                                before:bg-[#262D31] max-w-[30vw]
                                
                                ${(message.who === username) && `ml-auto bg-[#056162] before:bg-[#056162]`}
                            `}>
                                <span className=' top-[-18px] left-1 text-[12px] font-bold text-[#6bcbef] '>{message.who}</span>
                                <br/>
                                {message.what}
                                <span className='ml-2 text-[11px] font-bold text-gray-500 '>{`${new Date(message.when).toLocaleTimeString()}`}</span>
                            </p>
                        )
                    })
                }
            </div>
            {/* input fields */}
            <div  className="bg-[#1E2428] flex items-center  py-3">
                <div className='pl-4 '>
                    <InsertEmoticonIcon className="text-[#B1B3B5] w-10"/>
                    <AttachFileIcon className="text-[#B1B3B5] w-10"/>
                </div>
                <form onSubmit={handleSubmit} className=''>
                    <input type="text" ref={newMessageRef} placeholder='Type a message' className='bg-[#323739] text-gray-200 pl-4 focus:outline-none w-[40vw] rounded-full py-2' />
                </form>
                <PlayArrowIcon onClick={handleSubmit} className="ml-4 text-white bg-lime-500  rounded-full"/>
            </div>
        </div>
    )
}

export default Chat
