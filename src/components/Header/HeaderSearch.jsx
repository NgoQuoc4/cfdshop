import React from 'react'

const HeaderSearch = () => {
    return (
        <div className="header-search">
            <a href="#" className="search-toggle" role="button" title="Search">
                <i className="icon-search" />
            </a>
            <form action="#" method="get">
                <div className="header-search-wrapper">
                    <label htmlFor="q" className="sr-only">Search</label>
                    <input type="search" className="form-control" name="q" id="q" placeholder="Search in..." required />
                </div>
            </form>
        </div>
    )
}

export default HeaderSearch