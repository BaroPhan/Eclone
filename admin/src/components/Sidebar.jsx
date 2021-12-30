import { AttachMoney, BarChart, Category, ChatBubbleOutline, DynamicFeed, LineStyle, MailOutline, PermIdentity, Report, Storefront, Timeline, TrendingUp, WorkOutline } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    flex: 1;
    height: calc(100vh - 50px);
    background-color: rgb(251, 251, 255);
    position: sticky;
    top: 50px;    
    margin-right: 20px;
`
const Wrapper = styled.div`
    padding: 20px;
    color: #555;
`
const MenuWrapper = styled.div`
    margin-bottom: 10px;
`
const MenuTitle = styled.h3`
    font-size: 13px;
    color: rgb(187, 186, 186);
`
const MenuItemsList = styled.ul`
    list-style: none;
    padding: 5px;
`
const MenuItem = styled.li`
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 10px;
    &:hover, .active{
        background-color: rgb(240, 240, 255);
    }
`
const MenuLink = styled(Link)`
    text-decoration: none;
    color: black;
`
const Icon = styled.div`
    margin-right: 5px;
    font-size: 20px !important;
`

export const Sidebar = () => {
    return (
        <Container>
            <Wrapper>
                <MenuWrapper>
                    <MenuTitle>Dashboard</MenuTitle>
                    <MenuItemsList>
                        <MenuLink to="/">
                            <MenuItem>
                                <Icon> <LineStyle /></Icon>
                                Home
                            </MenuItem>
                        </MenuLink>
                        <MenuItem>
                            <Icon> <Timeline /></Icon>
                            Analytics
                        </MenuItem>
                        <MenuItem>
                            <Icon> <TrendingUp /></Icon>
                            Sales
                        </MenuItem>
                    </MenuItemsList>
                </MenuWrapper>
                <MenuWrapper>
                    <MenuTitle>Quick Menu</MenuTitle>
                    <MenuItemsList>
                        <MenuLink to="/users">
                            <MenuItem>
                                <Icon> <PermIdentity /></Icon>
                                Users
                            </MenuItem>
                        </MenuLink>
                        <MenuLink to="/products">
                            <MenuItem>
                                <Icon> <Storefront /></Icon>
                                Products
                            </MenuItem>
                        </MenuLink>
                        <MenuLink to="/categories">
                            <MenuItem>
                                <Icon> <Category /></Icon>
                                Categories
                            </MenuItem>
                        </MenuLink>
                        <MenuItem>
                            <Icon> <AttachMoney /></Icon>
                            Transactions
                        </MenuItem>
                        <MenuItem>
                            <Icon> <BarChart /></Icon>
                            Reports
                        </MenuItem>
                    </MenuItemsList>
                </MenuWrapper>
                <MenuWrapper>
                    <MenuTitle>Notifications</MenuTitle>
                    <MenuItemsList>
                        <MenuItem>
                            <Icon> <MailOutline /></Icon>
                            Mail
                        </MenuItem>
                        <MenuItem>
                            <Icon> <DynamicFeed /></Icon>
                            Feedback
                        </MenuItem>
                        <MenuItem>
                            <Icon> <ChatBubbleOutline /></Icon>
                            Messages
                        </MenuItem>
                    </MenuItemsList>
                </MenuWrapper>
                <MenuWrapper>
                    <MenuTitle>Staff</MenuTitle>
                    <MenuItemsList>
                        <MenuItem>
                            <Icon> <WorkOutline /></Icon>
                            Manage
                        </MenuItem>
                        <MenuItem>
                            <Icon> <Timeline /></Icon>
                            Analytics
                        </MenuItem>
                        <MenuItem>
                            <Icon> <Report /></Icon>
                            Reports
                        </MenuItem>
                    </MenuItemsList>
                </MenuWrapper>
            </Wrapper>
        </Container>
    )
}
