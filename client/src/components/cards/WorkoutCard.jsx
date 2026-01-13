import { FitnessCenterRounded, TimelapseRounded } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

const Card = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 400px;
  padding: 16px;
  border-radius: 14px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: 0.3s ease;
  &:hover {
    transform: translateY(-4px);
  }
`;

const Category = styled.span`
  background: ${({ theme }) => theme.primary + "20"};
  color: ${({ theme }) => theme.primary};
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 13px;
`;

const Name = styled.h3`
  margin: 8px 0;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 14px;
`;

const WorkoutCard = ({ workout }) => {
  if (!workout) return null;

  return (
    <Card>
      <Category>#{workout.category}</Category>
      <Name>{workout.workoutName}</Name>

      <Row>
        <FitnessCenterRounded />
        {workout.sets} × {workout.reps}
      </Row>

      <Row>
        <TimelapseRounded />
        {workout.duration} mins
      </Row>
    </Card>
  );
};

export default WorkoutCard;
