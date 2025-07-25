import { Link, useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
// import products from "../products";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductDetailQuery, useCreateReviewMutation } from "../slices/productApiSlice";
import { Loader } from "../components/Loader";
import { toast } from 'react-toastify'
import Message from "../components/Message";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
// import { useState } from "react";
// import { useEffect } from "react";
// import axios from "axios";

const ProductScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id: productId } = useParams();
  const { userInfo } = useSelector((state)=> state.auth)
  
  const { data:product, isError, isLoading , refetch} = useGetProductDetailQuery(productId)
  const [createReview, {isLoading: loadingProductReview}] = useCreateReviewMutation()
  const [qty, setQty] =useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
//   const [product, setProduct] = useState({}); 

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const { data } = await axios.get(`/api/products/${productId}`)
//       setProduct(data);
//     }
//     fetchProduct();
//   },[productId]);  

  const handleAddToCart = () =>{
      dispatch(addToCart({...product, qty}))
      navigate("/cart")
  }

  const submitHandler = async (e) =>{
    e.preventDefault()
    try {
      await createReview({
        productId,
        rating:Number(rating),
        comment
      }).unwrap()
      setRating(0)
      setComment('')
      refetch()
      toast.success('Review Submitted')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (<Loader />) : isError ? (<Message variant='danger'>{isError?.data?.message || isError.error}</Message>): (
        <>
        <Row > 
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: {product.price}</ListGroup.Item>
            <ListGroup.Item>
              {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.numReviews > 0 ? "In Stock" : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && 
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control as='select' value={qty} onChange={(e)=>setQty(Number(e.target.value))}>
                        {[...Array(product.countInStock).keys()].map((x)=>
                          (<option key={x+1} value={x+1}>
                            {x+1}
                          </option>)
                        )}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              }
              <ListGroup.Item>
              <Button onClick={handleAddToCart}  className="btn-block" type="button" disabled={product.countInStock === 0}>
                Add to Cart
              </Button>
            </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row className="review mt-4">
        <Col md={6}>
              <h2>Rating</h2>
              
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
          <ListGroup variant="flush">
              {product.reviews.map((review)=>(
                <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0,10)}</p>
                <p>{review.comment}</p>                  
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <h2>Write a Customer review</h2>
                {loadingProductReview && <Loader />}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                      className="my-2"
                      as='select'
                      value={rating}
                      onChange={(e)=>setRating(e.target.value)}
                      >
                      <option value=''>select...</option>
                      <option value='1'>1 - poor</option>
                      <option value='2'>2 fair</option>
                      <option value='3'>3 - good</option>
                      <option value='4'>4 - very good</option>
                      <option value='5'>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                      className="my-2"
                      type="textarea"
                      rows={3}
                      value={comment}
                      onChange={(e)=>setComment(e.target.value)}>
                      </Form.Control>
                      <Button 
                      type="submit"
                      variant="primary"
                      disabled={loadingProductReview} 
                      >Submit</Button>
                    </Form.Group>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to={`/login`}>Sign in</Link> to write a review{' '}
                  </Message>
                )}
              </ListGroup.Item>
              
          </ListGroup>
        </Col>
      </Row>
        </>
      )}
      
    </div>
  );
};

export default ProductScreen;
