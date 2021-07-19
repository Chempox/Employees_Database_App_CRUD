
import React from 'react';
import './App.css';
import {useState} from 'react';
import Axios from 'axios';


function App() {

  //Const declarations
  const [name,setName] = useState("");
  const [age,setAge] = useState(0);
  const [position,setPosition] = useState("");
  const [country,setCountry] = useState("");
  const [salary,setSalaray] = useState(0);
  const [newSalary, setNewSalary] = useState(0);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newPosition, setNewPosition] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [employeeList, setEmployeeList] = useState([]);

  //Add employee function
  const addEmployee = () =>{
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      salary: salary
    }).then(() => {
      setEmployeeList([...employeeList,{
        name: name,
        age: age,
        country: country,
        position: position,
        salary: salary,
      },
    ])
    });
  };

  //Get employee function
  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      setEmployeeList(response.data);
    })
  }

  //Update employee function
  const updateEmployees = (id) => {
    Axios.put('http://localhost:3001/update', {
      name: newName,
      age: newAge,
      country: newCountry,
      position: newPosition,
      salary: newSalary,
      id : id  
    }).then((response) => {
      setEmployeeList(employeeList.map((val)=>{
        return val.id === id ? {id: val.id, name: newName, country: newCountry, age: newAge, position: newPosition, salary: newSalary} : val
      }))
    }
   );
  };

  //Delete employee function
  const deleteEmployee = (id) =>{
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(employeeList.filter((val) =>{
        return val.id != id
      }))
    })
  }

 //HTML and main part of the code
  return (
    <div className='app'>
        <div className='inputs'>
          <div className = 'input-container'>
            <label>Name:</label>
            <input type='text' onChange={(event) => {
              setName(event.target.value)
              }}></input>
            <label>Age:</label>
            <input type='number' onChange={(event) => {
              setAge(event.target.value)
              }}></input>
            <label>Position:</label>
            <input type='text' onChange={(event) => {
              setPosition(event.target.value)
              }}></input>
            <label>Country:</label>
            <input type='text' onChange={(event) => {
              setCountry(event.target.value)
              }}></input>
            <label>Salary:</label>
            <input type='number' onChange={(event) => {
              setSalaray(event.target.value)
              }}></input>
            <div className='button_'>
              <button onClick = {addEmployee}>Add Employee</button>
              <button onClick={getEmployees}>Show Employees</button>
          </div>
      </div>
      <div className = "show">
          {employeeList.map((val) => {
            return (
            <div className = "employee">
              <div className = "box-info">
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Salary: {val.salary}</h3>
              </div>
              <div className = 'update-inputs'>
                <input type = 'text' placeholder = "Name..." onChange={(event) => {
                  setNewName(event.target.value)
                }}>
                </input>
                <input type = 'number' placeholder = "Age..." onChange={(event) => {
                  setNewAge(event.target.value)
                }}></input>
                <input type = 'text' placeholder = "Country..." onChange={(event) => {
                  setNewCountry(event.target.value)
                }}></input>
                <input type = 'text' placeholder = "Position..." onChange={(event) => {
                  setNewPosition(event.target.value)
                }}></input>
                <input type = 'number' placeholder = "Salary..." onChange={(event) => {
                  setNewSalary(event.target.value)
                }}></input>
              </div>
              <div className = "update-delete">
                <button onClick = {()=>{updateEmployees(val.id)}}>Update</button>
                <button onClick = {() => {deleteEmployee(val.id)}}>Delete Employee</button>
              </div>
            </div>
              );
          })}
      </div>
      </div>
    </div>
  );
}

export default App;


