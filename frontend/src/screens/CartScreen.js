import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
import {removeItemFromCart} from '../slices/cartSlice'
import { FaTrash } from "react-icons/fa";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (product, qty) =>{
    dispatch(addToCart({...product, qty}))
  }
  const handleRemoveFromCart = (id) =>{
    dispatch(removeItemFromCart(id))
  }
  const checkoutHandler = () =>{
    navigate('/login?redirect=/shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h3 style={{ marginBottom: "10px" }}>Shopping Cart</h3>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty please <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    {item.price}
                  </Col>
                  <Col md={2}>
                    <Form.Control as='select' value={item.qty} onChange={(e)=>handleAddToCart(item, Number(e.target.value))}>
                      {[...Array(item.countInStock).keys()].map(x=>(
                        <option key={x+1} value={x+1} >
                          {x+1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                      <Button onClick={()=>{handleRemoveFromCart(item._id)}} type="button" className="btn-block">
                        <FaTrash />
                      </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
        ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <ListGroup>
          <Card variant='flush'>
            <ListGroup.Item>
              <h2>SubTotal ({cartItems.reduce((acc, item)=> acc + item.qty, 0)}) items</h2>
              ${cartItems.reduce((acc,item)=>acc + item.qty*item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button onClick={checkoutHandler} type="button" className="btn btn-block" disabled={cartItems.length === 0}>
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </Card>
        </ListGroup>
      </Col>
    </Row>
  );
};
export default CartScreen;
