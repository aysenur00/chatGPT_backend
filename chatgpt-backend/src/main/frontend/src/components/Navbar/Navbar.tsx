import React from 'react';
import { useState } from 'react';
import { Notification, Button, Group, Code, Container, Stack } from '@mantine/core';
import {
    IconBellRinging,
    IconFingerprint,
    IconReceipt2,
} from '@tabler/icons-react';
import classes from './Navbar.module.css';

const data = [
    { link: '', label: 'Haftanın kazanımları', icon: IconBellRinging },
    { link: '', label: 'Ders slaytı', icon: IconBellRinging },
    { link: '', label: 'Haftanın testi', icon: IconReceipt2 },
    { link: '', label: 'Geri bildirim ver', icon: IconFingerprint },
];

export default function Navbar() {

    const [active, setActive] = useState('Billing');

    const links = data.map((item) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <>
            <nav className={classes.navbar}>
                <Stack h={300} bg="var(--mantine-color-body)" gap="xs" style={{marginTop: '50px'}}>
                    {links}
                </Stack>
            </nav>

        </>
    );
}
