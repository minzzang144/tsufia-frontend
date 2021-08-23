import styled from 'styled-components';
import ReactLoading from 'react-loading';

export const Loader = styled(ReactLoading)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

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

export const ErrorPart = styled.span`
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`;
