import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const StyledButton = styled.button`
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  padding: 16px 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  transition: 0.3s ease;

  background: ${({ variant, theme }) =>
    variant === "secondary" ? theme.secondary : theme.primary};

  color: white;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ full }) =>
    full &&
    `
    width: 100%;
  `}

  ${({ small }) =>
    small &&
    `
    padding: 10px 20px;
  `}
`;

const Button = ({
  text,
  isLoading,
  disabled,
  onClick,
  leftIcon,
  rightIcon,
  variant = "primary",
  full,
  small,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled || isLoading}
      variant={variant}
      full={full}
      small={small}
    >
      {isLoading && <CircularProgress size={18} />}
      {!isLoading && leftIcon}
      {text}
      {!isLoading && rightIcon}
    </StyledButton>
  );
};

export default Button;
