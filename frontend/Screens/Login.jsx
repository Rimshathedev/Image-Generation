import { useState } from 'react';
import SignInLogo from '../assets/google.png'
import diff from '../assets/diff.jpg'
import { jwtDecode } from 'jwt-decode';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
let Login = ()=>{
    const [user, setUser] = useState(null);
    const clientId = '126109581929-hsn9fvaj8pf80kkhncdsju4j4mulqbcv.apps.googleusercontent.com';
    let HandleLogin = async (credentialResponse) =>{
        const decoded = jwtDecode(credentialResponse.credential);
        console.log(decoded); // You can log this to see the full user profile data
    
        // Set the user information in the state
        setUser({
          name: decoded.name,
          picture: decoded.picture
        });
        localStorage.setItem('token', credentialResponse.credential);
        window.location.href = "/"
    }
    return(
        <div className="login w-full h-[100vh] bg-gray-900 p-[3%]">
            <div className="body w-full h-[80vh] flex justify-center gap-5">
                <div className="left w-[30%] h-[100%] text-white flex flex-col gap-10 justify-center items-center">
                    <div className="logo flex flex-col justify-center items-center">
                        <h1 className="text-6xl">[APP Name]</h1>
                        <p>A Robust tool to create stunning images from text</p>
                    </div>
                    <GoogleOAuthProvider clientId={clientId}>
                    <GoogleLogin
                        onSuccess={HandleLogin}
                        onError={() => {
                        console.log('Login Failed');
                    }}/>
                    </GoogleOAuthProvider>
                </div>
                <div className="right flex-auto h-[100%]">
                    <img className="w-full h-full" src={diff} alt="" />
                </div>
            </div>

        </div>
    )
}
export default Login