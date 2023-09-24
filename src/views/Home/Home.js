import "./Home.css";
import showToast from 'crunchy-toast';
import React, { useEffect, useState } from "react";
import {saveListToLocalStorage} from './../../util/localStorage';
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
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('taskminder'));
        if (list && list.lenght >= 0) {
            setTaskList(list)
        }
    }, [])
    
const findIndexByTaskId = (taskId) => {
    let index;

    taskList.forEach((task, i) => {
        if(task.id === taskId){
            index= i
        }
    })
  return index;
}
    const clearInputFields = () => {
        setTitle('');
        setDescription('');
        setPriority('');
    }
    const addTaskTolist = () => {
        const randomId = Math.floor(Math.random() * 10000);
        const obj = {
            id: randomId,
            title: title,
            description: description,
            priority: priority
        }

        const newTaskList = [...taskList, obj]
        setTaskList(newTaskList)

        clearInputFields()

        saveListToLocalStorage(newTaskList);
        showToast('Task added succesfully', 'success', 3000);
    }

    const removeTaskFromList = (id) => {
        const index = findIndexByTaskId (id);
        const tempArray = taskList;
        tempArray.splice(index, 1);

        setTaskList([...tempArray])

        saveListToLocalStorage(tempArray)
        showToast('Task remove from list succesfully', 'success', 3000);
    }
    const setTaskEditable = (id) => {
        setIsEdit(true);
        setId(id);
        
        const currentEditTask = findIndexByTaskId(id);
        setTitle(currentEditTask.title);
        setDescription(currentEditTask.description);
        setPriority(currentEditTask.priority);

        console.log(currentEditTask)
    }

    const UpdateTask = () => {
       
const indexToUpdate = findIndexByTaskId(id);

        const tempArray = taskList;
        tempArray[indexToUpdate] = {
            id: id,
            title: title,
            description: description,
            priority: priority
        }
        setTaskList([...tempArray])
        saveListToLocalStorage(tempArray);
        showToast('Task update succesfully', 'success', 3000);

        setId(-1);
        clearInputFields();
        setIsEdit(false);
    }
    return (
        <div className="container">
            <h1 className="app-title">TASK MINDER 📝</h1>
            <div className="todo-flex-container">
                <div>
                    <h2 className="text-center">Show List</h2>
                    <div>{
                        taskList.map((taskItem, index) => {
                            const { id, title, description, priority } = taskItem;

                            return <Task id={id}
                                title={title}
                                description={description}
                                priority={priority}
                                removeTaskFromList={removeTaskFromList}
                                setTaskEditable={setTaskEditable}
                            />
                        })
                    }
                    </div>
                </div>
                <hr className="hr" />
                <div>
                    <h2 className="text-center">
                        {isEdit ? `Update Task ${id}` : 'Add Task'}
                    </h2>
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
                            <div>
                                {
                                    isEdit ?

                                        <button className="btn-add-task" type="button" onClick={UpdateTask}>Update Task</button>
                                        :
                                        <button className="btn-add-task" type="button" onClick={addTaskTolist}>Add Task</button>

                                }


                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home