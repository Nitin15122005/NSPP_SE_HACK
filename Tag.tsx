import React from 'react';
import styled from 'styled-components/native';

const TagContainer = styled.Text`
  background-color: ${({ theme }) => theme.tag};
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  color: ${({ theme }) => theme.text};
`;

export default function Tag({ label }) {
  return <TagContainer>{label}</TagContainer>;
}
