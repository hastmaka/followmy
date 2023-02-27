import {useRoutes} from 'react-router-dom';
import Home from '../section/Home';


export default function Router() {
    return useRoutes([{
        path: '/',
        element: <Home/>
    }, {
        index: true,
        element: <Home/>
    }])
}