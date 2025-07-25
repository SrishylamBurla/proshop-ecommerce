import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Rating from './Rating.js';
import '../assets/styles/index.css';

function Product({product}) {
  // console.log("Product passed to <Product />:", product);

  return (
    <Card style={{ width: '18rem' }} className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image}/>
      </Link>
      <Card.Body>
      <Link to={`/product/${product._id}`}>
        <Card.Title as='div' className='product-title'><strong>{product.name}</strong></Card.Title>
      </Link>
      <Card.Text as='div'>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </Card.Text>
      <Link to={`/product/${product._id}`}>
        <Card.Text as='h3' className='price'>
          {product.price}
        </Card.Text>
      </Link>
      </Card.Body>
    </Card>
  );
}

export default Product;