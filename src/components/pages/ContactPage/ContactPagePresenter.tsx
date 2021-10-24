import React from 'react';
import styled from 'styled-components';

import { Form } from '@atoms/Form/Form';
import { Heading } from '@atoms/Heading/Heading';
import { Header } from '@organisms/Header/Header';
import { useContactPageContext } from '@pages/ContactPage/ContactPageContainer';
import { Centralization } from '@templates/Centralization/Centralization';
import { Input } from '@atoms/Input/Input';
import { Button } from '@atoms/Button/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  margin-top: 2rem;
  margin-bottom: 5%;

  @media ${({ theme }) => theme.device.laptop} {
    width: 60%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 80%;
  }
`;

export const ContactPagePresenter: React.FC = () => {
  const { handleSubmit, control, onValid, errors, isValid } = useContactPageContext();

  return (
    <Centralization
      header={<Header isLoggedIn={false} colorProp="black" />}
      center={
        <Container>
          <Heading marginProp={['1rem', '0', '1.5rem', '0']}>Contact</Heading>
          <Form
            onSubmit={handleSubmit(onValid)}
            flexDirectionProp="column"
            alignItemsProp="center"
            justifyContentProp="center"
            widthProp="100%"
          >
            <Input
              name="email"
              control={control}
              defaultValue=""
              type="email"
              label="Email"
              variant="outlined"
              flexprop={['1', '1', '0']}
              marginprop={['0', '0', '1rem', '0']}
              fullwidth={true}
              errors={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
            <Input
              name="subject"
              control={control}
              defaultValue=""
              type="text"
              label="Subject"
              variant="outlined"
              flexprop={['1', '1', '0']}
              marginprop={['0', '0', '1rem', '0']}
              fullwidth={true}
              errors={!!errors.subject}
              helperText={errors.subject ? errors.subject.message : ''}
            />
            <Input
              name="message"
              control={control}
              multiline={true}
              minRows={5}
              maxRows={10}
              defaultValue=""
              type="text"
              label="Message"
              variant="outlined"
              flexprop={['1', '1', '0']}
              marginprop={['0', '0', '1rem', '0']}
              fullwidth={true}
              errors={!!errors.message}
              helperText={errors.message ? errors.message.message : ''}
            />
            <Button
              isValid={isValid}
              colorProp="black"
              marginProp={['0', '0', '1rem', '0']}
              paddingProp={['1rem', '1rem']}
            >
              Transmit
            </Button>
          </Form>
        </Container>
      }
      centerHeight="100vh"
      isBackground={false}
    />
  );
};
