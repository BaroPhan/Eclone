import { useState } from 'react'
import styled from 'styled-components'
import { login } from '../redux/apiCalls'
import { useDispatch } from 'react-redux'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: darkgray;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
    background-color: white;
    border-radius: 10px;
    padding: 5px;
`
const Title = styled.h1`
    margin: 10px;
    font-weight: 200;
    align-self: center;
`
const Input = styled.input`
    padding: 10px;
    margin: 10px;
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid gray;
`
const Button = styled.button`
    border-radius: 10px;
    background-color: green;
    font-size: 17px;
    color: white;
    padding: 10px;
    margin: 10px;
    width: 50%;
    align-self: center;
    border: none;
    cursor: pointer;
`

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch, { username, password })
    }

    return (
        <Container>
            <Wrapper>
                <Title>Admin authentication</Title>
                <Input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleClick}>LOG IN</Button>
            </Wrapper>
        </Container>
    )
}
