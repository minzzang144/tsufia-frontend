import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.dark};
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: 0 auto;
`;

export const Logo = styled.div`
  display: flex;
`;
