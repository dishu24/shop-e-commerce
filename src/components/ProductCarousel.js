import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { topProductList } from '../actions/productAction'


const ProductCarousel = () => {
    const dispatch = useDispatch()

    const topRatedProducts = useSelector(state => state.topProducts)
    const {error, loading, topproducts} = topRatedProducts

    useEffect(() => {
        dispatch(topProductList())
    },[dispatch])
  return (loading ? <Loader/> 
            : error ? <Message variant='danger'>{error}</Message>
            : (
                <Carousel pause='hover' className='cp d-block '>
                    {topproducts.map(product => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <Image src={product.image} alt={product.name} fluid />
                                <Carousel.Caption className='carousel.caption'>
                                    <h4>{product.name} (Rs. {product.price})</h4>
                                </Carousel.Caption>

                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )
    
  )
}

export default ProductCarousel
