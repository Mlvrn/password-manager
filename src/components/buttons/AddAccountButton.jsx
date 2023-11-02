import {
  AlternateEmail,
  KeyOutlined,
  Language,
  PersonAddOutlined,
  SupervisorAccountOutlined,
} from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import { callApi } from '../../domain/api';
import { useState } from 'react';

const AddAccountButton = ({ style, onAddAccount }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({
    provider: '',
    email: '',
    password: '',
    category: 'personal',
  });

  const [errors, setErrors] = useState({
    provider: false,
    email: false,
    password: false,
  });

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setErrors({
      provider: false,
      email: false,
      password: false,
    });
    setNewAccount({
      provider: '',
      email: '',
      password: '',
      category: 'personal',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAccount({ ...newAccount, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleAddAccount = async () => {
    const validationErrors = {};
    if (!newAccount.provider) {
      validationErrors.provider = true;
    }
    if (!newAccount.email) {
      validationErrors.email = true;
    }
    if (!newAccount.password || newAccount.password.length < 6) {
      validationErrors.password = true;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await callApi({
        endpoint: '/password',
        method: 'POST',
        data: newAccount,
      });

      onAddAccount(response);
      handleCloseDialog();
    } catch (error) {
      console.error('Error adding account:', error);
    }
  };

  return (
    <div>
      <button
        className={style.add_button}
        role="button"
        onClick={handleOpenDialog}
      >
        <PersonAddOutlined className={style.icon} />
      </button>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        className={style.dialog}
      >
        <DialogTitle>Add New Account</DialogTitle>
        <DialogContent className={style.content}>
          <div className={style.container}>
            <div className={style.item}>
              <Language className={style.icon} />
              <TextField
                fullWidth
                name="provider"
                label="Provider"
                value={newAccount.provider}
                onChange={handleInputChange}
                error={errors.provider}
                helperText={errors.provider ? 'This field is required' : ''}
                className={style.field}
              />
            </div>
            <div className={style.item}>
              <AlternateEmail className={style.icon} />
              <TextField
                fullWidth
                name="email"
                label="Email"
                value={newAccount.email}
                onChange={handleInputChange}
                error={errors.email}
                helperText={errors.email ? 'This field is required' : ''}
                className={style.field}
              />
            </div>
            <div className={style.item}>
              <KeyOutlined className={style.icon} />
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={newAccount.password}
                onChange={handleInputChange}
                error={errors.password}
                helperText={
                  errors.password
                    ? 'Password must be at least 6 characters'
                    : ''
                }
                className={style.field}
              />
            </div>
            <div className={style.item}>
              <SupervisorAccountOutlined className={style.icon} />
              <FormControl className={style.field} fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={newAccount.category}
                  label="Category"
                  onChange={handleInputChange}
                >
                  <MenuItem value="work">Work</MenuItem>
                  <MenuItem value="personal">Personal</MenuItem>
                  <MenuItem value="family">Family</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button onClick={handleCloseDialog} className={style.cancel}>
            Cancel
          </button>
          <button onClick={handleAddAccount} className={style.add}>
            <PersonAddOutlined /> Add
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddAccountButton;
