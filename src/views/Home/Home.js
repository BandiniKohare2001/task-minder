import "./Home.css";
import React, { useEffect, useState } from "react";
import Task from "../../components/Task/Task";

const Home = () => {
    const [taskList, setTaskList] = useState([
        {
            id: 1,
            title: "Bandini",
            description: "hello bantu",
            priority: "Important"
        },

    ])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('')

useEffect(()=>{
    const list = JSON.parse(localStorage.getItem('taskminder'));
    setTaskList(list)
}, [])
    const saveListToLocalStorage = (tasks) =>{
        localStorage.setItem('taskminder', JSON.stringify(tasks))
    }

    const addTaskTolist = () => {
        const randomId = Math.floor(Math.random() * 10000);
        const obj = {
            id: '',
            title: title,
            description: description,
            priority: priority
        }

        const newTaskList = [...taskList, obj]
        setTaskList(newTaskList)

        setTitle('');
        setDescription('');
        setPriority('');

        saveListToLocalStorage(newTaskList);
    }

    const removeTaskFromList = (id) => {
       let index;
       taskList.forEach((task, i)=>{
       if(task.id===id)
       index = i
       });

       const tempArray = taskList;
       tempArray.splice(index, 1);

       setTaskList([...tempArray])

       saveListToLocalStorage(tempArray)
    }
    return (
        <div className="container">
            <h1 className="app-title">TASK MINDER 📝</h1>
            <div className="todo-flex-container">
                <div>
                    <h2 className="text-center">Show List</h2>
                    {
                        taskList.map((taskItem, index) => {
                            const { id, title, description, priority } = taskItem;

                            return <Task id={id} 
                            title={title} 
                            description={description} 
                            priority={priority} 
                            removeTaskFromList={removeTaskFromList}
                            />
                        })
                    }
                </div>
                <hr  className="hr"/>
                <div>
                    <h2 className="text-center">Add List</h2>
                    <div className="add-task-form-container">
                        <form>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                                placeholder="Title"
                                className="task-input"
                            />

                            <input
                                type="text"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                                placeholder="Write description"
                                className="task-input"
                            />

                            <input
                                type="text"
                                value={priority}
                                onChange={(e) => {
                                    setPriority(e.target.value)
                                }}
                                placeholder="Priority"
                                className="task-input"
                            />
                            <button className="btn-add-task" type="button" onClick={addTaskTolist}>Add Task</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home