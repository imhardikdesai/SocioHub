import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import ErrorPage from '../components/common/ErrorPage';
import Login from '../view/auth/Login';
import OnBoarding from '../view/auth/OnBoarding';
import Explore from '../view/home/Explore';
import Home from '../view/home/Home';
import Profile from '../view/home/Profile';
import Setting from '../view/home/Setting';
import PostGallery from '../view/post/PostGallery';
import PrivateRoute from './PrivateRoute';
import PrivateAdmin from './PrivateAdmin';
import Admin from '../admin';
import SocioMap from '../view/home/SocioMap';

const RouteLinks = () => {
    return (
        <>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route exact path='/' element={<Home />} >
                        <Route path='/' element={<Navigate to="/posts" />} />
                        <Route path='/posts' element={<PostGallery />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/profile/:username' element={<Profile />} />
                        <Route path='/explore' element={<Explore />} />
                        <Route path='/socio-map' element={<SocioMap />} />
                        <Route path='/activity' element={<ErrorPage />} />
                        <Route path='/setting' element={<Setting />} />
                        <Route element={<PrivateAdmin />}>
                            <Route exact path="/admin" element={<Admin />} >
                                <Route path="/admin" element={<Navigate to='/dashboard' />} />
                                {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
                            </Route>
                        </Route>
                    </Route>
                </Route>

                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<OnBoarding />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </>
    )
}

export default RouteLinks
