import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { updateCart, updateWishlist } from '../redux/apiCalls'

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    background-color: rgb(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
`
const Container = styled.div`
    flex: 1 0 21%;
    margin: 5px;
    height: 350px;
    min-width: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5fbfd;
    position: relative;
    transition: all 0.5s ease;
    &:hover ${Info} {
        opacity: 1;
    }
`
const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`
const Image = styled.img`
    height: 75%;
    z-index: 2;
`
const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex; align-items: center; justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    cursor: pointer;
    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`

export const Product = ({ item }) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.currentCart)
    const wishlist = useSelector(state => state.wishlist.currentList)
    const addToCart = () => {
        const data = {
            ...item,
            quantity: 1,
            color: item.color[0], size: item.size[0]
        }
        updateCart(dispatch, data, cart)
    }
    const addToWishlist = () => {
        const data = {
            ...item,
            quantity: 1,
            color: item.color[0], size: item.size[0]
        }
        updateWishlist(dispatch, data, wishlist)
    }

    return (
        <Container>
            <Circle />
            <Image src={item.img} />
            <Info>
                <Icon onClick={addToCart}><ShoppingCartOutlined /></Icon>
                <Link to={`/product/${item._id}`} onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: "none", color: "black" }}>
                    <Icon><SearchOutlined /></Icon>
                </Link>
                <Icon onClick={addToWishlist}><FavoriteBorderOutlined /></Icon>
            </Info>
        </Container>
    )
}
