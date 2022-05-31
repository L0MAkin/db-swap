import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import Burger from './Burger';
import logo from '../../assets/svg/DB white.svg'

const Nav = styled.nav`
  width: 100%;
  height: 80px;
  padding: 0 90px;
  display: flex;
  background: #2A2B33;
  justify-content: space-between;
  align-items: center;
  position: relative;
  
  
  ::after {
    content: '';
    position: absolute;
    top: 79px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    box-shadow: 0px 2px 7px 2px rgb(0 0 0 / 50%);

    @media (max-width: 768px) {
      top: 54px;
    }
  }
  
  img {
    width: 80px;
    height: 80px;

    @media (max-width: 768px) {
      width: 55px;
      height: 55px;
    }
  }

  @media (max-width: 1440px) {
    padding: 0 50px;
  }

  @media (max-width: 768px) {
    height: 55px;
    padding: 0 20px;
    position: fixed;
    top: 0;
    z-index: 1000;
    /* justify-content: flex-end; */
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
