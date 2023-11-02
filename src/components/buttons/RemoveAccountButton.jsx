import { PersonRemoveOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const RemoveAccountButton = ({ style, accountId, onDeleteAccount }) => {
  return (
    <IconButton
      className={style.remove}
      onClick={() => onDeleteAccount(accountId)}
    >
      <PersonRemoveOutlined className={style.icon} />
    </IconButton>
  );
};

export default RemoveAccountButton;
