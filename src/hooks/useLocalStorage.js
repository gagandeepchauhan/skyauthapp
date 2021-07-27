import {useState,useEffect} from 'react'

function getSavedData(key,initial){
	const userStatus=localStorage.getItem(key) && JSON.parse(localStorage.getItem(key))
	if(userStatus) return userStatus
	if(initial instanceof Function) return initial()
	return initial
}
export function useLocalStorage(key,initial) {
	const [value,setValue]=useState(()=>getSavedData(key,initial))
	useEffect(()=>{
		localStorage.setItem(key,JSON.stringify(value))
	},[value])
	return [value,setValue]
}