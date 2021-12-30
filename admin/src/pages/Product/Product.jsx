import { Publish } from '@material-ui/icons'
import styled from 'styled-components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Chart } from '../../components/Chart'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useMemo, useRef, useState } from 'react'
import { userRequest } from '../../requestMethods'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase'
import { updateProduct } from '../../redux/apiCalls'

const Container = styled.div`flex: 4;`
const TitleContainer = styled.div`
    display: flex;
    margin: 0px 20px;
    align-items: center;
    justify-content: space-between;
`
const Title = styled.h1``
const AddButton = styled.button`
    width: 80px;
    border: none;
    padding: 5px;
    background-color: teal;
    color: white;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
`
const ProductTop = styled.div`display: flex;`
const ProductTopLeft = styled.div`flex: 1;`
const ProductTopRight = styled.div`
    flex: 1;
    padding: 20px;
    margin: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const InfoImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
`
const InfoTop = styled.div`
    display: flex;
    align-items: center;
`
const ProductName = styled.span`
    font-weight: 600;
`
const InfoBottom = styled.div`
    margin-top: 15px;
`
const InfoItem = styled.div`
    width: 300px;
    display: flex;
    justify-content: space-between;
`
const InfoKey = styled.span``
const InfoValue = styled.span`font-weight: 300;`
const ProductBottom = styled.div`
    padding: 20px;
    margin: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const ProductForm = styled.form`
    display: flex;
    justify-content: space-between;
`
const ProductFormLeft = styled.div`
    display: flex;
    flex-direction: column;
    & > label {
        margin-bottom: 10px;
        color: gray;
    }
    & > input {
        margin-bottom: 10px;
        border: none;
        padding: 5px;
        border-bottom: 1px solid gray;
    }
    & > select {margin-bottom: 10px;}
`
const UploadImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
`
const ProductUpload = styled.div`
    display: flex;
    align-items: center;
`
const ProductFormRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const EditButton = styled.button`
    border: none;
    padding: 5px;
    border-radius: 5px;
    background-color: darkblue;
    color:white;
    font-weight: 600;
    cursor: pointer;
`

export const Product = () => {
    const params = useParams()
    const product = useSelector(state => state.product.products.find(item => item._id === params.id))
    const name = useRef()
    const desc = useRef()
    const cat = useRef()
    const price = useRef()
    const color = useRef()
    const size = useRef()
    const stock = useRef()
    const [file, setFile] = useState(null)
    const dispatch = useDispatch()
    const [stats, setStats] = useState([]);
    const navigate = useNavigate()

    const MONTHS = useMemo(
        () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("/orders/income?pid=" + params.id);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map((item) =>
                    setStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ])
                );
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [params.id, MONTHS]);

    const handleClick = (e) => {
        e.preventDefault()
        const storage = getStorage(app);
        var data = {
            title: name.current.value,
            desc: desc.current.value,
            categories: cat.current.value.split(','),
            size: size.current.value.split(','),
            color: color.current.value.split(','),
            price: price.current.value,
            inStock: stock.current.value,
        }
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
                        data = { ...data, img: downloadURL }
                        updateProduct(params.id, data, dispatch).then(navigate('/products'))
                    });
                }
            );
        }
        else {
            data = { ...data, img: product.img }
            updateProduct(params.id, data, dispatch).then(navigate('/products'))
        }
    }
    return (
        <Container>
            <TitleContainer>
                <Title>Product</Title>
                <Link to="/newProduct">
                    <AddButton>Create</AddButton>
                </Link>
            </TitleContainer>
            <ProductTop>
                <ProductTopLeft>
                    <Chart data={stats} dataKey="Sales" title="Sales Performance" />
                </ProductTopLeft>
                <ProductTopRight>
                    <InfoTop>
                        <InfoImg src={product.img} />
                        <ProductName>{product.title}</ProductName>
                    </InfoTop>
                    <InfoBottom>
                        <InfoItem>
                            <InfoKey>id: </InfoKey>
                            <InfoValue>{product._id}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoKey>sales:</InfoKey>
                            <InfoValue>5123</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoKey>in stock:</InfoKey>
                            <InfoValue>{String(product.inStock)}</InfoValue>
                        </InfoItem>
                    </InfoBottom>
                </ProductTopRight>
            </ProductTop>
            <ProductBottom>
                <ProductForm onSubmit={handleClick}>
                    <ProductFormLeft>
                        <label>Product Name</label>
                        <input type="text" defaultValue={product.title} ref={name} />
                        <label>Description</label>
                        <input type="text" defaultValue={product.desc} ref={desc} />
                        <label>Size</label>
                        <input type="text" defaultValue={product.size} ref={size} />
                        <label>Color</label>
                        <input type="text" defaultValue={product.color} ref={color} />
                        <label>Categories</label>
                        <input type="text" defaultValue={product.categories} ref={cat} />
                        <label>Price</label>
                        <input type="number" defaultValue={product.price} ref={price} />
                        <label>In Stock</label>
                        <select name="inStock" id="idStock" ref={stock}>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>

                    </ProductFormLeft>
                    <ProductFormRight>
                        <ProductUpload>
                            <UploadImg src={product.img} />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                        </ProductUpload>
                        <EditButton type='submit'>Update</EditButton>
                    </ProductFormRight>
                </ProductForm>
            </ProductBottom>
        </Container>
    )
}
