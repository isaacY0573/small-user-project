import React from 'react'
import UserCard from './Components/UserCard'
import Users from './Users.json'

const App: React.FC = () => {

  const getAllUsers = ()=>{
    return Users.map((item,index)=>{
      return   <UserCard id = {item.id} name = {item.name} email = {item.email} age = {item.age} city={item.city} /> 
    })
    
  }

 
  return (
    <div className='flex flex-wrap justify-around'>
      {getAllUsers()}
    </div>
  )
}

export default App
