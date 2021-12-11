import { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { DeleteOutline } from '@material-ui/icons';
import { DataGrid } from "@material-ui/data-grid";
import { getUsers, deleteUser } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux'

const Container = styled.div`
    flex: 4;
`
const User = styled.div`
    display: flex;
    align-items: center;
`
const Img = styled.img`
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
const Status = styled.p``

export const UsersList = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.user.users)

    useEffect(() => {
        getUsers(dispatch)
    }, [dispatch])

    const handleDelete = (id) => {
        deleteUser(id, dispatch)
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 220 },
        {
            field: "user",
            headerName: "User",
            width: 200,
            renderCell: (params) => {
                return (
                    <User>
                        <Img src={params.row.img ? params.row.img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} />
                        {params.row.username}
                    </User>
                );
            },
        },
        { field: "email", headerName: "Email", width: 200 },
        {
            field: "isAdmin",
            headerName: "Status",
            width: 120,
            renderCell: (params) => {
                return (
                    <Status>{params.row.isAdmin ? "Admin" : "User"}</Status>
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
                        <Link to={"/user/" + params.row._id}>
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
                rows={users}
                disableSelectionOnClick
                getRowId={row => row._id}
                columns={columns}
                pageSize={20}
                checkboxSelection
            />
        </Container>
    );
}
