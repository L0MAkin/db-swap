import React from 'react'
import styled from 'styled-components'

const TableWrapperContainer = styled.div`
    width: 100%;
    overflow: ${({ matches }) => (matches ? 'scroll' : '')};
`

const TableWrapper = styled.table`
    border: none;
    border-collapse: separate;
    border-spacing: 0;
    width: ${({ matches }) => (matches ? '96%' : '100%')};
    margin: 10px 0px;
    background-color: white;
    border-spacing: 5px;
    
    tr:nth-child(odd) {
        background: #fffdee;
    }

    tr:nth-child(even) {
        background: #f2f2f2;
    }

    th, td {
        border-spacing: 5px;
        text-align: center;
        margin: 5px;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 30px;
        padding-right: ${({ matches }) => (matches ? '23px' : '40px')};
        border: 'none';
        font-family: 'Open Sans';
        font-size: 21px;
        line-height: 1.45;
        color: black;

        @media (max-width: 769px) {
            font-size: 14px;
        }
    }

    th {
        color: white;
        white-space: nowrap;
        /* width: 25%; */
    }

    tr {
        /* border: 1px solid black; */
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 30px;
        padding-right: 40px;
        height: 50px;
    }

`
const TableHeader = {
    color: 'white',
    background: '#484b50'
}

export function ExchangeTable() {

    const matches = window.matchMedia('(max-width: 426px)').matches

  return (
    <TableWrapperContainer matches={matches}>
        <TableWrapper matches={matches}>
            <>
                <tbody>
                    <tr>
                        <td style={TableHeader}> Buying</td>
                        <td style={TableHeader}> Selling</td>
                        <td style={TableHeader}> Additional</td>
                    </tr>
                    <tr>
                        <td>
                            <a href='https://docs.google.com/document/d/1a-mp_eDzIG4SFHNv7YSunVdVTgP8-aWGpVA63TG6ono/edit?usp=sharing' target='_blank'>
                                USDT{'->'}USN
                            </a> with Swap tool
                        </td>
                        <td>
                            <a href='https://docs.google.com/document/d/1WdvNUuf7fK3cXoGt8p5s51-HOOY4CY7nbjZUlOCek00/edit?usp=sharing' target='_blank'>
                                USN{'->'}USDT
                            </a> with Swap tool
                        </td>
                        <td>
                            <a href='https://docs.google.com/document/d/1pJ-c6bU1uQro_L58xiywelkrcwKvPFXUxwUZcjl7_TE/edit?usp=sharing' target='_blank'>
                                USDT(NEAR){'->'}USDT(ETH)
                            </a> transfer
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href='https://docs.google.com/document/d/1zmUITG8khJ0ksKlqLcs5qTeyexWsHA0T220Kh9YgXFI/edit?usp=sharing' target='_blank'>
                                Stablecoins{'->'}USN
                            </a> on Ref.finance
                        </td>
                        <td>
                            <a href='https://docs.google.com/document/d/11rLEm9JUY2f462A-QZWhVNoRe27MobraaAQBFScQ7Q0/edit?usp=sharing' target='_blank'>
                                USN{'->'}Stablecoins
                            </a> on Ref.finance
                        </td>
                        <td>
                            <a href='https://docs.google.com/document/d/1-c8BIEfJvq5Jr8tJNcqU9p83-SwgVq0-szQIFw5_iYs/edit?usp=sharing' target='_blank'>
                                NEAR{'->'}Binance
                            </a> transfering
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href='https://docs.google.com/document/d/1HgV88FiNQknxEeodaMZY1Takfl1HH9KvXz02skcAKFQ/edit?usp=sharing' target='_blank'>
                                NEAR{'->'}USN
                            </a> on Ref.finance
                        </td>
                        <td>
                            <a href='https://docs.google.com/document/d/19CRzl-4Cc3WSWYc89WS-Uz7XLpFxxX4W0Z21iPR3mYg/edit?usp=sharing' target='_blank'>
                                USN{'->'}NEAR
                            </a> on Ref.finance
                        </td>
                        <td>
                            <a href='https://docs.google.com/document/d/1wzfXGGK9jgrFj0vbIS7rZ5MZlecV_wWlzuX_mP5QOQg/edit?usp=sharing' target='_blank'>
                                Binance{'->'}Credit Card 
                            </a> money withdrawal
                        </td>
                    </tr>
                 </tbody>
            </>
            {/* : <>
               <tr>
                   <th>$USDT, $USDC</th>
                   <td>Backed by fiat USD</td>
               </tr>
               <tr>
                    <th > $DAI</th>
                    <td>Backed by cryptocurrencies &amp; overcollateralized</td>
               </tr>
               <tr>
                    <th> $FRAX</th> 
                    <td>Semi-algorithmic, w/o smart contract arbitrage, w/ self balancing reserve</td>
               </tr>
               <tr>
                    <th> $UST</th> 
                    <td>Fully algorithmic w/ smart contract arbitrage</td>
               </tr>
            </>} */}
        
        </TableWrapper>
    </TableWrapperContainer>  
  )
}
