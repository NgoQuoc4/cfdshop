import moment from 'moment'
import React, { useEffect, useState } from 'react'

const CountDown = ({ targetTime }) => {
    const [renderTime, setRenderTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        millisecond: 0,
    })
    const calculateTimeRemaining = () => {
        const now = moment();
        const duration = moment.duration(targetTime.diff(now));

        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        return { hours, minutes, seconds }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            const remaining = calculateTimeRemaining(targetTime);
            setRenderTime(remaining)
        }, 1000)
        return () => clearInterval(intervalId)
    }, [targetTime])

    return (
        <div className="deal-countdown is-countdown" data-until="+10h">
            <span className="countdown-row countdown-show3">
                <span className="countdown-section">
                    <span className="countdown-amount">{renderTime.hours || 0}</span>
                    <span className="countdown-period">hours</span>
                </span>
                <span className="countdown-section">
                    <span className="countdown-amount">{renderTime.minutes || 0}</span>
                    <span className="countdown-period">minutes</span>
                </span>
                <span className="countdown-section">
                    <span className="countdown-amount">{renderTime.seconds || 0}</span>
                    <span className="countdown-period">seconds</span>
                </span>
            </span>
        </div>
    )
}

export default CountDown