import React, { useEffect } from 'react'
import Checkbox from '../../components/Checkbox';

const ProductFilter = ({
    categories,
    activeCategory,
    currentPriceRange,
    onCateFilterChange,
    handlePriceFilterChange,
}) => {
    useEffect(() => {
        // Slider For category pages / filter price
        if (typeof noUiSlider === "object") {
            var priceSlider = document.getElementById("price-slider");
            // Check if #price-slider elem is exists if not return
            // to prevent error logs
            if (priceSlider == null) return;
            noUiSlider.create(priceSlider, {
                start: currentPriceRange,
                connect: true,
                step: 50,
                margin: 200,
                range: {
                    min: 0,
                    max: 1500,
                },
                tooltips: true,
                format: wNumb({
                    decimals: 0,
                    prefix: "$",
                }),
            });

            // Update Price Range
            priceSlider.noUiSlider.on("update", function (values, handle) {
                $("#filter-price-range").text(values.join(" - "));
                handlePriceFilterChange(values);
            });
        }
    }, []);

    const _onFilterChange = (id, isChecked) => {
        onCateFilterChange(id, isChecked);

    };
    return (
        <aside className="col-lg-3 order-lg-first">
            <div className="sidebar sidebar-shop">
                <div className="widget widget-clean">
                    <label>Filters:</label>
                    <a
                        role='button'
                        onClick={() => _onFilterChange("")}
                        className="sidebar-filter-clear">Clean All</a>
                </div>
                <div className="widget widget-collapsible">
                    <h3 className="widget-title">
                        <a data-toggle="collapse"
                            href="#widget-1"
                            role="button"
                            aria-expanded="true"
                            aria-controls="widget-1">{" "}Category{" "}</a>
                    </h3>
                    <div className="collapse show" id="widget-1">
                        <div className="widget-body">
                            <div className="filter-items filter-items-count">
                                {categories?.map((category, index) => {
                                    return (
                                        <div key={category?.id || index} className="filter-item"

                                        >
                                            <Checkbox
                                                id={category?.id || index}
                                                label={category.name || ""}
                                                checked={activeCategory.includes(category?.id || "")}
                                                onChange={(value) => {
                                                    _onFilterChange(category?.id, value.target.checked)
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="widget widget-collapsible">
                    <h3 className="widget-title">
                        <a data-toggle="collapse"
                            href="#widget-2"
                            role="button"
                            aria-expanded="true"
                            aria-controls="widget-5">
                            {" "}Price{" "}
                        </a>
                    </h3>
                    <div className="collapse show" id="widget-2">
                        <div className="widget-body">
                            <div className="filter-price">
                                <div className="filter-price-text">
                                    {" "}Price Range:
                                    <span id="filter-price-range" />
                                </div>
                                <div id="price-slider" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default ProductFilter