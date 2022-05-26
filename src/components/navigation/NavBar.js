import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';

const Nav = styled.nav`
  width: 100%;
  height: 55px;
  padding: 0 20px;
  display: flex;
  background: #FEFDEE;
  justify-content: flex-end;
  align-items: center;
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
