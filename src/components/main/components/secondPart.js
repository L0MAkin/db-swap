import React from 'react'
import styled from 'styled-components'
import FormButton from '../../swap/common/FormButton'
import man from '../../../assets/images/man.png'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #EEF1EC;
    padding: 57px 196px 90px 140px;
    overflow: hidden;
    position: relative;
    z-index: 2;

    @media (max-width:1441px) {
        padding: 50px 60px;
    }

    @media (max-width:1025x) {
        padding: 50px 60px;
    }

    @media (max-width: 769px) {
        padding: 50px 17px 140px;
    }

    @media (max-width: 426px) {
        padding: 50px 17px;
    }

    @media (max-width: 321px) {
        padding: 50px 17px 72px;
    }

    img {
        position: absolute;
        right: 0;
        bottom: 0;

        @media (max-width: 1025px) {
           height: 100%;
           width: 440px;
        }

        @media (max-width: 769px) {
           height: 250px;
           width: 250px;
           object-fit: contain;
        } 

        @media (max-width: 426px) {
           height: 102px;
        }
    }

    .sub_text {
        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-size: 52px;
        line-height: 56px;
        color: #000000;
        max-width: 800px;
        width: 100%;
        margin-bottom: 51px;

        @media (max-width:1441px) {
            font-size: 42px;
            max-width: 700px;
        }

        @media (max-width: 1025px) {
            font-size: 40px;
            max-width: 500px;
        }

        @media (max-width:769px) {
            font-size: 40px;
            max-width: 100%;
            margin-bottom: 0px;
        }

        @media (max-width:426px) {
            /* padding: 0px 20px; */
            font-size: 22px;
            max-width: 100%;
            margin-bottom: 0px;
            line-height: 36px;
            text-align: center;
        }

        @media (max-width:320px) {
            font-size: 16px;
            line-height: 21px;
        }
    }
`

export function SecondPart() {
  return (
    <Wrapper>
        <div className='sub_text'>
            Stability is based on economic principles working for 100 years.
        </div>
        <FormButton
                man={true}
                type="submit"
                color='dark-gold2'
                data-test-id="sendMoneyPageSubmitAmountButton"
                linkTo='https://drive.google.com/file/d/1RbpAYx7K7CsinQKbD9a1I3r9d5zwivm3/view'
            >
                <>Whitepaper v. 1.0</>
            </FormButton>
            <img src={man} alt='man'/>
    </Wrapper>
  )
}
