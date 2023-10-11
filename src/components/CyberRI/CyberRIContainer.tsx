import "./CyberRIContainer.scss";
import cyberRiCover from "../../assets/images/lebedevCyberRi.jpg";
import { Link } from "react-router-dom";
import { AppLink } from "../../ui/AppLink/AppLink";
import { Page } from "../../ui/Page/Page";

const CyberRIContainer = () => {
  return (
    <Page className="cyberRi__wrapper">
      <div className="cyberRi__item">
        <div className="cyberRi__title">
          <span>Добро пожаловать в КиберНИИ!</span>
        </div>
      </div>
      <div className="cyberRi__item">
        <div className="cyberRi__about">
          <div className="cyberRi__description">
            <div className="cyberRi__text">
              <span>
                15 Августа 2122 года.{"\n"}
                Академик Лебедев А.Р. принимает решение обнародовать в массы
                данные о секретных разработках Советских учёных в области
                компьютерных технологий за период 1950-1960 годы. Помните: все,
                что вы узнаете дальше, — секретно и разглашению не подлежит!
                {"\n"}
                Наслаждайтесь.
              </span>
            </div>
            <AppLink className="cyberRi__link" to="/lab/projects">
              Поехали!
            </AppLink>
          </div>
          <div className="cyberRi__img">
            <Link to="/lab/projects">
              <img src={cyberRiCover} alt="Здесь могла быть ваша картинка" />
            </Link>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default CyberRIContainer;
