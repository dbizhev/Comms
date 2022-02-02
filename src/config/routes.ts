import IRoute from "../interfaces/route.interface";
import AddChannel from "../pages/AddChannel";
import Channel from "../pages/Channel";
import HomePage from "../pages/HomePage";
import InboxPage from "../pages/Inbox";
import LogInPage from "../pages/LoginPage";
import PostChannel from "../pages/PostChannel";
import PostReply from "../pages/PostReply";

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
        name: 'Add Channel',
        protected: true
    },
    {
        path: '/channel/:channel_id/:name',
        exact: true,
        component: Channel,
        name: 'Channel',
        protected: true
    },
    {
        path: '/channel/:channel_id/:name/post',
        exact: true,
        component: PostChannel,
        name: 'Post Channel',
        protected: true
    },
    {
        path: '/channel/:channel_id/:post_id/:post_name/comments',
        exact: true,
        component: PostReply,
        name: 'Post Channel',
        protected: true
    },
    {
        path: '/inbox',
        exact: true,
        component: InboxPage,
        name: 'Inbox',
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
