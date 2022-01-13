import styled from 'styled-components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CategoryOutlined, Publish } from '@material-ui/icons'
import { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import app from '../../firebase'
import { updateCat } from '../../redux/apiCalls'
import { Image } from '@mui/icons-material'

const Container = styled.div`
    flex: 4;
    padding: 20px;
`
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50%;
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
const CatContainer = styled.div`
    display: flex;
    margin-top: 20px;
    width: 50%;
`
const CatUpdate = styled.div`
    flex: 1;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
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
const ShowCatname = styled.span`
    font-weight: 600;
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
const UpdateContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`
const UpdateForm = styled.form`
    
`
const UpdateLeft = styled.div``
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
    margin-bottom: 20px;
`
const UpdateButton = styled.button`
    border-radius: 5px;
    border: none;
    padding: 5px;
    cursor: "pointer";
    background-color: darkblue;
    color: white;
    font-weight: 600;
`
export const Category = () => {
    const [file, setFile] = useState(null)

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cat = useSelector(state => state.category.categories).find(item => item._id === params.id)

    const handleClick = (e) => {
        e.preventDefault()
        if (file) {
            const storage = getStorage(app);
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
                        // console.log('File available at', downloadURL);
                        updateCat(params.id, { img: downloadURL }, dispatch).then(navigate('/categories'))
                    });
                }
            );
        } else { navigate('/categories') }
    }

    return (
        <Container>
            <TitleContainer>
                <Title>Edit Category</Title>
                <Link to="/newCategory">
                    <AddButton>Create</AddButton>
                </Link>
            </TitleContainer>
            <CatContainer>
                <CatUpdate>
                    <UpdateTitle>Edit</UpdateTitle>
                    <UpdateContainer>
                        <UpdateLeft>
                            <ShowTop>
                                <ShowImg
                                    src={cat.img ? cat.img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                                />
                                <ShowTopTitle>
                                    <ShowCatname>{cat.name}</ShowCatname>
                                </ShowTopTitle>
                            </ShowTop>
                            <ShowBottom>
                                <ShowTitle>Category Details</ShowTitle>
                                <ShowInfo>
                                    <ShowIcon><CategoryOutlined /></ShowIcon>
                                    <ShowInfoTitle>{cat.name}</ShowInfoTitle>
                                </ShowInfo>
                                <ShowInfo>
                                    <ShowIcon><Image /></ShowIcon>
                                    <ShowInfoTitle>{cat.img}</ShowInfoTitle>
                                </ShowInfo>
                            </ShowBottom>
                        </UpdateLeft>
                        <UpdateForm onSubmit={handleClick}>
                            <UpdateRight>
                                <UpdateUpload>
                                    <UpdateImg
                                        src={cat.img ? cat.img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                                        alt=""
                                    />
                                    <label htmlFor="file">
                                        <Publish style={{ cursor: "pointer" }} />
                                    </label>
                                    <input type="file" id="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                                </UpdateUpload>
                                <UpdateButton type='submit'>Update</UpdateButton>
                            </UpdateRight>
                        </UpdateForm>
                    </UpdateContainer>
                </CatUpdate>
            </CatContainer>
        </Container>
    )
}
