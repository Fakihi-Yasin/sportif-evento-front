import { useState } from "react";
import Aside from "./Layouts/Aside";
import SideBar from "./Layouts/SideBar";
import Main from "./Layouts/Main";

const TABS = [
  {
    id: "GeneralChannel-menu",
    icon: "fa-solid fa-people-roof",
    title: "GeneralChannel",
  },
  {
    id: "chat-menu",
    icon: "ti ti-message-2-heart",
    title: "Chats",
  },
  {
    id: "contact-menu",
    icon: "ti ti-user-shield",
    title: "Contacts",
  },
  {
    id: "group-menu",
    icon: "ti ti-users-group",
    title: "Groups",
  },

  {
    id: "status-menu",
    icon: "ti ti-circle-dot",
    title: "Status",
  },
  {
    id: "call-menu",
    icon: "ti ti-phone-call",
    title: "Calls",
  },
  {
    id: "profile-menu",
    icon: "ti ti-user-circle",
    title: "Profile",
  },
  {
    id: "setting-menu",
    icon: "ti ti-settings",
    title: "Settings",
  },
];

function Home() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <div className="content main_content">
      <SideBar tabs={TABS} setActiveTab={setActiveTab} activeTab={activeTab} />
      <Aside activeTab={activeTab}/>
      <Main activeTab={activeTab}/>
    </div>
  );
}

export default Home;
