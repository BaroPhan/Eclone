import { Search, ShoppingCartOutlined } from '@mui/icons-material'
import Badge from '@mui/material/Badge';
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser, resetCarts } from '../redux/apiCalls';

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
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    ${mobile({ fontSize: "12px", marginLeft: "5px" })}
`
const Img = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    margin-left: 10px;
`


export const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity)
    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        resetCarts(dispatch)
        logOutUser(dispatch).then(navigate('/login'))
    }

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
                    {user
                        ? <>
                            <MenuItem onClick={handleClick}>
                                LOG OUT
                            </MenuItem>
                            <MenuItem>
                                <Link to={`/user/${user._id}`} style={{ textDecoration: "none", color: "black" }}>
                                    {user.username.toUpperCase()}
                                </Link>
                                <Img src={user?.img ? user.img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} />
                            </MenuItem>
                        </>
                        : <>
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
                        </>
                    }
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
