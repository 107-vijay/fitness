import React, { useState } from "react";
import styled from "styled-components";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 12px;
  color: ${({ theme, error }) => (error ? theme.red : theme.text_primary)};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid
    ${({ theme, error }) => (error ? theme.red : theme.text_secondary)};
  border-radius: 8px;
  padding: 12px;
  gap: 8px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
`;

const Textarea = styled.textarea`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  resize: vertical;
`;

const Chip = styled.div`
  padding: 4px 10px;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border-radius: 12px;
  font-size: 12px;
  display: flex;
  gap: 4px;
  align-items: center;
`;

const TextInput = ({
  label,
  value,
  name,
  placeholder,
  onChange,
  handelChange,
  error,
  type = "text",
  isPassword,
  textArea = false,
  rows = 3,
  chipValues = [],
  onRemoveChip,
}) => {
  const [show, setShow] = useState(false);
  const isPass = isPassword || type === "password";
  const changeHandler = handelChange || onChange;

  return (
    <Container>
      {label && <Label error={error}>{label}</Label>}

      <InputWrapper error={error}>
        {chipValues.map((chip, index) => (
          <Chip key={index}>
            {chip}
            <Close onClick={() => onRemoveChip && onRemoveChip(index)} />
          </Chip>
        ))}

        {textArea ? (
          <Textarea
            name={name}
            rows={rows}
            value={value}
            onChange={changeHandler}
            placeholder={placeholder || label}
          />
        ) : (
          <Input
            name={name}
            type={isPass ? (show ? "text" : "password") : type}
            value={value}
            onChange={changeHandler}
            placeholder={placeholder || label}
          />
        )}

        {!textArea && isPass && (
          <span onClick={() => setShow(!show)}>
            {show ? <VisibilityOff /> : <Visibility />}
          </span>
        )}
      </InputWrapper>
    </Container>
  );
};

export default TextInput;
