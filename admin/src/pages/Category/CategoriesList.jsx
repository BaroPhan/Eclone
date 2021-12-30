import { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { DataGrid } from "@material-ui/data-grid";
import { getCategories } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux'

const Container = styled.div`
    flex: 4;
`
const Img = styled.img`
    width: 50px;
    height: 50px;
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

export const CategoriesList = () => {
    const dispatch = useDispatch()
    const cats = useSelector(state => state.category.categories)

    useEffect(() => {
        getCategories(dispatch)
    }, [dispatch])

    const columns = [
        { field: "_id", headerName: "ID", width: 220 },
        { field: "name", headerName: "Name", width: 200 },
        {
            field: "img",
            headerName: "Image",
            width: 200,
            renderCell: (params) => {
                return (
                    <Img src={params.row.img ? params.row.img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} />
                );
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/category/" + params.row._id}>
                            <EditButton>Edit</EditButton>
                        </Link>
                    </>
                );
            },
        },
    ];

    return (
        <Container>
            <DataGrid
                rows={cats}
                disableSelectionOnClick
                getRowId={row => row._id}
                columns={columns}
                pageSize={20}
                checkboxSelection
            />
        </Container>
    );
}

