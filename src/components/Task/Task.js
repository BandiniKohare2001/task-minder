import "./Task.css"
import React from "react"

const Task = ({id, title, description, priority, removeTaskFromList}) => {
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
        </div>
    )
}
export default Task