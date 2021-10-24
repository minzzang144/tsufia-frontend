import { yupResolver } from '@hookform/resolvers/yup';
import React, { createContext, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import * as I from '.';

import { ContactPagePresenter } from '@pages/ContactPage/ContactPagePresenter';
import { MailAPI } from '@api';
import { PostContactUserRequest } from '@api-types';

// Contact Context 생성
const ContactPageContext = createContext<I.IContactPageContext | undefined>(undefined);
export const useContactPageContext = () => {
  const context = useContext(ContactPageContext);
  if (!context) throw new Error('Contact Page Context가 존재하지 않습니다');
  return context;
};

// Contact Validate Schema
const contactSchema = yup.object().shape({
  email: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().required(),
});

export const ContactPageContainer: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid },
    reset,
  } = useForm<I.ContactInput>({ mode: 'all', resolver: yupResolver(contactSchema) });
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<{ ok: boolean; content: string } | undefined>(undefined);

  const onValid = async () => {
    const values = getValues();
    await onContactUser(values);
  };

  const onContactUser = async (body: PostContactUserRequest) => {
    try {
      setLoading(true);
      const response = await MailAPI.postContactUser(body);
      const { ok, error } = response;
      if (!ok && error) setState({ ok: false, content: error });
      if (ok) setState({ ok: true, content: '메일 전송을 성공하였습니다!' });
      reset({ email: '', subject: '', message: '' });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const contactValues = {
    register,
    handleSubmit,
    control,
    onValid,
    errors,
    isValid,
  };

  return (
    <ContactPageContext.Provider value={contactValues}>
      <ContactPagePresenter loading={loading} state={state} />
    </ContactPageContext.Provider>
  );
};
