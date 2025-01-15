import React from 'react';
import styles from './MealsPage.module.css';

function MealsLoadingPage() {
  return <p className={styles.loading}>Fetching meals...</p>;
}

export default MealsLoadingPage;
