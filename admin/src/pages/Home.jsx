import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components'
import { Chart } from '../components/Chart'
import { FeaturedInfo } from '../components/FeaturedInfo'
import { WidgetLg } from '../components/WidgetLg';
import { WidgetSm } from '../components/WidgetSm';
import { userRequest } from '../requestMethods';

const Container = styled.div`
    flex: 4;
`
const Widget = styled.div`
    display: flex;
    margin: 20px;
`
export const Home = () => {
    const [stats, setStats] = useState([])
    const MONTHS = useMemo(() => [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ], [])
    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get('/users/stats')
                res.data.map(item => 
                    setStats(prev => [...prev, { name: MONTHS[item._id - 1], "Active Users": item.total }])
                )
            } catch { }
        }
        getStats()
    }, [MONTHS])
    return (
        <Container>
            <FeaturedInfo />
            <Chart data={stats} title="User Analytics" grid dataKey="Active Users" />
            <Widget>
                <WidgetSm />
                <WidgetLg />
            </Widget>
        </Container>
    )
}
