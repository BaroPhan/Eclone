import React, { useRef } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/apiCalls'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
        center;
    background-size: cover;
`
const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%" })}
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap ;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    padding: 10px;
    margin: 20px 10px 0px 0px;
`
const Agreement = styled.p`
    margin: 20px 0px;
    font-size: 12px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`
const Error = styled.span`
    font-size: 12px;
    margin-top: 10px;

    color: red;
`

export const Register = () => {
    const fullname = useRef()
    const username = useRef()
    const email = useRef()
    const address = useRef()
    const password = useRef()
    const phone = useRef()
    const error = useSelector(state => state.user.error)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //add new cart instantce for new user then just update whenjever

    const handleClick = (e) => {
        e.preventDefault()
        const data = {
            fullname: fullname.current.value,
            username: username.current.value,
            email: email.current.value,
            address: address.current.value,
            phone: phone.current.value,
            password: password.current.value
        }
        registerUser(dispatch, navigate, data)
    }

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form onSubmit={handleClick}>
                    <Input placeholder='Full name' ref={fullname} />
                    <Input placeholder='Username' ref={username} required />
                    <Input placeholder='Email' ref={email} required type='email' />
                    <Input placeholder='Address' ref={address} />
                    <Input placeholder='Phone' type='number' ref={phone} />
                    <Input placeholder='Password' ref={password} required type='password' />
                    {error && <Error>Username or email already exist</Error>}
                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button type='submit'>Create</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}
