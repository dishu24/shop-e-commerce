import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { userDetailsAction, getuserupdateAction } from '../actions/userAction'
import { useNavigate, useParams } from 'react-router'
import { GET_USER_DETAILS_UPDATE_RESET } from '../constants/userConstant'


const UserEditPage = () => {
    const {id} = useParams()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [isAdmin, setAdmin] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const getuserDetail = useSelector(state => state.getuserDetail)
    const {error:getusererror, loading:getuserloading, getuser} = getuserDetail
    

    const getuserupdate = useSelector(state => state.getuserUpdate)
    const { error:errorupdate, loading:loadingupdate,success:successupdate} = getuserupdate

    useEffect( () => {
        if(successupdate){
            dispatch({type:GET_USER_DETAILS_UPDATE_RESET})
            navigate('/admin/userslist')
        }else{
            if(!getuser.name || getuser.id !== Number(id)){
                dispatch(userDetailsAction(id))
            }else{
                setName(getuser.name)
                setUsername(getuser.username)
                setEmail(getuser.email)
                setAdmin(getuser.is_admin)
            }
        }
        
    },[getuser,dispatch,id,successupdate,navigate,])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(getuserupdateAction({
            id:getuser.id,
            name,
            username,
            email,
            isAdmin
        }))
    }

  return (
    <div>
        <Link to='/admin/userslist'>Go Back</Link>
        <FormContainer>

            <h1>Edit User</h1>
            {getusererror && <Message variant='danger'>{getusererror}</Message>}
            {getuserloading && <Loader />}

            {errorupdate && <Message variant='danger'>{errorupdate}</Message>}
            {loadingupdate && <Loader />}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>

                    <Form.Label>Name:</Form.Label>
                    <Form.Control type='text' placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='username'>
                    <Form.Label>username:</Form.Label>
                    <Form.Control type='text'  placeholder='Enter Your Username' value={username} onChange={(e) => setUsername(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type='email'  placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group controlId='isAdmin'>
                    
                    <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setAdmin(e.target.checked)}>

                    </Form.Check>
                </Form.Group>
                
                <br></br>

                <Button type='submit' variant='primary'>Update</Button>
            </Form>
        </FormContainer>
    </div>
    
  )
}

export default UserEditPage
