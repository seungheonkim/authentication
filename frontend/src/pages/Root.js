import {Outlet, useLoaderData, useSubmit} from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import {useEffect} from "react";
import {getTokenDuration} from "../util/auth";

function RootLayout() {
    const token = useLoaderData();
    const submit = useSubmit();

    useEffect(() => {
        if(!token) {
            return;
        }

        if(token === 'EXPIRED') {
            submit(null, {action: '/logout', method: 'post'})//1시간 뒤에 자동 로그아웃
            return;
        }

        const tokenDuration = getTokenDuration();

        setTimeout(() => {
            submit(null, {action: '/logout', method: 'post'})//1시간 뒤에 자동 로그아웃
        }, tokenDuration);//1hour expiration
    }, [token, submit]);

    return (
        <>
            <MainNavigation/>
            <main>
                {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
                <Outlet/>
            </main>
        </>
    );
}

export default RootLayout;
