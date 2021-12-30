import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/apiCalls';

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

export const NewProduct = () => {
    const name = useRef()
    const desc = useRef()
    const cat = useRef()
    const price = useRef()
    const color = useRef()
    const size = useRef()
    const stock = useRef()
    const [file, setFile] = useState(null)
    const dispatch = useDispatch()

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
                            title: name.current.value,
                            desc: desc.current.value,
                            img: downloadURL,
                            categories: cat.current.value.split(','),
                            size: size.current.value.split(','),
                            color: color.current.value.split(','),
                            price: price.current.value,
                            inStock: stock.current.value
                        }
                        addProduct(data, dispatch)
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
                    <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
                </ProductItem>
                <ProductItem>
                    <label>Name</label>
                    <input type="text" placeholder="name" ref={name} required="true" />
                </ProductItem>
                <ProductItem>
                    <label>Description</label>
                    <input type="text" placeholder="desc" ref={desc} required="true" />
                </ProductItem>
                <ProductItem>
                    <label>Categories</label>
                    <input type="text" placeholder="jeans, skirt..." ref={cat} />
                </ProductItem>
                <ProductItem>
                    <label>Size</label>
                    <input type="text" defaultValue="S, M, L, XL" ref={size} />
                </ProductItem>
                <ProductItem>
                    <label>Color</label>
                    <input type="text" placeholder="black, white..." ref={color} />
                </ProductItem>
                <ProductItem>
                    <label>Price</label>
                    <input type="number" placeholder="price" ref={price} required="true" />
                </ProductItem>
                <ProductItem>
                    <label>Stock</label>
                    <select name="active" id="active" ref={stock}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </ProductItem>
                <AddButton type='submit'>Create</AddButton>
            </Form>
        </Container>
    )
}
