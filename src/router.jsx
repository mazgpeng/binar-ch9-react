import { createBrowserRouter } from 'react-router-dom'
import ContentHome from './pages/ContentHome';
import ContentGames from './pages/ContentGames';
import ContentLogin from './pages/ContentLogin';
import ContentRegister from './pages/ContentRegister';

import Navsbar from './navbar/Navsbar.jsx';

const Router = createBrowserRouter([

    {
        element: <Navsbar />,
        children: [
            {
                path: '/home',
                element: <ContentHome />

            },
            {
                path: '/games',
                element: <ContentGames />

            },
            {
                path: '/login',
                element: <ContentLogin />

            },
            {
                path: '/register',
                element: <ContentRegister />

            },

        ]
    }
])


export default Router;