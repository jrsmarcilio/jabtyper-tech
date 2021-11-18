import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import { IUserInfo } from '../../utils/Types';
import { UserList } from '../../utils/Lists';

export default function Ranking() {
  const [userList, setUserList] = useState<IUserInfo[]>([]);

  useEffect(() => {
    const userListSort = UserList.filter((user: IUserInfo) => user.wps > 0).sort((a, b) => b.wps - a.wps);
    setUserList(userListSort);
  }, [])

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
            {userList.map((user, index) => (
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
          </tbody>
        </table>
      </section>
    </div>
  );
}