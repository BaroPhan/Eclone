import { Add, FavoriteBorderOutlined, Remove } from '@mui/icons-material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Announcement } from '../components/Announcement'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { Newsletter } from '../components/Newsletter'
import { mobile } from '../responsive'
import { updateCart, updateWishlist } from '../redux/apiCalls'


const Container = styled.div``
const Wraper = styled.div`
    padding: 50px;
    display: flex; 
    ${mobile({ padding: "10px", flexDirection: "column" })}
`
const ImgContainer = styled.div`
    flex: 1;
`
const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: "40vh" })}
`
const Info = styled.div`
    flex: 1;
    padding: 0px 50px;  
    ${mobile({ padding: "10px" })}
`
const Title = styled.h1`
    font-weight: 200;
`
const Desc = styled.p`
    margin: 20px 0px;
`
const Price = styled.p`
    font-size: 40px;
    font-weight: 100;
`
const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex; align-items: center; justify-content: space-between;
    ${mobile({ width: "100%" })}
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterName = styled.span`
    font-size: 20px;
    font-weight: 200;
    margin-right: 10px;
`
const Color = styled.div`
    width: 20px; height: 20px;
    border-radius: 50%;
    margin: 0px 5px;
    cursor: pointer;
    background-color: ${prop => prop.bg};
`
const Select = styled.select`
    padding: 10px;
`
const Option = styled.option``
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    &:hover{
        background-color: #f8f4f4;
    }
`;
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
        color: #a83f39;
        transform: scale(1.1);
    }
`

export const Product = () => {
    const params = useParams()
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState()
    const [size, setSize] = useState()
    const dispatch = useDispatch()

    const product = useSelector(state => state.product.products).find(item => item._id === params.id)
    const cart = useSelector(state => state.cart.currentCart)
    const wishlist = useSelector(state => state.wishlist.currentList)

    const handleQuantity = (type) => {
        if (type === "dec") quantity > 1 && setQuantity(quantity - 1)
        else setQuantity(quantity + 1)
    }
    const addProductToCart = () => {
        const data = {
            ...product,
            quantity,
            color: color ? color : product.color[0],
            size: size ? size : product.size[0],
        }
        updateCart(dispatch, data, cart)
    }
    const addProductToWishlist = () => {
        const data = {
            ...product,
            quantity,
            color: color ? color : product.color[0],
            size: size ? size : product.size[0],
        }
        updateWishlist(dispatch, data, wishlist)
    }

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wraper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <Info>
                    <FilterContainer>
                        <Title>{product.title}</Title>
                        <Icon onClick={addProductToWishlist}><FavoriteBorderOutlined /></Icon>

                    </FilterContainer>
                    <Desc>{product.desc}</Desc>
                    <Price>$ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterName>Color</FilterName>
                            {product.color?.map((c) => (
                                <Color bg={c} key={c} onClick={() => setColor(c)}></Color>
                            ))}
                        </Filter>
                        <Filter>
                            <FilterName>Size</FilterName>
                            <Select onChange={(e) => setSize(e.target.value)}>
                                {product.size?.map((s) => (
                                    <Option key={s} >{s}</Option>
                                ))}
                            </Select>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove style={{ cursor: "pointer" }} onClick={() => handleQuantity("dec")} />
                            <Amount>{quantity}</Amount>
                            <Add style={{ cursor: "pointer" }} onClick={() => handleQuantity("inc")} />
                        </AmountContainer>
                        <Button onClick={addProductToCart}>ADD TO CART</Button>
                    </AddContainer>
                </Info>
            </Wraper>
            <Newsletter />
            <Footer />
        </Container>
    )
}
