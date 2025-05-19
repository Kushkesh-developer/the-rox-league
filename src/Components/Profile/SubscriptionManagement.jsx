import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/use-toast';

const SubscriptionManagement = () => {
  const { user, userSubscription } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [transactions, setTransactions] = useState([]);
  const [autoRenew, setAutoRenew] = useState(true);
  const [nextBillingDate, setNextBillingDate] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (user) {
      const subscriptionData = localStorage.getItem(`subscription_${user.id}`);
      if (subscriptionData) {
        const subscription = JSON.parse(subscriptionData);
        setAutoRenew(subscription.autoRenew !== false);

        if (subscription.expiryDate) {
          setNextBillingDate(subscription.expiryDate);
        }
      }

      const storedTransactions = JSON.parse(localStorage.getItem('subscription_transactions') || '[]');
      const userTransactions = storedTransactions.filter(
        (transaction) => transaction.userId === user.id
      );

      if (userTransactions.length === 0 && userSubscription && userSubscription !== 'free') {
        const sampleTransaction = {
          id: Math.random().toString(36).substr(2, 9),
          userId: user.id,
          planId: userSubscription,
          planName: userSubscription === 'premium' ? 'Premium Plan' : 'Pro Plan',
          amount: userSubscription === 'premium' ? 19.99 : 49.99,
          status: 'completed',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        };

        const newTransactions = [...storedTransactions, sampleTransaction];
        localStorage.setItem('subscription_transactions', JSON.stringify(newTransactions));
        setTransactions([sampleTransaction]);
      } else {
        setTransactions(userTransactions);
      }
    }
  }, [user, userSubscription]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleAutoRenewal = () => {
    if (user) {
      const subscriptionData = localStorage.getItem(`subscription_${user.id}`);
      if (subscriptionData) {
        const subscription = JSON.parse(subscriptionData);
        subscription.autoRenew = !autoRenew;
        localStorage.setItem(`subscription_${user.id}`, JSON.stringify(subscription));
        setAutoRenew(!autoRenew);

        toast({
          title: autoRenew ? "Auto-renewal disabled" : "Auto-renewal enabled",
          description: autoRenew
            ? "Your subscription will not renew automatically"
            : "Your subscription will renew automatically",
        });
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'failed':
        return 'error';
      case 'refunded':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Subscription Management</Typography>

      {userSubscription && userSubscription !== 'free' ? (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6">
                Current Plan: <strong>{userSubscription.toUpperCase()}</strong>
              </Typography>
              {nextBillingDate && (
                <Typography variant="body2" color="text.secondary">
                  {autoRenew ? 'Next billing date' : 'Expires on'}: {new Date(nextBillingDate).toLocaleDateString()}
                </Typography>
              )}
            </Box>
            <Button
              variant="outlined"
              color={autoRenew ? "error" : "success"}
              onClick={toggleAutoRenewal}
            >
              {autoRenew ? 'Disable Auto-Renewal' : 'Enable Auto-Renewal'}
            </Button>
          </Box>
        </Paper>
      ) : (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            You are currently on the Free plan
          </Typography>
          <Typography variant="body2" paragraph>
            Upgrade to a premium plan to access all features.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/subscription')}
          >
            Upgrade Plan
          </Button>
        </Paper>
      )}

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Transaction History</Typography>
      <Divider sx={{ mb: 2 }} />

      {transactions.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'primary.light' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Transaction ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Plan</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((transaction) => (
                    <TableRow key={transaction.id} hover>
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>{transaction.planName}</TableCell>
                      <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.status}
                          color={getStatusColor(transaction.status)}
                          size="small"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString()} {new Date(transaction.date).toLocaleTimeString()}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={transactions.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No transaction history found.
        </Typography>
      )}
    </Box>
  );
};

export default SubscriptionManagement;
