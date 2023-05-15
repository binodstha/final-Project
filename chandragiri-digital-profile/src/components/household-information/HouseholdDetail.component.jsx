import React from "react";
import Agriculture from './Agriculture.component';
import FinancialDetail from './FinancialDetail.component';
import FamilyHeadPersonalDetail from './FamilyHeadPersonalDetail.component';
import CasteDetail from './CasteDetail.component';
import HealthDetail from './HealthDetail.componsnt';
import FarmingDetail from './FarmingDetail.component';
import DeathDetail from './DeathDetail.component';
import FacilitiesDetail from './FacilitiesDetail.component';
import HouseDetail from './HouseDetail.component';
import SurveyDetail from './SurveyDetail.component';
import Loader from '../loader/loader.component';

export class HouseholdDetail extends React.PureComponent {
  render() {
    const { householdInfo, showUpdatedData } = this.props
    return (
      <div>
        <div className='sub-main_title d-flex justify-content-between align-items-center mb-4'>
          <h2>घरायसी जानकारी {showUpdatedData && "(अद्यावधिक गरियो)"}</h2>
        </div>
        {householdInfo ? (
          <div className="sub-main_body" >
            {(householdInfo.address_detail) && (<SurveyDetail detail={householdInfo.address_detail} />)}
            {(householdInfo.family_detail) && (<FamilyHeadPersonalDetail detail={householdInfo.family_detail} />)}
            {(householdInfo.caste_detail) && (<CasteDetail detail={householdInfo.caste_detail} />)}
            {(householdInfo.death_detail) && (<DeathDetail detail={householdInfo.death_detail} />)}
            {(householdInfo.health_related) && (<HealthDetail detail={householdInfo.health_related} />)}
            {(householdInfo.agriculture) && (<Agriculture detail={householdInfo.agriculture} />)}
            {(householdInfo.farming) && (<FarmingDetail detail={householdInfo.farming} />)}
            {(householdInfo.house_related) && (<HouseDetail detail={householdInfo.house_related} />)}
            {(householdInfo.facilities) && (<FacilitiesDetail detail={householdInfo.facilities} />)}
            {(householdInfo.bank_detail) && (<FinancialDetail detail={householdInfo.bank_detail} />)}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    )
  }
}

export const FunctionalHouseholdDetail = React.forwardRef((props, ref) => {
  return <HouseholdDetail ref={ref} householdInfo={props.householdInfo} />;
});