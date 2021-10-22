import React from 'react';
import styled, { css } from 'styled-components';

import NightCitizen from '@assets/night-citizen.png';
import NightMafia from '@assets/night-mafia.png';
import AfternoonNoKilled from '@assets/afternoon-no-killed.png';
import AfternoonKilled from '@assets/afternoon-killed.png';
import AfternoonNothing from '@assets/afternoon-nothing.png';
import Evening from '@assets/evening.png';
import GameResult from '@assets/game-result.png';
import Pending from '@assets/pending.png';
import Proceeding from '@assets/proceeding.png';
import Complete from '@assets/complete.png';
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
  width: 100%;

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
            >{`마피아들은 합의를 통해 죽일 사람 한 명을 정한다. 투표는 강제가 아닌 선택으로 지목하지 않고 넘어갈 수도 있으며 
            자기 자신을 선택해 자살하는 것은 불가능하다.`}</List>
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
            >{`낮이 되면 마피아가 선택한 플레이어가 사망하며, '~가 살해당하였습니다'라고 문구가 뜬다. 
            단, 마피아가 죽일 사람을 지목하지 않았다면 밤은 조용히 넘어간다.`}</List>
            <List
              lineheightprop="2"
              colorprop="black"
              liststyleprop="circle"
            >{`이때부터 죽은 자를 제외한 모든 플레이어가 대화할 수 있다. 
            시민들은 대화를 통해 누가 마피아인지 추리하여 모든 마피아를 죽여야 하고, 
            마피아는 시민을 사칭하여 시민들을 속이고 시민들을 죽여나가야 한다.`}</List>
          </UnorderedList>
          <Heading marginProp={['1rem', '0', '1.5rem', '0']}>{`저녁(15초)`}</Heading>
          <FlexMediaContainer>
            <FlexContainer flexDirection="column">
              <Span
                levelProp={4}
                marginProp={['0', '0', '1rem', '0']}
                colorProp="white"
                fontweightprop="600"
              >
                투표
              </Span>
              <ImgMedia src={Evening} width="auto" />
            </FlexContainer>
          </FlexMediaContainer>
          <UnorderedList flexDirection="column">
            <List
              lineheightprop="2"
              colorprop="black"
              liststyleprop="circle"
            >{`대화 시간이 끝나면 투표시간으로 넘어간다.`}</List>
            <List
              lineheightprop="2"
              colorprop="black"
              liststyleprop="circle"
            >{`기본적으로 플레이어 당 하나의 투표권이 있으며, 한 사람당 한 명에게 투표할 수 있다. 
            또한 자기 자신에게도 투표할 수 있는데, 이를 '자투'라 한다.`}</List>
            <List
              lineheightprop="2"
              colorprop="black"
              liststyleprop="circle"
            >{`투표 시간에 투표 대상을 계속해서 변경할 수 있다. 
            투표 시간이 종료되었을 때 마지막으로 지목한 대상에게 최종적으로 투표를 행사한다.`}</List>
            <List
              lineheightprop="2"
              colorprop="black"
              liststyleprop="circle"
            >{`투표는 비공개로 표시되며 투표 시간이 종료되면 최종적인 투표 결과가 공개된다.`}</List>
            <List
              lineheightprop="2"
              colorprop="black"
              liststyleprop="circle"
            >{`투표를 가장 많이 받은 플레이어의 투표 수가 살아있는 유저의 과반수를 넘게되면 사형당하게 되며 
            그렇지 않을 경우 아무 일도 없이 다음 사이클로 넘어가게 된다.`}</List>
          </UnorderedList>
          <Heading marginProp={['1rem', '0', '1.5rem', '0']}>승리 조건</Heading>
          <FlexMediaContainer>
            <FlexContainer flexDirection="column">
              <Span
                levelProp={4}
                marginProp={['0', '0', '1rem', '0']}
                colorProp="white"
                fontweightprop="600"
              >
                게임 결과
              </Span>
              <ImgMedia src={GameResult} width="100%" />
            </FlexContainer>
          </FlexMediaContainer>
          <UnorderedList flexDirection="column">
            <List
              lineheightprop="2"
              colorprop="black"
              liststyleprop="circle"
            >{`"승리 조건"은 마피아 팀의 경우 마피아 측 인원이 시민 측 인원과 동등하거나 그 이하가 되면 충족되며, 
            시민 팀의 경우 모든 마피아를 찾아 사형하면 충족되어, 
            어느 한 팀이 판정 시기에 승리 조건을 충족하는 즉시 해당 팀의 승리로 게임이 종료된다.`}</List>
            <List
              lineheightprop="2"
              colorprop="black"
              liststyleprop="circle"
            >{`판정 시기는 매일 2번, 밤이 종료될 때, 일반 투표가 종료될 때다.`}</List>
          </UnorderedList>
          <Heading marginProp={['1rem', '0', '1.5rem', '0']}>추가 정보</Heading>
          <FlexMediaContainer>
            <FlexContainer flexDirection="column">
              <Span
                levelProp={4}
                marginProp={['0', '0', '1rem', '0']}
                colorProp="white"
                fontweightprop="600"
              >
                대기중
              </Span>
              <ImgMedia src={Pending} width="100%" />
            </FlexContainer>
            <FlexContainer flexDirection="column">
              <Span
                levelProp={4}
                marginProp={['0', '0', '1rem', '0']}
                colorProp="red"
                fontweightprop="600"
              >
                진행중
              </Span>
              <ImgMedia src={Proceeding} width="100%" />
            </FlexContainer>
            <FlexContainer flexDirection="column">
              <Span
                levelProp={4}
                marginProp={['0', '0', '1rem', '0']}
                colorProp="white"
                fontweightprop="600"
              >
                완료
              </Span>
              <ImgMedia src={Complete} width="100%" />
            </FlexContainer>
          </FlexMediaContainer>
          <UnorderedList flexDirection="column">
            <List
              lineheightprop="2"
              colorprop="black"
              liststyleprop="circle"
            >{`방 입장은 대기중 상태일 때만 입장이 가능하며 진행중 또는 완료 상태일 때는 입장이 불가능 합니다.`}</List>
            <List
              lineheightprop="2"
              colorprop="black"
              liststyleprop="circle"
            >{`현재까지 가능한 모드는 4인용이며 6, 8인용은 잠정적으로 중단되며 추후 개발할 예정입니다.`}</List>
          </UnorderedList>
          <Paragraph whitespaceprop="pre-line" wordbreakprop="break-all">
            {`Tsufia 게임에 대한 모든 설명을 마쳤습니다. 이제 다른 사용자와 함께 참여하여 게임을 재밌게 플레이 하시길 바랍니다.`}
          </Paragraph>
        </Container>
      }
      centerHeight="auto"
      isBackground={false}
    />
  );
};
