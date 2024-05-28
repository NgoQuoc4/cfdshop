import React, { useEffect } from 'react'
import useAccount from './useAccount';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetProfile } from '../../store/reducers/authReducer';
import { Link } from 'react-router-dom';
import PATHS from '../../constants/paths';
import useAddress from '../../hooks/useAddress';
import useQuery from '../../hooks/useQuery';
import { authService } from '../../services/authService';

const AddressAccount = () => {
    const { profile } = useSelector((state) => state.auth);

    const { firstName, lastName, phone, email, province, district, ward, street } = profile || {};

    const { data: provinceData } = useQuery(() => province && authService.getDataProvinceById(province), [province])
    const { data: districtData } = useQuery(() => district && authService.getDataDistrictById(district), [district])
    const { data: wardData } = useQuery(() => ward && authService.getDataWardById(ward), [ward])

    const address = `${street}, ${wardData?.name}, ${districtData?.name}, ${provinceData?.name}`

    return (
        <div className="tab-pane fade show active" id="tab-address" role="tabpanel" aria-labelledby="tab-address-link">
            <p>The following addresses will be used on the checkout page by default.</p>
            <div className="row">
                <div className="col-lg-6">
                    <div className="card card-dashboard">
                        <div className="card-body">
                            <h3 className="card-title">Billing Address</h3>
                            <p>
                                <strong>Fullname:</strong>{firstName + lastName || ""}<br />
                                <strong>Email:</strong>{email || ""}<br />
                                <strong>Phone number:</strong>{phone || ""}<br />
                                <br />
                                <Link to={PATHS.PROFILE.INDEX}>Edit <i className="icon-edit" />
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card card-dashboard">
                        <div className="card-body">
                            <h3 className="card-title">Shipping Address</h3>
                            <p>{address || ""} <br />
                                <br />
                                <Link to={PATHS.PROFILE.INDEX}>Edit <i className="icon-edit" />
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressAccount