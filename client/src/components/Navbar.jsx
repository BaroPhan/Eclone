import { Search, ShoppingCartOutlined } from '@mui/icons-material'
import Badge from '@mui/material/Badge';
import React, { useRef } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser, resetCarts, resetWishlists } from '../redux/apiCalls';
import { NavDropdown } from 'react-bootstrap'

const Container = styled.div`
    height: 60px;
    position: sticky;
    margin-bottom: 10px;
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
    margin-bottom: 10px;
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
    margin-right: 10px;
`
const Span = styled.span`
    text-decoration: none;
    color: black;
`
const SearchForm = styled.form``
const Toggle = styled(NavDropdown)`
    text-decoration: none;
    .dropdown-toggle::after {
        display: none;
    }
`;

export const Navbar = () => {
    const quantity = useSelector(state => state.cart.currentCart)?.products.length
    const user = useSelector(state => state.user.currentUser)
    const cats = useSelector(state => state.category.categories)
    const search = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleClick = (e) => {
        e.preventDefault()
        resetCarts(dispatch)
        resetWishlists(dispatch)
        logOutUser(dispatch).then(navigate('/login'))
    }
    const handleSearch = (e) => {
        e.preventDefault()
        if (cats.find(item => item.name === search.current.value)) {
            navigate(`/products/${search.current.value}`)
        }
    }


    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchForm onSubmit={handleSearch}>
                        <SearchContainer>
                            <Input placeholder="Search product..." ref={search} />
                            <Search style={{ color: "gray", fontSize: 16 }} />
                        </SearchContainer>
                    </SearchForm>
                </Left>
                <Center>
                    <Link to='/' style={{ textDecoration: "none" }}>
                        <Logo>Eclone.</Logo>
                    </Link>
                </Center>
                <Right>
                    {user
                        ? <>
                            <MenuItem>
                                <Toggle
                                    id="nav-dropdown-dark-example"
                                    title={
                                        <>
                                            <Img src={user?.img ? user.img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} />
                                            <Span>
                                                {user.username.toUpperCase()}
                                            </Span>
                                        </>
                                    }
                                >
                                    <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
                                    <NavDropdown.Item href='/orders'>Orders</NavDropdown.Item>
                                    <NavDropdown.Item href='/wishlist'>Wishlist</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleClick}>Log out</NavDropdown.Item>
                                </Toggle>
                            </MenuItem>
                            <MenuItem>
                                <Link to='/cart' style={{ textDecoration: "none" }}>
                                    <Badge badgeContent={quantity} color="primary" >
                                        <ShoppingCartOutlined color="action" />
                                    </Badge>
                                </Link>
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

                </Right>
            </Wrapper>
        </Container >
    )
}
