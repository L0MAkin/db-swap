import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom'
import { Modal } from './Modal';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  a {
    padding: 18px 30px;
    color: white;
    font-family: 'Inter';
    font-weight: 400;
    font-style: normal;
    font-size: 25px;
    position: relative;

    @media (max-width: 1440px) {
      font-size: 20px;
    }
    /* text-shadow: 3px 2px 4px rgba(150, 150, 150, 1); */
    
    :hover {
        color: rgba(196,179,124,0.7);
        text-decoration: none;
    }
  }

  .active {
    padding: 18px 30px;
    color: rgba(196,179,124,0.7);
    font-family: 'Inter';
    font-weight: 400;
    font-style: normal;
    font-size: 25px;
    position: relative;
    /* text-shadow: 3px 2px 4px rgba(150, 150, 150, 1); */
    text-decoration: none;

    @media (max-width: 1440px) {
      font-size: 20px;
    }
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #2A2B33;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    z-index: 5;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    a {
      color: #fff;
      font-size: 18px;
    }

    .active {
      padding: 18px 30px;
      color: rgba(196,179,124,0.7);
      font-family: 'Inter';
      font-weight: 400;
      font-style: normal;
      font-size: 18px;
      position: relative;
      /* text-shadow: 3px 2px 4px rgba(150, 150, 150, 1); */
      text-decoration: none;
    }

  }
`;

const RightNav = ({ open, close }) => {
  const matches = window.matchMedia('(max-width: 769px)').matches
  const [openMadal, isOpenModal] = useState(false)

  const handleOpenModal = () => isOpenModal(true)
  const handleCloseModal = () => isOpenModal(false)

  return (
    <Ul open={open}>
      {/* <NavLink className={({ isActive }) => isActive ? 'active' : ''} to='/swap' onClick={close}>Swap</NavLink> */}
      {/* <a href="https://drive.google.com/file/d/1RbpAYx7K7CsinQKbD9a1I3r9d5zwivm3/view?usp=sharing" target="_blank" onClick={close}>USN v. 2 whitepaper coming soon!</a> */}
      <Link to='#' onClick={close}>Decentral Bank v2.0 whitepaper coming soon!</Link>
      {!matches && 
        <Link to='/' onMouseEnter={handleOpenModal} onMouseLeave={handleCloseModal}>
          Community
         <Modal open={openMadal}/> 
        </Link>
      } 
       {matches &&
          <>
            <a href="https://github.com/orgs/DecentralBankDAO" target="_blank" onClick={close}>GitHub</a>
            <a href="https://twitter.com/DcntrlBank" target="_blank" onClick={close}>Twitter</a>
            <a href="http://discord.gg/decentralbank" target="_blank" onClick={close}>Discord</a>
            <a href="https://medium.com/@dcntrlbank" target="_blank" onClick={close}>Medium</a>
            <a href="mailto:dcntrlbankdao@gmail.com" target="_blank" onClick={close}>Contact us</a>
          </> 
      }
    </Ul>
  )
}

export default RightNav