import React from "react";
import styled from "styled-components";

const Card = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 24px;
  border-radius: 14px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h4`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`;

const ValueRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

const Value = styled.span`
  font-size: 30px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const Unit = styled.span`
  font-size: 14px;
  margin-bottom: 6px;
`;

const Change = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-left: 8px;
  color: ${({ positive, theme }) =>
    positive ? theme.green : theme.red};
`;

const Desc = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Icon = styled.div`
  padding: 10px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ bg }) => bg};
  color: ${({ color }) => color};
`;

const CountsCard = ({ item, data, change = 0 }) => {
  const rawValue = data?.[item.dataKey];
  const value =
    typeof rawValue === "number" ? rawValue.toFixed(2) : "--";

  return (
    <Card>
      <Left>
        <Title>{item.name}</Title>

        <ValueRow>
          <Value>{value}</Value>
          <Unit>{item.unit}</Unit>
          <Change positive={change >= 0}>
            {change >= 0 ? `+${change}%` : `${change}%`}
          </Change>
        </ValueRow>

        <Desc>{item.description}</Desc>
      </Left>

      <Icon
        color={item.color}
        bg={item.lightColor}
        aria-hidden="true"
      >
        {item.icon}
      </Icon>
    </Card>
  );
};

export default CountsCard;
