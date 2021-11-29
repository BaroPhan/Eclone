import { Add, Remove } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Announcement } from '../components/Announcement'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { Newsletter } from '../components/Newsletter'
import { addProduct } from '../redux/cartRedux'
import { publicRequest } from '../requestMethods'
import { mobile } from '../responsive'
import { v4 as uuidv4 } from 'uuid';


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


export const Product = () => {
    const productId = useParams().id
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState()
    const [size, setSize] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get('/products/find/' + productId)
                setProduct(res.data)
            } catch (error) { console.log(error) }
        }
        getProduct()
    }, [productId])

    const handleQuantity = (type) => {
        if (type === "dec") quantity > 1 && setQuantity(quantity - 1)
        else setQuantity(quantity + 1)
    }
    const handleClick = () => {
        dispatch(addProduct({ ...product, quantity, color: color ? color : product.color[0], size: size ? size : product.size[0], uuid: uuidv4() }))
    }

    return (
        <Container>F
            <Navbar />
            <Announcement />
            <Wraper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <Info>
                    <Title>{product.title}</Title>
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
                        <Button onClick={handleClick}>ADD TO CART</Button>
                    </AddContainer>
                </Info>
            </Wraper>
            <Newsletter />
            <Footer />
        </Container>
    )
}
