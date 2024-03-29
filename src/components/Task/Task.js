import "./Task.css"
import React from "react"

const Task = ({id, title, description, priority, removeTaskFromList, setTaskEditable}) => {
    return(
        <div className="task-container">
            <h1 className="task-title">{title}</h1>
            <p className="task-description">{description}</p>
            <span className="task-priority">🎯{priority}</span>
            <span className="delete-task-icon"
            onClick={() => {
                removeTaskFromList(id);
            }}
            >🗑️</span>

              <span className="edit-task-icon"
            onClick={() => {
                setTaskEditable(id);
            }}
            >🖋️
            </span>
        </div>
    )
}
export default Task