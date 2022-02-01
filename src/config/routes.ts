import IRoute from "../interfaces/route.interface";
import AddChannel from "../pages/AddChannel";
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
        path: '/add-channel',
        exact: true,
        component: AddChannel,
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
