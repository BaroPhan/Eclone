import { Add, Remove } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { Announcement } from '../components/Announcement'
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar'
import { mobile } from '../responsive';
import { updateCart, updateWishlist } from '../redux/apiCalls';
import { userRequest } from '../requestMethods'


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
    margin-bottom: 20px;
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
const InfoTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const OrderId = styled.h3`
    flex: 2;
    font-weight: 200;
`
const OrderStatus = styled.h3`
    flex: 1;
    font-weight: 200;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Select = styled.select`
    margin-right: 20px;
    padding: 5px;
`
const Option = styled.option``
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: "0px" })}
`
const Filter = styled.div`
    display: flex;
    align-items: center;
    ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`
export const Orders = () => {
    const user = useSelector(state => state.user.currentUser)
    const [orders, setOrders] = useState()
    const [status, setStatus] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const getOrders = async () => {
            const res = await userRequest(`/orders/find/${user._id}`)
            status
                ? setOrders(res.data.filter(order => order.status === status))
                : setOrders(res.data)
        }
        getOrders()
    }, [user, status])

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>YOUR ORDERS</Title>
                <Top>
                    <Filter>
                        <FilterTitle>Filter Status:</FilterTitle>
                        <Select onChange={e => setStatus(e.target.value.toLowerCase())}>
                            <Option selected disabled>Status</Option>
                            <Option>Pending</Option>
                            <Option>Approved</Option>
                        </Select>
                    </Filter>
                </Top>
                <Bottom>
                    <Info>
                        {orders?.map(order => (
                            <>
                                <InfoTop>
                                    <OrderId>ORDER ID: {order._id}</OrderId>
                                    <OrderStatus>{order.status.toUpperCase()}</OrderStatus>
                                </InfoTop>
                                {order?.products.map(product => (
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
                                                    <ProductAmount>{product.quantity}</ProductAmount>
                                                </ProductAmountContainer>
                                                <ProductPrice>$ {product.quantity * product.price}</ProductPrice>
                                            </PriceDetail>
                                        </Product>
                                        <Hr />
                                    </ProductContainer>
                                ))}
                                <InfoTop>
                                    <OrderId></OrderId>
                                    <OrderStatus>TOTAL: {order.amount}</OrderStatus>
                                </InfoTop>
                                <hr />
                            </>
                        ))}
                    </Info>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}
