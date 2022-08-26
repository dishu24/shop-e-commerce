import React, { useEffect } from 'react'
import Product from '../components/Product'
import {Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ProductList } from '../actions/productAction'
import { useLocation } from 'react-router'
import Paginate from '../components/Paginate'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProductCarousel from '../components/ProductCarousel'
import { Link } from 'react-router-dom'

const HomePage = () => {
    
    const location = useLocation()
    const dispatch = useDispatch()
    const productsList = useSelector((state) => state.productsList)
    const {error, loading, products,page,pages} = productsList
    // //console.log(products)
    // //console.log(page,pages)
    let keyword = location.search
    // //console.log(keyword)


    useEffect( () => {
        dispatch(ProductList(keyword))
    },[dispatch,keyword])
    // //console.log('home',pages)
  return (
    <div>
    
        {keyword ? <Link to='/'>Go Back</Link>: <><ProductCarousel/> <hr></hr></> }
        
        <h1>Latest Product</h1>
        {loading ? <Loader/> 
         : error ? <Message variant='danger'>{error}</Message> 
          : (
            <div>
              <Row>
                {Array.isArray(products) ? products.map( (product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                  </Col>
                )) : null}
              </Row>
              <Paginate pages={pages} page={page} keyword={keyword} />
            </div>
          )}
        
    </div>
  )
}

export default HomePage
