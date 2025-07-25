import { FaShoppingCart, FaUser } from "react-icons/fa";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logo from "../assets/logo.png";
import "../assets/styles/index.css";
import "../assets/styles/bootstrap.custom.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge, NavDropdown } from "react-bootstrap";
import { logout } from "../slices/authSlice";
import SearchBox from "./SearchBox";

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth) 
  console.log('auth state:', useSelector((state) => state.auth));


  const logoutHandler = () =>{
    dispatch(logout())
    navigate("/login")
  }

  return (
    <header>
      <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="md">
        <Container>
          
            <Navbar.Brand as={Link} to="/">
              <img src={logo} alt="ProShop Logo" className="me-2" />
              ProShop
            </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                <SearchBox />
                <Nav.Link as={Link} to="/cart">
                  <FaShoppingCart className="me-1" />
                  Cart
                  {cartItems.length > 0 && 
                  <Badge pill bg="success" style={{marginLeft: "5px"}}>
                    {cartItems.reduce((a,c)=> a+c.qty, 0)}
                  </Badge>
                  }
                </Nav.Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="username" menuVariant="dark" >
                  <NavDropdown.Item href="/profile">
                     Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                ) : (
                  <Nav.Link as={Link} to="/login">
                  <FaUser className="me-1" />
                  Sign In
                </Nav.Link>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id="adminmenu" menuVariant="dark">
                    <NavDropdown.Item as={Link} to='admin/orderlist'>
                      Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='admin/userlist'>
                      Users
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='admin/productlist'>
                      Products
                    </NavDropdown.Item>
                </NavDropdown>
                )
                }
                
             </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
