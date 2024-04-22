import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Space,
    Divider
} from '@mantine/core';
import classes from './Register.module.css';
import { SignUp } from '@clerk/clerk-react';

export function Register() {
    return (
        <Container size={420} my={40}>
            {/* <Title ta="center" className={classes.title}>
                Register
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Already have an account?{' '}
                <Anchor href="/login" size="sm" >
                    Sign in
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">



                <TextInput label="Name and surname" placeholder="John Doe" required />
                <TextInput label="Email" placeholder="you@mantine.dev" required mt="md" />
                <PasswordInput label="Password" placeholder="Your password" required mt="md" />
                <Button component="a" href="/" fullWidth mt="xl">
                    Sign up
                </Button>
                <Divider label="Or login with" labelPosition="center" my="lg" />
            </Paper> */}
            <SignUp afterSignUpUrl="/learn" signInUrl="/login"/>
        </Container>
    );
}