import React from 'react';
import styled from 'styled-components';

import { Heading } from '@atoms/Heading/Heading';
import { Img } from '@atoms/Img/Img';
import { Link } from '@atoms/Link/Link';
import { List } from '@atoms/List/List';
import { Paragraph } from '@atoms/Paragraph/Paragraph';
import { UnorderedList } from '@atoms/UnorderedList/UnorderedList';
import IntroductionPoster from '@assets/introduction-poster.jpg';
import { Header } from '@organisms/Header/Header';
import { Centralization } from '@templates/Centralization/Centralization';

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

export const IntroductionPresenter: React.FC = () => {
  return (
    <Centralization
      header={<Header isLoggedIn={false} colorProp="black" />}
      center={
        <Container>
          <Img src={IntroductionPoster} width="100%" />
          <Heading marginProp={['1rem', '0', '1.5rem', '0']}>Tsufia를 소개합니다</Heading>
          <Paragraph whitespaceprop="pre-line" wordbreakprop="break-all">
            {`Tsufia는 우리가 흔히 알고 있는 마피아 게임을 모티브하여 창작 되었으며 유저의 인터랙션에 의해 실시간으로 반응하는 리얼타임 게임입니다.
          `}
            {`마피아 게임을 단 한 번도 해보지 않은 초심자라도 위의 `}
            <Link to="/game-explanation" hoveropacityprop="0.5">
              게임 설명
            </Link>
            {` 메뉴를 참고하시면 쉽게 게임에 참여할 수 있습니다.`}
          </Paragraph>
          <Heading marginProp={['1rem', '0', '1.5rem', '0']}>Tsufia는 왜 만들어졌는가?</Heading>
          <Paragraph whitespaceprop="pre-line" wordbreakprop="break-all">
            {`코로나19 발발로 인해 사회적 거리두기가 오랫동안 지속되면서 혼자 있게 되는 상황이 많아졌다고 생각이 듭니다.
            제작자가 생각하기에 코로나19 바이러스로 인해 발생한 가장 힘든 점 중 하나는 장시간 동안 혼자 고립되어 있다고 느껴지게 되는 것 입니다.
            하지만 사람은 본래 혼자서 살아가기보다 집단을 이루어 무언가를 계속해서 생산하고 추구하는 생물이기 때문에 현재 이러한 상황 속에서도 누군가와 함께 어떤 것을 해나갈 수 있는 매개체가 필요하다고 생각했습니다.
            따라서 저는 여럿이서 만들어 낼 수 있는 무언가를 만들어보기로 결심했으며 여기에 모두에게 즐거움을 줄 수 있는 엔터테인먼트를 추가하여 관심을 모아보고 싶다는 생각을 하게 되었습니다.
            이로 인해 생각하게 된 프로젝트의 주제가 게임이 되었고 사용자의 인터랙션을 반영할 수 있는 실시간 게임을 만들기로 하였습니다.
            제작자가 만든 게임이 조금이나마 사람들에게 즐거운 추억을 줄 수 있기를 바라는 바 입니다.`}
          </Paragraph>
          <Heading marginProp={['1rem', '0', '1.5rem', '0']}>게임 대상</Heading>
          <UnorderedList flexDirection="column">
            <List
              lineheightprop="2"
              colorprop="black"
              liststyleprop="circle"
            >{`코로나19로 인해 집에서 오랫동안 머물러 혼자있기 심심한 분들`}</List>
            <List
              lineheightprop="2"
              colorprop="black"
              liststyleprop="circle"
            >{`코로나19로 인해 친구들을 자주 만나지 못해 심심하신 분들`}</List>
            <List
              lineheightprop="2"
              colorprop="black"
              liststyleprop="circle"
            >{`여럿이 노는 것을 좋아하나 사람을 만나는 것을 꺼려하시는 분들`}</List>
            <List
              lineheightprop="2"
              colorprop="black"
              liststyleprop="circle"
            >{`어렸을 시절, 친구들과 마피아 게임을 해봤던 추억을 느끼고 싶은 분들`}</List>
          </UnorderedList>
          <Paragraph whitespaceprop="pre-line" wordbreakprop="break-all">
            {`게임을 시작해 봅시다. 게임을 처음 접해신 분들은 게임 설명을 참고하시고 바로 시작하시길 원하시는 분들은 로그인을 통해 진행할 수 있습니다.`}
          </Paragraph>
        </Container>
      }
      centerHeight="auto"
      isBackground={false}
    />
  );
};
