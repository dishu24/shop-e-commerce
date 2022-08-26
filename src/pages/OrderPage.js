import React, {useEffect} from 'react'

import { Button,Col, Row, ListGroup, Image, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useNavigate } from 'react-router-dom'
import { ORDER_DELIVER_RESET } from '../constants/orderConstant'
import { getOrderDetails, deliverOrder} from '../actions/orderAction'
import { useParams } from 'react-router-dom'

const OrderPage = () => {
    const {id} = useParams()
    //console.log(id)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderdetails = useSelector(state => state.orderDetails)
    const {order, loading,error} = orderdetails
    //console.log(order)

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {success:successdeliver} = orderDeliver

    const userinfo = useSelector(state => state.userLogin)
    const {userInfo} = userinfo

    useEffect(()=> {
        if (!userInfo) {
            navigate('/login')
        }
        if(!order || order._id !== Number(id) || successdeliver){
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(id))
        }
    },[order,id, successdeliver,dispatch,navigate,userInfo])

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

  return (
    <div>
        <h2>Order:</h2>
        
        {loading ?
         (<Loader/>) : error ? (
            <Message variant='danger'>{error}</Message>
        ): (
            <Row>
            <Col md={8}>
                <ListGroup variant='flush'>

                    <ListGroup.Item>
                    <h2>Shipping</h2>
                        <p><strong>Name: </strong> {order.user.name}</p>
                        <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Shipping: </strong>
                            {order.shippingAddress.address},  {order.shippingAddress.city},
                            {'  '}
                            {order.shippingAddress.state} 
                            {'  - '}
                            {order.shippingAddress.zipcode},
                            {'  '}
                            {order.shippingAddress.country}
                        </p>

                        {order.is_delivered ? (
                            <Message variant='success'>Delivered on {order.delivered_at.substring(0,10)}</Message>
                            ) : (
                            <Message variant='warning'>Not Delivered</Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>

                        <h5>Payment Method : <strong>{order.payment_method}</strong></h5>
                            
                    </ListGroup.Item>
                    <ListGroup.Item>

                        <h5>Order Items</h5>
                        {order.ordertItems === 0 ? <Message variant='info'>Order is empty</Message> :
                        (

                            <ListGroup variant='flush' >

                                {order.orderItems.map((item, index) =>(
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} fluid rounded/>

                                            </Col>
                                            <Col><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                                            {/* <Col>Price: {item.price}</Col>
                                            <Col>qty: {item.quantity}</Col>
                                            <Col>Total: Rs.{item.price*item.quantity} </Col> */}
                                            <Col md={4}>
                                                {item.quantity} X Rs. {item.price} = Rs. {(item.quantity * item.price).toFixed(2)}
                                            </Col>
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
                        {/* <ListGroup.Item>
                            <Row>
                                <Col>Item:</Col>
                                <Col>Rs {order.itemsprice}</Col>
                            </Row>
                        </ListGroup.Item> */}
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>Rs {order.shipping_price}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>Rs {order.total_price}</Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>

                    {userInfo && userInfo.isAdmin && !order.is_delivered && (
                        <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn btn-block'
                            onClick={deliverHandler}
                        >
                            Mark As Delivered
                        </Button>
                        </ListGroup.Item>
                    )}
                </Card>
            </Col>
        </Row>
        )}
        
      
    </div>
  )
}

export default OrderPage
