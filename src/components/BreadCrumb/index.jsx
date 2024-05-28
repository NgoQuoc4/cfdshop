import React from 'react'

const BreadCrumb = ({ className, children }) => {
    // border-0 mb-0
    return (
        <nav aria-label="breadcrumb" className={`breadcrumb-nav  ${className} `}>
            <div className="container">
                <ol className="breadcrumb">{children}</ol>
            </div>
        </nav>
    )
}

const BreadCrumbItem = ({ children, isActive = false }) => {
    return (
        <li className={`breadcrumb-item ${isActive ? "active" : ""}`}>
            {children}
        </li>
    );
}

BreadCrumb.Item = BreadCrumbItem;

export default BreadCrumb