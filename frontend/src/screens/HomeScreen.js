import { Container, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productApiSlice';
import { Loader } from '../components/Loader';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = () => {
  const {pageNumber, keyword} = useParams()
  const { data, isLoading, isError } = useGetProductsQuery({keyword, pageNumber})

  return (
    <>
    <Container>  
        {!keyword ? (<ProductCarousel />) : (
          <Link to='/' className='btn btn-light mb-3'>Go Back</Link>
        )}
        {isLoading ? (<Loader />) : isError ?
         (<Message variant='danger'>
         {isError?.data?.message || 'Something went wrong!'}
         </Message>) : (
          <>
          <h1>Latest Products</h1>
            <Row>
           {data?.products?.map((product)=>(
            <Col xs={12} sm={12} md={6} lg={4} xl={3} key={product._id} >
                <Product product={product} />
            </Col>
           ))}
        </Row>
        <Paginate
        pages={data.pages}
        page={data.page}
        keyword={keyword ? keyword : ''}
         />
          </>
        )}  
    </Container>
    </>
  )
}

export default HomeScreen