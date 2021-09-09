import styled, { css } from 'styled-components';

interface UserListWrapper {
  backgroundprop?: 'gray' | 'transparent';
}

export const Wrapper = styled.div<UserListWrapper>`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;

  ${({ backgroundprop }) => {
    switch (backgroundprop) {
      case 'gray':
        return css`
          background-color: rgba(255, 255, 255, 0.1);
        `;
      case 'transparent':
        return css`
          background-color: initial;
        `;
        break;
      default:
        break;
    }
  }}
`;
