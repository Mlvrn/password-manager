import style from '../styles/style.module.scss';
import Navbar from '../components/Navbar';
import AccountCard from '../components/AccountCard';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import AddAccountButton from '../components/buttons/AddAccountButton';
import { useEffect, useState } from 'react';
import { callApi } from '../domain/api';
import { Link, useLocation } from 'react-router-dom';
import { PersonRemoveOutlined } from '@mui/icons-material';

const MainPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const categories = ['All', 'Personal', 'Work', 'Family'];

  const location = useLocation();
  const category = location.pathname.substring(1);

  const onAddAccount = (newAccount) => {
    setAccounts([...accounts, newAccount]);
  };

  const onDeleteAccount = async (accountId) => {
    setSelectedAccountId(accountId);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await callApi({
        endpoint: `/password/${selectedAccountId}`,
        method: 'DELETE',
      });

      setAccounts(
        accounts.filter((account) => account.id !== selectedAccountId)
      );
    } catch (error) {
      console.error('Error deleting account:', error);
    }
    setDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    const getAccounts = async () => {
      const data = await callApi({
        endpoint: '/password',
        method: 'GET',
      });
      setAccounts(data);
    };
    getAccounts();
  }, [location]);

  const handleCategoryChange = (category) => {
    return category === 'All' ? '/' : `/${category.toLowerCase()}`;
  };

  const filterAccountsByCategory = (category) => {
    if (category === '') {
      return accounts;
    } else {
      return accounts.filter((account) => account.category === category);
    }
  };

  const filteredAccounts = filterAccountsByCategory(category);

  return (
    <div>
      <Navbar style={style} />
      <Container>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>
              <Link
                to={handleCategoryChange(category)}
                className={
                  (location.pathname === '/' && category === 'All') ||
                  location.pathname === `/${category.toLowerCase()}`
                    ? style.active
                    : ''
                }
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
        <Grid container spacing={6} className={style.grid}>
          {filteredAccounts.map((account) => (
            <Grid item xs={12} sm={6} lg={4} key={account.id}>
              <AccountCard
                style={style}
                account={account}
                onDeleteAccount={onDeleteAccount}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} lg={4}>
            <AddAccountButton style={style} onAddAccount={onAddAccount} />
          </Grid>
        </Grid>
      </Container>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        className={style.dialog}
      >
        <DialogTitle>Account Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this account?
        </DialogContent>
        <DialogActions>
          <button onClick={handleCancelDelete} className={style.cancel}>
            Cancel
          </button>
          <button onClick={handleConfirmDelete} className={style.add}>
            <PersonRemoveOutlined /> Delete
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MainPage;
