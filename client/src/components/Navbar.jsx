import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MenuRounded, CloseRounded } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice";
import { Avatar } from "@mui/material";
import Logo from "../utils/Images/Logo.png";

const Navbar = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <Nav>
      <NavContainer>
        {/* Logo */}
        <LogoContainer to="/" onClick={closeMenu}>
          <LogoImg src={Logo} alt="FitTrack Logo" />
          <BrandName>FitTrack</BrandName>
        </LogoContainer>

        {/* Mobile Menu Icon */}
        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <CloseRounded /> : <MenuRounded />}
        </MobileIcon>

        {/* Nav Links */}
        <NavMenu open={isOpen}>
          <NavItem to="/" onClick={closeMenu}>Dashboard</NavItem>
          <NavItem to="/workouts" onClick={closeMenu}>Workouts</NavItem>
          <NavItem to="/tutorials" onClick={closeMenu}>Tutorials</NavItem>
          <NavItem to="/blogs" onClick={closeMenu}>Blogs</NavItem>
          <NavItem to="/contact" onClick={closeMenu}>Contact</NavItem>
        </NavMenu>

        {/* User Section */}
        <UserSection>
          <Avatar src={currentUser?.img} alt={currentUser?.name}>
            {currentUser?.name?.[0]}
          </Avatar>
          <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
        </UserSection>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;

/* ======================= STYLED COMPONENTS ======================= */

const Nav = styled.nav`
  height: 80px;
  background: ${({ theme }) => theme.bg};
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
`;

const LogoImg = styled.img`
  width: 42px;
`;

const BrandName = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const MobileIcon = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavMenu = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 768px) {
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background: ${({ theme }) => theme.bg};
    flex-direction: column;
    padding: 20px 0;
    align-items: center;
    display: ${({ open }) => (open ? "flex" : "none")};
  }
`;

const NavItem = styled(NavLink)`
  text-decoration: none;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  transition: color 0.2s ease;

  &.active {
    color: ${({ theme }) => theme.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoutBtn = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  font-weight: 600;

  &:hover {
    opacity: 0.8;
  }
`;
