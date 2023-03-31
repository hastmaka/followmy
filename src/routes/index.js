import {useRoutes} from 'react-router-dom';
import Home from '../section/Home';
import Layout from "../layout/Layout";
import UberAndLyft from "../section/table/uberAndLyft/UberAndLyft";
import Login from "../section/login/Login";
import Test from "../section/test/Test";

export default function Router() {
    return useRoutes([
        {
            path: '/',
            element: <Layout/>,
            children: [{
                index: true,
                element: <UberAndLyft/>
            }, {
                path: '/test',
                element: <Test/>
            }]
        }
    ])
}