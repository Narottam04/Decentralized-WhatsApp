import {useContext, useEffect,useState,createContext} from 'react'
import GUN from 'gun'
import 'gun/sea'
import 'gun/axe'
import { useRouter } from 'next/router'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [username, setUsername] = useState('')
    const [publicKey, setPublicKey] = useState('')
    const [userPassword,setUserPassword] = useState('')
    const [privateKey, setPrivateKey] = useState('')
    const router = useRouter()

    // DATABASE
    const gun = GUN()
    // GUN USER  
    const user = gun.user().recall({sessionStorage:true})

    // current user username
    user.get('alias').on(v => setUsername(v))

    gun.on('auth',async(event) => {
        const alias = await user.get('alias'); //username string
        setUsername(alias);
        setPublicKey(user.is.epub)
        console.log(`signed in as ${alias}`)
    })
    
    function login(username,password) {
        const promise = new Promise((resolve,reject)=>{
            gun.get(`~@${username}`).once((key, username)=>{
                if(!key){
                    alert(`A user with username ${username} already exists!`)
                    reject()
                    // throw new Error(`A user with username ${username} already exists!`);
                }
            })
            user.auth(username,password,({err}) =>{
                if(err){
                    alert(err)
                    reject()
                }
                else{
                    setUserPassword(password)
                    resolve()
                }
            })
        })
        return promise
    }

    function signup(username,password) {
        const promise = new Promise((resolve,reject)=>{
            
            user.create(username,password,({err}) => {
                if(err) {
                    // alert(err);
                    reject()
                }
                else {
                    setUserPassword(password)
                    user.auth(username,password,({err}) => err && alert(err))
                    resolve()
                }
            })
        })
        return promise
    }

    function logout() {
        user.leave();
        setUsername('');
    }

    function deleteAccount(){
        user.delete(username,userPassword,(ack)=> {
            console.log(ack)
            if(ack.ok){
                router.push('/')
                setUsername('');
                setUserPassword('')
            }
            else{
                alert('There was a problem deleting your account')
            }
        })
    }

    const value = {
        username,
        setUsername,
        user,
        login,
        signup,
        logout,
        deleteAccount,
        publicKey,
        userPassword,
        setUserPassword
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}