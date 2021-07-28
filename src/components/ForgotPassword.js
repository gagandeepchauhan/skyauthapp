import React,{useRef,useState} from 'react'
import {Button,Form,Card,Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link} from 'react-router-dom'

export default function ForgotPassword() {
	const [emailRef,tokenRef,newPasswordRef]=[useRef(),useRef(),useRef()]
	const [showUpdate,setShowUpdate]=useState(false)
	const [showMsg,setShowMsg]=useState(false)
	const {resetPassword,updatePassword,displayMessages,msg}=useAuth()
	const [error,setError]=useState([])
	const [message,setMessage]=useState('')
	const [loading,setLoading]=useState(false)

	async function handleSubmit(e){
		e.preventDefault()
		try{
			setMessage("")
			setError([])
			setLoading(true)
			setShowMsg(true)
			displayMessages()
			const resp=await resetPassword({email:emailRef.current.value})
			const result=await resp.json()
			if(resp.ok){
				setMessage("Check your mailbox and extract token from it")
				setShowUpdate(true)
				setMessage('')
			}else{
				setError(result.errors)
			}
		}catch(err){
			setError([{field:'Fetch failed',message:err.message}])
		}
		setShowMsg(false)
		setLoading(false)
	}
	async function handleUpdate(e){
		e.preventDefault()
		try{
			setMessage("")
			setError([])
			setLoading(true)
			setShowMsg(true)
			displayMessages()
			const resp=await updatePassword({new_password:newPasswordRef.current.value,token:tokenRef.current.value})
			const result=await resp.json()
			if(resp.ok){
				setMessage("Password reset successfull")
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
			<Card className="p-1" style={{border:"none"}} >
				<Card.Body>
					<h2 className="mb-4 text-center">Password Reset</h2>
					{error.length!==0 && <Alert variant="danger">
						<h6>Errors:</h6>
						{error.map((err,i)=>(
							<li key={i}>{err.message}</li>
						))}
					</Alert>}
					{message ? <Alert variant="success">{message}</Alert> : <>
						{showUpdate ?
							<Form onSubmit={handleUpdate} >
								<Form.Group id="password">
									<Form.Label>New Password</Form.Label>
									<Form.Control type="text" ref={newPasswordRef} required />
								</Form.Group>
								<Form.Group id="token">
									<Form.Label>Token <small>(recieved on mail)</small></Form.Label>
									<Form.Control type="text" ref={tokenRef} required />
								</Form.Group>
								<Button disabled={loading} className="w-100 my-2" type="submit" >
									{loading ?
									<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
									:
									<span>Reset password</span>
									}
								</Button>
								<p>
									<small className="text-danger">{showMsg && msg && `${msg}...`}</small>
								</p>
							</Form>
							:
							<Form onSubmit={handleSubmit} >
								<Form.Group id="email">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" ref={emailRef} required />
								</Form.Group>
								<Button disabled={loading} className="w-100 my-2" type="submit" >
									{loading ?
									<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
									:
									<span>Send token</span>
									}
								</Button>
								<p>
									<small className="text-danger">{showMsg && msg && `${msg}...`}</small>
								</p>
							</Form>
						}
					</>
					}
					<div className="w-100 text-center mt-3">
						<Link to="/login">Login</Link>
					</div>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Don't have an account? <Link to="/signup">Sign Up</Link>
			</div>
		</>
	)
}