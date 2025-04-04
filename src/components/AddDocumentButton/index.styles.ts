import styled from 'styled-components';

export const Button = styled.div`
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  width: 250px;
  height: 20px;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #606060;
  border-radius: 10px;

  &:hover {
    background-color: #e1e1e1;
  }
`;
