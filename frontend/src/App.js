
import { Container } from 'react-bootstrap';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import {HashRouter as Router,Routes , Route} from 'react-router-dom';
import Cart from './pages/Cart';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlacedOrderPage from './pages/PlacedOrderPage';
import OrderDonePage from './pages/OrderDonePage';
import OrderPage from './pages/OrderPage';
import UsersListPage from './pages/UsersListPage';
import UserEditPage from './pages/UserEditPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';

function App() {
  return (
    <Router>
      <Header/>
      <main className="py-2">
        <Container>
          <Routes>
            <Route path='/' element={<HomePage/>} exact />
            <Route path='/product/:id' element={<ProductPage />}  />
            <Route path='/cart' element={<Cart />}  />
            <Route path='/cart/:id' element={<Cart />}  />
            {/* <Route path='/cart' element={<Cart />}  >
              <Route path=':id' element={<Cart />}  />
            </Route> */}
            
            <Route path='/login' element={<LoginPage />}  />
            <Route path='/register' element={<RegisterPage />}  />
            <Route path='/profile' element={<ProfilePage />}  />
            <Route path='/shipping' element={<ShippingPage />}  />
            <Route path='/payment' element={<PaymentPage />}  />
            <Route path='/placeorder' element={<PlacedOrderPage />}  />
            <Route path='/orderdone' element={<OrderDonePage/>} />
            <Route path='/order/:id' element={<OrderPage />}  /> 

            <Route path='/admin/userslist' element={<UsersListPage/>} />
            <Route path='/admin/user/:id/edit' element={<UserEditPage/>} />
            <Route path='/admin/productlist' element={<ProductListPage/>} />
            <Route path='/admin/products/:id/edit' element={<ProductEditPage/>} />
            <Route path='/admin/orderlist' element={<OrderListPage/>} />



          </Routes>  
        </Container>
      </main>
      <Footer/>
    </Router>


    // <div>
    //   <Header/>
    //   <main className="py-3">
    //     <Container>
    //       <HomePage/>
    //     </Container>
    //   </main>
    //   <Footer/>
    // </div>
  );
}

export default App;
