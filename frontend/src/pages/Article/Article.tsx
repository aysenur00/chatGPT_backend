import {Button, Divider, Paper, Space, Text, Title} from "@mantine/core";
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
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>

            <Paper shadow="xl" p={{ xs: "sm", md: "xl" }}  style={{textAlign: 'left'}}>

                <Title order={1}>{content.title}</Title>
                <Divider my="md"/>
                {content.content ? (
                    <>
                        <div dangerouslySetInnerHTML={{__html: content.content}}></div>
                        <Space my="xs"/>
                        <Button variant='transparent' c="gray" size="compact-md"
                                onClick={() => navigate(-1)}><IconArrowLeft size={14}/>
                            <span>&nbsp;</span>Go back
                        </Button>
                    </>
                ) : (
                    <Text>Loading...</Text>
                )}


            </Paper>

        </div>
    );
}