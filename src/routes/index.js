import {useSelector} from "react-redux";
import {useRoutes} from 'react-router-dom';
import Layout from "../layout/Layout";
import UberAndLyft from "../section/table/uberAndLyft/UberAndLyft";
import Test from "../section/test/Test";
import Personal from "../section/table/personal/Personal";

export default function Router() {
    const user = JSON.parse(localStorage.getItem('user'))
    const children = [];

    if(user.selectedValue === 'uber_and_lyft') {
        children.push({
            path: 'uber_and_lyft',
            element: <UberAndLyft/>
        })
    }

    if(user.selectedValue === 'personal') {
        children.push({
            path: 'personal',
            element: <Personal/>
        })
    }

    return useRoutes([{
        path: '/',
        element: <Layout/>,
        children: [...children]
    }, {
        path: '/test',
        element: <Test/>
    }, {
        path: '*',
        element: <div>Route doesnt exist</div>
    }])
}