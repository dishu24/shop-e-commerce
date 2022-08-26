import React, {useEffect} from 'react'

import { Button,Col, Row, ListGroup, Image, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import Message from '../components/Message'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { orderCreate } from '../actions/orderAction'
import { ORDER_CREATE_RESET } from '../constants/orderConstant'


const PlacedOrderPage = () => {
    const ordercreate = useSelector(state => state.orderCreate)
    const {success} = ordercreate

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    //console.log(cart)


    cart.itemsprice = cart.cartItems.reduce((a,item) => a + item.price*item.quantity,0).toFixed(2)
    cart.shippingprice = (cart.itemsprice > 500 ? 0 :  80).toFixed(2)
    cart.totalprice = (Number(cart.itemsprice) + Number(cart.shippingprice)).toFixed(2)

    if(!cart.paymentMethod){
        navigate('/payment')
    }

    useEffect(() => {
        if(success){
            navigate('/orderdone')
            dispatch({type:ORDER_CREATE_RESET})
        }
    },[success,navigate,dispatch])

    const placeOrders = () => {
        dispatch(orderCreate({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsprice: cart.itemsprice,
            shippingprice: cart.shippingprice,
            totalprice: cart.totalprice
        }))
    }

  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h4>Shipping Address</h4>
                        <h6>
                            <strong>Shipping To : {'  '}</strong>
                            {cart.shippingAddress.address}, {'   '}{cart.shippingAddress.city}
                            {'   '},{cart.shippingAddress.state},{cart.shippingAddress.country} {' -- '}
                            {cart.shippingAddress.zipcode}
                        </h6>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h5>Payment Method : <strong>{cart.paymentMethod}</strong></h5>
                        
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h5>Order Items</h5>
                        {cart.cartItems.Length === 0 ? <Message variant='info'>Your cart is empty</Message> :
                         (
                            <ListGroup variant='flush' >
                                {cart.cartItems.map((item, index) =>(
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} fluid rounded/>

                                            </Col>
                                            <Col><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                                            <Col>qty: {item.quantity}</Col>
                                            <Col>Total: Rs.{item.price*item.quantity} </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                         )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>Order Summary</h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Item:</Col>
                                <Col>Rs {cart.itemsprice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping Charges:</Col>
                                <Col>Rs {cart.shippingprice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>Rs {cart.totalprice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <div className="d-grid ">
                            <Button className='btn-block' type='button' disabled={cart.cartItems ===0} onClick={placeOrders} size="lm">
                                Place Order
                            </Button>
                        </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
      
    </div>
  )
}

export default PlacedOrderPage
