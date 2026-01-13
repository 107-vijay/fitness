import React, { useMemo } from "react";
import styled from "styled-components";
import { PieChart } from "@mui/x-charts/PieChart";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border-radius: 14px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 12px;
`;

const EmptyText = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  margin-top: 20px;
`;

const CategoryChart = ({ data }) => {
  const chartData = useMemo(() => data?.pieChartData || [], [data]);

  return (
    <Card>
      <Title>Weekly Calories Distribution</Title>

      {chartData.length > 0 ? (
        <PieChart
          aria-label="Calories distribution"
          series={[
            {
              data: chartData,
              innerRadius: 30,
              outerRadius: 120,
              paddingAngle: 4,
              cornerRadius: 6,
            },
          ]}
          height={300}
        />
      ) : (
        <EmptyText>No workout data available</EmptyText>
      )}
    </Card>
  );
};

export default CategoryChart;
