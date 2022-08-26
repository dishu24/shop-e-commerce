import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button ,Col, Row, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useSelector, useDispatch } from 'react-redux'
import { userProfileAction, userProfileUpdateAction } from '../actions/userAction'
import { USER_DETAILS_UPDATE_RESET } from '../constants/userConstant'
import { orderMyList } from '../actions/orderAction'

const ProfilePage = () => {
    // debugger;
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userprofile = useSelector((state) => state.userProfile)
    const {error, loading, user} = userprofile
    // //console.log(user)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    //console.log(userInfo)

    const userprofileupdate = useSelector(state => state.userProfileUpdate)
    const {success} = userprofileupdate

    const myorders = useSelector(state => state.orderMyList)
    const {loading:loadingOrders,error:errorOrders, orders} = myorders
    // //console.log(orders)

    useEffect( () => {
        //  debugger;
        if(!userInfo){
            navigate('/login')
        }else{
            if(!user || !user.name || success ){
                dispatch(userProfileUpdateAction({type: USER_DETAILS_UPDATE_RESET}))
                dispatch(userProfileAction('profile'))
                dispatch(orderMyList())
            }else{
                setName(user.name)
                setEmail(user.email)
                setUsername(user.username)
            }
        }
    },[dispatch,navigate,userInfo,user,success])

    const submitHandler = (e) =>{
        e.preventDefault()

        if(password !== password2){
            setMessage("Pasword doesn't match.")
        } else {
            dispatch(userProfileUpdateAction({
                'id':user.id,
                'username':username,
                'name':name,
                'email':email,
                'password':password
            }))
            setMessage('')
        }  
    }


  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>

                    <Form.Label>Name:</Form.Label>
                    <Form.Control type='text'required placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='username'>
                    <Form.Label>username:</Form.Label>
                    <Form.Control type='text' required placeholder='Enter Your Username' value={username} onChange={(e) => setUsername(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type='email' required placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId='password'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type='password' placeholder='Enter Your Password..' value={password} onChange={(e) => setPassword(e.target.value)}>
                        
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password2'>
                    <Form.Label>Comfirm Password:</Form.Label>

                    <Form.Control type='password' placeholder='Enter Your Comfirm Password..' value={password2} onChange={(e) => setPassword2(e.target.value)}>
                        
                    </Form.Control>
                </Form.Group>
                <br></br>

                <Button type='submit' variant='primary'>Update</Button>
            </Form>

        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? (
                <Loader/>
            ) : errorOrders ? (
                <Message variant='danger'>{errorOrders}</Message>
            ) : (
                <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>order Id</th>
                            <th>Date</th>
                            <th>Total Amount</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr>
                                <td>{order._id}</td>
                                <td>{order.created_at.substring(0,10)}</td>
                                <td>Rs. {order.total_price}</td>
                                <td>{order.is_paid ? order.paid_at : (<i className='fa fa-check 'style={{color:'green'}}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`} >
                                        <Button className='btn-sm'>Check</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
  )
}

export default ProfilePage
