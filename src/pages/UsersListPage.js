import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button ,Table } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useSelector, useDispatch } from 'react-redux'
import { usersListAction } from '../actions/userAction'
import { LinkContainer } from 'react-router-bootstrap'
import { userDeleteAction } from '../actions/userAction'


const UsersListPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userinfo = useSelector(state => state.userLogin)
    const {userInfo} = userinfo

    const userslist = useSelector(state => state.usersList)
    const {loading, error, users} = userslist
    // //console.log(users)
    const userdel = useSelector(state => state.userDelete)
    const {success} = userdel

    useEffect( () => {
      if(userInfo && userInfo.isAdmin){
        dispatch(usersListAction())
      }else{
        navigate('/')
      }
        
    },[dispatch, navigate, userInfo])

    const deleteHandler = (id) => {
      dispatch(userDeleteAction(id))
    }
  return (
    <div>
      <h2>Users</h2>
      {loading ? <Loader/> : success ? (<Message variant='success'> User deleted successfully</Message>) : error ? (<Message variant='danger'>{error}</Message>)
        : (
          <Table striped bordered hover responsive className='table-sm'>
          <thead>
              <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th></th>
              </tr>
          </thead>

          <tbody>
              {users.map(user => (
                  <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? (
                          <i className='fas fa-check' style={{ color: 'green' }}></i>
                      ) : (
                              <i className='fas fa-check' style={{ color: 'red' }}></i>
                          )}</td>

                      <td>
                          <LinkContainer to={`/admin/user/${user.id}/edit`}>
                              <Button variant='light' className='btn-sm'>
                                  <i className='fas fa-edit'></i>
                              </Button>
                          </LinkContainer>

                          <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user.id)}>
                              <i className='fas fa-trash'></i>
                          </Button>
                      </td>
                  </tr>
              ))}
          </tbody>
      </Table>
        )}
    </div>
  )
}

export default UsersListPage
