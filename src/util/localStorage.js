export const saveListToLocalStorage = (tasks) => {
    localStorage.setItem('taskminder', JSON.stringify(tasks))
}

