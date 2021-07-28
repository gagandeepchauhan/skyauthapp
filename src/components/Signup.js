import React,{useRef,useState} from 'react'
import {Button,Form,Card,Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link,useHistory} from 'react-router-dom'

export default function Signup() {
	const {currentUser,setCurrentUser,signup,displayMessages,msg}=useAuth()
	const [showMsg,setShowMsg]=useState(false)
	const emailRef=useRef()
	const passwordRef=useRef()
	const passwordConfirmRef=useRef()
	const [firstNameRef,lastNameRef,phoneNumberRef]=[useRef(),useRef(),useRef()]
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
			console.log(msg,showMsg)
			displayMessages()
			console.log(msg,showMsg)
			const resp=await signup({user_type:'customer',email:emailRef.current.value,password:passwordRef.current.value,first_name:firstNameRef.current.value,last_name:lastNameRef.current.value,phone_number:phoneNumberRef.current.value}) //be sure to enter a valid email and strong password otherwise it will return error 400
			const result=await resp.json()
			if(resp.ok){
				setCurrentUser(result)
				history.push("/")
			}else{
				setError(result.errors)
			}
		}catch(err){
			setError([{field:'Fetch failed',message:err.message}])
		}
		setShowMsg(false)
		setLoading(false)
	}
	return (
		<>
			<Card className="p-1" style={{border:"none"}}>
				<Card.Body>
					<h2 className="mb-4 text-center">Sign Up</h2>
					{error.length!==0 && <Alert variant="danger">
						<h6>Errors:</h6>
						{error.map((err,i)=>(
							<li key={i}><strong>{err.field}</strong> - {err.message}</li>
						))}
					</Alert>}
					<Form onSubmit={handleSubmit} >
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group id="first-name">
							<Form.Label>First Name</Form.Label>
							<Form.Control type="text" ref={firstNameRef} required />
						</Form.Group>
						<Form.Group id="last-name">
							<Form.Label>Last Name</Form.Label>
							<Form.Control type="text" ref={lastNameRef} required />
						</Form.Group>
						<Form.Group id="phone-number">
							<Form.Label>Phone Number</Form.Label>
							<Form.Control type="text" placeholder="eg. +(country code)(contact)" ref={phoneNumberRef} required />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required />
						</Form.Group>
						<Form.Group id="password-confirm">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control type="password" ref={passwordConfirmRef} required />
						</Form.Group>
						<Button disabled={loading} className="w-100 my-2" type="submit" >
							{loading ?
							<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
							:
							<span>Sign up</span>
							}
						</Button>
						<p>
							<small className="text-danger">{showMsg && msg && `${msg}...`}</small>
						</p>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Already have an account? <Link to="/login">Log In</Link>
			</div>
		</>
	)
}