import { Card } from '@mui/material';
import RemoveAccountButton from './buttons/RemoveAccountButton';
import {
  AlternateEmail,
  Diversity1Outlined,
  Language,
  LockPersonOutlined,
  WorkOutline,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AccountCard = ({ style, account, onDeleteAccount }) => {
  const { id } = account;
  const navigate = useNavigate();

  const capitalizeWord = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getCategoryIcon = () => {
    switch (account?.category) {
      case 'work':
        return <WorkOutline className={style.icon} />;
      case 'family':
        return <Diversity1Outlined className={style.icon} />;
      case 'personal':
        return <LockPersonOutlined className={style.icon} />;
      default:
        return <WorkOutline className={style.icon} />;
    }
  };

  return (
    <div className={style.card_container}>
      <Card className={style.card} onClick={() => navigate(`/details/${id}`)}>
        <div className={style.header}>
          <div className={style.title}>
            {getCategoryIcon()}{' '}
            <p>{capitalizeWord(account?.category)} Account</p>
          </div>
        </div>
        <div className={style.container}>
          <div className={style.avatar}>
            {account?.provider[0].toUpperCase()}
          </div>
          <div>
            <div className={style.data}>
              <Language sx={{ color: '#99dbc4' }} /> <p>{account?.provider}</p>
            </div>
            <div className={style.data}>
              <AlternateEmail /> <p>{account?.email}</p>
            </div>
          </div>
        </div>
      </Card>
      <RemoveAccountButton
        style={style}
        accountId={account?.id}
        onDeleteAccount={onDeleteAccount}
      />
    </div>
  );
};

export default AccountCard;
