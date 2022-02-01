import IRoute from "../interfaces/route.interface";
// import SignUpPage from "../pages/auth/SignUp";
// import CartPage from "../pages/CartPage";
import HomePage from "../pages/HomePage";
import LogInPage from "../pages/LoginPage";

const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: HomePage,
        name: 'Home Page',
        protected: true
    },
    {
        path: '/thread',
        exact: true,
        component: HomePage,
        name: 'Home Page',
        protected: true
    },
    {
        path: '/auth/login',
        exact: true,
        component: LogInPage,
        name: 'Login Page',
        protected: false
    },

];
export default routes;
