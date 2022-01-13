import { Add, Remove } from '@mui/icons-material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { Announcement } from '../components/Announcement'
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar'
import { mobile } from '../responsive';
import { updateCart, updateWishlist } from '../redux/apiCalls';


const Container = styled.div``;

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props) => props.type === "filled" && "none"};
    background-color: ${(props) =>
        props.type === "filled" ? "black" : "transparent"};
    color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`;
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
    flex: 3;
`;
const ProductContainer = styled.div``
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
    margin: 10px 0px;
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

const Image = styled.img`
    width: 200px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    margin-bottom: 20px;
    ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
`;

export const Wishlist = () => {
    const wishlist = useSelector(state => state.wishlist.currentList)
    const cart = useSelector(state => state.cart.currentCart)
    const dispatch = useDispatch()

    const handleQuantity = (type, product) => {
        console.log(product)
        type === "desc"
            ? product.quantity > 1
                ? updateWishlist(dispatch, { ...product, quantity: - 1 }, wishlist)
                : updateWishlist(dispatch, product, wishlist, { remove: true })
            : updateWishlist(dispatch, { ...product, quantity: 1 }, wishlist)
    }
    const addToCart = (product) => {
        const data = {
            ...product,
            quantity: product.quantity,
            color: product.color,
            size: product.size,
        }
        updateCart(dispatch, data, cart)
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <Link to='/' style={{ textDecoration: "none" }}>
                        <TopButton>CONTINUE SHOPPING</TopButton>
                    </Link>
                    <TopTexts>
                        <Link to='/cart' style={{ textDecoration: "none", color: "black" }}>
                            <TopText>Shopping Bag({cart.products?.length})</TopText>
                        </Link>
                        <Link to='/wishlist' style={{ textDecoration: "none", color: "black" }}>
                            <TopText>Your Wishlist({wishlist.products?.length})</TopText>
                        </Link>
                    </TopTexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {wishlist.products.map(product => (
                            <ProductContainer key={product.uuid}>
                                <Product>
                                    <ProductDetail>
                                        <Image src={product.img} />
                                        <Details>
                                            <ProductName>
                                                <b>Product:</b> {product.title}
                                            </ProductName>
                                            <ProductId>
                                                <b>ID:</b> {product._id}
                                            </ProductId>
                                            <ProductColor color={product.color} />
                                            <ProductSize>
                                                <b>Size:</b> {product.size}
                                            </ProductSize>
                                        </Details>
                                    </ProductDetail>
                                    <PriceDetail>
                                        <ProductAmountContainer>
                                            <Add style={{ cursor: "pointer" }} onClick={() => handleQuantity("asc", product)} />
                                            <ProductAmount>{product.quantity}</ProductAmount>
                                            <Remove style={{ cursor: "pointer" }} onClick={() => handleQuantity("desc", product)} />
                                        </ProductAmountContainer>
                                        <ProductPrice>$ {product.quantity * product.price}</ProductPrice>
                                        <Button onClick={() => addToCart(product)} style={{ width: "30%" }}>ADD TO CART</Button>
                                    </PriceDetail>
                                </Product>
                                <Hr />
                            </ProductContainer>
                        ))}
                    </Info>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}
