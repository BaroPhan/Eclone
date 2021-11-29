import styled from 'styled-components'
import React from 'react'

const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 14px;
`



export const Announcement = () => {
    return (
        <Container>
            Announcement #1
        </Container>
    )
}
