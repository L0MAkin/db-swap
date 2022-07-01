import React from 'react'
import { Table } from './Table'

export function AccordionItem({ title, content, p1 = undefined, p2 = undefined, isActive, onToggle}) {
  return (
    <div className={'accordion_item'}>
        <div className='accordion_title' onClick={onToggle}>
            <div>{title}</div>
            <div>{isActive ? '-' : '+'}</div>
        </div>
        {p1 && p2 
            ? <>
                <div className={`accordion_content ${isActive ? 'open' : ''}`}>
                    <p>{p1}</p>
                    <Table />
                    <p>{p2}</p>
                </div>
            </>
            : <div className={`accordion_content ${isActive ? 'open' : ''}`} dangerouslySetInnerHTML={{__html: content}} />
        }
    </div>
  )
}
