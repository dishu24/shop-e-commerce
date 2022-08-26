import React,{useState} from 'react'
import {Button, Form, Row, Col} from 'react-bootstrap'
import { useNavigate } from 'react-router'

const SearchBox = () => {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword){
            navigate(`/?keyword=${keyword}&page=1`)
            setKeyword('')
        }else{
            navigate('/')
        }
    }
  return (
    // <Form onSubmit={submitHandler}  inline>

    //     <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)} className='mr-sm-2 ml-sm-5'></Form.Control>
    //     <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
    // </Form>
    <Form onSubmit={submitHandler}  inline='ture'>
        <Row>
            <Col>
                <Form.Control type='text' name='q' style={{'width':'250px'}}  onChange={(e) => setKeyword(e.target.value)} className='mr-sm-2 ml-sm-5' placeholder="Search..." />
            </Col>
            <Col>
                <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
            </Col>
        </Row>
  </Form>
  )
}

export default SearchBox
