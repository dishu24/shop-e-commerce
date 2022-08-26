import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import {NavDropdown} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { logoutAction } from '../actions/userAction';
import { useNavigate } from 'react-router';
import SearchBox from './SearchBox';


const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userdetail = useSelector(state => state.userLogin)
    const {userInfo} = userdetail
    // const [user,setUser] = useState()
    // //console.log(userInfo.username)
    // //console.log(user)

    // useEffect(() => {
    //     setUser(JSON.parse(localStorage.getItem('userInfo')))
    // },[userInfo])

    const logoutHandler = () => {
        dispatch(logoutAction())
        navigate('/login')
    }

  return (

    <div >
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand >Shop</Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <SearchBox/>
                    <Nav  id='navbar'>
                        <LinkContainer to='/cart'>
                            <Nav.Link>Cart</Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile' >
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                {/* <LinkContainer to='/login'> */}
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                {/* </LinkContainer> */}
                            </NavDropdown>
                            
                        ) : (
                            <>
                                <LinkContainer to="/login">
                                    <Nav.Link >Login</Nav.Link>
                                </LinkContainer>

                            </>
                            
                        )}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenue'>
                                    <LinkContainer to='/admin/userslist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}  
                
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
    
  )
}

export default Header
