import React from 'react'
import styled from 'styled-components'
import Container from './common/Container'

const StyledWrapper = styled(Container)`
        width: fit-content;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 28px;
        text-align: center;
        color: #fff;
        margin: 0 auto;
        margin-top: 70px;
        
        a {
            color: #00C6A2;
        }
`

export const BlockedCountry = () => {
  return (
    <StyledWrapper className='small-centered'>
       You can buy USN on
        <a href='https://app.ref.finance/' target='_blank'> ref.finance </a>
        app
    </StyledWrapper>
  )
}
