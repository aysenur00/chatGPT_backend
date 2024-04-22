import {Container} from '@mantine/core';
import classes from './AuthenticationForm.module.css';
import { useState } from 'react';
import { SignIn } from '@clerk/clerk-react';

export function AuthenticationForm() {

  return (
    <Container size={420} my={40}>
      <SignIn signUpUrl="/signup" afterSignInUrl="/learn" />
    </Container>
  );
}