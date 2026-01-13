import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.text_secondary};
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignUp = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await UserSignUp(form);
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Create New Account</Title>
        <Subtitle>Enter your details to sign up</Subtitle>
      </div>

      <TextInput
        label="Full Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter full name"
      />

      <TextInput
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Enter email"
      />

      <TextInput
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Enter password"
      />

      <Button
        text={loading ? "Creating account..." : "Sign Up"}
        onClick={handleSignUp}
        isLoading={loading}
      />
    </Container>
  );
};

export default SignUp;
