import { Link } from "react-router-dom";

const Button = ({ variant = "primary", children, className, link, type = "button", disabled, loading, ...rest }) => {
    let variantClass = "";
    switch (variant) {
        case "primary":
            variantClass = "btn btn-outline-primary-2";
            break;
        case "border":
            variantClass = "btn btn-outline-dark-2 btn-round btn-more";
            break;
        case "grey":
            variantClass = "course__btn btn btn--grey";
            break;
        default:
            break;
    }
    // if (disabled) {
    //     variantClass = "btn btn-outline-primary-2";
    //     rest.onClick = () => { };
    // }

    if (link) {
        return (
            <Link to={link} className={`${variantClass} ${className}`} {...rest}>
                {children}
            </Link>
        );
    }
    return (
        <>

            <button type={type} className={`${variantClass} ${className || ""} ${loading ? "--processing" : ""}`} {...rest}>
                {children}
                {/* {
                    loading && (
                        <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                            <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                                <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite" />
                            </path>
                        </svg>
                    )
                } */}
            </button>
            {/* <button type="submit" className="btn btn-outline-primary-2">
                <span>LOG IN</span>
                <i className="icon-long-arrow-right" />
            </button> */}
        </>
    );
}

export default Button;