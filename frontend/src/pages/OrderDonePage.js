import React from 'react'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import { Link } from 'react-router-dom'

const OrderDonePage = () => {
  return (
    <div>
        <FormContainer>
            <Message variant='info'>
                Order Create Successfully, please click here
                <Link to='/'> Go to Home</Link>
            </Message>
        </FormContainer>
      
    </div>
  )
}

export default OrderDonePage
