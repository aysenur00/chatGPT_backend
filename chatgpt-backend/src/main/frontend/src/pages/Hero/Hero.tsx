import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem, Space } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconCheck } from '@tabler/icons-react';
import classes from './HeroBullets.module.css';

function HeroBullets() {
    return (
        <Container className={classes.wrapper} size={1400}>
            <div className={classes.inner}>
                <Space h="xl" />
                <Space h="xl" />
                <Space h="md" />
                <Space h="xl" />
                <Title className={classes.title}>
                    Learn{' '}
                    <Text component="span" className={classes.highlight} inherit>
                        Introduction to Computer Security
                    </Text>{' '}
                    with ChatGPT
                </Title>

                <Container p={0} size={600}>
                    <Text size="lg" c="dimmed" className={classes.description}>
                        <span style={{ fontWeight: 'bold', color: '#08f808' }}>GPT Teaches</span> aims to teach students core concepts of computer security with ChatGPT generated high quality content.
                    </Text>
                    <Space h="xl" />
                    <Space h="xl" />
                    <Text size="md" c="dimmed" className={classes.description}>
                        Got confused? Our GPT is here to answer your questions.
                    </Text>
                </Container>

                <div className={classes.controls}>
                    <Link to="https://chat.openai.com/g/g-O6ZtTDjLi-cyber-gazi" target="_blank" rel="noopener noreferrer">
                        <Button className={classes.control} size="md" variant="default" color="gray">
                            Go to our GPT
                        </Button>
                    </Link>
                </div>
            </div>
        </Container>
    );
}
export default HeroBullets;