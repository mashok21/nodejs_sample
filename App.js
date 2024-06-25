// import logo from './logo.svg';
import './App.css';
import axios from "axios"
import {useState, useReducer, useEffect} from "react"
import CategoryForm from './CategoryForm';
import CategoriesList from './CategoriesList';
import ExpensesTable from './ExpensesTable';
import ExpenseForm from './ExpenseForm';

const expensesReducer = (state, action) => {
  if (action.type === "SET_EXPENSES"){
    return {...state, data: action.payload}
  } else if (action.type === "REMOVE_EXPENSES"){
    return {...state, data: state.data.filter(ele => ele._id !== action.payload._id)}
  } else if (action.type === "ADD_EXPENSES"){
    return {...state, data: [...state.data, action.payload]}
  } else {
    return state
  }
}

export default function App () {
  // state vars related to cat
  // state vars related to exp
  const [categories, setCategories] = useState([])
  const [expenses, expensesDispatch] = useReducer(expensesReducer, {data:[]})
  
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

 const handleAddCategory = (category) => {
    setCategories([...categories, category])
  }

  const getCategoryName = (expense) => {
    const category = categories.find((cat) => {
        return cat._id === expense.category 
    })
    if(category) {
        return category.name 
    } else {
        return 'N/A'
    }
  }

  const handleCategoryRemoveComponent = (category) => {
    setCategories(categories.filter(cat => cat._id !== category._id))
  }

  
  useEffect(() => {
    axios.get(urlExp)
    .then(response => {
      expensesDispatch({type:"SET_EXPENSES", payload: response.data})
    })
    .catch(error => console.log(error))
  }, [])
  
  
    

  
  return (
    <div>
      <h1> Expense App </h1>
      <h2> Categories </h2>
      <h3> Listing Categories - {categories.length} </h3>
      <button onClick={handleCategoriesListClick}>Get Categories</button>

      <CategoriesList categories={categories} handleCategoryRemoveComponent={handleCategoryRemoveComponent}/>
      
      <h3> Add Category </h3>
      
      <CategoryForm handleAddCategory={handleAddCategory}/>

      <button>Fetch Expenses</button>

      <ExpensesTable 
        expenses={expenses.data} 
        expensesDispatch={expensesDispatch} 
        getCategoryName={getCategoryName} />
      
      <ExpenseForm expensesDispatch={expensesDispatch} categories={categories}/>

    </div>
  )
}

