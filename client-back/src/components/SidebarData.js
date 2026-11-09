import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <IoIcons.IoMdPeople />
  },
  {
    title: 'About',
    path: '/about-us',
    icon: <IoIcons.IoMdHelpCircle />
  },
 

  {
    title: 'Blog',
    path: '/blogcategories',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'Gallery',
    path: '/gallery',
    icon: <IoIcons.IoMdHelpCircle />
  },
  {
    title: 'Contact',
    path: '/contact-us',
    icon: <IoIcons.IoMdHelpCircle />
  },
  {
    title: 'Shop',
    path: '/shop',
    icon: <IoIcons.IoMdHelpCircle />
  },
  {
    title: 'Account',
    path: '/my-account',
    icon: <IoIcons.IoMdHelpCircle />
  },
];
