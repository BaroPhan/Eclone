import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { userRequest } from '../requestMethods'

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`
const Item = styled.div`
    flex: 1;
    margin: 0px 20px;
    padding: 30px;
    border-radius: 10px;
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const Title = styled.span`
    font-size: 20px;
`
const MoneyContainer = styled.div`
    margin: 10px 0px;
    display: flex;
    align-items: center;
`
const Money = styled.span`
    font-size: 30px;
    font-weight: 600;
`
const MoneyRate = styled.span`
    display: flex;
    align-items: center;
    margin-left: 20px;
`
const Icon = styled.div`
    font-size: 14px;
    margin-left: 5px;
    color: ${prop => prop.bg === "negative" ? "red" : "green"};
`
const Sub = styled.span`
    font-size: 15px;
    color: gray;
`

export const FeaturedInfo = () => {
    const [stats, setStats] = useState([])
    const [perc, setPerc] = useState(0)
    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await userRequest.get('/orders/income')
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                setStats(list)
                setPerc((res.data[1].total * 100) / res.data[0].total - 100);
            } catch { }
        }
        getUsers()
    }, [])
    return (
        <Container>
            <Item>
                <Title>Revanue</Title>
                <MoneyContainer>
                    <Money>${stats[1]?.total}</Money>
                    <MoneyRate>
                        {Math.floor(perc)}{" "}%
                        {perc < 0 ? (
                            <Icon bg="negative"><ArrowDownward /></Icon>
                        ) : (
                            <Icon bg="positive"><ArrowUpward /></Icon>
                        )}
                    </MoneyRate>
                </MoneyContainer>
                <Sub>Compared to last month</Sub>
            </Item>
            <Item>
                <Title>Sales</Title>
                <MoneyContainer>
                    <Money>$4,415</Money>
                    <MoneyRate>
                        -1.4
                        <Icon bg="negative"><ArrowDownward /></Icon>
                    </MoneyRate>
                </MoneyContainer>
                <Sub>Compared to last month</Sub>
            </Item>
            <Item>
                <Title>Cost</Title>
                <MoneyContainer>
                    <Money>$2,225</Money>
                    <MoneyRate>
                        +2.4
                        <Icon><ArrowUpward /></Icon>
                    </MoneyRate>
                </MoneyContainer>
                <Sub>Compared to last month</Sub>
            </Item>
        </Container>
    )
}
