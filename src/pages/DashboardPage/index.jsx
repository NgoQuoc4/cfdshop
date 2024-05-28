import React from 'react'
import ThumbHero from '../../components/ThumbHero'
import BreadCrumb from '../../components/BreadCrumb'
import { Link, Outlet } from 'react-router-dom';
import PATHS from '../../constants/paths';
import NavAccount from './NavAccount';

const DashboardPage = () => {

    return (
        <main className="main">
            <ThumbHero />
            <BreadCrumb>
                <BreadCrumb.Item>
                    <Link to={PATHS.HOME}>Home</Link>
                </BreadCrumb.Item>
                <BreadCrumb.Item isActive>My Account</BreadCrumb.Item>
            </BreadCrumb>
            <div className="page-content">
                <div className="dashboard">
                    <div className="container">
                        <div className="row">
                            <NavAccount />
                            <div className="col-md-8 col-lg-9">
                                <div className="tab-content">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default DashboardPage