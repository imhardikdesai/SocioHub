import React, { useContext } from "react";
import Sidebar from "../../components/common/SideBar";
import SearchBar from "../../components/common/SearchBar";
import { Outlet } from "react-router-dom";
import ProfileAvatar from "../../components/common/ProfileAvatar";
import { Divider } from "@chakra-ui/react";
import MyHelmet from "../../seo/MyHelmet";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { userDetails } = useContext(AuthContext)
  return (
    <>
      <MyHelmet userDetails={userDetails} />
      <main className="d-flex flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row">
        <Sidebar />
        <section className="main-content px-3">
          <header className="d-flex">
            <SearchBar />
            <ProfileAvatar />
          </header>
          <Divider my={5} />
          <div className="outlet-area">
            <Outlet />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
