import React from 'react'
import styled from 'styled-components'
import { MainText } from './components/mainText'
import { SecondPart } from './components/secondPart'

const MainWrapper = styled.div`
    width: 100%;
    /* width: 100vw;
    height: 100vh; */
    /* background-color: #FEFDEE;
    padding: 90px 140px;

    @media (max-width:1441px) {
        padding: 50px 60px;
    }

    @media (max-width: 769px) {
        padding: 0px 70px;
    }

    @media (max-width: 426px) {
        padding: 0px 17px;
    } */
`

export function Main() {
  return (
    <MainWrapper>
        <MainText />
        <SecondPart />
    </MainWrapper>  
  )
}
