import React from 'react'
import styled from 'styled-components'

const TableWrapper = styled.table`
    border: 1px solid black;
    border-collapse: collapse;
    border-spacing: 0;
    width: ${({ matches }) => (matches ? '96%' : '100%')};
    margin: 10px 0px;

    th, td {
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 30px;
        padding-right: ${({ matches }) => (matches ? '23px' : '40px')};
        border: 1px solid black;
        font-family: 'Open Sans';
        font-size: 21px;
        line-height: 1.45;
        color: black;

        @media (max-width: 769px) {
            font-size: 14px;
        }
    }

    th {
        width: 25%;
    }

    tr {
        border: 1px solid black;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 30px;
        padding-right: 40px;
        height: 50px;
    }

`

export function Table() {

    const matches = window.matchMedia('(max-width: 426px)').matches

  return (
    <TableWrapper matches={matches}>
        {!matches
            ? <>
                <tbody>
                    <tr>
                        <th> $USDT, $USDC</th>
                        <th> $DAI</th>
                        <th> $FRAX</th>    
                        <th> $UST</th> 
                    </tr>
                    <tr>
                        <td>Backed by fiat USD</td>
                        <td>Backed by cryptocurrencies &amp; overcollateralized</td>
                        <td>Semi-algorithmic, w/o smart contract arbitrage, w/ self balancing reserve</td>
                        <td>Fully algorithmic w/ smart contract arbitrage</td>
                    </tr>
                 </tbody>
            </>
            : <>
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
            </>}
        
    </TableWrapper>
  )
}
