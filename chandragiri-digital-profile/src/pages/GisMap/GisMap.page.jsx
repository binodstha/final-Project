import React from "react";
import HeaderSection from "../../components/header/Header.component";

import GisMapSection from "../../components/gis-map-section/GisMapSection.component";
import "../GisMap/gis-map.styles.scss";

function GisMapPage() {
  return (
    <>
      <HeaderSection />
      <div className="right-content gis-content">
        <div className="gis-map" id="">
          <GisMapSection />
        </div>
      </div>
    </>
  );
}

export default GisMapPage;
