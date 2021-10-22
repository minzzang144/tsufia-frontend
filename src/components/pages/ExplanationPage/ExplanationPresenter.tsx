import React from 'react';
import styled, { css } from 'styled-components';

import NightCitizen from '@assets/night-citizen.png';
import NightMafia from '@assets/night-mafia.png';
import AfternoonNoKilled from '@assets/afternoon-no-killed.png';
import AfternoonKilled from '@assets/afternoon-killed.png';
import AfternoonNothing from '@assets/afternoon-nothing.png';
import { Heading } from '@atoms/Heading/Heading';
import { Img, ImgMedia } from '@atoms/Img/Img';
import { List } from '@atoms/List/List';
import { Paragraph } from '@atoms/Paragraph/Paragraph';
import { UnorderedList } from '@atoms/UnorderedList/UnorderedList';
import { Header } from '@organisms/Header/Header';
import { Centralization } from '@templates/Centralization/Centralization';
import { Span } from '@atoms/Span/Span';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-top: 2rem;
  margin-bottom: 5%;

  @media ${({ theme }) => theme.device.laptop} {
    width: 70%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 90%;
  }
`;

const FlexContainer = styled.div<{ flexDirection?: string }>`
  display: flex;
  margin-bottom: 1rem;

  ${({ flexDirection }) => {
    switch (flexDirection) {
      case 'row':
        return css`
          flex-direction: row;
        `;
      case 'column':
        return css`
          flex-direction: column;
          align-items: center;
        `;
      default:
        break;
    }
  }}
`;

const FlexMediaContainer = styled(FlexContainer)`
  @media ${({ theme }) => theme.device.mobile} {
    flex-wrap: wrap;
  }
`;

export const ExplanationPresenter: React.FC = () => {
  return (
    <Centralization
      header={<Header isLoggedIn={false} colorProp="black" />}
      center={
        <Container>
          <Heading marginProp={['1rem', '0', '1.5rem', '0']}>기본 규칙</Heading>
          <Paragraph whitespaceprop="pre-line" wordbreakprop="break-all">
            {`4, 6, 8명의 플레이어로 구성 되어 게임을 한다. 플레이어는 크게 시민 팀, 마피아 팀으로 구분되어 있으며 인원 수에 따라 특정 직업이 추가될 수 있습니다.(Ex. 경찰, 의사...)
            게임이 시작되면 각자 한 명씩 직업을 가지게 되며 해당 사이클에 필요한 행동을 함으로써 게임을 승리로 이끌도록 해야 합니다.
            게임은 밤과 낮 그리고 저녁으로 이루어져 있으며 처음 시작은 밤부터 시작한다.`}
          </Paragraph>
          <Heading marginProp={['1rem', '0', '1.5rem', '0']}>{`밤(15초)`}</Heading>
          <FlexContainer>
            <FlexContainer flexDirection="column">
              <Span
                levelProp={4}
                marginProp={['0', '0', '1rem', '0']}
                colorProp="red"
                fontweightprop="600"
              >
                마피아 측
              </Span>
              <Img src={NightMafia} width="100%" />
            </FlexContainer>
            <FlexContainer flexDirection="column">
              <Span
                levelProp={4}
                marginProp={['0', '0', '1rem', '0']}
                colorProp="white"
                fontweightprop="600"
              >
                시민 측
              </Span>
              <Img src={NightCitizen} width="100%" />
            </FlexContainer>
          </FlexContainer>
          <UnorderedList flexDirection="column">
            <List
              lineheightprop="2"
              colorprop="black"
              liststyleprop="circle"
            >{`밤에는 마피아 팀 외에는 아무도 대화할 수 없다. 예외적으로 시민 팀의 죽은 사람 한에서 마피아와 소통할 수 있다.`}</List>
            <List
              lineheightprop="2"
              colorprop="black"
              liststyleprop="circle"
            >{`마피아들은 합의를 통해 죽일 사람 한 명을 정한다. 자살은 불가능하다.`}</List>
          </UnorderedList>
          <Heading marginProp={['1rem', '0', '1.5rem', '0']}>{`낮(30초)`}</Heading>
          <FlexMediaContainer>
            <FlexContainer flexDirection="column">
              <Span
                levelProp={4}
                marginProp={['0', '0', '1rem', '0']}
                colorProp="white"
                fontweightprop="600"
              >
                아무일도 없었다
              </Span>
              <ImgMedia src={AfternoonNothing} width="100%" />
            </FlexContainer>
            <FlexContainer flexDirection="column">
              <Span
                levelProp={4}
                marginProp={['0', '0', '1rem', '0']}
                colorProp="white"
                fontweightprop="600"
              >
                살아있는 유저 시점
              </Span>
              <ImgMedia src={AfternoonNoKilled} width="100%" />
            </FlexContainer>
            <FlexContainer flexDirection="column">
              <Span
                levelProp={4}
                marginProp={['0', '0', '1rem', '0']}
                colorProp="white"
                fontweightprop="600"
              >
                죽임을 당한 유저 시점
              </Span>
              <ImgMedia src={AfternoonKilled} width="100%" />
            </FlexContainer>
          </FlexMediaContainer>
          <UnorderedList flexDirection="column">
            <List
              lineheightprop="2"
              colorprop="black"
              liststyleprop="circle"
            >{`밤에는 마피아 팀 외에는 아무도 대화할 수 없다. 예외적으로 시민 팀의 죽은 사람 한에서 마피아와 소통할 수 있다.`}</List>
            <List
              lineheightprop="2"
              colorprop="black"
              liststyleprop="circle"
            >{`마피아들은 합의를 통해 죽일 사람 한 명을 정한다. 자살은 불가능하다.`}</List>
          </UnorderedList>
        </Container>
      }
      centerHeight="auto"
      isBackground={false}
    />
  );
};
