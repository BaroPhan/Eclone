import styled from 'styled-components'
import React from 'react'
import { categories } from '../data'
import { CategoryItem } from './CategoryItem'
import { mobile } from '../responsive'
import { useState } from 'react'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getCategories } from '../redux/apiCalls'

const Container = styled.div`
    /* padding: 20px; */
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({ padding: "0px", flexDirection: "column" })}
`
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fffafa;
    border-radius: 50%;
    opacity: 0.5;
    display: flex; align-items: center; justify-content: center;
    top: 0;
    bottom: 0;
    position: absolute;
    margin: auto;
    left: ${prop => prop.direction === "left" && "10px"};
    right: ${prop => prop.direction === "right" && "10px"};
    z-index: 2;
    cursor: pointer;
`
const Wrapper = styled.div`
    display: flex;
    width:100vw;
    transition: all 1.5s ease; 
    transform: translateX(${(props) => props.slideIndex * - 100}vw);
`
const Slide = styled.div`
    width:100%;
    display: flex;
    align-items: center;
`

export const Categories = () => {
    const [slideIndex, setSlideIndex] = useState(0)
    const dispatch = useDispatch()
    const cats = useSelector(state => state.category.categories)

    useEffect(() => {
        getCategories(dispatch)
    }, [dispatch])



    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    }
    

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </Arrow>
            <Wrapper slideIndex={slideIndex} >
                {cats.map(item => (
                    <Slide key={item._id}>
                        <CategoryItem key={item._id} item={item} />
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    )
}
