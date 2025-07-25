import { Button, Col, Nav, Row, Table } from "react-bootstrap";
import { useGetProductsQuery } from "../../slices/productApiSlice";
import { Loader } from "../../components/Loader";
import Message from "../../components/Message";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCreateProductMutation,useDeleteProductMutation } from "../../slices/productApiSlice";
import Paginate from "../../components/Paginate";

const ProductListScreen = () => {
  // const {pageNumber} = useParams()
  const { keyword = '', pageNumber = 1} = useParams();

  const navigate = useNavigate()
  const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation()
  const [deleteProduct, {isLoading:loadingDelete}] = useDeleteProductMutation() 
  const { data, isLoading, error, refetch } = useGetProductsQuery({pageNumber})

  const createProductHandler = async() =>{
    if(window.confirm('Are you sure!, you want to create a product?')){
      try {
         await createProduct()
         toast.success('product created successfully')
         refetch()
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  const deleteHandler = async(id) =>{
    if(window.confirm('Are you sure, you want to delete a product?')){
      try {
        await deleteProduct(id)
        toast.success('product deleted successfully')
        refetch()

        if (data.products.length === 1 && pageNumber > 1) {
        navigate(`/admin/productlist/${pageNumber - 1}`);
      }
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    } 
  }
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}><FaPlus style={{marginRight:'10px'}} />Create Product</Button>
        </Col>
      </Row>
      {loadingCreate && (<Loader />)}
      {loadingDelete && <Loader />}
      {isLoading ? (<Loader />) : error ? (
        <Message variant='danger'>{error?.data?.message}</Message>
      ):(
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              {data.products.map((product)=>(
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Nav.Link as={Link} to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm mx-2"><FaEdit /></Button>
                  </Nav.Link>
                  <Button variant="danger" className="btn-sm mx-2" onClick={()=>deleteHandler(product._id)}
                  ><FaTrash style={{color: 'white'}} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
      {/* <Paginate page={data.page} pages={data.pages} isAdmin={true} /> */}
      <Paginate page={data?.page || 1} pages={data?.pages || 1} isAdmin={true} keyword={keyword} />

    </>
  )
}

export default ProductListScreen