import { Publish } from '@material-ui/icons'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { Chart } from '../../components/Chart'
import { useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { userRequest } from '../../requestMethods'

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
const ProductForm = styled.div`
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
    const [stats, setStats] = useState([]);

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
                console.log(list)
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
                <ProductForm>
                    <ProductFormLeft>
                        <label>Product Name</label>
                        <input type="text" placeholder={product.title} />
                        <label>Product Description</label>
                        <input type="text" placeholder={product.desc} />
                        <label>Price</label>
                        <input type="text" placeholder={product.price} />
                        <label>In Stock</label>
                        <select name="inStock" id="idStock">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <label>Active</label>
                        <select name="active" id="active">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </ProductFormLeft>
                    <ProductFormRight>
                        <ProductUpload>
                            <UploadImg src={product.img} />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </ProductUpload>
                        <EditButton>Update</EditButton>
                    </ProductFormRight>
                </ProductForm>
            </ProductBottom>
        </Container>
    )
}
