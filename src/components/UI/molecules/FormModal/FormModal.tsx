import React from 'react';

import * as S from '@molecules/FormModal/style';

import { Button } from '@atoms/Button/Button';
import { Form } from '@atoms/Form/Form';
import { Heading } from '@atoms/Heading/Heading';
import { Input } from '@atoms/Input/Input';
import { Alert } from '@atoms/Alert/Alert';
import { useCreateRoomFormContext } from '@pages/LoginHome/LoginHomeContainer';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import { Controller } from 'react-hook-form';

export const FormModal: React.FC = () => {
  const { handleSubmit, control, onValid, errors, isValid } = useCreateRoomFormContext();

  return (
    <S.Wrapper>
      <S.FormContainer>
        <Form onSubmit={handleSubmit(onValid, (er) => console.log(er))}>
          <Heading levelProp={2} marginProp={['0', '0', '10%']}>
            방 만들기
          </Heading>
          <Input
            name="title"
            control={control}
            defaultValue=""
            type="title"
            label="방 제목"
            variant="outlined"
            errors={!!errors.title}
            helperText={errors.title ? errors.title.message : ''}
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">총 인원수</FormLabel>
            <Controller
              name="totalHeadCount"
              control={control}
              defaultValue="4"
              render={({ field: { onBlur, onChange, value } }) => (
                <RadioGroup
                  aria-label="totalHeadCount"
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => onChange(e)}
                >
                  <FormControlLabel value="4" control={<Radio />} label="4명" />
                  <FormControlLabel value="6" control={<Radio />} label="6명" />
                  <FormControlLabel value="8" control={<Radio />} label="8명" />
                </RadioGroup>
              )}
            />
          </FormControl>
          <Button
            isValid={isValid}
            colorProp="black"
            marginProp={['5%', '0', '0', '0']}
            paddingProp={['1rem', '2rem']}
          >
            {/* {isValid && loading === true ? 'Proceeding' : 'Continue'} */}
            Continue
          </Button>
          {/* {error && <Alert severity="error">{error}</Alert>} */}
        </Form>
      </S.FormContainer>
    </S.Wrapper>
  );
};
