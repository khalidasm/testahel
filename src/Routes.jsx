import React from 'react'
import { Route, Routes } from 'react-router'
import Login from './components/Login/Login'
import { useCookies } from 'react-cookie';
import Home from './Home';

const RoutesRender = () => {
    const [cookies, setCookie] = useCookies(['user']);
    return (
        <Routes>
     {cookies.user_info ? <Route index element={<Home />} /> :  <Route index element={<Login />} /> }
        </Routes>
    )
}

export default RoutesRender
