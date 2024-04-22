import React from "react";
import {useDisclosure} from '@mantine/hooks';
import {Flex, AppShell, Burger, Button, Paper } from '@mantine/core';
import HeaderMegaMenu from './Header/HeaderMegaMenu';
import {FooterSocial} from './Footer/FooterSocial';
import { Outlet, Link, useNavigate } from 'react-router-dom';

function Layout(){
    return(
        <>
        <HeaderMegaMenu />
        <Outlet />
        {/* <FooterSocial /> */}
        </>
    )
}

export default Layout;

