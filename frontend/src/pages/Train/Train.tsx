import React, { useState } from 'react';
import { Container, Text, Title, TextInput, Box, Button } from '@mantine/core';

export default function Train() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
      const res = await fetch(`${apiUrl}/api/train/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })

      })

      const data = await res.json();
      setResponse(data)
    } catch (error) {
        console.error(error)
        setResponse('An error occured.')
    }
  };
  return (
    <Container size="sm" style={{ marginTop: '2rem' }}>
      <Title order={2} mt="xl">
        Train with GPT
      </Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your message"
          label="Your Message"
          required
          mt="md"
        />
        <Button type="submit" mt="md">Send</Button>
      </form>
      <Box mt="md">
        <Title order={3}>Response:</Title>
        <Text>{response}</Text>
      </Box>
    </Container>
  );
};

