import { useContext, useEffect, useState } from "react";
import Header from "./components/layout/header/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ProfilePanel from "./components/layout/profile-panel/ProfilePanel";
import TeamInvites from "./components/layout/team-invites/TeamInvites";
import SidePanelMain from "./components/layout/side-panel/SidePanelMain";
import styles from "./App.module.css";
import BodyContent from "./components/layout/body/BodyContent";
import SidePanelTop from "./components/layout/side-panel/SidePanelTop";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SidePanelContext from "./components/store/sidepanel-context";

function App(props) {
  const panelCtx = useContext(SidePanelContext);
  const [darkMode, setDarkMode] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
  const [isInviteModelOpen, setisInviteModelOpen] = useState(false);
  const [isIntial, setIsIntial] = useState(true);
  const [isIntialFetch, setIsIntialFetch] = useState(true);

  //using useEffect for local storage only if there is change in data.
  useEffect(() => {
    //Avoids sending data to local storage on intial render
    if (isIntial) {
      setIsIntial(false);
      return;
    }
    //Storing the data in localStorage
    localStorage.setItem("dataItems", JSON.stringify(panelCtx.items));
  }, [panelCtx.items, isIntial]);

  // Fetching Data from local Storage
  useEffect(() => {
    if (!isIntialFetch) {
      return;
    }
    setIsIntialFetch(false);
    //Fetching the data from localStorage
    const Fetcheditems = JSON.parse(localStorage.getItem("dataItems"));
    if (Fetcheditems) {
      panelCtx.fetchData(Fetcheditems);
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Dark Theme
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  const darkModeHandler = () => {
    setDarkMode((prevState) => {
      return !prevState;
    });
  };

  const toggleSidePanelHandler = () => {
    setIsSidePanelOpen((prevState) => !isSidePanelOpen);
  };

  const toggleProfilePanelHandler = () => {
    setIsProfilePanelOpen((prevState) => !isProfilePanelOpen);
  };

  const toggleInviteModelOpenHandler = () => {
    setisInviteModelOpen((prevState) => !isInviteModelOpen);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <div>
          {/* Main Header */}
          <Header
            toggleSidePanelHandler={toggleSidePanelHandler}
            toggleProfilePanelHandler={toggleProfilePanelHandler}
            toggleInviteModelOpenHandler={toggleInviteModelOpenHandler}
          />

          {/* Invite Team Member(Top Right) */}
          {isInviteModelOpen && (
            <TeamInvites
              toggleInviteModelOpenHandler={toggleInviteModelOpenHandler}
            />
          )}

          {/* Profile Panel(Top Right) */}
          {isProfilePanelOpen && (
            <ProfilePanel
              darkMode={darkMode}
              darkModeHandler={darkModeHandler}
            />
          )}

          {/* Side Panel Header*/}
          {isSidePanelOpen && (
            <SidePanelTop
              toggleSidePanelHandler={props.toggleSidePanelHandler}
              darkMode={darkMode}
            />
          )}
          <div className={styles["main-page__body"]}>
            <Routes>
              <Route path='/' element={<Navigate to='/all' />} />
              <Route
                path='/*'
                element={
                  isSidePanelOpen && (
                    <SidePanelMain
                      darkMode={darkMode}
                      toggleSidePanelHandler={toggleSidePanelHandler}
                    />
                  )
                }
              />
              <Route />
              
            </Routes>
            <BodyContent />
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
