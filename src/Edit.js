import React from 'react'
import './Edit.css';

function Edit() {
  return (
    <div className="editBox">
        <h3>Choose priority</h3>
        <button className="closeClass">X</button>

        <div className="firstClass">
        <button className="highButton">High</button>
        <button className="mediumButton">Medium</button>
        <button className="lowButton">Low</button>
        </div>
      <div>
        <input type='checkbox'></input>
        <label>Set as task completed</label>
      </div>


    </div>
  )
}

export default Edit;
