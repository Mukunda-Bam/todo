import React from 'react';
import './Edit.css';

function Edit({ updatePriority, closePopup }) {
  return (
    <div className="editBox">
        <h3>Choose priority</h3>
        <button className="closeClass" onClick={closePopup}>X</button>

        <div className="firstClass">
            <button className="highButton" onClick={() => updatePriority('high')}>High</button>
            <button className="mediumButton" onClick={() => updatePriority('medium')}>Medium</button>
            <button className="lowButton" onClick={() => updatePriority('low')}>Low</button>
        </div>
    </div>
  )
}

export default Edit;
