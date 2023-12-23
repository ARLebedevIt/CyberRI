import preloader from '../../../assets/images/preloader.svg'
import './Preloader.scss'

let Preloader = () => {
  return (
    <div className="preloader">
      <img srcSet={preloader} />
    </div>
  )
}

export default Preloader
