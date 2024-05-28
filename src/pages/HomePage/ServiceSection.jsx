import React from 'react'

const ServiceSection = ({ services }) => {
    const { shipping, return: returnService, sale, support } = services || {};
    return (
        <div className="icon-boxes-container mt-2 mb-2 bg-transparent">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-lg-3">
                        <div className="icon-box icon-box-side">
                            <span className="icon-box-icon text-dark">
                                <i className="icon-rocket" />
                            </span>
                            <div className="icon-box-content">
                                <h3 className="icon-box-title">{shipping?.title || ""}</h3>
                                <p>{shipping?.description || ""}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="icon-box icon-box-side">
                            <span className="icon-box-icon text-dark">
                                <i className="icon-rotate-left" />
                            </span>
                            <div className="icon-box-content">
                                <h3 className="icon-box-title">{returnService?.title || ""}</h3>
                                <p>{returnService?.description || ""}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="icon-box icon-box-side">
                            <span className="icon-box-icon text-dark">
                                <i className="icon-info-circle" />
                            </span>
                            <div className="icon-box-content">
                                <h3 className="icon-box-title">{sale?.title || ""}</h3>
                                <p>{sale?.description || ""}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="icon-box icon-box-side">
                            <span className="icon-box-icon text-dark">
                                <i className="icon-life-ring" />
                            </span>
                            <div className="icon-box-content">
                                <h3 className="icon-box-title">{support?.title || ""}</h3>
                                <p>{support?.description || ""}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceSection