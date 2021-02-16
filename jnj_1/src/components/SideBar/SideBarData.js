import React from 'react';

import { FaUserCircle } from 'react-icons/fa';
import { RiUserHeartFill } from 'react-icons/ri';
import { ImStatsDots } from 'react-icons/im';
import { GiSpellBook } from 'react-icons/gi';
import { VscFeedback } from 'react-icons/vsc';
import { IoLogOut } from 'react-icons/io5';
import { MENU_ICON_SIZE } from './../../styles/styleConstants';

export const SideBarData = [
  {
    "title": "My Profile",
    "path": "/my_profile",
    "icon": <FaUserCircle size={MENU_ICON_SIZE}/>,
  },
  {
    "title": "Date Preferences",
    "path": "/date_preferences",
    "icon": <RiUserHeartFill size={MENU_ICON_SIZE}/>,
  },
  {
    "title": "My Statistics",
    "path": "/my_statistics",
    "icon": <ImStatsDots size={MENU_ICON_SIZE}/>,
  },
  {
    "title": "How to Use Guide",
    "path": "/guide",
    "icon": <GiSpellBook size={MENU_ICON_SIZE}/>,
  },
  {
    "title": "Contact Us",
    "path": "/contact_us",
    "icon": <VscFeedback size={MENU_ICON_SIZE}/>,
  },
  {
    "title": "Log Out",
    "path": "/logout",
    "icon": <IoLogOut size={MENU_ICON_SIZE}/>,
  }
];