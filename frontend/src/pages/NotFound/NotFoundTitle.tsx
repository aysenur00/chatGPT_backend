import { Title, Text, Button, Container, Group } from '@mantine/core';
import './NotFoundTitle.css';


export function NotFoundTitle() {
  return (
    <Container className="not-found-container">
      <div className="not-found-number">404</div>
      <Title className="not-found-title">You have found a secret place.</Title>
      <Text c="dimmed" size="lg" ta="center" className="not-found-text">
        Unfortunately, this is only a 404 page. You may have mistyped the address,
      </Text>
      <Text c="dimmed" size="lg" ta="center" className="not-found-text">
        or the page has been moved to another URL.
      </Text>
      <Group justify="center" className="not-found-group">
        <Button component="a" href="/" variant="default" size="md" color='gray'>
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}