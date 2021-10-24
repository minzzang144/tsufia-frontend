import { yupResolver } from '@hookform/resolvers/yup';
import React, { createContext, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import * as I from '.';

import { ContactPagePresenter } from '@pages/ContactPage/ContactPagePresenter';

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

  const onValid = () => {
    console.log(getValues());
    reset({ email: '', subject: '', message: '' });
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
      <ContactPagePresenter />
    </ContactPageContext.Provider>
  );
};
