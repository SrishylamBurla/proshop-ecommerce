import { useEffect, useState } from "react"
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useLoginMutation } from '../slices/userApiSlice'
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"
import { Loader } from "../components/Loader"

const LoginScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()    
    const { userInfo } = useSelector((state)=>state.auth)
    const [login, { isLoading }] = useLoginMutation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || "/"

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[userInfo, redirect, navigate])

    const submitHandler = async(e) =>{
    e.preventDefault()
    try{
        const res = await login({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }))
        navigate(redirect)
    } catch (err) {
    console.error("Caught error in login:", err);
    toast.error(
      err?.data?.message || err?.message || err?.error || "Login failed"
    );
}

}

  return (
    <FormContainer>
        <h1>Sign In</h1>
    <Form onSubmit={submitHandler}>
        <FormGroup controlId="email" className="py-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
             />
        </FormGroup>
        <FormGroup controlId="password" className="py-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
             />
        </FormGroup>
        <Button type="submit" className="btn-block" disabled={isLoading}>
  Sign In
</Button>
        {isLoading && (<Loader />)}
    </Form>
    <Row className="mt-2">
        <Col>
            New User? Please <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
        </Col>
    </Row>
    </FormContainer>
  )
}

export default LoginScreen