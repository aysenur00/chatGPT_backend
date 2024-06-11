import React from "react";
import { useDisclosure } from '@mantine/hooks';
import { Flex, AppShell, Burger, Button, Paper, Tooltip } from '@mantine/core';
import HeaderMegaMenu from './Header/HeaderMegaMenu';
import { FooterSocial } from './Footer/FooterSocial';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function Layout() {

    const navigate = useNavigate();
    const location = useLocation();
    const handleClick = () => {
        navigate('/train');
    };

    return (
        <>
            <HeaderMegaMenu />
            <Outlet />
            {/* <FooterSocial /> */}
            {location.pathname !== '/train' && (<Tooltip
                label="Train with GPT"
                withArrow
                styles={{
                    tooltip: {
                        backgroundColor: '#000000',  // Background color of the tooltip
                        color: '#08f808',  // Text color of the tooltip
                    },
                    arrow: {
                        backgroundColor: '#000000',  // Arrow color of the tooltip
                    },
                }}>

                <Button
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        zIndex: 1000,
                        width: '90px',
                        height: '90px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 10px',
                        fontSize: '14px',
                        backgroundColor: '#000000',
                        color: '#dee2e6',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                    onClick={handleClick}
                >
                    <img
                        src={'/icon-dark.png'}
                        alt="Logo"
                        style={{
                            width: '50px',
                            height: '50px',
                        }} />
                </Button>
            </Tooltip>)}
        </>
    )
}

export default Layout;

