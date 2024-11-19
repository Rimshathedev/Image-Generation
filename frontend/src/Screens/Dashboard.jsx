import { useState, useEffect } from "react";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import gallery from "../assets/diff.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
    const [username, SetUsername] = useState("");
    const [prompt, SetPrompt] = useState("");
    const [userId, setUserID] = useState("");
    const [pic, SetPicture] = useState("");
    const [photos, SetPhotos] = useState([]);
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                SetUsername(user.displayName);
                SetPicture(user.photoURL);
                setUserID(user.uid);
                LoadImages(user.uid); // Pass the userId to LoadImages
            } else {
                location.replace("/");
            }
        });

        // Clean up the listener on unmount
        return () => unsubscribe();
    }, []);

    const LoadImages = (uid) => {
        axios
            .get(`http://127.0.0.1:5000/get_user_images/${uid}`)
            .then((res) => {
                const url = res.data.map((data) => (
                    <img
                        key={data.image_name}
                        className="w-64 h-64"
                        src={`http://127.0.0.1:5000/get_image/${uid}/${data.image_name}`}
                        alt="User"
                    />
                ));
                SetPhotos(url);
                toast.success("Images loaded successfully!");
            })
            .catch((error) => {
                console.error("Error loading images:", error);
                toast.error("Failed to load images.");
            });
    };

    const HandleSignOut = () => {
        signOut(auth)
            .then(() => {
                toast.info("Signed out successfully.");
            })
            .catch((error) => {
                console.error("Error signing out:", error);
                toast.error("Failed to sign out.");
            });
    };

    const Upload = () => {
        axios
            .post(`http://127.0.0.1:5000/create/${userId}`, { user_id: userId, prompt: prompt })
            .then(() => {
                toast.success("Image generated successfully!");
                LoadImages(userId); // Refresh the images
            })
            .catch((error) => {
                console.error("Error uploading:", error);
                toast.error("Failed to generate image.");
            });
    };

    return (
        <div className="dashboard w-full h-[100vh] bg-gray-900">
            <ToastContainer />
            <div className="nav w-full h-[10vh] bg-gray-950 mb-10 text-white flex items-center justify-between">
                <div className="left flex items-center gap-3">
                    <img className="rounded-full h-[64px] ml-5" src={pic} alt="" />
                    <h1>Welcome {username}</h1>
                </div>
                <div className="right">
                    <button onClick={HandleSignOut} className="bg-red-600 h-[10vh] w-[100px]">
                        Log Out
                    </button>
                </div>
            </div>
            <div className="body w-full h-[80vh] p-[5%] flex gap-10">
                <div className="card mt-12 w-[25%] h-[42vh] flex justify-center rounded-2xl shadow-2xl bg-white">
                    <div className="body w-full h-full flex flex-col gap-5 px-5 py-2">
                        <div className="textarea w-full">
                            <textarea
                                onChange={(e) => SetPrompt(e.target.value)}
                                className="p-2 w-full h-[170px] border-2 border-dashed border-gray-900"
                                maxLength={300}
                                rows={2}
                                placeholder="Enter Your Prompt"
                            ></textarea>
                        </div>
                        <input
                            className="p-2 w-full border-dashed border-2 border-gray-900"
                            placeholder="Seed (Default - 0 which yields random seed)"
                            type="text"
                        />
                        <button onClick={Upload} className="bg-blue-700 text-white py-2">
                            Generate
                        </button>
                    </div>
                </div>
                <div className="grid h-[65vh] overflow-y-scroll flex-auto grid-cols-4 gap-4">{photos}</div>
            </div>
        </div>
    );
};

export default Dashboard;
