/* eslint-disable no-console */
import { Inter } from 'next/font/google';

import Nav from '@/components/nav';
import styles from '@/styles/Home.module.css';
import { useEffect, useRef, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [transcript, setTranscript] = useState<string>('');
  const [transcribing, setTranscribing] = useState(false);
  const recognition = useRef<SpeechRecognition>();

  const toggleTranscribing = () => {
    setTranscribing((transcribing) => !transcribing);
  };

  useEffect(() => {
    if (transcribing) {
      recognition.current = new webkitSpeechRecognition();

      recognition.current.continuous = true;
      recognition.current.lang = 'en-GB';
      recognition.current.interimResults = true;
      recognition.current.maxAlternatives = 1;
      recognition.current.start();

      [
        'audiostart',
        'audioend',
        'end',
        'error',
        'nomatch',
        'result',
        'soundend',
        'speechstart',
        'speechend',
        'start',
      ].forEach(
        (type) =>
          recognition.current?.addEventListener(type, (e) => {
            console.log(type, e);
          }),
      );

      recognition.current?.addEventListener('result', (event) => {
        const results = Array.from(event.results).map((r) => r[0]);
        setTranscript(results.map((r) => r.transcript).join(''));
      });
    } else {
      recognition.current?.stop();
    }
  }, [transcribing]);

  return (
    <>
      <Nav />

      <main className={`${styles.main} ${inter.className}`}>
        <button onClick={toggleTranscribing}>
          {transcribing ? 'stop' : 'start'}
        </button>

        {transcript}
      </main>
    </>
  );
}
