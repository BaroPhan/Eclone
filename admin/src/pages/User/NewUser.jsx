import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import app from '../../firebase'
import { addUser } from '../../redux/apiCalls'

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
        border: ${prop => prop.type === "file" ? "none" : "1px solid gray"};
        border-radius: 5px;
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
    const username = useRef()
    const fullname = useRef()
    const email = useRef()
    const password = useRef()
    const address = useRef()
    const phone = useRef()
    const isAdmin = useRef()
    const [file, setFile] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        const storage = getStorage(app);
        if (file) {
            const storageRef = ref(storage, new Date().getTime() + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                        default:
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        // console.log('File available at', downloadURL);
                        const data = {
                            username: username.current.value,
                            fullname: fullname.current.value,
                            img: downloadURL,
                            address: address.current.value,
                            phone: phone.current.value,
                            email: email.current.value,
                            password: password.current.value,
                            isAdmin: isAdmin.current.value
                        }
                        addUser(data, dispatch).then(navigate('/users'))
                    });
                }
            );
        }
    }
    return (
        <Container>
            <Title>New User</Title>
            <Form onSubmit={handleClick}>
                <UserItem>
                    <label>Username</label>
                    <input type="text" placeholder="username" ref={username} />
                </UserItem>
                <UserItem>
                    <label>Full Name</label>
                    <input type="text" placeholder="fullname" ref={fullname} />
                </UserItem>
                <UserItem>
                    <label>Email</label>
                    <input type="email" placeholder="email" ref={email} />
                </UserItem>
                <UserItem>
                    <label>Password</label>
                    <input type="password" placeholder="password" ref={password} />
                </UserItem>
                <UserItem>
                    <label>Phone</label>
                    <input type="text" placeholder="phone number" ref={phone} />
                </UserItem>
                <UserItem>
                    <label>Address</label>
                    <input type="text" placeholder="address" ref={address} />
                </UserItem>
                <UserItem type="file">
                    <label>Image</label>
                    <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
                </UserItem>
                <UserItem>
                    <label>Status</label>
                    <UserSelect ref={isAdmin}>
                        <option value="true">Admin</option>
                        <option value="false">User</option>
                    </UserSelect>
                </UserItem>
                <AddUserButton type='submit'>Create</AddUserButton>
            </Form>
        </Container>
    )
}
