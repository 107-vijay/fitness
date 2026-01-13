import React, { useState } from "react";
import styled from "styled-components";
import LogoImage from "../utils/Images/Logo.png";
import AuthImage from "../utils/Images/AuthImage.jpg";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: ${({ theme }) => theme.bg};

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  position: relative;

  @media (max-width: 700px) {
    display: none;
  }
`;

const Logo = styled.img`
  position: absolute;
  width: 70px;
  top: 40px;
  left: 60px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const Text = styled.p`
  margin-top: 16px;
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
`;

const TextButton = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  cursor: pointer;
  margin-left: 5px;
`;

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container>
      <Left>
        <Logo src={LogoImage} alt="Logo" />
        <Image src={AuthImage} alt="Auth" />
      </Left>

      <Right>
        {isLogin ? <SignIn /> : <SignUp />}

        <Text>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <TextButton onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Sign In"}
          </TextButton>
        </Text>
      </Right>
    </Container>
  );
};

export default Authentication;
