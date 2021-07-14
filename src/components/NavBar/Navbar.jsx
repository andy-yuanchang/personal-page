import React, { useState } from 'react';
import ProTypes from 'prop-types';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';

import { SidebarData } from '../../js/SidebarData';

import './Navbar.less';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => setSidebar((v) => !v);

  return (
    <>
      <IconContext.Provider value={{ color: 'fff' }}>
        <div className="navbar">
          <Link className="menu-bars">
            <FaIcons.FaBars onClick={toggleSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items">
            <li className="nav-menu-item navbar-toggle">
              <Link>
                <AiIcons.AiOutlineClose onClick={toggleSidebar} />
              </Link>
            </li>
            {
            SidebarData.map((item, index) => (
              <li key={index} className={`nav-menu-item ${item.cName}`}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))
          }
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

Navbar.ProTypes = {

};

export default Navbar;
