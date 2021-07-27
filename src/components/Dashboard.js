import React,{useState} from 'react'
import {useAuth} from '../contexts/AuthContext'
import {Link,useHistory} from 'react-router-dom'
import {Card,Button,Alert} from 'react-bootstrap'

export default function Dashboard() {
	const {currentUser,logout}=useAuth()
	const [error,setError]=useState("")
	const history=useHistory()
	async function handleLogOut(){
		setError("")
		logout()
	}
	return (
		<>
			<Card className="p-3">
				<Card.Body>
					<h2 className="mb-4 text-center">Profile</h2><hr/>
					{error && <Alert variant="danger">{error}</Alert>}
					<p><strong>Email : </strong>{currentUser.email}</p>
					<p><strong>Name : </strong>{currentUser.first_name} {currentUser.last_name}</p>
					<p><strong>Contact : </strong>{currentUser.phone_number}</p>
					<Link to="/update-profile" className="btn btn-primary btn-block mt-3" >Update Profile</Link>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Button variant="link" onClick={handleLogOut}>Log Out</Button>
			</div>
		</>
	)
}