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
                    <span>
                        Introducing USN v2.0: Towards True Stability
                    </span>
                    <br/>
                <div>
                Due to recent events in capital markets, the Decentral Bank team has taken some steps to remove risk from participating in the ecosystem. The safety and security of market participants is of the utmost importance to the team, and this has led to a redesign of $USN, adaptable to the harshest of market conditions, modelled by us, but also able to take advantage when positive sentiment returns.
                <br/> 
                <br/>
                <i>Phase I</i> takes place to ensure a $USN is a safe, reliable and truly stable asset while also providing native yield - very important aspects in a bear market. This is achieved by a Reserve Fund only consisting of stable assets ($USDT and soon $USDC and/or $DAI) and by $NEAR tokens in Decentral Bank’s Reserve Fund that are staked to secure the NEAR blockchain. These rewards will be distributed to users that participate with $USN in the NEAR/AURORA DeFi ecosystems.
                <br/>
                <br/>
                Adaptable monetary policy is one of the cornerstones of Decentral Bank, and Phase II, once market conditions reverse and improve, will allow for additional non-stable assets -such as $NEAR, $BTC or $ETH-,  to be added to the Reserve Fund. This will lead to a bigger value accrual for the $NEAR token since they will be used to mint $USN and they’ll therefore be locked and staked, reducing the effective circulating supply.
                <br/>
                <br/>
                <b>This</b> entire procedure will be conducted in a transparent and fully governed manner by the Decentral Bank DAO.
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
