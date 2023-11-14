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
  const [transcriberStarted, setTranscriberStarted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [soundStarted, setSoundStarted] = useState(false);
  const [speechStarted, setSpeechStarted] = useState(false);

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

      recognition.current.addEventListener('start', () => {
        setTranscriberStarted(true);
      });
      recognition.current.addEventListener('audiostart', () => {
        setAudioStarted(true);
      });
      recognition.current.addEventListener('soundstart', () => {
        setSoundStarted(true);
      });
      recognition.current.addEventListener('speechstart', () => {
        setSpeechStarted(true);
      });

      recognition.current.addEventListener('end', () => {
        setTranscriberStarted(false);
      });
      recognition.current.addEventListener('audioend', () => {
        setAudioStarted(false);
      });
      recognition.current.addEventListener('soundend', () => {
        setSoundStarted(false);
      });
      recognition.current.addEventListener('speechend', () => {
        setSpeechStarted(false);
      });

      [
        'audiostart',
        'audioend',
        'end',
        'error',
        'nomatch',
        'result',
        'soundend',
        'soundstart',
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
        <table>
          <tbody>
            <tr>
              <th style={{ textAlign: 'start' }}>Transcriber</th>
              <td>{transcriberStarted ? '🟢' : '🔴'}</td>
            </tr>
            <tr>
              <th style={{ textAlign: 'start' }}>Audio</th>
              <td>{audioStarted ? '🟢' : '🔴'}</td>
            </tr>
            <tr>
              <th style={{ textAlign: 'start' }}>Sound</th>
              <td>{soundStarted ? '🟢' : '🔴'}</td>
            </tr>
            <tr>
              <th style={{ textAlign: 'start' }}>Speech</th>
              <td>{speechStarted ? '🟢' : '🔴'}</td>
            </tr>
          </tbody>
        </table>

        <button onClick={toggleTranscribing}>
          {transcribing ? 'stop' : 'start'}
        </button>

        {transcript}
      </main>
    </>
  );
}
