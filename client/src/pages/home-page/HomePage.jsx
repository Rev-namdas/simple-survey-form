import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUrlExists } from "../../api/apiRequest";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "./homepage.css"

export default function HomePage() {
    document.title = "Survey | Homepage"

    const navigate = useNavigate();
    const [topic, setTopic] = useState("");
    const [urlName, setUrlName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleCreate = async (e) => {
        e.preventDefault()

        if(topic === ""){
            toast.dismiss()
            return toast.error('Fill up the topic box', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if(urlName === ""){
            toast.dismiss()
            return toast.error('Fill up the url box', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        setIsLoading(true)
        const url = urlName.trim().split(" ").join("-");
        const res = await checkUrlExists({ url })
        
        setIsLoading(false)

        if(res.flag === 'SUCCESS'){
            navigate("/new/" + url, { state: { topic } });
        } else {
            toast.dismiss()
            toast.error(res.msg, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <div className="homepage__container">
        <h3 className="homepage__title">Survey Software</h3>
        <form className="homepage__wrapper">
            <div className="homapage__input-group">
                <label>Topic Name ({topic.length}/200)</label>
                <input
                    className="homepage__input"
                    type="text"
                    placeholder="Topic Name"
                    value={topic}
                    maxLength={200}
                    onChange={(e) => setTopic(e.target.value)}
                />
            </div>

            <div className="homapage__input-group">
                <label>Topic Url ({ urlName.length }/30)</label>
                <div className="homapage__url">
                    <input
                        className="homepage__input"
                        type="text"
                        placeholder="Url Name"
                        value={urlName}
                        onChange={(e) => setUrlName(e.target.value)}
                    />
                    <button 
                        className="homapage__btn" 
                        onClick={handleCreate}
                        disabled={isLoading}
                    >Create</button>
                </div>
            </div>
        </form>
        </div>
        </>
    );
}
