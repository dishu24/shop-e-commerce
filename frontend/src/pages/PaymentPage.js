import React, {useState, useEffect} from 'react'

import { Form, Button, Col  } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import FormContainer from '../components/FormContainer'
import { useNavigate } from 'react-router-dom'

import CheckoutSteps from '../components/CheckoutSteps'
import { paymentMethod } from '../actions/cartAction'

const PaymentPage = () => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [paymentmethod, setPaymentMethod] = useState('paytm')

    if(!shippingAddress.address){
        navigate('/shipping')
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(paymentMethod(paymentmethod))
        navigate('/placeorder')
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />

        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Payment Method</Form.Label>
                <Col>
                    <Form.Check type='radio' label='paytm' name='paymentmethod' checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                </Col>
            </Form.Group><br/>
            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
      
    </FormContainer>
  )
}

export default PaymentPage
