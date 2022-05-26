import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';

const Nav = styled.nav`
  width: 100%;
  height: 80px;
  padding: 0 20px;
  display: flex;
  background: #2A2B33;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 768px) {
    height: 55px;
  }
`

export const Navbar = () => {
  return (
    <Nav>
      {/* <div className="logo">
        Nav Bar
      </div> */}
      <Burger />
    </Nav>
  )
}
