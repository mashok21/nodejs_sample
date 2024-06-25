import axios from "axios"
import ExpenseItem from "./ExpenseItem"


export default function ExpensesTable (props) {

    const {expenses, getCategoryName, expensesDispatch} = props

    return (
        <div>
            <h2>Expenses</h2>
            <br/>
            <table border="1">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>  
                </thead>
                <tbody>
                {expenses.map((expense, i) => (
                    <ExpenseItem 
                        key={expense._id} 
                        {...expense} 
                        expensesDispatch={expensesDispatch}
                        getCategoryName={getCategoryName}
                        />
                ))}
                </tbody>
            </table>
            <h4>Total Expenses -{expenses.reduce((current, total) => current + total.amount, 0)} </h4>
        </div>
    )
}