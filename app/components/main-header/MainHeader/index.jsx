import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavLink from '../NavLink/index.jsx';
import MainHeaderBackground from '../MainHeaderBackground.jsx';
import logoImg from '@/assets/logo.png';
import styles from './MainHeader.module.css';

function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={styles.header}>
        <Link className={styles.logo} href='/'>
          <Image src={logoImg} alt='a plate with food on it' priority />
          NextLevel food
        </Link>
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink href='/meals'>Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href='/community'>Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default MainHeader;