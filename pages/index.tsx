import { Inter } from 'next/font/google';

import Nav from '@/components/nav';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [state, setState] = useState<string>('');

  useEffect(() => {
    const recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.lang = 'en-GB';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.start();

    recognition.addEventListener('audiostart', (event) => {
      // eslint-disable-next-line no-console
      console.log(event);
    });

    recognition.addEventListener('audioend', (event) => {
      // eslint-disable-next-line no-console
      console.log(event);
    });

    recognition.addEventListener('nomatch', (event) => {
      // eslint-disable-next-line no-console
      console.log(event);
    });

    recognition.addEventListener('result', (event) => {
      const results = Array.from(event.results).map((r) => r[0]);
      setState(results.map((r) => r.transcript).join(''));
    });
  }, []);

  return (
    <>
      <Nav />

      <main className={`${styles.main} ${inter.className}`}>{state}</main>
    </>
  );
}
