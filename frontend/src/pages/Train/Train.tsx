import React, { useState, useEffect } from 'react';
import { Container, Text, Title, TextInput, Box, Button, FileInput, Group, Paper, Notification, Space, Grid, Card } from '@mantine/core';
import ReactMarkdown from 'react-markdown';


export default function Train() {
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ content: string, role: string }[]>([]);
  const [threadId, setThreadId] = useState("");
  const [runId, setRunId] = useState("");
  const [fileUploadMessage, setFileUploadMessage] = useState<string | null>(null);
  const [firstMessageSent, setFirstMessageSent] = useState(false);
  const assistantId = "asst_BKG42zrrKsTauozSUinoW7ey";


  const prompts = [
    "Grade the provided document out of 100. Explain the reasoning.",
    "Summarize the provided slides.",
    "Generate 5 questions about week 3's learning outcomes.",
    "What is the curriculum for CENG482?"
  ]

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

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages(prev => [...prev, { content: prompt, role: 'user' }]); // Add user's message
    setPrompt(""); // Clear the input field after sending the message
    setFirstMessageSent(true);
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

      const body: any = { threadId, prompt, role: "user" };
      if (fileId) {
        body.fileId = fileId;
      }
      const res = await fetch(`${apiUrl}/api/train/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
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
      setRunId(runData.id);
      console.log("Run created");

      pollRunStatus(threadId, runData.id);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { content: 'An error occurred.', role: 'system' }]);
    }
  };

  const handleUploadFile = async () => {
    if (!file) return;
    const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${apiUrl}/api/train/upload-file`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json(); // Parse the response body
        console.log("File uploaded successfully");
        console.log(data); // Log the parsed response
        setFileId(data.id); // Store the file ID
        setFileUploadMessage("File uploaded successfully");
      } else {
        console.error("File upload failed");
        setMessages(prev => [...prev, { content: 'File upload failed.', role: 'system' }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { content: 'An error occurred during file upload.', role: 'system' }]);
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

  const handleCardClick = (prompt: string) => {
    setPrompt(prompt);
  };

  return (
    <Container size="md" style={{ marginTop: '2rem', textAlign: 'left' }}>
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
      {!firstMessageSent && (<Grid mt="md">
        {prompts.map((prompt, index) => (
          <Grid.Col span={{ base: 6, md: 3 }} key={index}>
            <Card shadow="sm" padding="lg" onClick={() => handleCardClick(prompt)}
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text>{prompt}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>)}
      <form onSubmit={handleSendMessage}>
        <TextInput
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your message"
          label="Your Message"
          required
          mt="md"
        />

        <Group mt="md">
          <Button color='#08f808' variant="light" radius="md" type="submit">Send</Button>
        </Group>
      </form>
      <Box mt="md">
        <FileInput
          value={file}
          onChange={setFile}
          placeholder="Upload a file"
          label="Upload a file"
          clearable
        />
        <Group mt="md">
          <Button color='#08f808' variant="light" radius="md" onClick={handleUploadFile}>Upload File</Button>
        </Group>
        <Space h="xs" />
        {fileUploadMessage && (
          <Notification color='#08f808' onClose={() => setFileUploadMessage(null)}>{fileUploadMessage}</Notification>
        )}
      </Box>

    </Container>
  );
}
