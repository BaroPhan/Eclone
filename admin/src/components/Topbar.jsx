import React from 'react'
import styled from 'styled-components'
import { NotificationsNone, Settings } from "@material-ui/icons";
import { Logout } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../redux/apiCalls'

const Container = styled.div`
    width: 100%;
    height: 50px;
    background-color: white;
    position: sticky;
    top: 0;
    z-index: 999;
`
const Wrapper = styled.div`
    height: 100%;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const TopLeft = styled.div``
const Logo = styled.span`
    font-weight: bold;
    font-size: 30px;
    color: darkblue;
    cursor: pointer;
`
const TopRight = styled.div`
    display: flex;
    align-items: center;
`
const IconContainer = styled.div`
    position: relative;
    cursor: pointer;
    margin-right: 10px;
    color: #555;
`
const IconBadge = styled.span`
    width: 15px;
    height: 15px;
    position: absolute;
    top: -5px;
    right: 0px;
    background-color: red;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
`
const Img = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
`



export const Topbar = () => {
    const user = useSelector(state => state.user.currentUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
        logOutUser(dispatch).then(navigate('/login'))
    }

    return (
        <Container>
            <Wrapper>
                <TopLeft>
                    <Logo>Ecloneadmin</Logo>
                </TopLeft>
                <TopRight>
                    <IconContainer>
                        <NotificationsNone />
                        <IconBadge>2</IconBadge>
                    </IconContainer>
                    <IconContainer onClick={handleClick}>
                        <Logout />
                    </IconContainer>
                    <IconContainer>
                        <Settings />
                    </IconContainer>
                    <Img src={user?.img ? user.img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} />
                </TopRight>
            </Wrapper>
        </Container>
    )
}
