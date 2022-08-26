import React, { useEffect} from 'react'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeCartItem } from '../actions/cartAction'


const Cart = () => {
  
  const {id} = useParams()
  const navigate = useNavigate()
  // const quantity = location.search ? Number(location.search.split('=')[1]) : 1 
  const search = useLocation().search;
  const qty = new URLSearchParams(search).get('qty');
  const quantity = Number(qty)
  // //console.log(quantity);
  const dispatch = useDispatch()
  const user = useSelector(state => state.userLogin)
  const {userInfo} = user
  
  const cartdata = useSelector( state => state.cart);
  const {cartItems} = cartdata


  useEffect( () => {
    // setCartItem(JSON.parse(localStorage.getItem('cartItems')))
    if(id || quantity){
        dispatch(addToCart(id,quantity))
    }
    
  },[dispatch,id,quantity,userInfo])


  const removeFromCartHandler = (id) => {
    dispatch(removeCartItem(id))
  }

  const checkoutHandler = () => {
    
    if(!userInfo){
        navigate('/login')
        
    } else{
        navigate('/shipping')
    }
  }

  return (
    <>
    <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <Message variant='info'>
                    Your cart is empty <Link to='/'>Go Back</Link>
                </Message>
            ) : (

                <Card.Body>
                    <ListGroup variant='flush' >
                        {cartItems.map( item => (
                            <ListGroup.Item key={item.product_id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        {item.price}
                                    </Col>

                                    <Col md={3}>
                                      
                                      <Form.Control size='sm' as='select' value={item.quantity} onChange={ (e) => dispatch(addToCart(item.product_id, Number(e.target.value))) } >
                                        
                                            
                                            {
                                              [...Array(item.inStock).keys()].map((x) => (
                                                <option key={x+1} value={x+1} >
                                                  {x+1}
                                                </option>
                                                  
                                              ))
                                            }

                                      </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button type='button' variant='light'>
                                            <i className='fas fa-trash' onClick={() => removeFromCartHandler(item.product_id)}></i>
                                        </Button>
                                    </Col>

                                </Row>
                                <hr></hr>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            )}
        </Col>

        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h4>Items: {cartItems.reduce((a,item) => a + item.quantity, 0)}</h4>
                        <h4>Sub-Total: Rs.{cartItems.reduce((a,item) => a + item.quantity * item.price, 0).toFixed(2)}</h4>
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <div className="d-grid ">
                        {/* {userInfo === 'undefined' ? 
                            <Button className='btn-block' size="lm">
                                <Link to='/login'>Login Required..</Link>
                            </Button>
                            
                        : (
                            <>
                                 */}
                                <Button className='btn-block' disabled={cartItems.length === 0 } onClick={checkoutHandler} size="lm">
                                    CheckOut
                                </Button>
                            {/* </>
                        ) } */}
                            
                        </div>
                    </ListGroup.Item> 

                </ListGroup>
            </Card>
        </Col>
    </Row>
    {/* <Outlet/> */}
    </>
  )
}

export default Cart
