import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getForm, saveAnswers } from "../../api/apiRequest";
import "./formview.css";

export default function FormView() {
    document.title = "Survey | Questions"

    const params = useParams()
    const navigate = useNavigate()
    const [forms, setForms] = useState([]);
    const [answers, setAnswers] = useState([])
    const [rangeValue, setRangeValue] = useState(0)
    const [topicId, setTopicId] = useState(0);
    const [topicName, setTopicName] = useState();

    const fetchData = async () => {
        const res = await getForm(params.url)
        
        const ques = res?.questions 
                        ? JSON.parse(res.questions)
                        : []
        
        setForms(ques);
        setTopicId(res?.id || 0)
        setTopicName(res?.topic || "");

        const formAnswers = ques.map(each => {
            return { id: each.id, answer: "" }
        })

        setAnswers(formAnswers)
    }

    useEffect(
        () => {
            fetchData()
        },
        // eslint-disable-next-line
        []
    );

    const handleOptionChange = (e, index) => {
        const update = [...answers];
        update[index]["answer"] = e.target.value;

        setAnswers(update);
    };

    const handleRadioButton = (index, e) => {
        const update = [...forms]
        
        if(update[index].selected === e.target.value){
            update[index].selected = ''

            const updateAnswer = [...answers];
            updateAnswer[index]["answer"] = '';

            setAnswers(updateAnswer);
        } else {
            update[index].selected = e.target.value
        }
        
        setForms(update)
    }

    const handleOptionsChange = (e, index) => {
        const update = [...answers];
        
        if((update[index]["answer"]).length > 1){
            update[index]["answer"] += ", " + e.target.value;
        } else {
            update[index]["answer"] += e.target.value;
        }

        setAnswers(update);
    };

    const handleSubmit = async () => {
        const payload = {
            topic_id: topicId,
            json_data: JSON.stringify(answers)
        }
        const res = await saveAnswers(payload)
        
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
                        value={answers[index]["answer"]}
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
                        value={answers[index]["answer"]}
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
                        <option defaultValue=""></option>
                        {forms[index].option.map(each => (
                            <option key={each} value={each}>
                                {each}
                            </option>
                        ))}
                    </select>
                </div>
            );
        } else if (item === 4) {
            return (
                <div className="options-input-group">
                    {forms[index].option.map((each, OptionIndex) => (
                        <div key={each} className="options-input" onChange={(e) => handleOptionChange(e, index)}>
                            <input
                                type="radio"
                                name={`radio${index}`}
                                id={`radio${index}${OptionIndex}`}
                                defaultValue={each}
                                checked={forms[index]?.selected === each}
                                onClick={(e) => handleRadioButton(index, e)}
                            />
                            <label className="options-input-label" htmlFor={`radio${index}${OptionIndex}`}>
                                <div>
                                    {each}
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
            );
        } else if (item === 5) {
            return (
                <div className="options-input-group">
                    {forms[index].option.map((each, optionIndex) => (
                        <div key={each} className="options-input">
                            <input
                                type="checkbox"
                                name={`checkbox${optionIndex}`}
                                id={`checkbox${index}${optionIndex}`}
                                value={each}
                                onChange={(e) => handleOptionsChange(e, index)}
                            />
                            <label className="options-input-label" htmlFor={`checkbox${index}${optionIndex}`}>
                                <div>
                                    {each}
                                </div>
                            </label>
                        </div>
                    ))}
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
                        min={forms[index].option[0]}
                        max={forms[index].option[1]}
                        step={forms[index].option[2]}
                        value={rangeValue}
                        onChange={(e) => {
                            handleOptionChange(e, index)
                            setRangeValue(e.target.value)
                        }}
                    />
                </div>
            );
        }
    };

    return (
        <div className="question__container">
            <div className="question__box-topic">{ topicName }</div>

            {forms.map((each, index) => (
                <div key={index} className="question__box">
                    <span className="question-title">
                        {index + 1}. {forms[index].question}
                    </span>
                    {selectedField(each.inputType, index)}
                </div>
            ))}

            <button 
                className="formview__btn-add"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
}
