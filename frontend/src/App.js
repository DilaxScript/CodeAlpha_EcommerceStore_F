// frontend/src/App.js

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BannerSection from './components/BannerSection'; 
import CategoryDropdown from './components/CategoryDropdown'; // Assume this component contains the search bar

// Pages
import HomePage from './pages/HomePage'; 
import ProductListPage from './pages/ProductListPage'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import PlaceOrderPage from './pages/PlaceOrderPage'; 
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderDetailsPage from './pages/OrderDetailsPage'; 
import AdminDashboard from './pages/AdminDashboard'; 

// Route Protection Components 
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

// Helper component to conditionally render the Banner
const ConditionalBanner = () => {
    const location = useLocation();
    // Render the banner only if the path is exactly '/'
    return location.pathname === '/' ? <BannerSection /> : null;
};


// Main wrapper component
function AppContent() {
    const location = useLocation();
    
    // Determine if we are on the base Homepage
    const isBaseHomepage = location.pathname === '/'; 
    
    // CRITICAL FIX: Array of paths where the search bar should NOT appear
    const pagesWithoutSearch = [
        '/login', 
        '/register', 
        '/admin/dashboard'
    ];
    
    // Logic to show search/categories only if the current path is NOT in the exclusion array
    const showSearchAndCategories = !pagesWithoutSearch.includes(location.pathname);

    return (
        <>
            <Header />
            
            {/* CRITICAL FIX: Only render CategoryDropdown if showSearchAndCategories is true */}
            {showSearchAndCategories && <CategoryDropdown />} 
            
            {/* Banner renders only when on the base '/' path */}
            {isBaseHomepage && <ConditionalBanner />}

            {/* Apply conditional spacing for the homepage banner */}
            <main className={isBaseHomepage ? 'homepage-content' : ''}>
                <Routes>
                    
                    {/* 1. Base Homepage: Landing Page View */}
                    <Route path='/' element={<HomePage />} /> 
                    
                    {/* 2. List Page */}
                    <Route path='/products' element={<ProductListPage />} /> 
                    
                    {/* Other Public Routes */}
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/product/:id' element={<ProductPage />} />
                    <Route path='/cart' element={<CartPage />} />
                    
                    {/* Private Routes */}
                    <Route path='' element={<PrivateRoute />}>
                        <Route path='/placeorder' element={<PlaceOrderPage />} />
                        <Route path='/orders' element={<OrderHistoryPage />} /> 
                        <Route path='/orders/:id' element={<OrderDetailsPage />} />
                    </Route>

                    {/* Admin Routes */}
                    <Route path='' element={<AdminRoute />}>
                        <Route path='/admin/dashboard' element={<AdminDashboard />} /> 
                    </Route>
                </Routes>
            </main>
            <Footer />
        </>
    );
}

// Final component structure wraps AppContent in Router
function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;