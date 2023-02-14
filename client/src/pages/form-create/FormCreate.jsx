import React, { useState } from "react";
import { useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createForm } from "../../api/apiRequest";
import "./formcreate.css";

export default function FormCreate() {
    document.title = "Survey | Create"

    const initialForm = {
        id: 1,
        question: "",
        inputType: 1,
        option: ['']
    };

    const [forms, setForms] = useState([initialForm]);
    const [rangeValue, setRangeValue] = useState(0)
    const navigate = useNavigate()
    const params = useParams()
    const { state: { topic } } = useLocation()
    const newOptionBtnRef = useRef()
    let draggedItemIndex = useRef()
    let draggedOverItemIndex = useRef()

    const handleNewOption = (index) => {
        const updatedForms = [...forms]
        updatedForms[index].option.push('')

        setForms(updatedForms)
    }

    const handleRemoveOption = (formIndex, optionIndex) => {
        const updated = [...forms]

        updated[formIndex].option.splice(optionIndex, 1)
        setForms(updated)
    }

    const handleNewQuestion = () => {
        const ids = forms.map(each => each.id)
        ids.sort((a,b) => a - b)
        
        const newContent = { ...initialForm };
        newContent.id = ids[ids.length - 1] + 1;
        setForms((prev) => [...prev, newContent]);
    };

    const handleDeleteQuestion = (id) => {
        setForms((prev) => prev.filter((each) => each.id !== id));
    };

    const handleQuestionChange = (id, value) => {
        const updatedForm = [...forms];
        const index = updatedForm.findIndex((each) => each.id === id);
        updatedForm[index].question = value;

        setForms(updatedForm);
    };

    const handleInputFieldSelection = (id, value) => {
        const updatedForm = [...forms];
        const index = updatedForm.findIndex((each) => each.id === id);
        updatedForm[index].inputType = parseInt(value);

        setForms(updatedForm);
    };

    const handleOptionChange = (e, formIndex, optionIndex) => {
        const updatedFrom = [...forms]
        updatedFrom[formIndex].option[optionIndex] = e.target.value

        setForms(updatedFrom)
    }

    const handleKeyDownForNextOption = (e, formIndex) => {
        if(e.which === 13){
            navigator.clipboard.readText()
            .then(data => {
                const extraFieldNeeded = (data.split("\n").length - 1)
                for (let index = 0; index < extraFieldNeeded; index++) {
                    newOptionBtnRef.current.click()
                }

                const updatedFrom = [...forms]

                data.split("\n").forEach((each, index) => {
                    updatedFrom[formIndex].option[index] = each
                })

                setForms(updatedFrom)
            });
        } else if(e.which === 40){
            newOptionBtnRef.current.click()
        }
    }

    const handleSave = async () => {
        const payload = {
            topic_name: topic, 
            url: params.url, 
            json_data: JSON.stringify(forms)
        }
        
        const res = await createForm(payload)
        
        if(res.flag === 'SUCCESS'){
            navigate("/view/" + params.url)
        }
    };

    const selectedField = (item, index) => {
        if (item === 1) {
            return (
                <div className="form__answer">
                    <input
                        placeholder="Short Answer"
                        className="form__group-input"
                        autoComplete="off"
                        type="text"
                        value={forms[index].option[0]}
                        onChange={(e) => handleOptionChange(e, index, 0)}
                    />
                </div>
            );
        } else if (item === 2) {
            return (
                <div className="form__answer">
                    <textarea
                        placeholder="Detail Answer"
                        className="form__group-textarea"
                        autoComplete="off"
                        id="textarea"
                        cols="30"
                        rows="3"
                        value={forms[index].option[0]}
                        onChange={(e) => handleOptionChange(e, index, 0)}
                    ></textarea>
                </div>
            );
        } else if (item === 3 || item === 4 || item === 5) {
            return (
                <div>
                    {forms[index].option.map((each, optionIndex) => (
                        <div key={optionIndex} className="form__group-option">
                            <input
                                type="text" 
                                value={each} 
                                onKeyDown={(e) => handleKeyDownForNextOption(e, index)}
                                onChange={(e) => handleOptionChange(e, index, optionIndex)}
                            />
                            <button 
                                className="form__group-btn-remove"
                                onClick={() => handleRemoveOption(index, optionIndex)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                    <button 
                        className="form__group-btn-add-option"
                        ref={newOptionBtnRef} 
                        onClick={() => handleNewOption(index)}
                    >Add Option</button>
                </div>
                // <div className="form__answer">
                //     <input
                //         placeholder="1st Option"
                //         className="form__answer-input"
                //         type="text"
                //         autoComplete="off"
                //         name="option1"
                //         value={forms[index].options.option1}
                //         onChange={(e) => handleOptionChange(e, index)}
                //     />
                //     <input
                //         placeholder="2nd Option"
                //         className="form__answer-input"
                //         type="text"
                //         autoComplete="off"
                //         name="option2"
                //         value={forms[index].options.option2}
                //         onChange={(e) => handleOptionChange(e, index)}
                //     />
                //     <input
                //         placeholder="3rd Option"
                //         className="form__answer-input"
                //         type="text"
                //         autoComplete="off"
                //         name="option3"
                //         value={forms[index].options.option3}
                //         onChange={(e) => handleOptionChange(e, index)}
                //     />
                //     <input
                //         placeholder="4th Option"
                //         className="form__answer-input"
                //         type="text"
                //         autoComplete="off"
                //         name="option4"
                //         value={forms[index].options.option4}
                //         onChange={(e) => handleOptionChange(e, index)}
                //     />
                // </div>
            );
        } else if (item === 6) {
            return (
                <div>
                    <div className="formcreate__range">
                        <div className="formcreate__range-label">
                            <div>Start From: </div>
                            <input 
                                type="number" 
                                placeholder="Start" 
                                onChange={(e) => handleOptionChange(e, index, 0)}
                            />
                        </div>
                        <div className="formcreate__range-label">
                            <div>End: </div>
                            <input 
                                type="number" 
                                placeholder="End" 
                                onChange={(e) => handleOptionChange(e, index, 1)}
                            />
                        </div>
                        <div className="formcreate__range-label">
                            <div>Gap: </div>
                            <input 
                                type="number" 
                                placeholder="Gap" 
                                onChange={(e) => handleOptionChange(e, index, 2)}
                            />
                        </div>
                    </div>
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
                        onChange={(e) => setRangeValue(e.target.value)}
                    />
                </div>
                // <div>
                //     <input type="radio" name="radio" id="radio1" disabled />
                //     <label htmlFor="radio1">1</label>

                //     <input type="radio" name="radio" id="radio2" disabled />
                //     <label htmlFor="radio2">2</label>

                //     <input type="radio" name="radio" id="radio3" disabled />
                //     <label htmlFor="radio3">3</label>

                //     <input type="radio" name="radio" id="radio4" disabled />
                //     <label htmlFor="radio4">4</label>

                //     <input type="radio" name="radio" id="radio5" disabled />
                //     <label htmlFor="radio5">5</label>

                //     <input type="radio" name="radio" id="radio6" disabled />
                //     <label htmlFor="radio6">6</label>

                //     <input type="radio" name="radio" id="radio7" disabled />
                //     <label htmlFor="radio7">7</label>

                //     <input type="radio" name="radio" id="radio8" disabled />
                //     <label htmlFor="radio8">8</label>

                //     <input type="radio" name="radio" id="radio9" disabled />
                //     <label htmlFor="radio9">9</label>

                //     <input type="radio" name="radio" id="radio10" disabled />
                //     <label htmlFor="radio10">10</label>
                // </div>
            );
        }
    };

    const handleDragAndSort = () => {
        const updated = [...forms]

        const draggedItem = updated.splice(draggedItemIndex.current, 1)[0]
        updated.splice(draggedOverItemIndex.current, 0, draggedItem)

        setForms(updated)

        draggedItemIndex.current = null
        draggedOverItemIndex.current = null
    }

    return (
        <div className="form__container">
            <h3>Topic: { topic }</h3>
            {forms.map((each, index) => (
                <div 
                    key={index} 
                    className="form__box" 
                    draggable 
                    onDragStart={() => draggedItemIndex.current = index}
                    onDragEnter={() => draggedOverItemIndex.current = index}
                    onDragEnd={handleDragAndSort}
                >
                    <div className="form__box-container">
                        <div>
                            <div className="form__header">
                                <input
                                    type="text"
                                    placeholder="Question"
                                    className="form__header-input"
                                    value={forms[index].question}
                                    onChange={(e) =>
                                        handleQuestionChange(
                                            each.id,
                                            e.target.value
                                        )
                                    }
                                />
                                <select
                                    name="intype"
                                    id="intype"
                                    className="form__header-select"
                                    value={forms[index].inputType}
                                    onChange={(e) =>
                                        handleInputFieldSelection(
                                            each.id,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option style={{ padding: '10px !important' }} value="1">Short Answer</option>
                                    <option style={{ padding: '10px !important' }} value="2">Details Answer</option>
                                    <option style={{ padding: '10px !important' }} value="3">Dropdown</option>
                                    <option style={{ padding: '10px !important' }} value="4">Multiple Choice</option>
                                    <option style={{ padding: '10px !important' }} value="5">Multiple Answer</option>
                                    <option style={{ padding: '10px !important' }} value="6">Range</option>
                                </select>
                            </div>

                            {selectedField(each.inputType, index)}
                        </div>

                        <div className="form__box-btn-group">
                            <button 
                                className="formcreate__btn formcreate__btn-add"
                                onClick={handleNewQuestion}
                            >Add</button>
                            <button
                                className="formcreate__btn formcreate__btn-delete"
                                onClick={() => handleDeleteQuestion(each.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <button className="formcreate__btn formcreate__btn-save" onClick={handleSave}>Save</button>
        </div>
    );
}

// https://codepen.io/liborgabrhel/pen/eyzwOx?editors=0110
