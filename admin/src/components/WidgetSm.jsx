import { Visibility } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { userRequest } from '../requestMethods'

const Container = styled.div`
    flex: 1;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    padding: 20px;
    margin-right: 20px;
`
const Title = styled.span`
    font-size: 22px;
    font-weight: 600;
`
const Img = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`
const ListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0px;
`
const User = styled.div`
    display: flex;
    flex-direction: column;
`
const Username = styled.span`
    font-weight: 600;
`
const UserTitle = styled.span`
    font-weight: 300;
`
const Button = styled.button`
    display: flex;
    align-items: center;
    border: none;
    border-radius: 10px;
    padding: 7px 10px;
    background-color: #eeeef7;
    color: #555;
    cursor: pointer;
`
const Icon = styled.div`
    font-size: 16px !important;
    margin-right: 5px;
`

export const WidgetSm = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await userRequest.get('/users/?new=true')
                setUsers(res.data)
            } catch { }
        }
        getUsers()
    }, [])
    return (
        <Container>
            <Title>New Join Members</Title>
            <List>
                {users.map(user => (
                    <ListItem key={user._id}>
                        <Img
                            src={user.img ? user.img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                        />
                        <User>
                            <Username>{user.username}</Username>
                            {/* <UserTitle>Software Engineer</UserTitle> */}
                        </User>
                        <Link to={`/user/${user._id}`} style={{ textDecoration: "none", color: "black" }}>
                            <Button>
                                <Icon> <Visibility /></Icon>
                                Display
                            </Button>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Container>
    )
}
