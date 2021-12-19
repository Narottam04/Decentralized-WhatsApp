import { useRef,useState,useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
export default function Home() {
  const usernameRef = useRef() 
  const passwordRef = useRef() 
  const router = useRouter()

  const {login,username,user} = useAuth()

  const  handleSubmit = async (e)=> {
    e.preventDefault()
    console.log("login process has begun")
    login(usernameRef.current.value,passwordRef.current.value)
    .then(()=>{
      router.push('/app')
    })
    .catch(e => alert('something went wrong'))
  }

  useEffect(() => {
    if(user.is) {
      router.push('/app')
    }
  }, [])

  return (
    <div className="bg-[url('/whatsapp-bg.jpg')] w-screen h-screen flex justify-center items-center">
      <Head>
        <title>Login: Decentralized WhatsApp</title>
        <meta name="description" content="Decentralized WhatsApp Clone Created By @NarottamCodez" />
        <link rel="icon" href="https://img.icons8.com/color/48/000000/whatsapp--v1.png" />
      </Head>
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-[#112D30] ">
        <h1 className="text-2xl text-white font-bold text-center">Login </h1>
        <form onSubmit={handleSubmit} className="space-y-6 ng-untouched ng-pristine ng-valid">
          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="text-white block dark:text-coolGray-400">Username</label>
            <input type="text" ref={usernameRef} name="username" id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md dark:border-coolGray-700 " />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="text-white block dark:text-coolGray-400">Password</label>
            <input type="password" ref={passwordRef} name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-coolGray-700 " />
            {/* <div className="flex justify-end text-xs dark:text-coolGray-400">
              <a href="#">Forgot Password?</a>
            </div> */}
          </div>
          <button className="block w-full p-3  text-center rounded-sm text-white shadow-2xl bg-[#092123] font-bold">Log In</button>
        </form>
        <p className="text-xl text-white mt-8 text-center sm:px-6">Don't have an account?
          <Link href="/signup" className="underline ">Sign up</Link>
        </p>
      </div>

    </div>
  )
}

