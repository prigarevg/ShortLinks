import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/AccountForm.module.css";
export const LinksList = ({ links }) => {
  if (!links.length) {
    return <p className="center">No links yet!</p>;
  }

  return (
    <div class={styles.links}>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Оригинальная ссылка</th>
            <th>Укороченная ссылка</th>
          </tr>
        </thead>

        <tbody>
          {links.map((link, index) => {
            return (
              <tr key={link._id}>
                <td>{index + 1}</td>
                <td>{link.from}</td>
                <td>{link.to}</td>
                <td>{<Link to={`/detail/${link._id}`}>Открыть</Link>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
