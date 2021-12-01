import styled from 'styled-components'
import { Chart } from '../components/Chart'
import { FeaturedInfo } from '../components/FeaturedInfo'
import { WidgetLg } from '../components/WidgetLg';
import { WidgetSm } from '../components/WidgetSm';
import { userData } from '../dummyData.js';

const Container = styled.div`
    flex: 4;
`
const Widget = styled.div`
    display: flex;
    margin: 20px;
`
export const Home = () => {
    return (
        <Container>
            <FeaturedInfo />
            <Chart data={userData} title="User Analytics" grid dataKey="Active User" />
            <Widget>
                <WidgetSm />
                <WidgetLg />
            </Widget>
        </Container>
    )
}
