import axios from "axios"
import {useEffect, useReducer} from "react"

const reducer = (state, action) => {
    if (action.type === "ADD_COUNTER") {
        return [...state, action.payload] 
    } else if (action.type === "SET_COUNTERS") {
        return action.payload 
    } else if (action.type === "INC") {
        return state.map(counter => counter._id === action.id ? {...counter, value: counter.value +1} : counter)
    } else if (action.type === "DEC") {
        return state.map(counter => counter._id === action.id ? {...counter, value: counter.value -1} : counter)
    } else if (action.type === "RESET") {
        return state.map(counter => counter._id === action.id ? {...counter, value: 0} : counter)
    } else {
        return state
    }
}

export default function Counter () {
    
    const [counters, dispatch] = useReducer(reducer, [])
    const urlPost = 'http://localhost:3010/counter'
    const addCounter = () => {
        axios.post(urlPost, { value: 0 })
            .then(response => {
                dispatch({type: "ADD_COUNTER", payload: response.data})
            })
            .catch(error => console.log(error))

    }

    const urlGet = 'http://localhost:3010/counterslist'

    useEffect(() => {
        axios.get(urlGet)
            .then(response => {
                dispatch({type: 'SET_COUNTERS', payload: response.data });
            })
            .catch(error => {
                console.error('Error fetching counters:', error);
            });
    }, []);


    const urlPut = `http://localhost:3010/counter/`
    
    const handleInc = (id) => {
        dispatch({type: "INC", id})
        const updatedCounter = counters.find(counter => counter._id === id)
        axios.put(urlPut+updatedCounter._id, {value: updatedCounter.value})
            .then(response => console.log('Counter incremented', response.data))
            .catch(error=>console.error('Error incrementing counter', error))        
    }
    
    const handleDec = (id) => {
        dispatch({type: "DEC", id})
        const updatedCounter = counters.find(counter => counter._id === id)
        axios.put(urlPut+updatedCounter._id, {value: updatedCounter.value})
            .then(response => console.log('Counter incremented', response.data))
            .catch(error=>console.error('Error incrementing counter', error))    
    }

    const handleReset = (id) => {
        dispatch({type: "RESET", id})
        const updatedCounter = counters.find(counter => counter._id === id)
        axios.put(urlPut+updatedCounter._id, {value: updatedCounter.value})
            .then(response => console.log('Counter incremented', response.data))
            .catch(error=>console.error('Error incrementing counter', error))    
    }

    return (<>
        <h2> Counter App</h2>
        <button onClick={addCounter}>Add Counter</button>
        <ul>
        {counters.map(counter => {
            return <li key={counter._id}>{counter.value}<button onClick={()=>handleInc(counter._id)}> Inc </button><button onClick={() => handleDec(counter._id)}> Dec </button><button onClick={() => handleReset(counter._id)}> Reset </button></li>
        })}

        </ul>
        </>
    )
}