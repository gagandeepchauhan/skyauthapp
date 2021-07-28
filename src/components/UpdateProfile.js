import React,{useRef,useState} from 'react'
import {Button,Form,Card,Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link,useHistory} from 'react-router-dom'

export default function UpdateProfile() {
	const {changePassword,displayMessages,msg}=useAuth()
	const [showMsg,setShowMsg]=useState(false)
	const currentPasswordRef=useRef()
	const passwordRef=useRef()
	const passwordConfirmRef=useRef()
	const [error,setError]=useState([])
	const [loading,setLoading]=useState(false)
	const history=useHistory()


	async function handleSubmit(e){
		e.preventDefault()
		if(passwordRef.current.value !== passwordConfirmRef.current.value){
			return setError([{field:"Password",message:"Passwords does not match"}])
		}
		try{
			setError([])
			setLoading(true)
			setShowMsg(true)
			displayMessages()
			const resp=await changePassword({current_password:currentPasswordRef.current.value,new_password:passwordRef.current.value})		
			const result=await resp.json()
			// console.log(resp)
			if(resp.ok){
				history.push("/")
			}else{
				setError(result.errors)
			}
		}catch(err){
			history.push("/")
		}
		setShowMsg(false)
		setLoading(false)		
	}
	return (
		<>
			<Card className="p-1" style={{border:"none"}}>
				<Card.Body>
					<h2 className="mb-4 text-center">Edit Profile</h2><hr/>
					{error.length!==0 && <Alert variant="danger">
						<h6>Errors:</h6>
						{error.map((err,i)=>(
							<li key={i}><strong>{err.field}</strong> - {err.message}</li>
						))}
					</Alert>}
					<Form onSubmit={handleSubmit} >
						<Form.Group id="current-password">
							<Form.Label>Current Password</Form.Label>
							<Form.Control required type="password" ref={currentPasswordRef} />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>New Password</Form.Label>
							<Form.Control required type="password" ref={passwordRef} />
						</Form.Group>
						<Form.Group id="password-confirm">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control required type="password" ref={passwordConfirmRef} />
						</Form.Group>
						<Button disabled={loading} className="w-100 my-2" type="submit" >
							{loading ?
							<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
							:
							<span>Update</span>
							}
						</Button>
						<p>
							<small className="text-danger">{showMsg && msg && `${msg}...`}</small>
						</p>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Link to="/">Cancel</Link>
			</div>
		</>
	)
}