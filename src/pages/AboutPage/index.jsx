import React from 'react'
import BreadCrumb from '../../components/BreadCrumb'
import ThumbHero from '../../components/ThumbHero'
import ContentSection from './ContentSection'
import PATHS from '../../constants/paths'
import { Link } from 'react-router-dom'
import useQuery from '../../hooks/useQuery'
import { pageService } from '../../services/pageService'
import useHomePage from '../HomePage/useHomePage'
const AboutPage = () => {
    const { data: aboutData } = useQuery(() => pageService.getPageDataByName("about us"))
    const aboutProps = aboutData?.data || {};
    const aboutBanner = aboutData?.data?.banner || "";
    const { brandProps } = useHomePage();

    return (
        <main className="main">
            <BreadCrumb>
                <BreadCrumb.Item>
                    <Link to={PATHS.HOME}>Home</Link>
                </BreadCrumb.Item>
                <BreadCrumb.Item isActive>About Us</BreadCrumb.Item>
            </BreadCrumb>
            <div className="container">
                <div className="page-header page-header-big text-center" style={{ backgroundImage: 'url("assets/images/about-header-bg.jpg")' }}>
                    <h1 className="page-title text-white">About us <span className="text-white">Who we are</span>
                    </h1>
                </div>
            </div>
            <ContentSection brandProps={brandProps}{...aboutProps} />
        </main>

    )
}

export default AboutPage