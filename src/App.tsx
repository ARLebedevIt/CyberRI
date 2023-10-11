import "./App.scss"
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import { Suspense, lazy, useEffect, useState, FC } from "react";
import { connect, ConnectedProps, Provider, useSelector } from "react-redux";
import Preloader from "./components/Common/Preloader/Preloader";
import store from './redux/reduxStore';
import Footer from "./components/Footer/Footer";
import { initializeApp } from "./redux/reducers/appReducer";
import { getIsAuthSelector } from "./redux/selectors/authSelectors";
import NavbarWrapper from "./components/Navbar/Navbar";
import AppPreloader from "./components/AppPreloader/AppPreloader";

const UsersContainer = lazy(() => import(/* webpackChunkName: "Users" */ './components/Users/UsersContainer'))
const CyberRIContainer = lazy(() => import(/* webpackChunkName: "CyberRI" */ './components/CyberRI/CyberRIContainer'))
const MailContainer = lazy(() => import(/* webpackChunkName: "Mail" */ './components/Mail/Mail'))
const ProfileContainer = lazy(() => import(/* webpackChunkName: "Profile" */ './components/Profile/ProfileContainer'))
const NotFoundContainer = lazy(() => import(/* webpackChunkName: "NotFound" */ './components/NotFoundPage/NotFound'))
const DiscourseContainer = lazy(() => import(/* webpackChunkName: "Discourse" */ './components/Discourse/DiscoursePage'))
const DvizhenimatorContainer = lazy(() => import(/* webpackChunkName: "Dvizhenimator" */ './components/Dvizhenimator/Dvizhenimator'))
const SpaceContainer = lazy(() => import(/* webpackChunkName: "Space" */ './components/Space/Space'))
const MeteometerContainer = lazy(() => import(/* webpackChunkName: "Meteometer" */ './components/Meteometer/MeteometerContainer'))
const CyberRIProjectsContainer = lazy(() => import(/* webpackChunkName: "CyberRIProjects" */ './components/CyberRI/CyberRI'))
const AssistantContainer = lazy(() => import(/* webpackChunkName: "Assistant" */ './components/Assistant/Assistant'))
const LoginContainer = lazy(() => import(/* webpackChunkName: "Login" */ './components/Login/Login'))

const App: FC<AppContainerProps> = (props) => {
  const deviceWidth: number = window.innerWidth
  const isAuth = useSelector(getIsAuthSelector)
  const [apploaded, setAppLoaded] = useState<boolean | string>(false)
  useEffect(() => {
    props.initializeApp();
  }, [])

  useEffect(() => {
    const preloaderInit = (n: number) => {
      setTimeout(() => {
        setAppLoaded('ready');
      }, n);
    }
    if (apploaded === true) {
      if (deviceWidth > 1025) {
        preloaderInit(2300)
      } else preloaderInit(3700)
    }
  }, [apploaded, document.readyState])
  useEffect(() => {
    document.readyState == "complete" ? setAppLoaded(true) : window.addEventListener("load", () => setAppLoaded(true));
  }, [document.readyState])

  return (
    <HashRouter>
      <AppPreloader apploaded={apploaded} />
      <div className='wrapper'>
        <div className="pixelFilter"></div>
        <div className='content'>
          <Header />
          <NavbarWrapper />
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path='/' element={isAuth ? <Navigate to='/profile' /> : <Navigate to='/login' />} />
              <Route path="/profile/:userId" element={<ProfileContainer />} />
              <Route path="/lab/projects/assistant" element={<AssistantContainer />} />
              <Route path="/lab" element={<CyberRIContainer />} />
              <Route path="/lab/projects" element={<CyberRIProjectsContainer />} />
              <Route path="/profile" element={<ProfileContainer />} />
              <Route path="/mail" element={<MailContainer  />} />
              <Route path="/lab/projects/meteometer" element={<MeteometerContainer />} />
              <Route path="/lab/projects/space" element={<SpaceContainer />} />
              <Route path="/lab/projects/dvizhenimator" element={<DvizhenimatorContainer />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/login" element={<LoginContainer />} />
              <Route path="/lab/projects/discourse" element={<DiscourseContainer />} />
              <Route path="*" element={<NotFoundContainer />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </div>
    </HashRouter>
  );
}

const CyberRI: FC = () =>
  <Provider store={store}>
    <AppContainer />
  </Provider>

const connector = connect(null, { initializeApp });
type AppContainerProps = ConnectedProps<typeof connector>;

const AppContainer = connector(App)

export default CyberRI