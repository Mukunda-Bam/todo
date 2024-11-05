

import React, { useState } from 'react';
import './TodoInput.css';
import Popup from 'reactjs-popup';
import Edit from './Edit.js';

function TodoInput() {
    const [inputText, setInputText] = useState(''); //Input from user
    const [selectedOption, setSelectedOption] = useState('high'); //Creating states for the select option
    const [display, setDisplay] = useState([]); //Creating an array for final rendering of text
    const [colors, setColors] = useState([]); // Creating an array to hold the colors for each specific todo item

    function handleChange(e) {
        setInputText(e.target.value);
    }

    function handleOption(e) {
        setSelectedOption(e.target.value);
    }

    function addTodo(e) {
        e.preventDefault();
        const newColor = getColor(selectedOption);
        setDisplay([...display, inputText.concat(":-" + selectedOption)]);
        setColors([...colors, newColor]); // Add the new color to the array
        setInputText(''); // Clears input after adding
    }

    function handleDelete(index) {
        const newList = [...display];
        newList.splice(index, 1);
        const newColors = [...colors]; // Create a new colors array
        newColors.splice(index, 1); // Remove the color of the deleted item
        setDisplay(newList); //Update text
        setColors(newColors); // Update colors
    }

    function popupBox() {
        return (
            <div>
                {Edit()}
            </div>
        );
    };

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

    // function getColor(priority){
    //     if (priority ==='high'){
    //         return "red"
    //     }
    //     else if(priority==='medium'){
    //         return 'yellow'
    //     }
    //     else if (priority==='low'){
    //         return 'green'
    //     }
    //     else {
    //         return 'white'
    //     }
    // }

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
                <h1>Todo List</h1>
                <ol className="fifthClass" id="olId">
                    {display.map((todo, index) => (
                        <li id="liId" key={index} style={{ backgroundColor: colors[index] }}>
                            {todo}
                            <Popup trigger={<button className="sixthClass">Edit</button>} position="right center">
                                <div>{popupBox()}</div>
                            </Popup>
                            <button className="seventhClass" onClick={() => handleDelete(index)}>-</button>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default TodoInput;
