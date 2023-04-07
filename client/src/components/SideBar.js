import React from "react";
import BioPanel from "./BioPanel";
import CollectionsPanel from "./CollectionsPanel";
import ContactPanel from "./ContactPanel";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <BioPanel />
        <CollectionsPanel />
        <ContactPanel />
      </div>
    </div>
  );
}

export default Sidebar;