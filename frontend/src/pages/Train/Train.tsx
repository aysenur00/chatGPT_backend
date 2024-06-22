import React, { useState, useEffect } from 'react';
import { Container, Text, Title, TextInput, Box, Button, FileInput, Group, Paper } from '@mantine/core';
import ReactMarkdown from 'react-markdown';

export default function Train() {
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<{ content: string, role: string }[]>([]);
  const [threadId, setThreadId] = useState("");
  const [runId, setRunId] = useState("");
  const assistantId = "asst_BKG42zrrKsTauozSUinoW7ey";

  useEffect(() => {
    const createThread = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

        const res = await fetch(`${apiUrl}/api/train/create-thread`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        });

        const data = await res.json();
        console.log("thread created: ", data.id);
        setThreadId(data.id);
      } catch (error) {
        console.error(error);
        setMessages([{ content: 'An error occurred.', role: 'system' }]);
      }
    };

    createThread();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages(prev => [...prev, { content: prompt, role: 'user' }]); // Add user's message
    setPrompt(""); // Clear the input field after sending the message
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

      const res = await fetch(`${apiUrl}/api/train/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ threadId, prompt })
      });

      // Trigger the run after sending the message
      const runRes = await fetch(`${apiUrl}/api/train/create-run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ threadId, assistantId })
      });

      const runData = await runRes.json();
      //setResponse(JSON.stringify(runData, null, 2));
      setRunId(runData.id);
      console.log("Run created");
      
      pollRunStatus(threadId, runData.id);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { content: 'An error occurred.', role: 'system' }]);
    }
  };

  const pollRunStatus = async (threadId: string, runId: string) => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

    const checkStatus = async () => {
      const statusRes = await fetch(`${apiUrl}/api/train/run-status/${threadId}/${runId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const statusData = await statusRes.json();

      if (statusData.status === 'completed') {
        fetchMessages(threadId);
      } else if (statusData.status === 'failed') {
        setMessages(prev => [...prev, { content: 'Run failed.', role: 'system' }]);
      } else {
        setTimeout(checkStatus, 2000); // Poll every 2 seconds
      }
    };

    checkStatus();
  };

  const fetchMessages = async (threadId: string) => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

    try {
      const messagesRes = await fetch(`${apiUrl}/api/train/messages/${threadId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const messagesData = await messagesRes.json();
      const contentValues = messagesData.data.map((msg: { content: { text: { value: string } }[], role: string }) => ({
        content: msg.content[0].text.value,
        role: msg.role
      })).reverse();
      setMessages(contentValues); // Reverse the order of messages
    } catch (error) {
      console.error(error);
      setMessages([{ content: 'An error occurred while fetching messages.', role: 'system' }]);
    }
  };
  

  return (
    <Container size="sm" style={{ marginTop: '2rem', textAlign: 'left' }}>
      <Title order={2} mt="xl">
        Chat with Assistant
      </Title>
      <Box mt="md" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
        {messages.map((message, index) => (
          <Paper key={index} style={{
            marginBottom: '1rem',
            padding: '0rem 1rem',
            borderRadius: '3rem',
            backgroundColor: message.role === 'user' ? '#2f2f2f' : 'transparent', // Background only for user messages
            textAlign: message.role === 'user' ? 'right' : 'left',
            alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '75%',
            wordBreak: 'break-word'
          }}>
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </Paper>
        ))}
      </Box>
      <form onSubmit={handleSubmit}>
        <TextInput
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your message"
          label="Your Message"
          required
          mt="md"
        />
        <Group mt="md">
          <Button type="submit">Send</Button>
        </Group>
      </form>
    </Container>
  );
}
