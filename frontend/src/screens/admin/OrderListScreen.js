import { Button, Nav, Table } from "react-bootstrap";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import { Loader } from "../../components/Loader";
import Message from "../../components/Message";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderListScreen = () => {
  const { data: orders, isLoading, isError } = useGetOrdersQuery();
  return (
    <>
      <h2>Orders</h2>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{isError?.data?.message || isError?.error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order._id}</td>
                <td>{order.user?.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>$ {order.totalPrice}</td>
                <td>{order.isPaid ? (
                order.paidAt.substring(0, 10)
                ) : (
                    <FaTimes style={{ color: "red" }} />
                )}</td>
                <td>{order.isDelivered ? (
                  order.deliveredAt.substring(0,10)):(
                    <FaTimes style={{color:'red'}} />
                  )}</td>
                <td>
                  <Nav.Link as={Link} to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </Nav.Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
