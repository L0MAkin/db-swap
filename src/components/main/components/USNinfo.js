import React from 'react'
import styled from 'styled-components'
import USN from '../../../assets/images/Group 22.png'
import USN_TEXT from '../../../assets/images/Vector.png'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #2A2B33;
    padding: 190px 100px 130px 140px;
    display: flex;
    justify-content: space-between;

    @media (max-width: 1440px) {
        padding: 190px 10px 130px 100px;
    }

    @media (max-width: 1025px) {
        flex-direction: column;
        padding: 190px 100px 130px 140px;
    }

    @media (max-width: 426px) {
        padding: 40px 20px 130px 20px;
    }

    .text_icon {
        display: flex;
        flex-direction: column;
        margin-top: 70px;

        @media (max-width: 1025px) {
            flex-direction: row;
            margin-bottom: 150px;
        }

        @media (max-width: 426px) {
            justify-content: center;
            margin-bottom: 75px;
        }

        .text {
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: 600;
            font-size: 48px;
            line-height: 62px;
            color: #fff;
            letter-spacing: 2.5px;
            margin-bottom: 60px;

            @media (max-width: 1440px) {
                font-size: 40px;
                line-height: 52px;
                /* margin-bottom: 0; */
            }

            @media (max-width: 1025px) {
                font-size: 38px;
                line-height: 52px;
                max-width: 400px;
                margin-bottom: 0;
            }

            @media (max-width: 426px) {
                font-size:14px;
                line-height: 20px;
                max-width: 150px;
                font-weight: 400;
            }
        }

        .icon {
            display: flex;
            align-items: center;

            @media (max-width: 426px) {
                justify-content: space-around;
            }

            .logo {
                margin-right: 25px;
                width: 142px;
                height: 142px;

                @media (max-width: 1440px) {
                    width: 110px;
                    height: 110px;
                }

                @media (max-width: 769px) {
                    width: 102px;
                    height: 102px;
                }

                @media (max-width: 426px) {
                    width: 42px;
                    height: 42px;
                    margin-right: 5px;
                }
            }

            .logo_text {
                width: 640px;
                height: 355px;
                object-fit: contain;

                @media (max-width: 1441px) {
                    width: 200px;
                    height: 155px;
                }

                @media (max-width: 769px) {
                    width: 140px;
                    height: 155px;
                }

                @media (max-width: 426px) {
                    width: 100px;
                    height: 52px;
                }
            }
        }
    }

    .text_info {
        display: flex;
        height: 100%;
        flex-direction: column;

        @media (max-width: 1025px) {
            justify-content: center;
            align-items: center;
        }

        p {
            position: relative;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 48px;
            line-height: 62px;
            color: #fff;
            letter-spacing: 2.5px;
            margin-bottom: 215px;
            &:last-child {
                margin-bottom: 0;
            }

            @media (max-width: 1025px) {
                text-align: center;
                max-width: 600px;
            }

            @media (max-width: 426px) {
                font-size: 20px;
                line-height: 23px;
                letter-spacing: 1px;
                margin-bottom: 115px;
            }

            .fast {
                position: absolute;
                font-family: 'Shadows Into Light Two', cursive;
                font-style: normal;
                font-weight: 400;
                font-size: 83px;
                line-height: 66px;
                letter-spacing: 1px;
                color: #C1B483;
                transform: rotate(-15deg);
                left: -46px;
                top: -47px;

                @media (max-width: 426px) {
                    font-size: 30px;
                    line-height: 11px;
                    left: -17px;
                    top: -13px;
                }

                @media (max-width: 321px) {
                    left: 18px;
                }
            }

            .cheap {
                position: absolute;
                font-family: 'Shadows Into Light Two', cursive;
                font-style: normal;
                font-weight: 400;
                font-size: 83px;
                line-height: 66px;
                letter-spacing: 1px;
                color: #C1B483;
                transform: rotate(6.75deg);
                left: -36px;
                top: -78px;

                @media (max-width: 426px) {
                    font-size: 30px;
                    line-height: 11px;
                    top: -15px;
                }

                @media (max-width: 321px) {
                    left: -16px;
                }
            }

            .stable {
                position: absolute;
                font-family: 'Shadows Into Light Two', cursive;
                font-style: normal;
                font-weight: 400;
                font-size: 83px;
                line-height: 66px;
                letter-spacing: 1px;
                color: #C1B483;
                transform: rotate(-11.5deg);
                left: -46px;
                top: -85px;

                @media (max-width: 426px) {
                    font-size: 30px;
                    line-height: 11px;
                    left: -40px;
                    top: -12px;
                }

                @media (max-width: 321px) {
                    left: -23px;
                }
            }
        }
    }
`

export function USNinfo() {
  return (
      <Wrapper>
        <div className='text_icon'>
            <div className='text'>Meet USN: <br />Unified Stable NEAR</div>
            <div className='icon'>
                <img src={USN} alt='USN_LOGO' className='logo'/>
                <img src={USN_TEXT} alt='USN_TEXT' className='logo_text'/>
            </div>
        </div>
        <div className='text_info'>
            <p>
                Based on the NEAR Protocol.
                <span className='fast'>Fast</span>
            </p>
            <p>
                Low commission rates <br /> contract
                <span className='cheap'>Cheap</span>
            </p>
            <p>
                Multiple stabilization <br /> mechanisms.
                <span className='stable'>Stable</span>
            </p>
        </div>
      </Wrapper>
   
  )
}
