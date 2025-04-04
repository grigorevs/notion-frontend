import styled from 'styled-components';

export const ItemBlock = styled.div`
  padding-bottom: 10px;
  border: none;
  cursor: pointer;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-bottom: 1px solid #ccc;

  @media (min-width: 700px) {
    width: 600px;
  }
`;

export const CodeBlock = styled.pre`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  font-family: monospace;
  white-space: pre-wrap;
`;

export const HeadingOne = styled.h1`
  font-size: 2em;
  margin-bottom: 0.5em;
`;

export const Paragraph = styled.p`
  margin-bottom: 0.5em;
`;

export const Text = styled.span``;

export const DeleteContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 22px;
`;

export const DeleteButton = styled.button`
  border: none;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #d62404;
    color: #fff;
  }
`;

export const DocumentTitle = styled.h2``;

export const DocumentText = styled.span`
  div:hover {
    background-color: #f1f1f1;
  }
`;

export const AddContainer = styled.div`
  margin-top: 10px;
  text-align: center;
`;

export const AddButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
`;
