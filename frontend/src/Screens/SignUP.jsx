import { useEffect, useState } from 'react';
import Logo from '../assets/google.png'
import CustomInput from '../Components/CustomInput';
import {app} from '../firebase'
import {GoogleAuthProvider,getAuth,signInWithPopup,onAuthStateChanged,createUserWithEmailAndPassword} from 'firebase/auth'
const SignUp = ()=>{
    let [step,SetStep] = useState(0)
    let [email,SetEmail] = useState('')
    let [password,SetPassword] = useState('')
    let gotoStep2 = ()=>{
        if(email != ""){
            SetStep(1)
        }
    }
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const RegisterUser=()=>{
        createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
            // Signed in 
           alert("user created")
          })
    }
    const handleGoogleSignIn = async () => {
        try {
          const result = await signInWithPopup(auth, provider);
          // You can access additional user info if needed
          // const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
        } catch (error) {
          console.error('Error signing in with Google:', error);
        }
      };

      useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user)
              location.replace("/dashboard")
            } else {
              setUser(null)
            }
          })
      },[])
    return (
        <div className="signup w-full h-[100vh] bg-gray-300 p-[3%]">
            <div className="nav w-full h-[5vh]">
                <h1 className='text-3xl primaryText font-bold'>Stable Diffision</h1>
            </div>
            <div className="body w-full h-full flex flex-col justify-center items-center gap-5">
                <h1 className='text-5xl primaryText font-bold'>Create Account</h1>
                <div className="input w-[300px]">
                    <CustomInput onChange={e=>SetEmail(e.target.value)} placeholder={"Enter Email"}/>
                </div>
                {step == 1 && <div className="input w-[300px]">
                    <CustomInput onChange={e=>SetPassword(e.target.value)} type='password' placeholder={"Enter password"}/>
                </div>}
                {step == 0 && <button onClick={gotoStep2} className='text-white primary w-[300px] hover:text-black hover:bg-white py-2 rounded-full'>Continue</button>}
                {step == 1 && <button onClick={RegisterUser} className='text-white primary w-[300px] hover:text-black hover:bg-white py-2 rounded-full'>Register</button>}
                <div className="text flex gap-2">
                    <h2 className='opacity-60'>Already have account?</h2>
                    <strong onClick={()=>location.replace("/login")} className='primaryText cursor-pointer'>Login</strong>
                </div>
                <div className="breaking flex opacity-40">
                    <h1>_______________</h1>
                    <strong>or</strong>
                    <h1>_______________</h1>
                </div>
                <img onClick={handleGoogleSignIn} className='' src={Logo} alt="" />
            </div>
        </div>
    )
}
export default SignUp