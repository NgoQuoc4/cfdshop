import React from 'react'
import cn from '../../utils/cn'

const ThumbHero = ({ page, des, banner }) => {
    return (
        <div className="container">
            <div className={cn("page-header text-center", { "page-header-big": banner })} style={{ backgroundImage: `url(" assets/images/page-header-bg.jpg")` }}>
                <h1 className="page-title text-white">{page || ""} <span className="text-white">{des || ""}</span>
                </h1>
            </div>

            <div className="page-header text-center" style={{ backgroundImage: 'url("/assets/images/page-header-bg.jpg")' }}>
                <div className="container">
                    <h1 className="page-title">Product</h1>
                </div>
            </div>
        </div >
    )
}
export default ThumbHero