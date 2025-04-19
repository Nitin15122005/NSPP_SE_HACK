import React from 'react';
import styled from 'styled-components/native';

const CardContainer = styled.View`
  background-color: ${({ theme }) => theme.card};
  border-radius: 20px;
  padding: 16px;
  margin-vertical: 8px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 5;
`;

export default function Card({ children }) {
  return <CardContainer>{children}</CardContainer>;
}
