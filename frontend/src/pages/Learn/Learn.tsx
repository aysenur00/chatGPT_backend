import classes from './Learn.module.css'
import {
    SimpleGrid,
    Card,
    Image,
    Text,
    Container,
    AspectRatio,
    NavLink,
    Title,
    Paper,
    Space,
    Divider,
    Progress,
    Badge,
    Center,
    Blockquote,
    List
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { useEffect, useState } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import pdf1 from '../../books/Siber_Guvenlik_ve_Savunma_Kitap_Serisi_1_Farkindalik ve Caydiricilik.pdf';
import pdf2 from '../../books/BGD-Siber-Guvenlik-ve-Savunma-Kitap-Serisi-2-Problemler-ve-Cozumler.pdf';
import pdf3 from '../../books/Siber-Guvenlik-ve-Savunma-Standartlar-ve-Uygulamalar-Siber-Guvenlik-Cilt-3.pdf';
import pdf4 from '../../books/BilgiGuvenligiSavunmaKitapSerisi_Cilt_4_Prof. Dr. Şeref Sağıroğlu.pdf';
import pdf5 from '../../books/Siber_Guvenlik_ve_ Savunma_Kitap_Serisi_5_Blokzincir ve Kriptoloji.pdf';
import pdf6 from '../../books/SiberGuvenlikSavunmaKitapSerisi_No_6.pdf';
import pdf0 from '../../books/kitap.pdf';

interface WeeklyContent {
    id: string;
    title: string;
    dateOfAdd: string;
}

export default function Learn() {

    const { userId } = useAuth();

    const [content, setContent] = useState<WeeklyContent[]>([]);
    const [completedWeeks, setCompletedWeeks] = useState<string[]>([]);

    const icon = <IconInfoCircle />;

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
        fetch(`${apiUrl}/api/weekly-contents`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setContent(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        if (userId) {
            const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
            fetch(`${apiUrl}/api/users/completed-weeks?userId=${userId}`)
                .then(res => res.json())
                .then((data) => {
                    setCompletedWeeks(data)
                })
                .catch(error => console.log("Error fetching completed weeks", error))
        }

    }, [userId]);

    const cards = content.map((week) => {
        const week_no = week.id.substring(4)
        const isWeekCompleted = completedWeeks.includes(week_no);
        return (
            <Link key={week.id} to={`/learn/${week.id}`} className={classes.link} style={{ textDecoration: 'none' }}>
                <Card key={week.title} p="md" radius="md" component="a" href="#" className={classes.card} withBorder>
                    {userId && (isWeekCompleted === true ?
                        <Badge color="green" leftSection={<TiTick />} mt={10}>Week completed</Badge>
                        : <Badge color="orange" leftSection={<ImCross />} mt={10}>Week not completed</Badge>)}
                    <Space h="sm" />
                    <Text className={classes.title} mb={5}>
                        {week.title}
                    </Text>
                    {/* <AspectRatio ratio={1920 / 1080}>
                    <Image src={week.image} />
                </AspectRatio> */}
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt={10}>
                        added on {week.dateOfAdd}
                    </Text>
                </Card>
            </Link>
        );
    });

    const Stat = () => {

        const percentage = Math.floor((completedWeeks.length / content.length) * 100);
        return (

            <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)">
                <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                    Your progress
                </Text>
                <Text fz="lg" fw={500}>
                    %{percentage}
                </Text>
                <Progress value={percentage} mt="md" size="lg" radius="xl" color="green" />
            </Card>
        )
    }

    return (
        <>
            <Container py="xxl" className={classes.wrapper}>

                <Paper p="xl">
                    <Title order={1}>COURSE MATERIAL</Title>
                    <Text size='md' c="dimmed">challenging multi-step experiences with quizzes and
                        progress-tracking</Text>
                </Paper>
                <Center>
                    <div style={{ width: '75%' }}> {/* Set the desired width for the divider */}
                        <Divider size="md" />
                    </div>
                </Center>
                <Space h="xl" />
                {userId && <Stat />}
                <Space h="xl" />
                <SimpleGrid cols={{ base: 1, sm: 3, lg: 3 }}>{cards}</SimpleGrid>
                <Space h="xl" />
                <Text size="lg" fw={700} ta="left">Additional Materials</Text>
                <Blockquote ta='left' color="#08f808" icon={icon} mt="xl">
                    <List>
                        <Title order={5}>
                            For a comprehensive understanding of cybersecurity topics, you can refer to:
                        </Title>
                        <List.Item><a href={pdf1} target="_blank" rel="noopener noreferrer">
                            Siber Güvenlik ve Savunma: Farkındalık ve Caydırıcılık - Kitap Serisi 1</a>
                        </List.Item>
                        <List.Item><a href={pdf2} target="_blank" rel="noopener noreferrer">
                            Siber Güvenlik ve Savunma: Problemler ve Çözümler - Kitap Serisi 2</a>
                        </List.Item>
                        <List.Item><a href={pdf3} target="_blank" rel="noopener noreferrer">
                            Siber Güvenlik ve Savunma: Standartlar ve Uygulamalar - Kitap Serisi 3</a>
                        </List.Item>
                        <List.Item><a href={pdf4} target="_blank" rel="noopener noreferrer">
                            Siber Güvenlik ve Savunma: Biyometrik ve Kriptografik Uygulamalar - Kitap Serisi 4</a>
                        </List.Item>
                        <List.Item><a href={pdf5} target="_blank" rel="noopener noreferrer">
                            Siber Güvenlik ve Savunma: Blokzincir ve Kriptoloji - Kitap Serisi 5</a>
                        </List.Item>
                        <List.Item><a href={pdf6} target="_blank" rel="noopener noreferrer">
                            Siber Güvenlik ve Savunma: Siber Güvenlik Ontolojisi, Tehditler ve Çözümler - Kitap Serisi 6</a>
                        </List.Item>
                        <List.Item><a href={pdf0} target="_blank" rel="noopener noreferrer">
                            DIJITAL OKURYAZARLIK: Araçlar, Metodolojiler, Uygulamalar ve Öneriler</a>
                        </List.Item>
                    </List>
                </Blockquote>
            </Container>

        </>
    );
}