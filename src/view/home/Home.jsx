import React from "react";
import Sidebar from "../../components/common/SideBar";
import SearchBar from "../../components/common/SearchBar";
import { Outlet } from "react-router-dom";
import ProfileAvatar from "../../components/common/ProfileAvatar";
import { Divider } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <main className="d-flex flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row">
        <Sidebar />
        <section className="main-content px-3 mt-sm-4">
          <header className="d-flex">
            <SearchBar />
            <ProfileAvatar />
          </header>
          <Divider my={8} />
          <div className="outlet-area">
            <Outlet />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
