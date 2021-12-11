import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons'

const Container = styled.div`
    flex: 4;
    padding: 20px;
`
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Title = styled.h1``
const AddButton = styled.button`
    width: 80px;
    border: none;
    padding: 5px;
    background-color: teal;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-size: 16px;
`
const UserContainer = styled.div`
    display: flex;
    margin-top: 20px;
`
const UserShow = styled.div`
    flex: 1;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const UserUpdate = styled.div`
    flex: 2;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    margin-left: 20px;
`
const ShowTop = styled.div`
    display: flex;
    align-items: center;
`
const ShowImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`
const ShowTopTitle = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;    
`
const ShowUsername = styled.span`
    font-weight: 600;
`
const ShowUserTitle = styled.span`
    font-weight: 300;
`
const ShowBottom = styled.div`
    margin-top: 20px;
`
const ShowTitle = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: rgb(175, 170, 170);
`
const ShowInfo = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0px;
    color: #444;
`
const ShowIcon = styled.div`
    font-size: 16px !important;
`
const ShowInfoTitle = styled.span`
    margin-left: 10px;
`
const UpdateTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
`
const UpdateForm = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`
const UpdateLeft = styled.div``
const UpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    & > label{
        margin-bottom: 5px;
        font-size: 14px;
    }
`
const UpdateInput = styled.input`
    border: none;
    width: 250px;
    height: 30px;
    border-bottom: 1px solid gray;
`
const UpdateRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const UpdateUpload = styled.div`
    display: flex;
    align-items: center;
`
const UpdateImg = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 20px;
    border-radius: 50%;
`
const UpdateButton = styled.button`
    border-radius: 5px;
    border: none;
    padding: 5px;
    cursor: pointer;
    background-color: darkblue;
    color: white;
    font-weight: 600;
`

export const User = () => {
    const params = useParams()
    const user = useSelector(state => state.user.users).find(item => item._id === params.id)
    console.log(user)
    return (
        <Container>
            <TitleContainer>
                <Title>Edit User</Title>
                <Link to="/newUser">
                    <AddButton>Create</AddButton>
                </Link>
            </TitleContainer>
            <UserContainer>
                <UserShow>
                    <ShowTop>
                        <ShowImg
                            src={user.img ? user.img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                        />
                        <ShowTopTitle>
                            <ShowUsername>{user.username}</ShowUsername>
                            {/* <ShowUserTitle>Software Engineer</ShowUserTitle> */}
                        </ShowTopTitle>
                    </ShowTop>
                    <ShowBottom>
                        <ShowTitle>Account Details</ShowTitle>
                        <ShowInfo>
                            <ShowIcon><PermIdentity /></ShowIcon>
                            <ShowInfoTitle>{user.username}</ShowInfoTitle>
                        </ShowInfo>
                        <ShowInfo>
                            <ShowIcon><CalendarToday /></ShowIcon>
                            <ShowInfoTitle>10.12.1999</ShowInfoTitle>
                        </ShowInfo>
                        <ShowTitle>Contact Details</ShowTitle>
                        <ShowInfo>
                            <ShowIcon><PhoneAndroid /></ShowIcon>
                            <ShowInfoTitle>+1 123 456 67</ShowInfoTitle>
                        </ShowInfo>
                        <ShowInfo>
                            <ShowIcon><MailOutline /></ShowIcon>
                            <ShowInfoTitle>{user.email}</ShowInfoTitle>
                        </ShowInfo>
                        <ShowInfo>
                            <ShowIcon><LocationSearching /></ShowIcon>
                            <ShowInfoTitle>New York | USA</ShowInfoTitle>
                        </ShowInfo>
                    </ShowBottom>
                </UserShow>
                <UserUpdate>
                    <UpdateTitle>Edit</UpdateTitle>
                    <UpdateForm>
                        <UpdateLeft>
                            <UpdateItem>
                                <label>Username</label>
                                <UpdateInput
                                    type="text"
                                    placeholder={user.username}
                                />
                            </UpdateItem>
                            {/* <UpdateItem>
                                <label>Full Name</label>
                                <UpdateInput
                                    type="text"
                                    placeholder="Anna Becker"
                                />
                            </UpdateItem> */}
                            <UpdateItem>
                                <label>Password</label>
                                <UpdateInput
                                    type="password"
                                    placeholder="password"
                                />
                            </UpdateItem>
                            <UpdateItem>
                                <label>Email</label>
                                <UpdateInput
                                    type="text"
                                    placeholder={user.email}
                                />
                            </UpdateItem>
                            {/* <UpdateItem>
                                <label>Phone</label>
                                <UpdateInput
                                    type="text"
                                    placeholder="+1 123 456 67"
                                />
                            </UpdateItem>
                            <UpdateItem>
                                <label>Address</label>
                                <UpdateInput
                                    type="text"
                                    placeholder="New York | USA"
                                />
                            </UpdateItem> */}
                        </UpdateLeft>
                        <UpdateRight>
                            <UpdateUpload>
                                <UpdateImg
                                    src={user.img ? user.img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                                    alt=""
                                />
                                <label htmlFor="file">
                                    <Publish style={{ cursor: "pointer" }} />
                                </label>
                                <input type="file" id="file" style={{ display: "none" }} />
                            </UpdateUpload>
                            <UpdateButton>Update</UpdateButton>
                        </UpdateRight>
                    </UpdateForm>
                </UserUpdate>
            </UserContainer>
        </Container>
    )
}
