import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

import { SharedLayout } from './components/SharedLayout/SharedLayout.jsx';
import { Toaster } from 'react-hot-toast';

import { GlobalStyles } from './styles/GlobalStyles.js';

const Stake = lazy(() => import('./pages/Stake/Stake.jsx'));
const Withdraw = lazy(() => import('./pages/Withdraw/Withdraw.jsx'));
const ClaimRewards = lazy(() => import('./pages/ClaimRewards/ClaimRewards.jsx'));
const Page404 = lazy(() => import('./pages/404Page/404Page.jsx'));

function App() {
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
          <Route index element={<Stake />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="claim" element={<ClaimRewards />} />

          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
