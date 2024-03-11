import { Button, Title, Container, Grid, Skeleton, rem, Group, Paper, Text, Space, Divider, List, Rating, SimpleGrid, Badge, Center } from '@mantine/core'
import { RedirectToSignIn, SignInButton, SignOutButton, SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

interface Content {
  title?: string;
  outcome?: string;
  slidesURL?: string;
  feedbackURL?: string;
  quizzes?: Quiz[];
}
interface Quiz {
  quizId: string;
  title: string;
  level: string;
  url: string;
}


export default function Week() {
  const { id } = useParams();
  const [content, setContent] = useState<Content>({});
  const { userId } = useAuth();
  const week_no = id?.substring(4,);
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
    if (id) {
      fetch(`${apiUrl}/api/weekly-contents/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setContent(data);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [id]); // Trigger the effect when id changes

  const items = content.quizzes?.map((item, index) => (
    <Paper
      key={index}
      shadow="sm"
      p="xs"
      style={{ textAlign: 'left', cursor: 'pointer' }}
      onClick={() => window.open(item.url, '_blank')}>
      <Badge color="gray" size="xs">
        {item.level}
      </Badge>
      <Text fw={700} fz="sm" mb={2} mt={3}>
        {item.title}
      </Text>
    </Paper>
  ));


  function markComplete() {
    const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
    const fetchUrl = `${apiUrl}/api/users`

    fetch(fetchUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers you might need, e.g., authorization headers
      },
      body: JSON.stringify({
        userId: userId,
        completed: true,
        weekNo: week_no,
      }),
    })
      // .then((response) => { console.log(response) })
      // .then((data) => {
      //   // Handle the response data if needed
      //   console.log('Week marked as completed:', data);
      // })
      .catch((error) => {
        console.error('Error marking week as completed:', error);
      });

    setCompleted(true);

  }

  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
    if (userId && week_no) {
      fetch(`${apiUrl}/api/users/completed-status?userId=${userId}&weekNo=${week_no}`)
        .then(res => res.json())
        .then((data) => {
          setCompleted(data.completed);
        })
        .catch(error => console.log("Error fetching completion status.", error))
    }
  }, [userId, week_no]);


  return (
    <>
      <div style={{ width: "900px", margin: "0 auto" }}>

        <Paper shadow="xl" p="xl" style={{ textAlign: 'left' }}>


          <Title order={1}>{content.title}</Title>
          <Divider my="md" />
          <Text fw={700}>
            This week's learning outcomes
          </Text>
          <Space my="xs" />
          <List type="ordered">
            {content.outcome && content.outcome.length > 0 ? (
              content.outcome?.split(';').map((outcome, index) => (
                <List.Item key={index}>{outcome}</List.Item>
              ))
            ) : (
              <List.Item>No outcomes available</List.Item>
            )}
          </List>

          <Divider my="md" />
          <Text fw={700}>
            This week's slide
          </Text>
          <Space my="xs" />


          <a href={content.slidesURL} target='_blank' rel='noopener noreferrer'>View slide</a>

          <Space my="xs" />


          <Divider my="md" />

          <Text fw={700}>
            Quizzes
          </Text>


          <Container mt={30} mb={30} size="lg">
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
              {items}
            </SimpleGrid>
          </Container>

          <Divider my="md" />

          <Text fw={700}>
            Rate this week's content.
          </Text>
          <Space my="xs" />
          <a href={content.feedbackURL} target="_blank" rel="noopener noreferrer">
            Google forms
          </a>
          <Space my="lg" />
          <Center>
            {userId && (completed ? (
              <Text c="#08f808" fw={700}>
                Congratulations! You have completed this week.
              </Text>
            ) : (
              <Button size="xs" variant="default" color="gray" onClick={markComplete}>
                Mark week as completed
              </Button>
            ))}
          </Center>
          <Space h="sm" />

          <Button variant='transparent' c="gray" size="compact-md" onClick={() => navigate(-1)}><IconArrowLeft size={14} />
            <span>&nbsp;</span>Go back
          </Button>
        </Paper>

      </div>
    </>

  );
}
