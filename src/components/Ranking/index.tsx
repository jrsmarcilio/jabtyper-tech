import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import { IUserInfo } from '../../utils/Types';

export default function Ranking() {
  const [ranking, setRanking] = useState<IUserInfo[]>([]);

  useEffect(() => {
    async function fetchRanking() {
      const response = await fetch('/ranking');
      const data = await response.json();
      const sortData = data.filter((user: IUserInfo) => user.wps > 0).sort((a: { wps: number; }, b: { wps: number; }) => b.wps - a.wps);
      setRanking(sortData);
    }
    fetchRanking();
  }, [ranking]);

  return (
    <div className={styles.container}>
      <section className={styles.card} style={{ width: '100%' }}>
        <h2>Ranking</h2>
        <table className={styles.table} style={{ width: '100%' }}>
          <thead>
            <tr className={styles.tableHeader}>
              <th>&nbsp;&nbsp;#&nbsp;&nbsp;</th>
              <th>Name</th>
              <th>WPS</th>
            </tr>
          </thead>
          <tbody>
            <>
              {ranking.length === 0 && (
                <tr>
                  <td colSpan={3}>
                    <p>Nenhum registro</p>
                  </td>
                </tr>
              )}

              {ranking && ranking.map((user, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td>{index + 1}</td>
                  <td className={styles.name}>
                    <Link href={`https://github.com/${user.name}`}>
                      <a target="_blank">{user.name}</a>
                    </Link>
                  </td>
                  <td>{user.wps}</td>
                </tr>
              ))}
            </>
          </tbody>
        </table>
      </section>
    </div>
  );
}