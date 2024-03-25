import {
    Text,
    Paper,
    Space,
    rem, Title, Divider, Center, Card, Badge,
} from '@mantine/core';
import {Container, Grid, SimpleGrid, Skeleton} from '@mantine/core';
import classes from './Explore.module.css';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const PRIMARY_COL_HEIGHT = rem(200);

interface Article {
    id: string;
    title: string;
    dateOfAdd: string;
}

export default function Explore() {
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
    const [content, setContent] = useState<Article[]>([]);

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
        fetch(`${apiUrl}/api/articles`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setContent(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);


    const cards = content.map((article) => {
        return (
            <Link key={article.id} to={`/explore/${article.id}`} className={classes.link}
                  style={{textDecoration: 'none'}}>
                <Card key={article.title} p="md" radius="md" component="a" href="#" className={classes.card} withBorder>
                    <Text className={classes.title} mb={5}>
                        {article.title}
                    </Text>
                    {/* <AspectRatio ratio={1920 / 1080}>
                    <Image src={week.image} />
                </AspectRatio> */}
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt={10}>
                        added on {article.dateOfAdd}
                    </Text>
                </Card>
            </Link>
        );


    })
    return (
        <Container py="xxl" className={classes.wrapper}>

            <Paper p="xl">
                <Title order={1}>LATEST ARTICLES</Title>
                <Text size='md' c="dimmed">learn here</Text>
            </Paper>
            <Center>
                <div style={{width: '75%'}}> {/* Set the desired width for the divider */}
                    <Divider size="md"/>
                </div>
            </Center>

            <Space h="xl"/>
            <Space h="xl"/>

            <SimpleGrid cols={{base: 1, sm: 3, lg: 3}}>
                {cards}
            </SimpleGrid>

        </Container>
    );
}