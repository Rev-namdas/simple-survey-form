import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getForm, updateForm } from "../../api/apiRequest";
import "./formedit.css";

export default function FormEdit() {
    document.title = "Survey | Edit"

    const initialForm = {
        id: 1,
        question: "",
        inputType: 1,
        option: [''],
        answer: ""
    };

    const [forms, setForms] = useState([initialForm]);
    const [topicName, setTopicName] = useState("");
    const [rangeValue, setRangeValue] = useState(0)
    const navigate = useNavigate()
    const params = useParams()
    const { state: { topic, topic_id } } = useLocation()
    const newOptionBtnRef = useRef()
    let draggedItemIndex = useRef()
    let draggedOverItemIndex = useRef()

	useEffect(() => {
		const fetchData = async () => {
			const res = await getForm(topic)
			
			const ques = res?.questions 
							? JSON.parse(res.questions)
							: []
			setForms(ques);
            setTopicName(res?.topic || "");
		}

		fetchData()
	}, [topic])
	

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
        ids.sort((a, b) => a - b)
        
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

    const handleUpdate = async () => {
        const payload = {
            topic_id: topic_id,
            json_data: JSON.stringify(forms)
        }

        const res = await updateForm(payload)
        
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
                                value={forms[index].option[0]}
                                onChange={(e) => handleOptionChange(e, index, 0)}
                            />
                        </div>
                        <div className="formcreate__range-label">
                            <div>End: </div>
                            <input 
                                type="number" 
                                placeholder="End" 
                                value={forms[index].option[1]}
                                onChange={(e) => handleOptionChange(e, index, 1)}
                            />
                        </div>
                        <div className="formcreate__range-label">
                            <div>Gap: </div>
                            <input 
                                type="number" 
                                placeholder="Gap" 
                                value={forms[index].option[2]}
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
            {/* <div className="question__box-topic">
                <input 
                    className="form__box-topic-input"
                    type="text" 
                    value={topicName}
                />
            </div> */}

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
                                    <option value="1">Short Answer</option>
                                    <option value="2">Details Answer</option>
                                    <option value="3">Dropdown</option>
                                    <option value="4">Multiple Choice</option>
                                    <option value="5">Multiple Answer</option>
                                    <option value="6">Range</option>
                                </select>
                            </div>

                            {selectedField(each.inputType, index)}
                        </div>

                        <div className="form__box-btn-group">
                            <button 
                                className="formcreate__btn formcreate__btn-add" 
                                onClick={handleNewQuestion}
                            >
                                Add
                            </button>
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
            <button 
                className="formcreate__btn formcreate__btn-save"
                onClick={handleUpdate}
            >
                Update
            </button>
        </div>
    );
}