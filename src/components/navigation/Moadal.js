import React from 'react'
import styled from 'styled-components'
import TwitterModal from '../../assets/svg/TwitterModal.svg'
import DiscordModal from '../../assets/svg/DiscordModal.svg'
import MediumModal from '../../assets/svg/MediumModal.svg'
import GitHubModal from '../../assets/svg/GitHubModal.svg'



const ModalWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 70px;
    left: 30px;
    width: 130px;
    padding: 15px;
    border-radius: 10px;
    height: ${({ open }) => open ? 'auto' : '0px'};
    opacity:  ${({ open }) => open ? 1 : 0};
    background-color: black;
    transition: opacity 0.2s ease-in-out;
    z-index: 100;
    
    a.links {
      display: flex;
      align-items: flex-start;
      padding: 0;
      color: gray;
      font-size: 15px;
      width: 100%;
      font-family: 'Inter' !important;
      justify-content: space-between;
      margin-bottom: 20px;

      :hover {
        color: rgba(196,179,124,0.7);
        font-weight: 600;
      }

      img {
        width: 25px;
        height: 25px;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
`


export const Modal = ({ open }) => {
  return (
      <ModalWrapper open={open}>
            <a className='links' onClick={() => window.open('https://twitter.com/DcntrlBank', '_blank')}>
              <img src={TwitterModal} alt='twitter'/>
              <span>Twitter</span>
            </a>
            <a onClick={() => window.open('http://discord.gg/decentralbank', '_blank')} className='links'>
              <img src={DiscordModal} alt='twitter'/>
              <span>Discord</span>
            </a>
            <a onClick={() => window.open('https://medium.com/@dcntrlbank', '_blank')} className='links'>
              <img src={MediumModal} alt='twitter'/>
              <span>Medium</span>
            </a>
            <a onClick={() => window.open('https://github.com/orgs/DecentralBankDAO', '_blank')} className='links'>
              <img src={GitHubModal} alt='twitter'/>
              <span>GitHub</span>
            </a>
      </ModalWrapper>

  )
}

