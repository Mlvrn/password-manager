import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { callApi } from '../domain/api';
import Navbar from '../components/Navbar';
import { Card, IconButton } from '@mui/material';
import style from '../styles/style.module.scss';
import {
  AlternateEmail,
  Key,
  SupervisorAccountOutlined,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

const DetailsPage = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const capitalizeWord = (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  };

  useEffect(() => {
    const getAccountById = async () => {
      const data = await callApi({
        endpoint: `/password/${id}`,
        method: 'GET',
      });
      setAccount(data);
      console.log(data);
    };
    getAccountById();
  }, []);

  return (
    <div>
      <Navbar style={style} />
      <div className={style.details_layout}>
        <Card className={style.card}>
          <div className={style.header}>
            <div className={style.avatar}>
              {account?.provider[0].toUpperCase()}
            </div>
            <p>{account?.provider}</p>
          </div>
          <div className={style.details_container}>
            <div className={style.details_item}>
              <AlternateEmail className={style.icon} />
              <div className={style.details}>
                <p className={style.label}>Email</p>
                <p className={style.value}>{account?.email}</p>
              </div>
            </div>
            <div className={style.password}>
              <div className={style.details_item}>
                <Key className={style.icon} />
                <div className={style.details}>
                  <p className={style.label}>Password</p>

                  <p className={style.value}>
                    {showPassword ? account?.password : '••••••••'}
                  </p>
                </div>
              </div>
              <IconButton
                className={style.icon_button}
                onMouseUp={togglePasswordVisibility}
                onMouseDown={togglePasswordVisibility}
              >
                {showPassword ? (
                  <VisibilityOff className={style.eye_icon} />
                ) : (
                  <Visibility className={style.eye_icon} />
                )}
              </IconButton>
            </div>
            <div className={style.details_item}>
              <SupervisorAccountOutlined className={style.icon} />
              <div className={style.details}>
                <p className={style.label}>Account Type</p>
                <p className={style.value}>
                  {capitalizeWord(account?.category)}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DetailsPage;
