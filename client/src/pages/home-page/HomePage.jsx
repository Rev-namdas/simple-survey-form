import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    document.title = "Survey | Homepage"

    const navigate = useNavigate();
    const [topic, setTopic] = useState("");
    const [urlName, setUrlName] = useState("");

    const handleCreate = () => {
        const url = urlName.trim().split(" ").join("-");
        navigate("/new/" + url, { state: { topic } });
    };

    return (
        <>
            <div>HomePage</div>
            <input
                type="text"
                placeholder="Topic Name"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />
            <input
                type="text"
                placeholder="Url Name"
                value={urlName}
                onChange={(e) => setUrlName(e.target.value)}
            />
            <button onClick={handleCreate}>Create</button>
        </>
    );
}
