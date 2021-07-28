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
	const [msg,setMsg]=useState('')


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

	const displayMessages=()=>{
		setMsg('')
		const msg1=()=>{
			setMsg('please wait')
		}
		const msg2=()=>{
			setMsg('its taking longer than usual')
		}
		const msg3=()=>{
			setMsg('getting coffee for you')
		}
		const msg4=()=>{
			setMsg('actually we\'re on a free heroku dyno, thats why')
		}
		const msg5=()=>{
			setMsg('it takes so long only on first api call')
		}
		const msg6=()=>{
			setMsg('please be patient for just few seconds more')
		}
		setTimeout(msg1,5000)
		setTimeout(msg2,7000)
		setTimeout(msg3,10000)
		setTimeout(msg4,14000)
		setTimeout(msg5,19000)
		setTimeout(msg6,25000)
	}

	const value={
		currentUser,
		setCurrentUser,
		signup,
		login,
		logout,
		changePassword,
		resetPassword,
		updatePassword,
		displayMessages,
		msg
	}
	return ( //condition is there so that we render children only when loading is done i.e set to false after useEffect run properly to check whether there is already a user signed in or not
		<AuthContext.Provider value={value} >
			{children} 
		</AuthContext.Provider>
	)
}