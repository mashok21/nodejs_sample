// import logo from './logo.svg';
import './App.css';
import axios from "axios"
import {useState} from "react"



export default function App () {
  // state vars related to cat
  // state vars related to exp
  const [categories, setCategories] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [categoryServerErrors, setCategoryServerErrors] = useState('')
  const [categoryClientErrors, setCategoryClientErrors] = useState('')
  const categoryErrors = {}

  const [expenses, setExpenses] = useState([])
  const [expenseDate, setExpenseDate] = useState('')
  const [expenseTitle, setExpenseTitle] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenseCategory, setExpenseCategory] = useState('')
  const [expenseDescription, setExpenseDescription] = useState('')
  const [expenseServerErrors, setExpenseServerErrors] = useState([])
  const [expenseClientErrors, setExpenseClientErrors] = useState({})
  const expenseErrors = {}
  
  const urlCat = `http://localhost:3010/api/categories`
  const urlExp = `http://localhost:3010/api/expenses`
  
  const handleCategoriesListClick = () => {
    axios.get(urlCat)
    .then(response => {
      const data = response.data
      setCategories(data)
    })
    .catch(error=>{
      console.log(error)
    })
  }

  const handleCategoryRemove = (category) => {
    const urlId = `${urlCat}/${category._id}`
    axios.delete(urlId)
    .then(response=>{
      const data = response.data
      setCategories(categories.filter(item => item._id !== data._id))
    })
  }
  
  const runCategoryClientValidation = () => {
    if(categoryName.trim().length === 0){
      categoryErrors.name = "ClientSideError - Name field cannot be empty"
      } 
  }

  const handleCategoryNameSubmit = (e) => {
    e.preventDefault()
    const formData = {name: categoryName}
    runCategoryClientValidation()
    if(Object.keys(categoryErrors).length === 0){
      axios.post(urlCat, formData)
      .then(response => {
        setCategories([...categories, response.data])
        setCategoryServerErrors([])
        setCategoryClientErrors({})
      })
      .catch(error =>{
        console.log(error)
        setCategoryServerErrors(error.response.data.errors)
      })
      setCategoryName("")
    } else {
      setCategoryClientErrors(categoryErrors)
    }
  }

  const handleExpensesListClick = () => {
    axios.get(urlExp)
    .then(response => {
      // console.log(response.data)
      setExpenses(response.data)
    })
    .catch(error => console.log(error))
    // console.log(expenses)
  }

  const handleExpenseRemoveClick = (item) => {
    const urlExpId = `${urlExp}/${item}`
    axios.delete(urlExpId)
    .then(response => {
      const data = response.data
      setExpenses(expenses.filter(expense => expense._id !== data._id))
    })
    .catch(error=>console.log(error))
  }

  const runExpenseClientValidationErrors = () => {
    if(expenseDate.trim().length === 0){
      expenseErrors.expenseDate = "Expense date cannot be left blank"
    } else if (new Date(expenseDate) > new Date()){
      expenseErrors.expenseDate = "Are you time travelling into the future?"
    }
    if (expenseTitle.trim().length === 0){
      expenseErrors.expenseTitle = "Need a title"
    }
    if(expenseAmount.trim().length === 0 || expenseAmount.trim() < 1){
      expenseErrors.expenseAmount = "Need a valid amount greater than 1"
    }
    if(expenseCategory.trim().length === 0){
      expenseErrors.expenseCategory = "Select a category"
    }
    }
  

  const handleExpenseFormSubmit = (e) => {
    e.preventDefault()
    const formData = {
      title : expenseTitle,
      amount: expenseAmount,
      description: expenseDescription,
      expenseDate: expenseDate,
      category: expenseCategory
    }

    runExpenseClientValidationErrors()

    if(Object.keys(expenseErrors).length === 0){
      axios.post(urlExp, formData)
      .then(response => {
        const data = response.data
        setExpenses([...expenses, data])
        setExpenseAmount("")
        setExpenseDate("")
        setExpenseCategory("")
        setExpenseDescription("")
        setExpenseTitle("")
        setExpenseServerErrors([])
        setExpenseClientErrors({})
    })
    .catch(errors => {
      console.log(errors)
      setExpenseServerErrors(errors.response.data.errors)
    })
    } else {
      setExpenseClientErrors(expenseErrors)
    }
  }

  return (
    <div>
      <h1> Expense App </h1>
      <h2> Categories </h2>
      <h3> Listing Categories - {categories.length} </h3>
      <button onClick={handleCategoriesListClick}>Get Categories</button>
      <ul>
        {categories.map((category, i) => (
          <li key={i}> {category.name} <button onClick={() => {handleCategoryRemove(category)}}> remove </button></li>
        ))}
      </ul>
      <h3> Add Category </h3>
      <form onSubmit={handleCategoryNameSubmit}>
        <label htmlFor='category-name'>Enter Category Name</label>
        <br/>
        <input 
          type="text"
          value={categoryName}
          id="category-name"
          onChange={(e) => setCategoryName(e.target.value)}
        />
        {categoryClientErrors.name && <span>{categoryClientErrors.name}</span>}
        <br />
        <input type="submit" value="Submit"/>
      </form>
      {categoryServerErrors.length > 0 && (
        <ul>
          {categoryServerErrors.map((error, i) => (
            <li>{error.msg}</li>
          ))}
        </ul>
      )}
      <h2>Expenses</h2>
      <button onClick={handleExpensesListClick}>Get Expenses</button>
      <br/>
      <table border="1">
        <thead>
          <tr>
            <th>Description</th>
            <th>Date</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>  
        </thead>
        <tbody>
          {expenses.map((expense, i) => (
            <tr key={i}>
              <td>{expense.description}</td>
              <td>{expense.expenseDate}</td>
              <td>{expense.title}</td>
              <td>{expense.amount}</td>
              <th><button onClick={() => handleExpenseRemoveClick(expense._id)}>remove expense</button></th>
            </tr>
          ))}
        </tbody>
      </table>
      
      {expenseServerErrors.length > 0 && (
        <ul>
          <h3> Server Errors </h3>
          {expenseServerErrors.map((ele, i) => {
            return <li key={i}>{ele.msg}</li>
          })}

        </ul>

      )}
      <h2> Add Expenses </h2>
      <form onSubmit={handleExpenseFormSubmit}>
          
          <label> Enter Expenses</label> <br/>
          <input 
            type="date" 
            value={expenseDate} 
            onChange={e=>setExpenseDate(e.target.value)}
          />
          {expenseClientErrors.expenseDate && <span>{expenseClientErrors.expenseDate}</span>}
            <br/><br/>

          <label>Title</label><br/>
          <input 
            type="text" 
            value={expenseTitle}
            onChange={e=>setExpenseTitle(e.target.value)}  
            />
          {expenseClientErrors.expenseTitle && <span>{expenseClientErrors.expenseTitle}</span>}  
          <br/><br/>

          <label>Amount</label><br/>
          <input 
            type="number" 
            value={expenseAmount}
            onChange={e=>setExpenseAmount(e.target.value)}
          />
          {expenseClientErrors.expenseAmount && <span>{expenseClientErrors.expenseAmount}</span>} 
          <br/><br/>

          <select onChange={e => setExpenseCategory(e.target.value)}>
          <option> Select</option>
          {categories.map(ele => {
              return <option key={ele._id} value={ele._id}> {ele.name} </option>
          })}
          </select>
          {expenseClientErrors.expenseCategory && <span>{expenseClientErrors.expenseCategory}</span>} 
          <br/>
          
          <label> Description </label><br/>
          <textarea 
            type="text" 
            value={expenseDescription}
            onChange={e=>setExpenseDescription(e.target.value)}  
          />
          <br/><br/>

          <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

