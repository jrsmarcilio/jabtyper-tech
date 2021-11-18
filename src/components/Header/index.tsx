import styles from '../../styles/Home.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                JabTyper<a target="_blank" href="https://github.com/jrsmarcilio/jabtyper-tech">.tech</a>
            </h1>

            <p className={styles.description}>
                Simple typing game with JavaScript.
        </p>
        </header>
    );
}