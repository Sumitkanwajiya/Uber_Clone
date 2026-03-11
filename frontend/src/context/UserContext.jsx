import React from 'react'
import { useState } from 'react'

export const UserDataContext = React.createContext()



const UserContext = ({children}) => {

    const [user, setUser] = useState({
    email:'',
    fullName:{
        firstname:'',
        lastname:''
    },
   
})
  return (
    <UserDataContext.Provider value={{user, setUser}}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserContext
