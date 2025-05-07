import CloudIcon from '@mui/icons-material/Cloud';

function FiveDayForecast() {
    return (
        <>
            <section className="five-Day-Forecast">
                <h2>5-Day ForeCast</h2>
                <div>
                    <h4>wed</h4>

                    <CloudIcon className='weather-icon' />
                    <p>66°</p>
                </div>
            </section>
        </>
    )
}

export default FiveDayForecast