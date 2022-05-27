import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import Burger from './Burger';
import logo from '../../assets/svg/DB black.svg'

const Nav = styled.nav`
  width: 100%;
  height: 80px;
  padding: 0 90px;
  display: flex;
  background: #FEFDEE;
  justify-content: space-between;
  align-items: center;
  
  img {
    width: 80px;
    height: 80px;

    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 1440px) {
    padding: 0 50px;
  }

  @media (max-width: 768px) {
    /* height: 55px; */
    padding: 0 20px;
    justify-content: flex-end;
    height: 0;
  }
`

export const Navbar = () => {
  return (
    <Nav>
      <Link to='/'>
        <img src={logo} alt='logo'/>
      </Link>
      <Burger />
    </Nav>
  )
}
