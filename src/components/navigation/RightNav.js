import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  a {
    padding: 18px 10px;
    color: rgba(196,179,124,0.7);
    font-family: 'Inter';
    font-weight: 400;
    font-style: normal;
    font-size: 24px;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0D2538;
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
  }
`;

const RightNav = ({ open }) => {
  const matches = window.matchMedia('(max-width: 769px)').matches

  return (
    <Ul open={open}>
      <a href="https://drive.google.com/file/d/1RbpAYx7K7CsinQKbD9a1I3r9d5zwivm3/view?usp=sharing" target="_blank">Whitepaper</a> 
      <Link to='/swap'>Swap</Link>
       {matches &&
          <>
            <a href="https://github.com/orgs/DecentralBankDAO" target="_blank">GitHub</a>
            <a href="https://twitter.com/DcntrlBank" target="_blank">Twitter</a>
            <a href="http://discord.gg/decentralbank" target="_blank">Discord</a>
            <a href="https://medium.com/@dcntrlbank" target="_blank">Medium</a>
            <a href="mailto:dcntrlbankdao@gmail.com" target="_blank">Contact us</a>
          </> 
      }
    </Ul>
  )
}

export default RightNav