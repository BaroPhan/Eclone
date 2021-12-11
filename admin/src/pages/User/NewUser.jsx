import styled from 'styled-components'

const Container = styled.div`
    flex: 4;
`
const Title = styled.h1``
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const UserItem = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-right: 20px;
    & > label {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 600;
        color: rgb(151, 150, 150);
    }
    & > input {
        height: 20px;
        padding: 10px;
        border: 1px solid gray;
        border-radius: 5px;
    }
`
const UserGender = styled.div`
    & > input {
        margin-top: 15px;
    }
    & > label {
        margin: 10px;
        font-size: 18px;
        color: #555;
    }
`
const UserSelect = styled.select`
    height: 40px;
    border-radius: 5px;
`
const AddUserButton = styled.button`
    width: 200px;
    border: none;
    background-color: darkblue;
    color: white;
    padding: 7px 10px;
    font-weight: 600;
    border-radius: 10px;
    margin-top: 30px;
    cursor: pointer;
`


export const NewUser = () => {
    return (
        <Container>
            <Title>New User</Title>
            <Form>
                <UserItem>
                    <label>Username</label>
                    <input type="text" placeholder="john" />
                </UserItem>
                <UserItem>
                    <label>Full Name</label>
                    <input type="text" placeholder="John Smith" />
                </UserItem>
                <UserItem>
                    <label>Email</label>
                    <input type="email" placeholder="john@gmail.com" />
                </UserItem>
                <UserItem>
                    <label>Password</label>
                    <input type="password" placeholder="password" />
                </UserItem>
                <UserItem>
                    <label>Phone</label>
                    <input type="text" placeholder="+1 123 456 78" />
                </UserItem>
                <UserItem>
                    <label>Address</label>
                    <input type="text" placeholder="New York | USA" />
                </UserItem>
                <UserItem>
                    <label>Gender</label>
                    <UserGender>
                        <input type="radio" name="gender" id="male" value="male" />
                        <label for="male">Male</label>
                        <input type="radio" name="gender" id="female" value="female" />
                        <label for="female">Female</label>
                        <input type="radio" name="gender" id="other" value="other" />
                        <label for="other">Other</label>
                    </UserGender>
                </UserItem>
                <UserItem>
                    <label>Status</label>
                    <UserSelect>
                        <option value="true">Admin</option>
                        <option value="false">User</option>
                    </UserSelect>
                </UserItem>
                <AddUserButton>Create</AddUserButton>
            </Form>
        </Container>
    )
}
