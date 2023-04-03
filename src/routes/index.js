import {useRoutes} from 'react-router-dom';
import Layout from "../layout/Layout";
import Test from "../section/test/Test";
import {lazy, Suspense} from "react";
//dynamic import
const UberAndLyft = lazy(() => import('../section/table/uberAndLyft/UberAndLyft'))
const Personal = lazy(() => import('../section/table/personal/Personal'))

const FallBack = () => {
    return <div>Loading...</div>
}

export default function Router() {
    const user = JSON.parse(localStorage.getItem('user'))
    const children = [];

    if(user.selectedValue === 'uber_and_lyft') {
        children.push({
            path: 'uber_and_lyft',
            element: <Suspense fallback={<FallBack/>}><UberAndLyft/></Suspense>
        })
    }

    if(user.selectedValue === 'personal') {
        children.push({
            path: 'personal',
            element: <Suspense fallback={<FallBack/>}><Personal/></Suspense>
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