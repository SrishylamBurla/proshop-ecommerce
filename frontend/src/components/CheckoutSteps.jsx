import { Nav } from "react-bootstrap"

const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return (
    <Nav className="justify-content-center mb-2">
        <Nav.Item>
            {step1 ? 
            
                <Nav.Link to='/login'>
                    Sign In
                </Nav.Link>
             :
            <Nav.Link disabled>Sign In</Nav.Link>
            }
        </Nav.Item>
        <Nav.Item>
            {step2 ? 
                <Nav.Link to='/shipping'>
                    Shipping
                </Nav.Link>:
            <Nav.Link disabled>Shipping</Nav.Link>
            }
        </Nav.Item>
        <Nav.Item>
            {step3 ? 
            
                <Nav.Link to='/Payment'>
                    Payment
                </Nav.Link>
            :
            <Nav.Link disabled>Payment</Nav.Link>
            }
        </Nav.Item>
        <Nav.Item>
            {step4 ? 
                <Nav.Link to='/placeOrder'>
                    Place Order
                </Nav.Link>
             :
            <Nav.Link disabled>Place Order</Nav.Link>
            }
        </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps