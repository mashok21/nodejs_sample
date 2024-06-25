import axios from "axios"

export default function ExpenseItem (props) {

    const {_id, description, expenseDate, title, amount, getCategoryName, expensesDispatch} = props

    const handleRemove = () => {
        const userConfirm = window.confirm("Are you sure")
        if (userConfirm) {
            axios.delete(`http://localhost:3010/api/expenses/${_id}`)
                .then(response => expensesDispatch({type: "REMOVE_EXPENSES", payload: response.data}))
                .catch(err => console.log(err))
        }
    }
    
    return (<tr>
                <td>{description}</td>
                <td>{expenseDate}</td>
                <td>{title}</td>
                <td>{amount}</td>
                <td></td>
                <td><button onClick={handleRemove}>remove</button></td>
            </tr>
            )
}