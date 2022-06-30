import React, { useState } from 'react'
import styled from 'styled-components'
import { AccordionItem } from './AccordionItem'

const accordionData = [
    {
        title: 'What is $USN?',
        content: `<span>$USN is a NEAR-native stablecoin soft-pegged to the US Dollar via Tether, backed by a Reserve Fund that contains $USDT, with the option for other assets in the future. $USN can be viewed as a fixed income product, with the alacrity to adjust monetary policy depending on market conditions. . Combining the security of  $USDT and the decentralisation of $FRAX, $USN is positioned to be one of the most effective ways to bootstrap liquidity in the NEAR ecosystem; all while adding a new layer of composability to $NEAR. $USN’s smart contracts and Reserve Fund are managed by the Decentral Bank DAO.
        </span>`
    },
    {
        title: 'What is Decentral Bank?',
        content: 'Decentral Bank is the DAO developing and supporting NEAR-native stablecoins, the first of which is $USN. Decentral Bank DAO manages the smart contracts of $USN and its Reserve Fund. One of the functions behind the DAO is the governance over the $NEAR part of the Reserve Fund. The DAO can vote to stake the $NEAR from the Reserve Fund and distribute the staking rewards to the users of protocols that integrate $USN.'
    },
    {
        title: 'How does $USN maintain its peg?',
        content: `$USN’s peg to the US Dollar is secured through a 1-1 relationship with $USDT. , $USN will now be minted with $USDT, and users will receive $USDT for burning $USN  In the future, $USN can be supported by a tri- or quadri-pool of stablecoins.
        `
    },
    {
        content: '$USN combines some of the best approaches to stablecoins as a stablecoin with secure backing by $USDT, as well as consensus mechanism rewards. As NEAR is a P.O.S (Proof of stake) chain, the $NEAR held by the Decentral Bank will be used to validate the NEAR Network, In which validation rewards will be distributed to $USN holders. ',
        // p2: '$USN combines some of the best approaches to stablecoins as a semi-algorithmic stablecoin with an on-chain arbitrage mechanism backed by $NEAR, as well as $USDT at launch. Through an on-chain arbitrage model, $USN untaps the growth potential of $UST, while securing a strong peg defense like $FRAX through a self-balancing reserve. Furthermore, while the $USN Reserve Fund is initially double-collateralized by $NEAR and $USDT, there is no overcollateralization on the part of the user; 1 $USN will always be minted for $1 worth of $NEAR.',
        title: 'How does $USN compare to other stablecoins?'
    },
    {
        title: 'Where can I get $USN?',
        content: `1. Swap NEAR to USN in the Sender wallet<br/>2. Buy $USN using $USDT on Ref Finance’s StableSwap<br/>3. In the future, buy $USN on CEXs, as well as DEXs on other chains`
    },
    {
        title: 'Who will integrate $USN?',
        content: `1. DeFi Integration: The integration of $USN will begin with DeFi protocols on NEAR and Aurora. The plan, however, is to integrate into every major DeFi protocol across chains in the future.<br/>2. CEX Integration: $USN will be listed on major CEXs in the near future.<br/>
        3. Protocol-level Integration: $USN can potentially be added as a native asset on NEAR Protocol to be used for gas and storage costs fees` 
    },
    {
        title: 'What makes $USN interesting?',
        content: `1. Cheap and fast cross-border transactions leveraging NEAR Protocol’s infrastructure<br/>
        2. Ease of access: directly mint $USN through the Web wallets using $NEAR<br/>
        3. On-chain arbitrage opportunities: when $USN de-pegs from the dollar, profit from the price discrepancy through on-chain arbitrage and contribute to its re-pegging<br/>
        4. Yield opportunities through third party DeFi protocols: The Decentral Bank DAO can potentially stake the $NEAR from the Reserve Fund and distribute the staking rewards to the users of the protocols that integrate $USN`
    },
    {
        title: 'Will $USN be available on CEXs and other chains?',
        content: 'Yes. Please see the Roadmap section for further details.'
    },
    {
        title: 'What is the roadmap for $USN?',
        content: `<b>Phase 0.</b> Decentral Bank receives a grant to support its bootstrapping phase and initial liquidity on Ref Finance $USN <> $NEAR swapping available on the Web Wallets through the core $USN smart contract $USN <> $USDT swapping available on Ref Finance<br/>
        <b>Phase 1.</b> $USN integration on different protocols in the NEAR ecosystem</br>
        <b>Phase 2.</b> $USN integration on CEXs</br>
        <b>Phase 3.</b> Multi-chain expansion</br>
        <b>Phase 4.</b> Protocol-level integration of $USN as a native asset on NEAR to be used as gas and storage fees`
    },
    // {
    //     title: 'Where can I learn more about $USN and Decentral Bank?',
    //     content: `<a href="https://drive.google.com/file/d/1RbpAYx7K7CsinQKbD9a1I3r9d5zwivm3/view?usp=sharing" target="_blank">Whitepaper</a>
    //     <a href="https://github.com/orgs/DecentralBankDAO" target="_blank">Github</a>
    //     <a href="https://medium.com/@dcntrlbank" target="_blank">Medium</a>
    //     <a href="https://twitter.com/DcntrlBank" target="_blank">Twitter</a>
    //     <a href="https://discord.gg/TNtCNTDr" target="_blank">Discord</a>
    //     `
    // }
]

const AccordionWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #FEFDEE;
    padding: 90px 196px 90px 140px;
    z-index: 2;

    @media (max-width: 769px) {
        padding: 20px;
    }

    h1 {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 500;
        line-height: 60px;
        font-size: 80px;
        color: rgba(42, 43, 53, 1);
        text-align: center;
        margin-bottom: 70px;
    }

    .accordion_item {
        width: 100%;  
        border-top: 1px solid #999;
        box-sizing: border-box;
        /* max-height: 75px; */
        overflow: hidden;
        transition: all 0.3s ease-out;

        /* &.active {
            border-bottom: 1px solid #999;
            max-height: 1000px;
        } */
        
        p {
            font-family: 'Open Sans';
            font-size: 21px;
            line-height: 1.45;
            color: black;

            @media (max-width: 769px) {
                font-size: 16px;
            }
        }
        .accordion_title {
            padding: 12px 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: 'Open Sans';
            cursor: pointer;
            font-size: 34px;
            color: black;

            @media (max-width: 769px) {
                font-size: 20px;
            }
        }
        
        .accordion_content {
            padding: 0;
            transition: all 0.2s ease-in-out;
            font-family: 'Open Sans';
            font-size: 21px;
            line-height: 1.45;
            color: black;
            height: 0;
            overflow: hidden;
            border-bottom: 1px solid #999;

            @media (max-width: 769px) {
                font-size: 16px;
               
            }
        }

        .accordion_content.open {
            height: auto;
            padding: 12px 8px;
        }
    }
`



export function Accordion() {
    const [isActive, setIsActive] = useState('0')

    const onToggle = (index) => {
        if(isActive === index) {
            return setIsActive('0')
        } 
        setIsActive(index)
    }
  return (
      <AccordionWrapper>
        <h1>FAQ</h1>
        {accordionData.map(({ title, content, p1, p2}, i) => (
            <AccordionItem key={title} title={title} content={content} p1={p1} p2={p2} isActive={isActive === i} onToggle={() => onToggle(i)} />
        ))}
      </AccordionWrapper>
  )
}
