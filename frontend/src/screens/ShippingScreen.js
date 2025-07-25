import { useState } from "react"
import { Form, Button, FormGroup } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { useDispatch, useSelector } from "react-redux"
import { saveShippingAddress } from "../slices/cartSlice"
import { useNavigate } from "react-router-dom"
import CheckoutSteps from "../components/CheckoutSteps"

const ShippingScreen = () => {

    const cart = useSelector((state)=>state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [address , setAddress] = useState(shippingAddress?.address || '')
    const [city, setCity] = useState(shippingAddress?.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '')
    const [country, setCountry] = useState(shippingAddress?.country || '')

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate("/payment")
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <FormGroup controlId="address" className="py-2">
                <Form.Label>Address</Form.Label>
                <Form.Control
                type="text"
                value={address}
                placeholder="Enter Address"
                onChange={(e)=>{setAddress(e.target.value)}}
                />
            </FormGroup>

            <FormGroup controlId="city" className="py-2">
                <Form.Label>City</Form.Label>
                <Form.Control
                type="text"
                value={city}
                placeholder="Enter City"
                onChange={(e)=>{setCity(e.target.value)}}
                />
            </FormGroup>

            <FormGroup controlId="postalCode" className="py-2">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                type="text"
                value={postalCode}
                placeholder="Enter PostalCode"
                onChange={(e)=>{setPostalCode(e.target.value)}}
                />
            </FormGroup>

            <FormGroup controlId="country" className="py-2">
                <Form.Label>Country</Form.Label>
                <Form.Control
                type="text"
                value={country}
                placeholder="Enter Country"
                onChange={(e)=>{setCountry(e.target.value)}}
                />
            </FormGroup>
            <Button type="submit" variant="primary">Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen