import React from 'react';
import * as IoIcons from 'react-icons/io';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: 'Portfolio',
    path: '/portfolio',
    icon: <AiIcons.AiFillAppstore />,
    cName: 'nav-text',
  },
  {
    title: 'Personal Info',
    path: '/personalInfo',
    icon: <FaIcons.FaInfoCircle />,
    cName: 'nav-text',
  },
];
