import React,{useRef,useState} from 'react'
import {Button,Form,Card,Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link,useHistory} from 'react-router-dom'

const messages=['please wait','its taking longer than usual','getting coffee for you','actually we\'re on a free heroku dyno, thats why','it takes so long only on first api call','please be patient for just few seconds more']
export default function Login() {
	const {currentUser,setCurrentUser,login,displayMessages,msg}=useAuth()
	const [showMsg,setShowMsg]=useState(false)
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
			setShowMsg(true)
			displayMessages()
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
		setShowMsg(false)
		setLoading(false)
	}
	return (
		<>
			<Card className="p-1" style={{border:"none"}}>
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
						<Button disabled={loading} className="w-100 my-2" type="submit" >
							{loading ?
							<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
							:
							<span>Log In</span>
							}
						</Button>
						<p>
							<small className="text-danger">{showMsg && msg && `${msg}...`}</small>
						</p>
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