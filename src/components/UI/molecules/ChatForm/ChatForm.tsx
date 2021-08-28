import React from 'react';

import * as S from '@molecules/ChatForm/style';

import { Button } from '@atoms/Button/Button';
import { Form } from '@atoms/Form/Form';
import { Input } from '@atoms/Input/Input';
import { useChatFormContext } from '@pages/RoomPage/RoomPageContainer';

export const ChatForm: React.FC = () => {
  const { handleSubmit, control, onValid, isValid } = useChatFormContext();
  return (
    <S.Wrapper>
      <Form
        onSubmit={handleSubmit(onValid)}
        flexDirectionProp="row"
        alignItemsProp="center"
        justifyContentProp="center"
        widthProp="80%"
      >
        <Input
          name="content"
          control={control}
          defaultValue=""
          type="text"
          label="채팅을 입력하세요"
          variant="outlined"
          flexProp={['1', '1', '0']}
          marginprop={['0']}
        />
        <Button
          isValid={isValid}
          colorProp="black"
          marginProp={['0', '0', '0', '1rem']}
          paddingProp={['1rem', '1rem']}
        >
          전송하기
        </Button>
      </Form>
    </S.Wrapper>
  );
};
