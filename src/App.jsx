import { Route, Routes, useNavigate } from 'react-router-dom';
import { lazy, useEffect } from 'react';

// import SharedLayout from './components/SharedLayout/SharedLayout.jsx';
import { Toaster } from 'react-hot-toast';

import { GlobalStyles } from './styles/GlobalStyles.js';
// import NoConnect from './pages/NoConnect/NoConnect.jsx';
import { PrivateRoute } from './PrivateRoute.jsx';
import { useAccount } from 'wagmi';
const SharedLayout = lazy(() => import('./components/SharedLayout/SharedLayout.jsx'));
const NoConnect = lazy(() => import('./pages/NoConnect/NoConnect.jsx'));
const Stake = lazy(() => import('./pages/Stake/Stake.jsx'));
const Withdraw = lazy(() => import('./pages/Withdraw/Withdraw.jsx'));
const ClaimRewards = lazy(() => import('./pages/ClaimRewards/ClaimRewards.jsx'));
const Page404 = lazy(() => import('./pages/404Page/404Page.jsx'));

function App() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          duration: 2000,
          style: {
            background: 'rgb(250, 250, 250)',
            color: 'rgb(30, 31, 40)',
          },
        }}
      />
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<PrivateRoute component={<Stake />} redirectTo="/no_connect" />} />
          <Route path="/no_connect" element={<NoConnect />} />
          <Route path="withdraw" element={<PrivateRoute component={<Withdraw />} redirectTo="/no_connect" />} />
          <Route path="claim" element={<PrivateRoute component={<ClaimRewards />} redirectTo="/no_connect" />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
