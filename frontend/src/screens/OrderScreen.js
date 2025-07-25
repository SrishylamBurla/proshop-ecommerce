import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation
} from "../slices/orderApiSlice";
import Message from "../components/Message";
import { Loader } from "../components/Loader";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, {loadingDeliver}] = useDeliverOrderMutation()
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    isError: errorPayPal,
  } = useGetPayPalClientIdQuery();

  console.log("PayPal Config Response:", paypal);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
     const loadPayPalScript = async () =>{
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": paypal.clientId,
          currency: "USD",
        },
      })
      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    }
    if(order && !order.isPaid) {
      if(!window.paypal) {
        loadPayPalScript()
      }
    }
  }
  }, [ order, paypal, loadingPayPal, errorPayPal, paypalDispatch]);

 

  // PayPal button: onApprove
  async function onApprove(data, actions) {
    
    return actions.order.capture().then(async function (details) {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment successful");
        console.log("PAYMENT DETAILS >>>", details);

      
    });
  }

  // PayPal button: onApproveTest
//  async function onApproveTest() {
//   const testDetails = {
//     id: "TEST123456",
//     status: "COMPLETED",
//     update_time: new Date().toISOString(),
//     payer: {
//       email_address: "test@example.com",
//     },
//   }

//   await payOrder({ orderId, details: testDetails });
//   refetch();
//   toast.success("Test Payment Successful.");
// }

    // PayPal button: onError
  function onError(err) {
    toast.error(err.message);
  }

  // PayPal button: createOrder
   function createOrder(data, actions) {
    return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: order.itemsPrice,
            },
          },
        ],
      }).then((orderId) => {
        return orderId;
      });
  }
  const deliverOrderHandler = async() =>{
    try {
      await deliverOrder(orderId)
      refetch()
      toast.success('Order delivered')
    } catch (err) {
      toast.error(err?.data?.message || err?.error)
    }
  }


  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant="danger">
      {typeof isError === "string"
        ? isError
        : isError?.data?.message || isError?.error || "Something went wrong"}
    </Message>
  ) : (
    <>
      <Row>
        <h3>Order ID: {orderId}</h3>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Shipping</h3>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment</h3>
              <p>
                <strong>Method: </strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Order Items</h3>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} * $ {item.price}= $ {item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>$ {order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>$ {order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && 
              !order.isDelivered && <ListGroup.Item>
                <Button onClick={deliverOrderHandler} type="button" className="btn btn-block">Mark as Delivered</Button>
              </ListGroup.Item> 
              }
             
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? ( <Loader /> ) : (
                    <div>
                      {/* <Button className="mb-2" onClick={onApproveTest}>
                        Test Pay Order
                      </Button> */}
                      <div>
                        <PayPalButtons
                          onApprove={onApprove}
                          createOrder={createOrder}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
              
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
