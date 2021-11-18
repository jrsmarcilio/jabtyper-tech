import styles from '../../styles/Home.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <a
                href="https://github.com/jrsmarcilio/jabtyper-tech"
                target="_blank"
                rel="noopener noreferrer"
            >
                Developed by{' '}
                <span className={styles.dev}>Marcílio Júnior</span>
            </a>
        </footer>
    );
}