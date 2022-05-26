import React from 'react'
import textDB from '../../../assets/images/mainText.png'
import styled from 'styled-components'
import { Twitter } from '../../../assets/svg/Twitter'
import { Email } from '../../../assets/svg/Email'
import { Discord } from '../../../assets/svg/Discord'
import { Medium } from '../../../assets/svg/Medium'
import { Git } from '../../../assets/svg/Git'
import FormButton from '../../swap/common/FormButton'

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #FEFDEE;
    padding: 45px 196px 90px 140px;
    z-index: 2;

    svg {
       cursor: pointer;
       position: relative;
       :hover {
           opacity: 0.8;
       }
       @media (max-width: 426px) {
            width: 65px;
            height: 65px;
        }
    }

    .icons {
        width: 100%;
        display: flex;
        margin-top: 50px;
        align-items: center;

        @media (max-width: 1025px) {
            flex-direction: column-reverse;
        }

        .first_group {
            max-width: 370px;
            width: 100%;
            display: flex;
            justify-content: space-between;

            @media (max-width: 1025px) {
                max-width: 100%;
            }
        }

        .second_group {
            margin-right: 41px;
            max-width: 221px;
            width: 100%;
            display: flex;
            justify-content: space-between;

            @media (max-width: 1025px) {
                max-width: 100%;
                justify-content: space-around;
                margin-top: 20px;
                margin: 30px auto 20px auto;
            }
        }
    }

    @media (max-width:1441px) {
        padding: 45px 60px;
    }

    @media (max-width: 426px) {
        padding: 45px 17px;
    }
`

const TextWrapper = styled.div`
    max-width: 1400px;
    width: 100%;
    z-index: 2;
    
    img {
        width: 100%;
        /* height: 100%; */
        z-index: 99;
        object-fit: contain;
        position: relative;
        z-index: 2;
    }

    p {
        max-width: 1440px;
        font-weight: 400;
        margin-top: 120px;
        width:100%;
        white-space: pre-wrap;
        overflow-wrap: break-word;
        line-height: 85px;
        font-family: 'Open Sans', sans-serif;
        font-size: 75px;

        @media (max-width: 769px) {
            margin-top: 50px;
        }

        @media (max-width: 426px) {
            font-size: 24px;
            line-height: 26px;
        }

        span {
            color: rgba(42, 43, 53, 1); 
        }
    }
`



export function MainText() {
  return (
      <Wrapper>
          <div className='first'></div>
          <TextWrapper>
            <img src={textDB} alt='mainDBtext'/>
            <p>
                <span>
                    decentralized organization developing and supporting NEAR Protocol based stable assets.
                </span>
            </p>
        </TextWrapper>
        <div className='icons'>
                <div className='second_group'>
                    <Twitter onClick={() => window.open('https://twitter.com/DcntrlBank', '_blank')}/>
                    <Email  onClick={() => window.location.href = 'mailto:dcntrlbankdao@gmail.com'}/>
                </div>
                <div className='first_group'>
                    <Discord onClick={() => window.open('http://discord.gg/decentralbank', '_blank')}/> 
                    <Medium onClick={() => window.open('https://medium.com/@dcntrlbank', '_blank')}/> 
                    <Git onClick={() => window.open('https://github.com/orgs/DecentralBankDAO', '_blank')}/>
                </div>
            <FormButton
                type="submit"
                color='dark-gold2'
                data-test-id="sendMoneyPageSubmitAmountButton"
                linkTo='/swap'
            >
                <>Buy $USN</>
            </FormButton>
        </div>
      </Wrapper>
  )
}
