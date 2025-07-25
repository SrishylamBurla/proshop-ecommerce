import { useEffect, useState } from "react"
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from '../slices/authSlice'
import { useProfileMutation } from "../slices/userApiSlice"
import { FaTimes } from 'react-icons/fa'
import {Loader} from '../components/Loader'
import Message from '../components/Message'
import { toast } from 'react-toastify'
import { useGetMyOrdersQuery } from '../slices/orderApiSlice'

const ProfileScreen = () => {

    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { userInfo } = useSelector((state)=> state.auth)

    const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation()
    const { data: orders, isLoading, error } = useGetMyOrdersQuery()

    useEffect(()=>{
        if(userInfo){
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    },[userInfo, userInfo.name, userInfo.email])

    const submitHandler = async (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error("Password do not match")
        }else{
            try {
            const res = await updateProfile({_id:userInfo._id, name, email, password}).unwrap()
            dispatch(setCredentials(res))
            toast.success('Profile updated successfully.')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
        }
        
    }
  return <Row>
    <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='py-2' >
                <Form.Label>Name</Form.Label>
                <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email' className='py-2' >
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='py-2' >
                <Form.Label>Enter Password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword' className='py-2' >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Enter Password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-2">
                Update
            </Button>

            {loadingUpdateProfile && <Loader />}
            
        </Form>
    </Col>
    <Col md={9}>
        <h2>My Orders</h2>
        { isLoading ? (<Loader />) : error ? (<Message variant='danger'>
            { error?.data?.message || error?.message || "You don't have any orders" }
        </Message>) : (
            <Table striped hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order)=>{
                        return (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>$ {order.totalPrice}</td>
                                {order.paidAt ? (<td>{order.paidAt.substring(0,10)}</td>) : (
                                    <td><FaTimes style={{color:'red'}} /></td>
                                ) }
                                {order.deliveredAt ? (<td>{order.deliveredAt.substring(0,10)}</td>) : (
                                    (<td><FaTimes style={{color: 'red'}} /></td>)
                                )}
                                <td>
                                    <Link to={`/order/${order._id}`}>
                                        <Button className="btn-sm" variant="light">
                                            Details
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )}
    </Col>
  </Row>

}

export default ProfileScreen