import './CyberRI.scss'
import dvizhenimatorIMG from '../../assets/images/dvizhenimatorCover.jpg'
import meteometerIMG from '../../assets/images/meteometerCover.jpg'
import assistentIMG from '../../assets/images/assistant.jpg'
import spaceIMG from '../../assets/images/spaceCover.jpg'
import discoursIMG from '../../assets/images/discoursCover.jpg'
import CyberRIProject from './CyberRIProject'
import { Page } from '../../ui/Page/Page'

const CyberRIProjects = () => {
  return (
    <Page>
      <div className="cyberRiProjects__title">
        <span>Экспериментальные разработки</span>
      </div>
      <div className="cyberRiProjects__items">
        <CyberRIProject img={discoursIMG} path={'/lab/projects/discourse'} />
        <CyberRIProject img={assistentIMG} path={'/lab/projects/assistant'} />
        <CyberRIProject img={dvizhenimatorIMG} path={'/lab/projects/dvizhenimator'} />
        <CyberRIProject img={meteometerIMG} path={'/lab/projects/meteometer'} />
        <CyberRIProject img={spaceIMG} path={'/lab/projects/space'} />
      </div>
    </Page>
  )
}

export default CyberRIProjects
