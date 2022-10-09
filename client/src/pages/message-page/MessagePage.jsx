import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./messagepage.css";

export default function MessagePage() {
    const navigate = useNavigate();
    const { state: { from } } = useLocation()

    return (
        <div className="message__wrapper">
            <div className="message__container">
                <h3>Answer Submitted !</h3>
                <h4>Thank You !</h4>
                <div>
                    Submit another response
                    <strong
                        className="message__submit-link"
                        onClick={() => navigate("/view/" + from)}
                    >
                        {" "}
                        here
                    </strong>
                </div>
            </div>
        </div>
    );
}
