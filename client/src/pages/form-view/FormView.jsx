import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getForm, saveForm } from "../../api/apiRequest";
import "./formview.css";

export default function FormView() {
    document.title = "Survey | Questions"

    const params = useParams()
    const navigate = useNavigate()
    const [forms, setForms] = useState([]);
    const [rangeValue, setRangeValue] = useState(5)
    const [topicId, setTopicId] = useState(0);

    const fetchData = async () => {
        const res = await getForm(params.url)
        
        const ques = res?.questions 
                        ? JSON.parse(res.questions)
                        : []
        setForms(ques);
        setTopicId(res?.id || 0)
    }

    useEffect(
        () => {
            fetchData()
        },
        // eslint-disable-next-line
        []
    );

    const handleOptionChange = (e, index) => {
        const update = [...forms];
        update[index]["answer"] = e.target.value;

        setForms(update);
    };

    const handleOptionsChange = (e, index) => {
        const update = [...forms];
        
        if((update[index]["answer"]).length > 1){
            update[index]["answer"] += ", " + e.target.value;
        } else {
            update[index]["answer"] += e.target.value;
        }

        setForms(update);
    };

    const handleSubmit = async () => {
        const payload = {
            topic_id: topicId,
            json_data: JSON.stringify(forms)
        }
        const res = await saveForm(payload)
        
        if(res.flag === 'SUCCESS'){
            navigate("/thank-you", { state: { from: params.url } })
        }
    }

    const selectedField = (item, index) => {
        if (item === 1) {
            return (
                <div>
                    <input
                        type="text"
                        autoComplete="off"
                        className="answer-input"
                        name="option1"
                        value={forms[index]["answer"]}
                        onChange={(e) => handleOptionChange(e, index)}
                    />
                </div>
            );
        } else if (item === 2) {
            return (
                <div>
                    <textarea
                        id={`textarea${index}`}
                        className="answer-input"
                        cols="42"
                        rows="4"
                        name="option1"
                        value={forms[index]["answer"]}
                        onChange={(e) => handleOptionChange(e, index)}
                    ></textarea>
                </div>
            );
        } else if (item === 3) {
            return (
                <div>
                    <select
                        name="selection"
                        className="answer-dropdown"
                        id={`selection${index}`}
                        onChange={(e) => handleOptionChange(e, index)}
                    >
                        <option value={forms[index].options.option1}>
                            {forms[index].options.option1}
                        </option>
                        <option value={forms[index].options.option2}>
                            {forms[index].options.option2}
                        </option>
                        <option value={forms[index].options.option3}>
                            {forms[index].options.option3}
                        </option>
                        <option value={forms[index].options.option4}>
                            {forms[index].options.option4}
                        </option>
                    </select>
                </div>
            );
        } else if (item === 4) {
            return (
                <div className="options-input-group">
                    <div className="options-input">
                        <input
                            type="radio"
                            name={`radio${index}`}
                            id={`radio1${index}`}
                            value={forms[index].options.option1}
                            onChange={(e) => handleOptionChange(e, index)}
                        />
                        <label htmlFor={`radio1${index}`}>
                            <div className="options-input-label">
                                {forms[index].options.option1}
                            </div>
                        </label>
                    </div>

                    <div className="options-input">
                        <input
                            type="radio"
                            name={`radio${index}`}
                            id={`radio2${index}`}
                            value={forms[index].options.option2}
                            onChange={(e) => handleOptionChange(e, index)}
                        />
                        <label htmlFor={`radio2${index}`}>
                            <div className="options-input-label">
                                {forms[index].options.option2}
                            </div>
                        </label>
                    </div>

                    <div className="options-input">
                        <input
                            type="radio"
                            name={`radio${index}`}
                            id={`radio3${index}`}
                            value={forms[index].options.option3}
                            onChange={(e) => handleOptionChange(e, index)}
                        />
                        <label htmlFor={`radio3${index}`}>
                            <div className="options-input-label">
                                {forms[index].options.option3}
                            </div>
                        </label>
                    </div>

                    <div className="options-input">
                        <input
                            type="radio"
                            name={`radio${index}`}
                            id={`radio4${index}`}
                            value={forms[index].options.option4}
                            onChange={(e) => handleOptionChange(e, index)}
                        />
                        <label htmlFor={`radio4${index}`}>
                            <div className="options-input-label">
                                {forms[index].options.option4}
                            </div>
                        </label>
                    </div>
                </div>
            );
        } else if (item === 5) {
            return (
                <div className="options-input-group">
                    <div className="options-input">
                        <input
                            type="checkbox"
                            name={`checkbox${index}`}
                            id={`checkbox1${index}`}
                            value={forms[index].options.option1}
                            onChange={(e) => handleOptionsChange(e, index)}
                        />
                        <label htmlFor={`checkbox1${index}`}>
                            <div className="options-input-label">
                                {forms[index].options.option1}
                            </div>
                        </label>
                    </div>

                    <div className="options-input">
                        <input
                            type="checkbox"
                            name={`checkbox${index}`}
                            id={`checkbox2${index}`}
                            value={forms[index].options.option2}
                            onChange={(e) => handleOptionsChange(e, index)}
                        />
                        <label htmlFor={`checkbox2${index}`}>
                            <div className="options-input-label">
                                {forms[index].options.option2}
                            </div>
                        </label>
                    </div>

                    <div className="options-input">
                        <input
                            type="checkbox"
                            name={`checkbox${index}`}
                            id={`checkbox3${index}`}
                            value={forms[index].options.option3}
                            onChange={(e) => handleOptionsChange(e, index)}
                        />
                        <label htmlFor={`checkbox3${index}`}>
                            <div className="options-input-label">
                                {forms[index].options.option3}
                            </div>
                        </label>
                    </div>

                    <div className="options-input">
                        <input
                            type="checkbox"
                            name={`checkbox${index}`}
                            id={`checkbox4${index}`}
                            value={forms[index].options.option4}
                            onChange={(e) => handleOptionsChange(e, index)}
                        />
                        <label htmlFor={`checkbox4${index}`}>
                            <div className="options-input-label">
                                {forms[index].options.option4}
                            </div>
                        </label>
                    </div>
                </div>
            );
        } else if (item === 6) {
            return (
                <div>
                    <div className="form__slider-label">{ rangeValue }</div>
                    <input 
                        type="range" 
                        className="form__slider"
                        name="range" 
                        id="range" 
                        min={0}
                        max={10}
                        value={rangeValue}
                        onChange={(e) => {
                            handleOptionChange(e, index)
                            setRangeValue(e.target.value)
                        }}
                    />
                    {/* <div className="range-input-options">
                        <input
                            type="radio"
                            name={`range${index}`}
                            id={`range1${index}`}
                            value="1"
                            onChange={(e) => handleOptionChange(e, index)}
                        />
                        <label htmlFor={`range1${index}`}>
                            <div className="range-input-label">1</div>
                        </label>
                    </div>

                    <div className="range-input-options">
                        <input
                            type="radio"
                            name={`range${index}`}
                            id={`range2${index}`}
                            value="2"
                            onChange={(e) => handleOptionChange(e, index)}
                        />
                        <label htmlFor={`range2${index}`}>
                            <div className="range-input-label">2</div>
                        </label>
                    </div>

                    <div className="range-input-options">
                        <input
                            type="radio"
                            name={`range${index}`}
                            id={`range3${index}`}
                            value="3"
                            onChange={(e) => handleOptionChange(e, index)}
                        />
                        <label htmlFor={`range3${index}`}>
                            <div className="range-input-label">3</div>
                        </label>
                    </div>

                    <div className="range-input-options">
                        <input
                            type="radio"
                            name={`range${index}`}
                            id={`range4${index}`}
                            value="4"
                            onChange={(e) => handleOptionChange(e, index)}
                        />
                        <label htmlFor={`range4${index}`}>
                            <div className="range-input-label">4</div>
                        </label>
                    </div>

                    <div className="range-input-options">
                        <input
                            type="radio"
                            name={`range${index}`}
                            id={`range5${index}`}
                            value="5"
                            onChange={(e) => handleOptionChange(e, index)}
                        />
                        <label htmlFor={`range5${index}`}>
                            <div className="range-input-label">5</div>
                        </label>
                    </div>

                    <div className="range-input-options">
                        <input
                            type="radio"
                            name={`range${index}`}
                            id={`range6${index}`}
                            value="6"
                            onChange={(e) => handleOptionChange(e, index)}
                        />
                        <label htmlFor={`range6${index}`}>
                            <div className="range-input-label">6</div>
                        </label>
                    </div>

                    <div className="range-input-options">
                        <input
                            type="radio"
                            name={`range${index}`}
                            id={`range7${index}`}
                            value="7"
                            onChange={(e) => handleOptionChange(e, index)}
                        />
                        <label htmlFor={`range7${index}`}>
                            <div className="range-input-label">7</div>
                        </label>
                    </div>

                    <div className="range-input-options">
                        <input
                            type="radio"
                            name={`range${index}`}
                            id={`range8${index}`}
                            value="8"
                            onChange={(e) => handleOptionChange(e, index)}
                        />
                        <label htmlFor={`range8${index}`}>
                            <div className="range-input-label">8</div>
                        </label>
                    </div>

                    <div className="range-input-options">
                        <input
                            type="radio"
                            name={`range${index}`}
                            id={`range9${index}`}
                            value="9"
                            onChange={(e) => handleOptionChange(e, index)}
                        />
                        <label htmlFor={`range9${index}`}>
                            <div className="range-input-label">9</div>
                        </label>
                    </div>

                    <div className="range-input-options">
                        <input
                            type="radio"
                            name={`range${index}`}
                            id={`range10${index}`}
                            value="10"
                            onChange={(e) => handleOptionChange(e, index)}
                        />
                        <label htmlFor={`range10${index}`}>
                            <div className="range-input-label">10</div>
                        </label>
                    </div> */}
                </div>
            );
        }
    };

    return (
        <div className="question__container">
            {forms.map((each, index) => (
                <div key={index} className="question__box">
                    <span className="question-title">
                        {each.id}. {forms[index].question}
                    </span>
                    {selectedField(each.inputType, index)}
                </div>
            ))}

            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
