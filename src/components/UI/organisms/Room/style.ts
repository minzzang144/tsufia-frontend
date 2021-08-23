import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 5rem auto 0;
  width: 70%;
`;

export const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
  border: 2px solid ${({ theme }) => theme.color.light};
  border-radius: 4px;
  width: 49%;
  height: 45%;
`;
