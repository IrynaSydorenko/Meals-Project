import React, { Suspense } from 'react';
import Link from 'next/link';
import { getMeals } from '../../lib/meals';
import MealsGrid from '../components/meals/MealsGrid';
import styles from './MealsPage.module.css';

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals',
};

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

function MealsPage() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Delesious meals created{' '}
          <span className={styles.highlight}>By you</span>
        </h1>
        <p>Choose your favourite recepie and cook it yourself</p>
        <p className={styles.cta}>
          <Link href='/meals/share'>Share Your Favourite Recipe</Link>
        </p>
      </header>
      <main className={styles.main}>
        <Suspense
          fallback={<p className={styles.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}

export default MealsPage;
