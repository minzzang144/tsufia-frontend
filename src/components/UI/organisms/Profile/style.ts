import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;

  @media ${({ theme }) => theme.device.laptop} {
    width: 85%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;
