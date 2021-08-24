import { FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';
import { shallowEqual, useSelector } from 'react-redux';

import * as I from '.';
import * as S from '@molecules/FormModal/style';

import { Button } from '@atoms/Button/Button';
import { Form } from '@atoms/Form/Form';
import { Heading } from '@atoms/Heading/Heading';
import { Input } from '@atoms/Input/Input';
import { Alert } from '@atoms/Alert/Alert';
import { RootState } from '@modules';

export const FormModal: React.FC<I.FormModalProps> = ({
  roomFormContext,
  title,
  defaultValue,
  disabled,
}) => {
  const { handleSubmit, control, onValid, errors, isValid, toggleModal, onToggleModal } =
    roomFormContext;
  const { loading, error } = useSelector(
    (state: RootState) => ({
      loading: state.rooms.loading,
      error: state.rooms.error,
    }),
    shallowEqual,
  );

  return (
    <S.Wrapper toggleModal={toggleModal}>
      <S.FormContainer>
        <S.CancelIconed onClick={() => onToggleModal()} />
        <Form onSubmit={handleSubmit(onValid)}>
          <Heading levelProp={2} marginProp={['10%', '0']}>
            {title}
          </Heading>
          <Input
            name="title"
            control={control}
            defaultValue={defaultValue}
            type="title"
            label="방 제목"
            variant="outlined"
            marginprop={['0', '0', '1.5rem', '0']}
            errors={!!errors.title}
            helperText={errors.title ? errors.title.message : ''}
          />
          <S.FormControled>
            <FormLabel component="legend">총 인원수</FormLabel>
            <Controller
              name="totalHeadCount"
              control={control}
              defaultValue=""
              render={({ field: { onBlur, onChange, value } }) => (
                <RadioGroup
                  aria-label="totalHeadCount"
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => onChange(e)}
                >
                  <FormControlLabel
                    value="4"
                    disabled={disabled === '4' ? true : false}
                    control={<Radio />}
                    label="4명"
                  />
                  <FormControlLabel
                    value="6"
                    disabled={disabled === '6' ? true : false}
                    control={<Radio />}
                    label="6명"
                  />
                  <FormControlLabel
                    value="8"
                    disabled={disabled === '6' ? true : false}
                    control={<Radio />}
                    label="8명"
                  />
                </RadioGroup>
              )}
            />
          </S.FormControled>
          <FormHelperText>{errors.totalHeadCount && errors.totalHeadCount.message}</FormHelperText>
          <Button
            isValid={isValid}
            colorProp="black"
            marginProp={['3%', '0', '5%', '0']}
            paddingProp={['1rem', '2rem']}
          >
            {isValid && loading === true ? 'Proceeding' : 'Continue'}
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
        </Form>
      </S.FormContainer>
    </S.Wrapper>
  );
};
