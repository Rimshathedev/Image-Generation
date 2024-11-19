import { useEffect } from 'react'
import mark from '../assets/mark.svg'
import {app} from '../firebase'
import {GoogleAuthProvider,signInWithPopup,getAuth,signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth'
const Entry = ()=>{
    let auth = getAuth(app)
    useEffect(()=>{
        onAuthStateChanged(auth,user=>{
            if (user) {
                location.replace("/dashboard")
              }
        })
    },[])
    return (
        <>
        <div className="bg w-full h-[100vh] primary">
            <img className='absolute right-0 w-[50%]' src={mark} alt="" />
            <div className="body w-[80%] h-full flex flex-col justify-center items-center">
                <div className="section mb-5 text-white w-[50%]  top-[50%] left">
                    <h1 className='text-5xl font-bold'>Stable Diffision</h1>
                </div>
                <div className="bar text-white gap-4 w-[50%]  flex justify-center">
                    <button onClick={()=>location.replace("/signup")} className='border-[1px] px-10 py-2 rounded-full hover:bg-white hover:text-black'>Sign Up</button>
                    <button onClick={()=>location.replace("/login")} className='border-[1px] px-10 py-2 rounded-full hover:bg-white hover:text-black'>Sign In</button>
                </div>
            </div>
            
        </div>
        </>
    )
}
export default Entry