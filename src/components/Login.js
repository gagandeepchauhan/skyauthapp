import React,{useRef,useState} from 'react'
import {Button,Form,Card,Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link,useHistory} from 'react-router-dom'

export default function Login() {
	const {currentUser,setCurrentUser,login}=useAuth()
	const emailRef=useRef()
	const passwordRef=useRef()
	const [error,setError]=useState([])
	const [loading,setLoading]=useState(false)
	const history=useHistory()

	async function handleSubmit(e){
		e.preventDefault()
		try{
			setError([])
			setLoading(true)
			const resp=await login({email:emailRef.current.value,password:passwordRef.current.value}) //be sure to enter a valid email and strong password otherwise it will return error 400
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
		setLoading(false)
	}
	return (
		<>
			<Card className="p-3">
				<Card.Body>
					<h2 className="mb-4 text-center">Log In</h2>
					{error.length!==0 && <Alert variant="danger">
						<h6>Errors:</h6>
						{error.map((err,i)=>(
							<li key={i}>{err.message}</li>
						))}
					</Alert>}
					<Form onSubmit={handleSubmit} >
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required />
						</Form.Group>
						<Button disabled={loading} className="w-100 my-2" type="submit" >Log In</Button>
					</Form>
					<div className="w-100 text-center mt-3">
						<Link to="/forgot-password">forgot password?</Link>
					</div>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Don't have an account? <Link to="/signup">Sign Up</Link>
			</div>
		</>
	)
}