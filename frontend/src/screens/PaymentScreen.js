import { Button, Form } from "react-bootstrap"
import CheckoutSteps from "../components/CheckoutSteps"
import FormContainer from "../components/FormContainer"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { savePaymentMethod } from "../slices/cartSlice"
import { useNavigate } from "react-router-dom"
const PaymentScreen = () => {

  const [paymentMethod, setPaymentMethod] = useState('Paypal')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state)=>state.cart)
  const { shippingAddress } = cart

  useEffect(()=>{
    if(!shippingAddress){
      navigate("/shipping")
    }
  },[shippingAddress, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate("/placeorder")
  }

  return (
    <FormContainer>

      <CheckoutSteps step1 step2 step3 />
      <h1>Payment</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Form.Check
          type='radio'
          className='py-3'
          label='Paypal or Credit Card'
          id='payment'
          name='paymentMethod'
          value='Paypal'
          onChange={(e)=>setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Form.Group>
        <Button type="submit" variant="primary">Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen