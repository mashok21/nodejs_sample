import {useState} from "react"
import axios from "axios"

export function Tasks () {

    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [taskServerErrors, setTaskServerErrors] = useState([])

    const handleTasksSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title : title, 
            description: description, 
            status: status
        }
        axios.post("http://localhost:4000/api/tasks", formData)
        .then(response => {
            const data = response.data
            setTasks([...tasks, data])
            setTitle('')
            setDescription('')
            setStatus('')
            setTaskServerErrors([])
        })
        .catch(err => {
            console.log(err)
            setTaskServerErrors(err.response.data.errors)
        })
    }

    return (
        <div>
            <h2> Add Tasks</h2>
            <form onSubmit={handleTasksSubmit}>
                
                <label> Title </label> <br/>
                <input  
                    type="text"
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
                />
                <br/><br/>
                <label> Description </label><br/>
                <textarea
                    type="text"   
                    value = {description}
                    onChange={e=>setDescription(e.target.value)}
                />
                <br/><br/>
                <select value={status} onChange={e=>setStatus(e.target.value)}>
                    <option value=""> Select </option>
                    <option value="pending"> Pending </option>
                    <option value="in-progress"> In-progress </option>
                    <option value="completed"> Completed </option>
                </select>
                <br/><br/>
                <input type="submit" value='Submit' />

                {taskServerErrors.length > 0 && (
                    <ul>
                        {taskServerErrors.map((err, i) =>{
                            return <li key={i}>{err.msg}</li>
                        })}
                    </ul>
                )}
                <br/>
                <ul>
                    {tasks.map((task, i) => {
                        return <li key={i}>{task.title}</li>
                    })}
                </ul>
                
            </form>
        </div>
    )
}