import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { publicRequest } from '../requestMethods'
import { Product } from './Product'
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

export const Products = ({ cat, filters, sort }) => {
    const [products, setProducts] = useState([])
    const [filterProducts, setFilterProducts] = useState([])
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await publicRequest.get(cat ? `/products/?category=${cat}` : 'products/')
                setProducts(res.data)
            } catch (error) { console.log(error) }
        }
        getProducts()
    }, [cat])

    useEffect(() => {
        cat && setFilterProducts(products.filter(item => Object.entries(filters).every(([key, value]) => item[key].includes(value))))
    }, [cat, filters, products])
    useEffect(() => {
        switch (sort) {
            case ("Newest"):
                setFilterProducts(item => [...item].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
                break
            case ("Oldest"):
                setFilterProducts(item => [...item].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
                break
            case ("Price (asc)"):
                setFilterProducts(item => [...item].sort((a, b) => a.price - b.price))
                break
            case ("Price (desc)"):
                setFilterProducts(item => [...item].sort((a, b) => b.price - a.price))
                break
            default:
                break
        }
    }, [sort])

    return (
        <Container>
            {cat ? filterProducts.map(item => (
                < Product item={item} key={item._id} />
            )) : products.slice(0, 8).map(item => (
                < Product item={item} key={item._id} />
            ))}
        </Container>
    )
}
