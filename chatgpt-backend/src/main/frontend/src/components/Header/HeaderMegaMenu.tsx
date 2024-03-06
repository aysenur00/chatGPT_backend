import { Link } from 'react-router-dom';
import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Title,
  NavLink,
  Container,
  useMantineColorScheme,
  useComputedColorScheme,
  Space
} from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from '@tabler/icons-react';
import classes from './HeaderMegaMenu.module.css';
import { SignIn, SignInButton } from '@clerk/clerk-react';
import { useAuth, UserButton } from '@clerk/clerk-react';


export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  const toggleScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
  }


  const theme = useMantineTheme();

  const { userId, isLoaded} = useAuth();


  if(!isLoaded){
    return null;
  }



  return (
    <Box pb={40}>
      <Space />
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Title order={3}>GPT Teaches</Title>
          {/* right */}
          <div style={{ flex: 1 }}></div>
          <Container style={{ display: 'flex', alignItems: 'center' }} visibleFrom="sm">
            <NavLink label="Home" className={classes.link} component={Link} to="/" />
            <NavLink label="Learn" className={classes.link} component={Link} to="/learn" />
            <NavLink label="About" className={classes.link} component={Link} to="/about" />
          </Container>
          <Button size="compact-md" variant="default" onClick={toggleScheme}>
            {computedColorScheme === "dark" ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="m-83c3d5d1 m-f4e3c6be">
              <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
              <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
              </svg>
              : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="m-83c3d5d1 m-83c188ce">
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
                </svg>}
          </Button>
          {/* left */}
          {/* <div style={{ flex: 1 }}></div>  */}
          {!userId && (
            <>
              <div id="signInDiv">
                <Group visibleFrom="sm">
                  {/* <Button component="a" href="/login" variant="default" size="xs"
                style={{ borderWidth: 0, borderRadius: 0, }}>
                Log in</Button> */}

                  <Button component="a" href="/login" variant="default" size="xs"
                    style={{ borderWidth: 0, borderRadius: 0, }}>
                    Log in
                  </Button>
                  <Button component="a" href="/signup" variant="default" size="xs"
                    style={{ borderWidth: 0, borderRadius: 0, }}>
                    Sign up</Button>
                </Group>
              </div>
            </>
          )}
          {userId && <UserButton afterSignOutUrl='/' />}
          {/* center */}
          {/* {userId && <div style={{ width: 160 }}></div>}  */}
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="GPT Teaches"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <NavLink label="Home" className={classes.link} component={Link} to="/" />
          <NavLink label="Learn" className={classes.link} component={Link} to="/learn" />
          <NavLink label="About" className={classes.link} component={Link} to="/about" />

          <Divider my="sm" />

          {!userId && <Group justify="center" grow pb="xl" px="md">
            <Button component="a" href="/login" variant="default">Log in</Button>
            <Button component="a" href="/signup" >Sign up</Button>
          </Group>}
        </ScrollArea>

      </Drawer>
    </Box>
  );
}
export default HeaderMegaMenu;