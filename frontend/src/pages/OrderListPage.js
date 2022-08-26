import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button ,Table } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { ordersList } from '../actions/orderAction'


const OrderListPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userinfo = useSelector(state => state.userLogin)
    const {userInfo} = userinfo

    const Orders = useSelector(state => state.Orders)
    const {loading, error, orders} = Orders

    useEffect( () => {
      if(userInfo && userInfo.isAdmin){
        dispatch(ordersList())
      }else{
        navigate('/')
      }
        
    },[dispatch, navigate, userInfo])


  return (
    <div>
      <h2>Orders</h2>
      {loading ? <Loader/> : error ? (<Message variant='danger'>{error}</Message>)
        : (
          <Table striped bordered hover responsive className='table-sm'>
          <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>Total</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                  <th></th>
              </tr>
          </thead>

          <tbody>
              {orders.map(order => (
                  <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.user && order.user.name}</td>
                      <td>{order.created_at.substring(0, 10)}</td>
                      <td>Rs. {order.total_price}</td>
                      <td><i className='fas fa-check' style={{ color: 'green' }}></i></td>
                      <td>{order.is_delivered ? (
                                order.delivered_at.substring(0, 10)
                            ) : (
                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                            )}
                        </td>

                        <td>
                            <LinkContainer to={`/order/${order._id}`}>
                                <Button variant='light' className='btn-sm'>
                                    Details
                                </Button>
                            </LinkContainer>


                        </td>
                  </tr>
              ))}
          </tbody>
      </Table>
        )}
    </div>
  )
}

export default OrderListPage
