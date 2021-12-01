import React from 'react'

import styled from 'styled-components'
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
    background-color: #${prop => prop.type === "Approved" ? "e5faf2" : prop.type === "Pending" ? "ebf1fe" : "fff0f1"} ;
    color: #${prop => prop.type === "Approved" ? "3bb077" : prop.type === "Pending" ? "2a7ade" : "d95087"} ;
`

export const WidgetLg = () => {
    return (
        <Container>
            <Title>Latest transactions</Title>
            <Table>
                <TableRow>
                    <Tablehead>Customer</Tablehead>
                    <Tablehead>Date</Tablehead>
                    <Tablehead>Amount</Tablehead>
                    <Tablehead>Status</Tablehead>
                </TableRow>
                <TableRow>
                    <User>
                        <Img
                            src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                        />
                        <Name>Susan Carol</Name>
                    </User>
                    <Date>2 Jun 2021</Date>
                    <Amount>$122.00</Amount>
                    <Status>
                        <Button type="Approved">Approved</Button>
                    </Status>
                </TableRow>
                <TableRow>
                    <User>
                        <Img
                            src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                        />
                        <Name>Susan Carol</Name>
                    </User>
                    <Date>2 Jun 2021</Date>
                    <Amount>$122.00</Amount>
                    <Status>
                        <Button type="Declined">Declined</Button>
                    </Status>
                </TableRow>
                <TableRow>
                    <User>
                        <Img
                            src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                        />
                        <Name>Susan Carol</Name>
                    </User>
                    <Date>2 Jun 2021</Date>
                    <Amount>$122.00</Amount>
                    <Status>
                        <Button type="Pending">Pending</Button>
                    </Status>
                </TableRow>
                <TableRow>
                    <User>
                        <Img
                            src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                        />
                        <Name>Susan Carol</Name>
                    </User>
                    <Date>2 Jun 2021</Date>
                    <Amount>$122.00</Amount>
                    <Status>
                        <Button type="Approved">Approved</Button>
                    </Status>
                </TableRow>
            </Table>
        </Container>
    )
}
