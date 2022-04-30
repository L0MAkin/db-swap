import styled from 'styled-components';

const Container = styled.div`
    width: auto;
    margin: 30px auto 0 auto;
    max-width: 100%;
    background: #2A2B34;
    border-radius: 30px;
    padding: 25px 10px 25px 10px;

    @media (min-width: 768px) {
        width: 610px;
        padding: 60px 70px 60px 70px;
    }

    @media (min-width: 992px) {
        width: 610px;
        padding: 60px 70px 60px 70px;
    }

    @media (min-width: 1200px) {
        width: 610px;
        padding: 60px 70px 60px 70px;
    }

    &.small-centered, &.xs-centered {
        max-width: 832px;

        @media (min-width: 768px) {
            &.border {
                border: 1px solid #F0F0F1;
                border-radius: 16px;
                padding: 40px;
                margin-top: 40px;
            }
        }

        &.center {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;

            h2 {
                margin: 10px 0;
            }

            h1, h2 {
                text-align: center !important;
            }
        }
    }

    &.xs-centered {
        max-width: 350px !important;
    }

    &.medium {
        max-width: 600px;
    }

    @media (min-width: 992px) {
        .split {
            display: flex;

            .left {
                flex: 1.5;
                margin-right: 40px;
            }

            .right {
                flex: 1;
                max-width: 365px;
            }
        }
    }


    .sub-title, h2 {
        line-height: 150%;
        margin: 25px 0;
        font-size: 16px;
        color: #72727A;
        font-weight: 400;
    }

    &.ledger-theme {
        display: flex;
        flex-direction: column;
        align-items: center;

        > svg {
            margin: 20px 0;
        }

        &&& {
            button {
                margin-top: 25px;

                &.blue {
                    width: 100%;
                }

                &.remove-all-keys {
                    min-height: 56px;
                    height: auto;
                    line-height: 140%;
                }
            }
        }
    }
`;

export default Container;
