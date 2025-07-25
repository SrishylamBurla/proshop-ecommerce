import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Loader } from "../../components/Loader";
import Message from "../../components/Message";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useGetProductDetailQuery,
  useUploadProductImageMutation
} from "../../slices/productApiSlice";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailQuery(productId);

  const [uploadProductImage, {isLoading: loadingUploadImage}] = 
  useUploadProductImageMutation()

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        productId,
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
      };
      await updateProduct(updatedProduct);
      toast.success("Product updated successfully");
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };
  const fileUploadHandler =async (e) =>{
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    try {
        const res = await uploadProductImage(formData).unwrap()
        toast.success(res.message)
        setImage(res.image)
    } catch (err) {
        toast(err?.data?.message || err.error)
    }
  }

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
    }
  }, [product]);

  return (
    <>
      <Link to={`/admin/productlist`} className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUploadImage && <Loader />}
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error?.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="py-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="price" className="py-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId="description" className="py-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="image" className="py-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.Control
                type="file"
                label= 'Choose file'
                onChange={fileUploadHandler}
              />
            </Form.Group>

            <Form.Group controlId="brand" className="py-2">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="category" className="py-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="countInStock" className="py-2">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock count"
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
              />
            </Form.Group>
            <Button type="submit" className="btn-block mt-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
export default ProductEditScreen;
