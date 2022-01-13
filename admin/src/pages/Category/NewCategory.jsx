import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCat } from '../../redux/apiCalls';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`flex: 4;`
const Title = styled.h1``
const Form = styled.form`margin-top: 10px;`
const ProductItem = styled.div`
    width: 250px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    & > label {
        color: gray;
        font-weight: 600;
        margin-bottom: 10px;
    }
    & > input {padding: 10px;}
    & > select {padding: 10px;}
`
const AddButton = styled.button`
    margin-top: 10px;
    padding: 7px 10px;
    border: none;
    border-radius: 10px;
    background-color: darkblue;
    color: white;
    font-weight: 600;
    cursor: pointer;
`

export const NewCategory = () => {
    const name = useRef()
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
                            // Cat doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // Cat canceled the upload
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
                        const data = {
                            name: name.current.value,
                            img: downloadURL,
                        }
                        addCat(data, dispatch).then(navigate('/categories'))
                    });
                }
            );
        }
    }

    return (
        <Container>
            <Title>New Product</Title>
            <Form onSubmit={handleClick}>
                <ProductItem>
                    <label>Image</label>
                    <input type="file" id="file" onChange={e => setFile(e.target.files[0])} required />
                </ProductItem>
                <ProductItem>
                    <label>Name</label>
                    <input type="text" placeholder="name" ref={name} required />
                </ProductItem>
                <AddButton type='submit'>Create</AddButton>
            </Form>
        </Container>
    )
}
