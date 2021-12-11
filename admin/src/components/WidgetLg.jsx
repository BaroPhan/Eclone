import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { userRequest } from '../requestMethods'
import { format } from 'timeago.js'

const Container = styled.div`
    flex: 2;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    padding: 20px;
`
const Title = styled.h3`
    font-size: 22px;
    font-weight: 600;
`
const Table = styled.table`
    width: 100%;
    border-spacing: 20px;
`
const TableRow = styled.tr``
const TableBody = styled.tbody``
const TableHeader = styled.thead``
const Tablehead = styled.th`
    text-align: left;
`
const User = styled.td`
    display: flex;
    align-items: center;
    font-weight: 600;
`
const Img = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`
const Name = styled.span``
const Status = styled.span``
const Amount = styled.td`
    font-weight: 300;
`
const Date = styled.td`
    font-weight: 300;
`
const Button = styled.button`
    padding: 5px 7px;
    border: none;
    border-radius: 10px;
    background-color: #${prop => prop.type === "approved" ? "e5faf2" : prop.type === "pending" ? "ebf1fe" : "fff0f1"} ;
    color: #${prop => prop.type === "approved" ? "3bb077" : prop.type === "pending" ? "2a7ade" : "d95087"} ;
`

export const WidgetLg = () => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await userRequest.get('/orders/')
                setOrders(res.data)
            } catch { }
        }
        getOrders()
    }, [])

    return (
        <Container>
            <Title>Latest transactions</Title>
            <Table>
                <TableHeader>
                    <TableRow>
                        <Tablehead>Customer</Tablehead>
                        <Tablehead>Date</Tablehead>
                        <Tablehead>Amount</Tablehead>
                        <Tablehead>Status</Tablehead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map(order => (
                        <TableRow key={order._id}>
                            <User>
                                <Name>{order.userId}</Name>
                            </User>
                            <Date>{format(order.createdAt)}</Date>
                            <Amount>{order.amount}</Amount>
                            <Status>
                                <Button type={order.status}>{order.status}</Button>
                            </Status>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    )
}
