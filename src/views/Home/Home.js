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
    const saveListToLocalStorage = (tasks) => {
        localStorage.setItem('taskminder', JSON.stringify(tasks))
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

        setTitle('');
        setDescription('');
        setPriority('');

        saveListToLocalStorage(newTaskList);
    }

    const removeTaskFromList = (id) => {
        let index;
        taskList.forEach((task, i) => {
            if (task.id === id)
                index = i
        });

        const tempArray = taskList;
        tempArray.splice(index, 1);

        setTaskList([...tempArray])

        saveListToLocalStorage(tempArray)
    }
    const setTaskEditable = (id) => {
        setIsEdit(true);
        setId(id);
        let currentEditTask;
        
        taskList.forEach((task) => {
            if (task.id === id) {
                currentEditTask = task;
            }
        })
setTitle(currentEditTask.title);
setDescription(currentEditTask.description);
setPriority(currentEditTask.priority);

        console.log(currentEditTask)
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
                                setTaskEditable={setTaskEditable}
                            />
                        })
                    }
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

                                        <button className="btn-add-task" type="button" onClick={addTaskTolist}>Update Task</button>
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