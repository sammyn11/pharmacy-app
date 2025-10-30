import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './ui/RootLayout';
import { Home } from './views/Home';
import { Pharmacies } from './views/Pharmacies';
import { PharmacyDetail } from './views/PharmacyDetail';
import { Cart } from './views/Cart';
import { Checkout } from './views/Checkout';
import { Prescription } from './views/Prescription';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'pharmacies', element: <Pharmacies /> },
      { path: 'pharmacies/:id', element: <PharmacyDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'prescription', element: <Prescription /> }
    ]
  }
]);


