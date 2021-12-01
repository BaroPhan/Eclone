import { useState } from 'react'
import { userRows } from '../dummyData';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { DeleteOutline } from '@material-ui/icons';
import { DataGrid } from "@material-ui/data-grid";

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

export const UsersList = () => {
    const [data, setData] = useState(userRows);

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "user",
            headerName: "User",
            width: 200,
            renderCell: (params) => {
                return (
                    <User>
                        <Img src={params.row.avatar} alt="" />
                        {params.row.username}
                    </User>
                );
            },
        },
        { field: "email", headerName: "Email", width: 200 },
        {
            field: "status",
            headerName: "Status",
            width: 120,
        },
        {
            field: "transaction",
            headerName: "Transaction Volume",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/user/" + params.row.id}>
                            <EditButton>Edit</EditButton>
                        </Link>
                        <DeleteOutline
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <Container>
            <DataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
            />
        </Container>
    );
}
