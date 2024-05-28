import React from 'react'

const Accordion = () => {
    return (
        <>
            <h2 className="title text-center mb-3">Orders and Returns</h2>
            <div className="accordion accordion-rounded" id="accordion-2">
                <div className="card card-box card-sm bg-light">
                    <div className="card-header" id="heading2-1">
                        <h2 className="card-title">
                            <a className="collapsed" role="button" data-toggle="collapse" href="#collapse2-1" aria-expanded="false" aria-controls="collapse2-1"> Tracking my order </a>
                        </h2>
                    </div>
                    <div id="collapse2-1" className="collapse" aria-labelledby="heading2-1" data-parent="#accordion-2">
                        <div className="card-body"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Accordion