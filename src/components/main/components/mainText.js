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
    height: auto;
    background-color: #FEFDEE;
    padding: 90px 196px 90px 140px;
    z-index: 2;

    svg {
       cursor: pointer;
       position: relative;
       :hover {
           opacity: 0.8;
       }

       @media (max-width: 1440px) {
            width: 70px;
            height: 70px;
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

            @media (max-width: 1440px) {
                margin-right: 22px;
                max-width: 282px;
            }

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

            @media (max-width: 1440px) {
                margin-right: 22px;
                max-width: 180px;
            }
        

            @media (max-width: 1025px) {
                max-width: 100%;
                justify-content: space-around;
                margin-top: 20px;
                margin: 30px auto 20px auto;
            }
        }
    }

    @media (max-width:1441px) {
        padding: 70px 60px;
    }

    @media (max-width:768px) {
       margin-top: 55px;
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
        @media (max-width: 1440px) {
            width: 80%;
        }

        @media (max-width: 1024px) {
            width: 100%;
        }
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

        @media (max-width: 1440px) {
            font-size: 56px;
            max-width: 1000px;
        }

        @media (max-width: 769px) {
            margin-top: 50px;
        }

        @media (max-width: 426px) {
            font-size: 24px;
            line-height: 26px;
        }

        span {
            color: rgba(42, 43, 53, 1);
            div {
                font-weight: 400;
                line-height: 35px;
                font-family: 'Open Sans', sans-serif;
                font-size: 25px; 
            }
            span {
                font-weight: 600;
                line-height: 35px;
                font-family: 'Open Sans', sans-serif;
                font-size: 35px;
            }
        }
    }
`



export function MainText() {
  return (
      <Wrapper>
          <div className='first'></div>
          <TextWrapper>
            <img src={textDB} alt='mainDBtext'/>
            {/* <p>
                <span>
                    decentralized organization developing and supporting NEAR Protocol based stable assets.
                </span>
            </p> */}
            <p>
                <span>
                Meet USN v.2:
                <br/>
                Pegged to the value of basket of stable coins
                </span>
            </p>
            <p>
                <span>
                    <span>
                        Introducing USN v2.0: Towards True Stability
                     </span>
                    <br/>
                <div>
                Due to recent events in capital markets, the Decentral Bank team has taken some steps to remove risk from participating in the ecosystem. The safety and security of market participants is of the utmost importance to the team, and this has led to a redesign of the $USN token, adaptable to the harshest of market conditions, but also able to take advantage when positive sentiment returns.
                <br/> 
                <br/>
                Phase 1 is to ensure a stable backing, and also a stable yield in a Bear Market scenario. This is achieved by a reserve fund only consisting of stable assets ($USDT) and receiving yield by using $NEAR staked in the Decentral Bank’s reserve fund to validate the NEAR protocol network, in which rewards will be paid out to $USN holders.
                <br/>
                <br/>
                Adaptable monetary policy is one of the cornerstones of the Decentral Bank, and Phase 2 will allow for additional non-stablecoin assets (like $NEAR) to be added to the reserve fund which will allow for over-collateralization and more flexibility. 
                <br/>
                <br/>
                This entire procedure will be conducted in a transparent and fully governed manner by the Decentral Bank.  
                </div>
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
            {/* <FormButton
                type="submit"
                color='dark-gold2'
                data-test-id="sendMoneyPageSubmitAmountButton"
                linkTo='/swap'
            >
                <>Buy $USN</>
            </FormButton> */}
        </div>
      </Wrapper>
  )
}
