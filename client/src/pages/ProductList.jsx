import React, { useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import { Announcement } from '../components/Announcement'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { Newsletter } from '../components/Newsletter'
import { Products } from '../components/Products'
import { mobile } from '../responsive'
import { useSelector } from 'react-redux'

const Container = styled.div``
const Title = styled.h1`
    margin: 20px;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
    display: flex;
    align-items: center;
    ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: "0px" })}
`
const Select = styled.select`
    margin-right: 20px;
    padding: 5px;
    ${mobile({ margin: "10px 0px" })}
`
const Option = styled.option``

export const ProductList = () => {
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState("Newest")
    const cats = useSelector(state => state.category.categories)
    const params = useParams()
    const [cat, setCat] = useState(params.tag)
    const filterHandler = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
    }
    return (
        <Container>
            <Announcement />
            <Navbar />
            <Title>{cat.toUpperCase()}</Title>
            <Filter>
                <FilterTitle>Categories:</FilterTitle>
                <Select onChange={e => setCat(e.target.value)}>
                    {cats.map(item => (
                        <Option>{item.name}</Option>
                    ))}
                </Select>
            </Filter>
            <FilterContainer>
                <Filter>
                    <FilterTitle>Filter Products:</FilterTitle>
                    <Select name="color" onChange={filterHandler}>
                        <Option>Red</Option>
                        <Option>Green</Option>
                        <Option>Blue</Option>
                        <Option>Brown</Option>
                        <Option>White</Option>
                        <Option>Black</Option>
                    </Select>
                    <Select name="size" onChange={filterHandler}>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterTitle>Sort Products:</FilterTitle>
                    <Select onChange={e => setSort(e.target.value)}>
                        <Option>Newest</Option>
                        <Option>Oldest</Option>
                        <Option>Price (asc)</Option>
                        <Option>Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort}/>
            <Newsletter />
            <Footer />
        </Container>
    )
}
