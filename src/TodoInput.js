import React, { useState } from 'react';
import './TodoInput.css';
import Popup from 'reactjs-popup';
import { RiDeleteBinLine } from "react-icons/ri";
import Edit from './Edit.js';

function TodoInput() {
    const [inputText, setInputText] = useState(''); // Input from user
    const [selectedOption, setSelectedOption] = useState('high'); // Creating states for the select option
    const [display, setDisplay] = useState([]); // Creating an array for final rendering of text
    const [colors, setColors] = useState([]); // Creating an array to hold the colors for each specific todo item
    const [isPopupOpen, setIsPopupOpen] = useState(false); // To control the popup visibility
    const [editIndex, setEditIndex] = useState(null); // Index of the todo being edited

    // Handle input text change
    function handleChange(e) {
        setInputText(e.target.value);
    }

    // Handle select option change
    function handleOption(e) {
        setSelectedOption(e.target.value);
    }

    // Add a new todo item
    function addTodo(e) {
        e.preventDefault();
        const newColor = getColor(selectedOption);
        setDisplay([...display, inputText.concat(":-" + selectedOption)]);
        setColors([...colors, newColor]); // Add the new color to the array
        setInputText(''); // Clears input after adding
    }

    // Delete a todo item
    function handleDelete(index) {
        const newList = [...display];
        newList.splice(index, 1);
        const newColors = [...colors];
        newColors.splice(index, 1); // Remove the color of the deleted item
        setDisplay(newList);
        setColors(newColors);
    }

    // Function to open the popup and set the current todo index
    function openPopup(index) {
        setEditIndex(index);
        setIsPopupOpen(true);
    }

    // Function to close the popup
    function closePopup() {
        setIsPopupOpen(false);
    }

    // Function to update the priority and color of the todo item
    function updatePriority(priority) {
        if (editIndex !== null) {
            const newColors = [...colors];
            newColors[editIndex] = getColor(priority);
            const newDisplay = [...display];
            newDisplay[editIndex] = newDisplay[editIndex].split(":-")[0] + ":-" + priority;
            setColors(newColors);
            setDisplay(newDisplay);
        }
        closePopup();
    }

    // Function to return the color based on the priority
    function getColor(priority) {
        switch (priority) {
            case 'high':
                return "red";
            case 'medium':
                return "yellow";
            case 'low':
                return "green";
            default:
                return 'white';
        }
    }

    return (
        <div className="todoClass">
            <form className="firstClass" onSubmit={addTodo}>
                <input
                    type="text"
                    className="secondClass"
                    value={inputText}
                    onChange={handleChange}
                    placeholder="Enter your todo list...."
                />
                <select value={selectedOption} onChange={handleOption} id="selectId" className='selectClass'>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <button type='submit' disabled={inputText === ""} className="thirdClass">Add todo</button>
            </form>

            <div className='fourthClass'>
                <h1 className='h1-class'>Todo List</h1>
                <ol className="fifthClass" id="olId">
                    {display.map((todo, index) => (
                        <li id="liId" key={index} style={{ backgroundColor: colors[index] }}>
                            {todo}
                            <button className="sixthClass" onClick={() => openPopup(index)}>Edit</button>
                            <button className="seventhClass" onClick={() => handleDelete(index)}><RiDeleteBinLine /></button>
                        </li>
                    ))}
                </ol>
            </div>

            {isPopupOpen && editIndex !== null && (
                <Popup open={isPopupOpen} onClose={closePopup} position="right center">
                    <Edit updatePriority={updatePriority} closePopup={closePopup} />
                </Popup>
            )}
        </div>
    );
}

export default TodoInput;
