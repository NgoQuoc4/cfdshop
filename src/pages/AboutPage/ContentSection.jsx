import React from 'react'
const ContentSection = ({ brandProps, ...aboutProps }) => {
    const {
        title1,
        title2,
        title3,
        titleBrand,
        description1,
        description2,
        description3,
        descriptionBrand,
        image1,
        image2
    } = aboutProps || {};
    console.log(brandProps)
    const brands = brandProps?.brands || [];
    return (
        <div className="page-content pb-0">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mb-3 mb-lg-0">
                        <h2 className="title">{title1 || ""}</h2>
                        <p>{description1 || ""}</p>
                    </div>
                    <div className="col-lg-6">
                        <h2 className="title">{title2 || ""}</h2>
                        <p> {description2 || ""}</p>
                    </div>
                </div>
                <div className="mb-5" />
            </div>
            <div className="bg-light-2 pt-6 pb-5 mb-6 mb-lg-8">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 mb-3 mb-lg-0">
                            <h2 className="title">{title3 || ""}</h2>
                            <p className="lead text-primary mb-3"> Pellentesque odio nisi, euismod pharetra a ultricies <br /> in diam. Sed arcu. Cras consequat </p>
                            <p className="mb-2"> {description3 || ""} </p>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <div className="about-images">
                                <img src={image1 || ""} alt className="about-img-front" />
                                <img src={image2 || ""} alt className="about-img-back" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="brands-text">
                            <h2 className="title">{titleBrand || ""}</h2>
                            <p>{descriptionBrand || ""}</p>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="brands-display">
                            <div className="row justify-content-center">
                                {brands?.map((brand, index) => {
                                    return (
                                        <div key={index} className="col-6 col-sm-4">
                                            <a href="#" className="brand">
                                                <img src={brand || ""} alt="Brand Name" />
                                            </a>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-2" />
        </div>
    )
}
export default ContentSection