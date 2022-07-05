import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { RiAdminLine } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import "./Sidebar.css";

export default function Sidebar({ active }) {
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className={sidebar ? "sidebar" : "sidebar cloapsed"}>
      <GiHamburgerMenu
        className="menu-icon"
        onClick={() => setSidebar(!sidebar)}
      />
      <div className="sidebar-icons">
        <div className={ active === "dashboard" ? "sidebar-icon active" : "sidebar-icon"}>
          <TbDeviceDesktopAnalytics />
          {sidebar && <span className="sidebar-text">Dashboard</span>}
        </div>
        <div className={ active === "upload" ? "sidebar-icon active" : "sidebar-icon"}>
          <BsFillCloudUploadFill />
          {sidebar && <span className="sidebar-text">Upload Data</span>}
        </div>
        <div className={ active === "admin" ? "sidebar-icon active" : "sidebar-icon"}>
          <RiAdminLine />
          {sidebar && <span className="sidebar-text">Admin Page</span>}
        </div>
        <div className={ active === "account" ? "sidebar-icon active" : "sidebar-icon"}>
          <VscAccount />
          {sidebar && <span className="sidebar-text">Account</span>}
        </div>
      </div>
      <div className="sidebar-footer">
        <BiLogOutCircle />
        {sidebar && <span className="sidebar-text">Logout</span>}
      </div>
    </div>
  );
}
