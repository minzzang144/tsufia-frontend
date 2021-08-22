import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const Header = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.color.darkGray};
`;
