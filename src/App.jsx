// import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import ProductDetailPage from './pages/ProductDetailPage'
import DashboardPage from './pages/DashboardPage'
import FaqPage from './pages/FaqPage'
import PaymentMethodsPage from './pages/PaymentMethodsPage'
import ReturnsPage from './pages/ReturnsPage'
import ShippingPage from './pages/ShippingPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import CheckoutSuccessPage from './pages/CheckoutSuccessPage'
import ErrorPage from './pages/ErrorPage'
import PrivateRoute from './components/PrivateRoute'
import PATHS from './constants/paths'
import { useEffect } from 'react'
import { handleGetProfile } from './store/reducers/authReducer'
import { handleGetCart } from './store/reducers/cartReducer'
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import tokenMethod from './utils/token'
import AccountDetail from './pages/DashboardPage/AccountDetail'
import ListOrder from './pages/DashboardPage/ListOrder'
import WishList from './pages/DashboardPage/WishList'
import AddressAccount from './pages/DashboardPage/AddressAccount'
import ChangePass from './pages/DashboardPage/ChangePass'
import BlogSinglePage from './pages/BlogSinglePage'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    message.config({
      top: 80,
      duration: 3,
      maxCount: 3,
    });
    if (tokenMethod.get()) {
      dispatch(handleGetProfile());
      dispatch(handleGetCart())
    }
  }, []);

  return (
    // <Suspense fallback={<>Loading</>}> </Suspense>
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={PATHS.PRODUCTS} element={<ProductPage />} />
          <Route path={PATHS.PRODUCTS_DETAIL} element={<ProductDetailPage />} />

          <Route path={PATHS.DASHBOARD} element={<DashboardPage />} />
          <Route path={PATHS.FAQ} element={<FaqPage />} />
          <Route path={PATHS.PAYMENT_METHOD} element={<PaymentMethodsPage />} />
          <Route path={PATHS.RETURN} element={<ReturnsPage />} />
          <Route path={PATHS.SHIPPING} element={<ShippingPage />} />

          <Route path={PATHS.BLOG} element={<BlogPage />} />
          <Route path={PATHS.BLOG_DETAIL} element={<BlogSinglePage />} />

          <Route path={PATHS.CONTACT} element={<ContactPage />} />
          <Route path={PATHS.ABOUT} element={<AboutPage />} />
          <Route path={PATHS.PRIVATE_POLICY} element={<PrivacyPolicyPage />} />
          <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
            <Route path={PATHS.CART} element={<CartPage />} />
            <Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />
            <Route path={PATHS.CHECKOUT_SUCCESS} element={<CheckoutSuccessPage />} />

            <Route path={PATHS.PROFILE.INDEX} element={<DashboardPage />}>
              <Route index element={<AccountDetail />} />
              <Route path={PATHS.PROFILE.PROFILE_ORDER} element={<ListOrder />} />
              <Route path={PATHS.PROFILE.PROFILE_WISHLIST} element={<WishList />} />
              <Route path={PATHS.PROFILE.PROFILE_ADDRESS} element={<AddressAccount />} />
              <Route path={PATHS.PROFILE.PROFILE_CHANGE_PASS} element={<ChangePass />} />
            </Route>

          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>


  )
}

export default App
