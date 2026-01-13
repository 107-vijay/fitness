import React from "react";
import styled from "styled-components";
import { BarChart } from "@mui/x-charts/BarChart";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border-radius: 14px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.primary};
`;

const EmptyState = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  padding: 20px 0;
`;

const WeeklyStatCard = ({ data }) => {
  const chartData = data?.totalWeeksCaloriesBurnt;

  if (!chartData || !chartData.weeks?.length) {
    return (
      <Card>
        <Title>Weekly Calories Burned</Title>
        <EmptyState>No workout data available</EmptyState>
      </Card>
    );
  }

  return (
    <Card>
      <Title>Weekly Calories Burned</Title>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: chartData.weeks,
            label: "Days",
          },
        ]}
        series={[
          {
            data: chartData.caloriesBurned,
            label: "Calories Burned",
          },
        ]}
        height={300}
      />
    </Card>
  );
};

export default WeeklyStatCard;
