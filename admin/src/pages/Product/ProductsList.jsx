import { useEffect } from 'react'
import styled from 'styled-components'
import { DeleteOutline } from '@material-ui/icons';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProducts } from '../../redux/apiCalls';

const Container = styled.div`flex: 4;`
const ListItem = styled.div`
    display: flex;
    align-items: center;
`
const ListItemImg = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`
const EditButton = styled.button`
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: #3bb077;
    color: white;
    cursor: pointer;
    margin-right: 20px;
`

export const ProductsList = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.product.products)
    useEffect(() => {
        getProducts(dispatch)
    }, [dispatch])

    const handleDelete = (id) => {
        deleteProduct(id, dispatch)
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 220 },
        {
            field: "product",
            headerName: "Product",
            width: 300,
            renderCell: (params) => {
                return (
                    <ListItem>
                        <ListItemImg src={params.row.img} />
                        {params.row.title}
                    </ListItem>
                );
            },
        },
        { field: "inStock", headerName: "Stock", width: 200 },
        {
            field: "price",
            headerName: "Price",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/product/" + params.row._id}>
                            <EditButton>Edit</EditButton>
                        </Link>
                        <DeleteOutline
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <Container>
            <DataGrid
                rows={products}
                disableSelectionOnClick
                columns={columns}
                getRowId={row => row._id}
                pageSize={20}
                checkboxSelection
            />
        </Container>
    )
}
