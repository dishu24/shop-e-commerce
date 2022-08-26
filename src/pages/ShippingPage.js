import React, {useState} from 'react'

import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import FormContainer from '../components/FormContainer'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartAction'

const ShippingPage = () => {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    const navigate =  useNavigate()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [zipcode, setZipcode] = useState(shippingAddress.zipcode)
    const [state, setState] = useState(shippingAddress.state)
    const [country, setCountry] = useState(shippingAddress.country)
    // //console.log(address,city,zipcode,state,country)


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,zipcode,state,country}))
        navigate('/payment')

    }
  return (
    <FormContainer>
        <Form onSubmit={submitHandler}>
            <CheckoutSteps step1 step2/>
            <h2>Shipping Address</h2>

            <Form.Group controlId='address'>
                <Form.Label>Address:</Form.Label>
                <Form.Control type='text' placeholder='Enter your address' value={address ? address : ''} onChange={(e) => setAddress(e.target.value)}>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>City:</Form.Label>
                <Form.Control type='text' placeholder='Enter your city' value={city ? city : ''} onChange={(e) => setCity(e.target.value)}>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='zipcode'>
                <Form.Label>Zip Code:</Form.Label>
                <Form.Control type='text' placeholder='Enter your zip code' value={zipcode ? zipcode : ''} onChange={(e) => setZipcode(e.target.value)}>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='states'>
                <Form.Label>State:</Form.Label>
                <Form.Control type='text' placeholder='Enter your state' value={state ? state : ''} onChange={(e) => setState(e.target.value)}>

                </Form.Control>
            </Form.Group><br/>

            <Form.Group controlId='country'>
                <Form.Label>Country:</Form.Label>
                <Form.Control type='text' placeholder='Enter your country' value={country ? country : ''} onChange={(e) => setCountry(e.target.value)}>

                </Form.Control>
            </Form.Group><br/>

            <Button type='submit' variant='primary'>Continue </Button>

        </Form>
        
    </FormContainer>
  )
}

export default ShippingPage
