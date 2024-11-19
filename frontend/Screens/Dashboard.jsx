import { jwtDecode } from "jwt-decode"
import { useState } from "react"

let Dashboard = ()=>{
    let [username,SetUsername] = useState('')
    let [pic,SetPicture] = useState('')
    useState(()=>{
        let token = localStorage.getItem("token")
        let data = jwtDecode(token)
        SetUsername(data.name)
        SetPicture(data.picture)
    },[])
    let Logout = ()=>{
        localStorage.clear()
        location.replace('/')
    }
    return (
        <div className="dashboard w-full h-[100vh] bg-gray-900">
            <div className="nav w-full h-[10vh] bg-gray-950 mb-10 text-white flex items-center justify-between">
                <div className="left flex items-center gap-3">
                    <img className="rounded-full h-[64px] ml-5" src={pic} alt="" />
                    <h1>Welcome {username}</h1>
                </div>
                <div className="right">
                    <button onClick={Logout} className="bg-red-600 h-[10vh] w-[100px]">Log Out</button>
                </div>
            </div>
            <div className="card w-[25%] h-[42vh] flex justify-center rounded-2xl shadow-2xl bg-white m-auto">
                <div className="body w-full h-full flex flex-col gap-5 px-5 py-2">
                    <div className="textarea w-full">
                        <textarea className="p-2 w-full h-[170px] border-2 border-dashed border-gray-900" maxLength={300} rows={2} placeholder="Enter Your Prompt" name="" id=""></textarea>
                    </div>
                    <input className="p-2 w-full border-dashed border-2 border-gray-900" placeholder="Seed (Default - 0 which yeilds random seed" type="text" />
                    <button className="bg-blue-700 text-white py-2">Generate</button>
                </div>
            </div>
        </div>
    )
}
export default Dashboard