import React, { useContext, useState } from "react";
import { Form, Input, Button } from "antd";
import styles from "../styles/AccountForm.module.css";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import {message} from 'antd'

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const { loading, request} = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("api/auth/register", "POST", { ...form });
      message.success('Пользователь создан');
    } catch (e) {
      message.error(e.message);

    }
  };

  const loginHandler = async () => {
    try {
      const data = await request("api/auth/login", "POST", { ...form });
      auth.login(data.token, data.usetId);
      console.log(data)
      message.success('Успешно!');
    } catch (e) {
      message.error('Некорректные данные');
    }
  };

  return (
    <div className={styles.root}>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input
          placeholder="Введите email"
          id="email"
          name="email"
          type="text"
          value={form.email}
          onChange={changeHandler}
        />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          placeholder="Введите пароль"
          id="password"
          name="password"
          type="text"
          value={form.password}
          onChange={changeHandler}
        />
      </Form.Item>
      <div >
      <Button type="primary" onClick={loginHandler} disabled={loading}>
        Войти
      </Button>
      <Button onClick={registerHandler} disabled={loading}>
        Регистрация
      </Button>
      </div>
    </div>
  );
};
