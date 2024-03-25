import {Button, Center, Container, Divider, List, Paper, SimpleGrid, Space, Text, Title} from "@mantine/core";
import {IconArrowLeft} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

interface Content {
    title?: string;
    content?: string;
}

export default function Article() {

    const navigate = useNavigate();
    const {id} = useParams();
    const [content, setContent] = useState<Content>({});
    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
        if (id) {
            fetch(`${apiUrl}/api/articles/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setContent(data);
                })
                .catch((error) => console.error('Error fetching data:', error));
        }
    }, [id]); // Trigger the effect when id changes


    return (
        <div style={{width: "900px", margin: "0 auto"}}>

            <Paper shadow="xl" p="xl" style={{textAlign: 'left'}}>

                <Title order={1}>{content.title}</Title>
                <Divider my="md"/>
                <Text fw={700}>
                    {content.content}
                </Text>
                <Space my="xs"/>
                <Button variant='transparent' c="gray" size="compact-md" onClick={() => navigate(-1)}><IconArrowLeft size={14} />
                    <span>&nbsp;</span>Go back
                </Button>

            </Paper>

        </div>
    );
}