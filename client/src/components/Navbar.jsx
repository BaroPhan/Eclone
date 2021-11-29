import { Search, ShoppingCartOutlined } from '@mui/icons-material'
import Badge from '@mui/material/Badge';
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Container = styled.div`
    height: 60px;
    position: sticky;
    top: 0;
    z-index: 5;
    background-color: white;
    ${mobile({ height: "50px" })}
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    ${mobile({ marginLeft: "15px" })}
`
const Input = styled.input`
    border: none;
    &:focus {
        outline: none;
    }
    ${mobile({ width: "50px" })}
`
const Center = styled.div`
    flex: 2;
    text-align: center;
`
const Logo = styled.h1`
    font-weight: bold;
    color: black;
    ${mobile({ fontSize: "24px" })};
    cursor: pointer;
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2.5, justifyContent: "center" })}
`
const MenuItem = styled.div`
    font-size: 14px;
    margin-left: 25px;
    cursor: pointer;
    ${mobile({ fontSize: "12px", marginLeft: "5px" })}
`

export const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity)
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder="Search" />
                        <Search style={{ color: "gray", fontSize: 16 }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to='/' style={{ textDecoration: "none" }}>
                        <Logo>Eclone.</Logo>
                    </Link>
                </Center>
                <Right>
                    <MenuItem>
                        <Link to='/register' style={{ textDecoration: "none", color: "black" }}>
                            REGISTER
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to='/login' style={{ textDecoration: "none", color: "black" }}>
                            SIGN IN
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to='/cart' style={{ textDecoration: "none" }}>
                            <Badge badgeContent={quantity} color="primary" >
                                <ShoppingCartOutlined color="action" />
                            </Badge>
                        </Link>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}
