import React from 'react'
import styled from 'styled-components'
import { Navbar } from '../navigation/NavBar'
import { Accordion } from './components/Accordion'
import { Footer } from './components/Footer'
import { MainText } from './components/mainText'
import { SecondPart } from './components/secondPart'
import { USNinfo } from './components/USNinfo'

const MainWrapper = styled.div`
    width: 100%;
    position: relative;
    z-index: 0;

    .first {
        position: absolute;
        top: 80px;
        bottom: 0;
        left: 33%;
        background: rgba(196,179,124, 0.5);
        width: 1.5px;
        z-index: 0;

        @media (max-width:768px) {
            top: 55px;
            left: 20%;
            width: 1px;
            opacity: 0.8
        }
    }

    .second {
        position: absolute;
        top: 80px;
        bottom: 0;
        left: 50%;
        background: rgba(196,179,124, 0.5);
        width: 2px;
        z-index: 0;

        @media (max-width:768px) {
            width: 1px;
            top: 55px;
            opacity: 0.8
        }
    }

    .third {
        position: absolute;
        top: 80px;
        bottom: 0;
        right: 33%;
        background: rgba(196,179,124, 0.5);
        width: 2px;
        z-index: 0;

        @media (max-width:768px) {
            right: 20%;
            top: 55px;
            width: 1px;
            opacity: 0.8
        }
    }
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
        <Navbar />
         <div className='first' />
         <div className='second' />
         <div className='third' />
        <MainText />
        <SecondPart />
        <USNinfo />
        <Accordion />
        <Footer />
    </MainWrapper>  
  )
}
