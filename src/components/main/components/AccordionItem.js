import React, { useState } from 'react'
import { Table } from './Table'
import FAQTable from '../../../assets/images/FAQTable.png'
import styled from 'styled-components'

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export function AccordionItem({ title, content, p1 = undefined, p2 = undefined, isActive, onToggle}) {
  return (
    <div className={'accordion_item'}>
        <div className='accordion_title' onClick={onToggle}>
            <div>{title}</div>
            <div>{isActive ? '-' : '+'}</div>
        </div>
        {p1
            ? <>
                <div className={`accordion_content ${isActive ? 'open' : ''}`}>
                    <p>{p1}</p>
                    {/* <Img src={FAQTable} /> */}
                    <Table />
                    <p>{p2}</p>
                </div>
            </>
            : <div className={`accordion_content ${isActive ? 'open' : ''}`} dangerouslySetInnerHTML={{__html: content}} />
        }
    </div>
  )
}
