import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import styles from "../styles/AccountForm.module.css";

export const CoordinatesList = ({ coordinates }) => {
  if (!coordinates.length) {
    return <p className="center">No coordinates yet!</p>;
  }

  return (
    <div class={styles.analysis}>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Широта</th>
            <th>Долгота</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {coordinates.map((coordinate, index) => {
            return (
              <tr key={coordinate._id}>
                <td>{index + 1}</td>
                <td>{coordinate.lat}</td>
                <td>{coordinate.lng}</td>

                <td>
                  {
                    <Link to={`/coordinatesDetail/${coordinate._id}`}>
                      Показать на карте
                    </Link>
                  }
                </td>
                <div
                  style={{
                    marginLeft: "30px",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                >
                  <Link to={`/weather/${coordinate._id}`}>
                    <Button>Погода</Button>
                  </Link>
                </div>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
