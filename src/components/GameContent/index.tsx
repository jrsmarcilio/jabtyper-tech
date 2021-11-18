import { useEffect, useState } from 'react';
import ModalSaveProgress from '../ModalSaveProgress';
import styles from '../../styles/Home.module.css';
import { IPhrases } from '../../utils/Types';
import { PhraseList } from '../../utils/Lists';

export default function GameContent() {
  const [phraseInfor, setPhraseInfor] = useState<IPhrases>();
  const [quantsWords, setQuantsWords] = useState<number>(0);
  const [initialGame, setInicialGame] = useState<boolean>(false);
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(20);
  const [wordsPerSecond, setWordsPerSecond] = useState<number>(0);

  const handleStart = () => setInicialGame(true);

  const handleReset = () => {
    setTimer(20);
    setInicialGame(false);
    setTextareaValue("");
    setShowModal(false);
  };

  const correctWordTester = () => {
    let wps = 0;
    if (timer > 0) {
      textareaValue.split(' ').forEach((word: string, index: number) => {
        if (word === phraseInfor?.text.split(' ')[index]) wps += 1;
      });
      return setWordsPerSecond(wps);
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
    correctWordTester();
    console.log(wordsPerSecond);
  }

  useEffect(() => {
    if (initialGame && timer > 0) {
      const interval = setInterval(() => setTimer(timer => timer - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) setShowModal(true);
  }, [timer, initialGame]);

  useEffect(() => {
    const randomphrase = PhraseList[Math.floor(Math.random() * PhraseList.length)]
    setPhraseInfor(randomphrase);
    setQuantsWords(randomphrase.text.split(' ').length);
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.flexRow}>
          <section className={styles.card}>
            <p>Quantity of words</p>
            <h2>{quantsWords} words</h2>
          </section>
          <section className={styles.card}>
            <p>Remaining</p>
            <h2>{timer} seconds</h2>
            {initialGame && (
              <span
                onClick={handleReset}
                className={styles.restart}>
                {timer > 0 ? 'Reset' : 'Restart'}
              </span>
            )}
          </section>
        </div>
        <section className={styles.card} style={{ width: '100%' }}>
          <h5 className={styles.phrase}>{phraseInfor?.text}</h5>
          <p className={styles.author}> - {phraseInfor?.author}</p>
        </section>
        <textarea
          placeholder="Type here..."
          rows={quantsWords / 11}
          readOnly={timer > 0 ? false : true}
          className={styles.textarea}
          value={textareaValue}
          onFocus={handleStart}
          onChange={handleTextAreaChange}
        />
        {showModal && (
          <ModalSaveProgress show={showModal} wps={20 / wordsPerSecond} />
        )}
      </main>
    </div>
  );
}