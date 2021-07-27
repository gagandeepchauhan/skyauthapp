import React,{useState,useContext,useEffect} from 'react'
import {useLocalStorage} from '../hooks/useLocalStorage'

const API_URL =	process.env.NODE_ENV=='development' ?
			  	process.env.REACT_APP_DEVELOPMENT_API_URL :
			  	process.env.REACT_APP_PRODUCTION_API_URL

const AuthContext=React.createContext()
export function useAuth(){
	return useContext(AuthContext)
}
export default function AuthProvider({children}) {
	const [currentUser,setCurrentUser]=useLocalStorage('AUTH_DETAILS',null)


	const signup=(data)=>{ // data={email,password,first_name,last_name,phone_number}
		return fetch(`${API_URL}/api/auth/register`,{
			method:"POST",
			body:JSON.stringify(data),
			headers:{
				'Content-Type':'application/json'
			}
		})
	}

	const login=(data)=>{ // data={email,password}
		return fetch(`${API_URL}/api/auth/login`,{
			method:"POST",
			body:JSON.stringify(data),
			headers:{
				'Content-Type':'application/json'
			}
		})
	}

	const logout=()=>{ // logouts a user
		setCurrentUser(null)
	}

	const changePassword=(data)=>{  // data={current_password,new_password} ,and it requires authentication
		return fetch(`${API_URL}/api/auth/password_change`,{
			method:"POST",
			body:JSON.stringify(data),
			headers:{
				'Content-Type':'application/json',
				'Authorization':`Bearer ${currentUser?.auth_token}`
			}
		})
	}

	const resetPassword=(data)=>{ // data={email} ,and it will send the password reset verification link to the specified email
		return fetch(`${API_URL}/api/auth/password_reset`,{
			method:"POST",
			body:JSON.stringify(data),
			headers:{
				'Content-Type':'application/json'
			}
		})
	}

	const updatePassword=(data)=>{ // data={new_password,token} ,and through the recieved link, it allows the updation of password
		return fetch(`${API_URL}/api/auth/password_reset_confirm`,{
			method:"POST",
			body:JSON.stringify(data),
			headers:{
				'Content-Type':'application/json'
			}
		})
	}

	const value={
		currentUser,
		setCurrentUser,
		signup,
		login,
		logout,
		changePassword,
		resetPassword,
		updatePassword
	}
	return ( //condition is there so that we render children only when loading is done i.e set to false after useEffect run properly to check whether there is already a user signed in or not
		<AuthContext.Provider value={value} >
			{children} 
		</AuthContext.Provider>
	)
}