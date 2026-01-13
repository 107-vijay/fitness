import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignIn } from "../api";
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
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.text_secondary};
`;

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await UserSignIn(form);
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Welcome Back 👋</Title>
        <Subtitle>Login to continue</Subtitle>
      </div>

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
        text={loading ? "Signing in..." : "Sign In"}
        onClick={handleSubmit}
        isLoading={loading}
      />
    </Container>
  );
};

export default SignIn;
