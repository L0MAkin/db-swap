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

        td:nth-child(1) {
            font-weight: bold;
        }
    }

`

export function Table() {

    const matches = window.matchMedia('(max-width: 426px)').matches

  return (
    <TableWrapperContainer matches={matches}>
        <TableWrapper matches={matches}>
            <>
                <tbody>
                    <tr>
                        <th rowSpan='2' style={{background: '#fff'}}></th>
                        <th rowSpan='2' style={{background: '#484b50'}}> USN v1.0</th>
                        <th colSpan='2' style={{background: '#484b50'}}> USN v2.0</th>    
                    </tr>
                    <tr>
                        <th style={{background: '#929292'}}> Phase I</th> 
                        <th style={{background: '#929292'}}>Phase II</th> 
                    </tr>
                    <tr>
                        <td>Collateral</td>
                        <td>Double callateralization with <br />USDT + NEAR</td>
                        <td>1:1 backed with USDT*</td>
                        <td>Collateral in both stablecoins and non-<br/>stablecoins asstes (e.g. NEAR)</td>
                    </tr>
                    <tr>
                        <td>Mint / redeem mechanism</td>
                        <td>USN {'< >'} NEAR</td>
                        <td>USN {'< >'} USDT*</td>
                        <td>TBD</td>
                    </tr>
                    <tr>
                        <td>Stableswap</td>
                        <td>USN {'< >'} USDT</td>
                        <td>USN {'< >'} USDT*</td>
                        <td>USN {'< >'} USDT*</td>
                    </tr>
                    <tr>
                        <td>Self-balancing Reserve Fund</td>
                        <td>Yes, to ensure over callateralization</td>
                        <td>No</td>
                        <td>Improved mechanism + safety<br/> protocol (TBA soon)</td>
                    </tr>
                    <tr>
                        <td>Yield</td>
                        <td colSpan='3'>Sustainable native yield from NEAR staking rewards</td>
                    </tr>
                    <tr>
                        <td>Duration</td>
                        <td>Finishes on June 30, 2022</td>
                        <td>Starts on June 30, 2022</td>
                        <td>TBD: when market conditions improve<br/>{'&'} DAO votes on the trasition</td>
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
