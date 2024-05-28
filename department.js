import { useState } from "react";


export function EmployeeDepartment () {
    const [deptName, setDeptName] = useState('')
    const [deptId, setDeptId] = useState('')
    const [empList, setEmpList] = useState([])
    const [showMsg, setShowMsg] = useState(false)
    const [empName, setEmpName] = useState('')

    const departments = [
        {id:1, name:"Human Resources"},
        {id:2, name:"Engineering"}
    ]

    const employees = [
        {id: 1, name:"Alice Johnson", department:1},
        {id: 2, name:"Bob Smith", department:1},
        {id: 3, name:"Charlie Davis", department:2},
        {id: 4, name:"Diana Adams", department:2},
        {id: 5, name:"Erica Miller", department:2},
        {id: 6, name:"Frank Wright", department:2}
    ];

    const handleDepartmentChange =(e) => {
        const selectDeptId = Number.parseInt(e.target.value)
        setDeptId(selectDeptId)

        const selectedDeptName = departments.find(department => selectDeptId === department.id)
        if (selectedDeptName){
            setDeptName(selectedDeptName.name)
        }

        const newEmpList = employees.filter(employee => employee.department === selectDeptId)
        if (newEmpList){
            setEmpList(newEmpList)
            setEmpName('')
        }
    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault()
        setShowMsg(true)
    }

    return (
        <div>
            <h1> Dynamic Select</h1>
            <form onSubmit={handleFormSubmit}>
                <h3>Department</h3>
                <select onChange={handleDepartmentChange}>
                    <option value="select"> Select</option>
                    {departments.map((department, idx) => {
                        return <option key={idx} value={department.id}>{department.name}</option>
                    })}
                </select>

                <h3>Employees</h3>
                <select onChange={e=>setEmpName(e.target.value)}>
                    <option value="select">Select</option>
                    {empList.map((emp, idx) => {
                        return <option key={idx} value={emp.name}>{emp.name}</option>
                    })}
                </select>
                <br/><br/><br/>
                
                <input type="submit" value="Submit" />
                {showMsg && <h3>You have selected: {empName} belonging to {deptName}</h3>}
            </form>
        </div>
    )   
}