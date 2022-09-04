// @ts-nocheck
import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./landing_page/LandingPage";
import "./General.css";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import {
  checkUserSigninStatus,
  getUserDetail,
} from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./commons/ProtectedRoute";
import {
  PATH_ADD_PROPERTY,
  PATH_AGENTS_ADD,
  PATH_AGENTS_HOME,
  PATH_AGENTS_SEARCH,
  PATH_AGENT_CONTACT,
  PATH_AGENT_CREATE_INFO,
  PATH_AGENT_DASHBOARD,
  PATH_AGENT_DASHBOARD_AGENT_INFO,
  PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTYUNIT_EDIT,
  PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTY_DETAIL,
  PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTY_EDIT,
  PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTY_LIST,
  PATH_AGENT_DASHBOARD_AMENITY_ADD,
  PATH_AGENT_DASHBOARD_APARTMENTUNIT_DETAIL,
  PATH_AGENT_DASHBOARD_APARTMENTUNIT_EDIT,
  PATH_AGENT_DASHBOARD_APARTMENT_DETAIL,
  PATH_AGENT_DASHBOARD_APARTMENT_EDIT,
  PATH_AGENT_DASHBOARD_APARTMENT_LIST,
  PATH_AGENT_DASHBOARD_COMMERCIALPROPERTYUNIT_EDIT,
  PATH_AGENT_DASHBOARD_COMMERCIALPROPERTY_DETAIL,
  PATH_AGENT_DASHBOARD_COMMERCIALPROPERTY_EDIT,
  PATH_AGENT_DASHBOARD_COMMERCIALPROPERTY_LIST,
  PATH_AGENT_DASHBOARD_CONDOMINIUM_DETAIL,
  PATH_AGENT_DASHBOARD_CONDOMINIUM_EDIT,
  PATH_AGENT_DASHBOARD_CONDOMINIUM_LIST,
  PATH_AGENT_DASHBOARD_EDUCATION_FACILITY_ADD,
  PATH_AGENT_DASHBOARD_FEATURE_LISTING,
  PATH_AGENT_DASHBOARD_HALL_DETAIL,
  PATH_AGENT_DASHBOARD_HALL_EDIT,
  PATH_AGENT_DASHBOARD_HALL_LIST,
  PATH_AGENT_DASHBOARD_LAND_DETAIL,
  PATH_AGENT_DASHBOARD_LAND_EDIT,
  PATH_AGENT_DASHBOARD_LAND_LIST,
  PATH_AGENT_DASHBOARD_LISTING_ADD,
  PATH_AGENT_DASHBOARD_LISTING_DETAIL,
  PATH_AGENT_DASHBOARD_LISTING_EDIT,
  PATH_AGENT_DASHBOARD_LISTING_LIST,
  PATH_AGENT_DASHBOARD_OFFICE_DETAIL,
  PATH_AGENT_DASHBOARD_OFFICE_EDIT,
  PATH_AGENT_DASHBOARD_OFFICE_LIST,
  PATH_AGENT_DASHBOARD_POI_ADD,
  PATH_AGENT_DASHBOARD_PROPERTY,
  PATH_AGENT_DASHBOARD_PROPERTY_ADD,
  PATH_AGENT_DASHBOARD_PROPERTY_ADDRESS_EDIT,
  PATH_AGENT_DASHBOARD_PROPERTY_DETAIL,
  PATH_AGENT_DASHBOARD_PROPERTY_EDIT,
  PATH_AGENT_DASHBOARD_PROPERTY_FILE_UPLOAD,
  PATH_AGENT_DASHBOARD_PROPERTY_LIST,
  PATH_AGENT_DASHBOARD_PROPERTY_RULE_ADD,
  PATH_AGENT_DASHBOARD_SHAREHOUSE_DETAIL,
  PATH_AGENT_DASHBOARD_SHAREHOUSE_EDIT,
  PATH_AGENT_DASHBOARD_SHAREHOUSE_LIST,
  PATH_AGENT_DASHBOARD_TRADITIONAL_HOUSE_DETAIL,
  PATH_AGENT_DASHBOARD_TRADITIONAL_HOUSE_EDIT,
  PATH_AGENT_DASHBOARD_TRADITIONAL_HOUSE_LIST,
  PATH_AGENT_DASHBOARD_TRANSPORT_FACILITY_ADD,
  PATH_AGENT_DASHBOARD_VILLA_DETAIL,
  PATH_AGENT_DASHBOARD_VILLA_EDIT,
  PATH_AGENT_DASHBOARD_VILLA_LIST,
  PATH_AGENT_DETAIL,
  PATH_AGENT_ID_VARIABLE,
  PATH_AGENT_LOGO_UPLOAD,
  PATH_DYNAMIC_PROPERTY,
  PATH_LANDING,
  PATH_LISTING_IMAGE_VIEW,
  PATH_LISTING_VIDEO_VIEW,
  PATH_PAGE_NOT_FOUND,
  PATH_PROPERTY_ADD,
  PATH_PROPERTY_FILE_UPLOAD,
  PATH_PROPERTY_HOME,
  PATH_PUBLIC_LISTING,
  PATH_PUBLIC_LISTING_DETAIL,
  PATH_SAVED_LISTINGS,
  PATH_SIGNIN,
  PATH_SIGNUP,
} from "./commons/Strings";
import AgentsList from "./agents/AgentsList";
import AgentsPage from "./agents/AgentsPage";
import AgentFormWizard from "./agents/new_agent/AgentFormWizard";
import AgentSearch from "./agents/AgentSearch";
import AgentCreateInfo from "./agents/new_agent/AgentCreateInfo";
import PropertyPage from "./properties/PropertyPage";
import PropertyFormWizard from "./properties/PropertyFormWizard";
import PropertyFileUpload from "./properties/forms/PropertyFileUpload";
import AgentDashboard from "./agents/dashboard/AgentDashboard";
import AgentDashboardStat from "./agents/dashboard/AgentDashboardStat";
import AgentPreview from "./agents/AgentPreview";
import { getAgent } from "features/agent/agentSlice";
import AgentLogoUpload from "./agents/new_agent/AgentLogoUpload";
import PropertyList from "./agents/dashboard/properties/PropertyList";
import PropertyDetail from "./agents/dashboard/properties/PropertyDetail";
import {
  getCurrencies,
  getListingParams,
  getSystemParams,
} from "features/system/paramSlice";
import PropertyAddressEdit from "./agents/dashboard/properties/PropertyAddressEdit";
import ParentPropertyEdit from "./agents/dashboard/properties/ParentPropertyEdit";
import EducationFacility from "./agents/dashboard/properties/EducationFacility";
import TransportFacility from "./agents/dashboard/properties/TransportFacility";
import PointOfInterest from "./agents/dashboard/properties/PointOfInterest";
import Amenity from "./agents/dashboard/properties/Amenity";
import PropertyRule from "./agents/dashboard/properties/PropertyRule";
import LandEdit from "./agents/dashboard/properties/LandEdit";
import ShareHouseEdit from "./agents/dashboard/properties/ShareHouseEdit";
import ApartmentList from "./agents/dashboard/properties/ApartmentList";
import ApartmentEdit from "./agents/dashboard/properties/ApartmentEdit";
import ApartmentDetail from "./agents/dashboard/properties/ApartmentDetail";
import ApartmentUnitDetail from "./agents/dashboard/properties/ApartmentUnitDetail";
import ApartmentUnitEdit from "./agents/dashboard/properties/ApartmentUnitEdit";
import VillaList from "./agents/dashboard/properties/VillaList";
import VillaEdit from "./agents/dashboard/properties/VillaEdit";
import VillaDetail from "./agents/dashboard/properties/VillaDetail";
import CondominiumList from "./agents/dashboard/properties/CondominiumList";
import CondominiumDetail from "./agents/dashboard/properties/CondominiumDetail";
import CondominiumEdit from "./agents/dashboard/properties/CondominiumEdit";
import TraditionalHouseList from "./agents/dashboard/properties/TraditionalHouseList";
import TraditionalHouseDetail from "./agents/dashboard/properties/TraditionalHouseDetail";
import TraditionalHouseEdit from "./agents/dashboard/properties/TraditionalHouseEdit";
import CommercialPropertyList from "./agents/dashboard/properties/CommercialPropertyList";
import CommercialPropertyEdit from "./agents/dashboard/properties/CommercialPropertyEdit";
import CommercialPropertyDetail from "./agents/dashboard/properties/CommercialPropertyDetail";
import CommercialPropertyUnitEdit from "./agents/dashboard/properties/CommercialPropertyUnitEdit";
import ShareHouseList from "./agents/dashboard/properties/ShareHouseList";
import ShareHouseDetail from "./agents/dashboard/properties/ShareHouseDetail";
import OfficeEdit from "./agents/dashboard/properties/OfficeEdit";
import OfficeList from "./agents/dashboard/properties/OfficeList";
import OfficeDetail from "./agents/dashboard/properties/OfficeDetail";
import LandList from "./agents/dashboard/properties/LandList";
import LandDetail from "./agents/dashboard/properties/LandDetail";
import HallEdit from "./agents/dashboard/properties/HallEdit";
import HallList from "./agents/dashboard/properties/HallList";
import HallDetail from "./agents/dashboard/properties/HallDetail";
import AllPurposePropertyList from "./agents/dashboard/properties/AllPurposePropertyList";
import AllPurposePropertyEdit from "./agents/dashboard/properties/AllPurposePropertyEdit";
import AllPurposePropertyDetail from "./agents/dashboard/properties/AllPurposePropertyDetail";
import AllPurposePropertyUnitEdit from "./agents/dashboard/properties/AllPurposePropertyUnitEdit";
import ListingList from "./agents/dashboard/listings/ListingList";
import AddListing from "./agents/dashboard/listings/AddListing";
import {
  getListingModes,
  getListingStates,
  getListingTypes,
} from "features/listing/listingSlice";
import {
  getPaymentApprovalModes,
  getPaymentMethods,
  getSupportedCardSchemes,
} from "features/payment/paymentSlice";
import BasicListingEdit from "./agents/dashboard/listings/BasicListingEdit";
import ListingDetail from "./agents/dashboard/listings/ListingDetail";
import { getPropertyCategories } from "features/agent_dashboard/property/propertyCategorySlice";
import { getPeriodicities } from "features/common/commonSlice";
import PublicListingHome from "./listing_page/PublicListingHome";
import PublicListingList from "./listing_page/PublicListingList";
import PublicListingDetailPage from "./listing_page/public_listing_detail/PublicListingDetailPage";
import SavedListingPage from "./listing_page/saved_listing/SavedListingPage";
import { getSystemAssets } from "features/system/assetSlice";
import AgentDetail from "./agents/AgentDetail";
import FeatureListing from "./agents/dashboard/listings/FeatureListing";
import ContactAgent from "./listing_page/ContactAgent";
import ListingImageView from "./listing_page/public_listing_detail/ListingImageView";
import ListingVideoView from "./listing_page/public_listing_detail/ListingVideoView";

const App = () => {
  const isSignedIn = useSelector((store) => store.user.signin.isSignedIn);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSystemParams());
    dispatch(getListingParams());
    dispatch(getSystemAssets());
    dispatch(getListingModes());
    dispatch(getListingTypes());
    dispatch(getListingStates());
    dispatch(getPaymentApprovalModes());
    dispatch(getPaymentMethods());
    dispatch(getSupportedCardSchemes());
    dispatch(getCurrencies());
    dispatch(getPropertyCategories());
    dispatch(getPeriodicities());
  }, []);

  useEffect(() => {
    dispatch(checkUserSigninStatus());
    if (isSignedIn) {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      };

      dispatch(getUserDetail(headers));
      dispatch(getAgent(headers));
    }
  }, [isSignedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH_SIGNUP} element={<Signup />} />
        <Route
          path={PATH_SIGNIN}
          element={!isSignedIn ? <Signin /> : <Navigate to={PATH_LANDING} />}
        />
        <Route path={PATH_LANDING} element={<LandingPage />} />
        <Route
          path={PATH_PAGE_NOT_FOUND}
          element={<h4>Page not found, 404!</h4>}
        />
        <Route
          path={PATH_ADD_PROPERTY}
          element={
            <ProtectedRoute redirectPath={PATH_SIGNIN}>
              <PropertyFormWizard />
            </ProtectedRoute>
          }
        />

        <Route path={PATH_AGENTS_HOME} element={<AgentsPage />}>
          <Route element={<ProtectedRoute redirectPath={PATH_SIGNIN} />}>
            <Route path={PATH_AGENTS_ADD} element={<AgentFormWizard />} />

            <Route
              path={PATH_AGENT_CREATE_INFO}
              element={<AgentCreateInfo />}
            />
            <Route
              path={PATH_AGENT_LOGO_UPLOAD}
              element={<AgentLogoUpload />}
            />
            {/* <Route path={PATH_AGENT_DASHBOARD} element={<AgentDashboard />} /> */}
          </Route>
          <Route path={PATH_AGENTS_SEARCH} element={<AgentSearch />} />
          <Route
            path={`${PATH_AGENT_ID_VARIABLE}/${PATH_AGENT_DETAIL}`}
            element={<AgentDetail />}
          />
          <Route index element={<AgentsList />} />
          <Route path={PATH_AGENT_CONTACT} element={<ContactAgent />} />
        </Route>
        <Route path={PATH_AGENT_DASHBOARD} element={<AgentDashboard />}>
          <Route element={<ProtectedRoute redirectPath={PATH_SIGNIN} />}>
            <Route
              // path={PATH_AGENT_DASHBOARD_STAT}
              index
              element={<AgentDashboardStat />}
            />
            <Route
              path={PATH_AGENT_DASHBOARD_AGENT_INFO}
              element={<AgentPreview />}
            />
            <Route path={PATH_AGENT_DASHBOARD_PROPERTY}>
              <Route
                path={PATH_AGENT_DASHBOARD_PROPERTY_ADD}
                element={<PropertyFormWizard />}
              />
              <Route
                path={PATH_AGENT_DASHBOARD_PROPERTY_FILE_UPLOAD}
                element={<PropertyFileUpload />}
              />
              <Route
                path={PATH_AGENT_DASHBOARD_PROPERTY_LIST}
                element={<PropertyList />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_APARTMENT_LIST}
                element={<ApartmentList />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_APARTMENT_DETAIL}
                element={<ApartmentDetail />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_APARTMENT_EDIT}
                element={<ApartmentEdit />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_APARTMENTUNIT_DETAIL}
                element={<ApartmentUnitDetail />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_APARTMENTUNIT_EDIT}
                element={<ApartmentUnitEdit />}
              />

              {/*============= VILLA ========================================== */}
              <Route
                path={PATH_AGENT_DASHBOARD_VILLA_LIST}
                element={<VillaList />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_VILLA_EDIT}
                element={<VillaEdit />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_VILLA_DETAIL}
                element={<VillaDetail />}
              />

              {/*============= CONDOMINIUM ========================================== */}
              <Route
                path={PATH_AGENT_DASHBOARD_CONDOMINIUM_LIST}
                element={<CondominiumList />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_CONDOMINIUM_DETAIL}
                element={<CondominiumDetail />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_CONDOMINIUM_EDIT}
                element={<CondominiumEdit />}
              />

              {/*============= TRADITIONAL HOUSE ========================================== */}
              <Route
                path={PATH_AGENT_DASHBOARD_TRADITIONAL_HOUSE_LIST}
                element={<TraditionalHouseList />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_TRADITIONAL_HOUSE_DETAIL}
                element={<TraditionalHouseDetail />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_TRADITIONAL_HOUSE_EDIT}
                element={<TraditionalHouseEdit />}
              />

              {/*============= COMMERCIAL PROPERTY ========================================== */}
              <Route
                path={PATH_AGENT_DASHBOARD_COMMERCIALPROPERTY_LIST}
                element={<CommercialPropertyList />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_COMMERCIALPROPERTY_EDIT}
                element={<CommercialPropertyEdit />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_COMMERCIALPROPERTY_DETAIL}
                element={<CommercialPropertyDetail />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_COMMERCIALPROPERTYUNIT_EDIT}
                element={<CommercialPropertyUnitEdit />}
              />

              {/* =========== PARENT PROPERTY==================================== */}
              <Route
                path={PATH_AGENT_DASHBOARD_PROPERTY_DETAIL}
                element={<PropertyDetail />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_PROPERTY_ADDRESS_EDIT}
                element={<PropertyAddressEdit />}
              />
              <Route
                path={PATH_AGENT_DASHBOARD_PROPERTY_EDIT}
                element={<ParentPropertyEdit />}
              />

              {/* ================ SHAREHOUSE ======================================== */}
              <Route
                path={PATH_AGENT_DASHBOARD_SHAREHOUSE_EDIT}
                element={<ShareHouseEdit />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_SHAREHOUSE_LIST}
                element={<ShareHouseList />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_SHAREHOUSE_DETAIL}
                element={<ShareHouseDetail />}
              />

              {/* ================ OFFICE ============================================ */}
              <Route
                path={PATH_AGENT_DASHBOARD_OFFICE_EDIT}
                element={<OfficeEdit />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_OFFICE_LIST}
                element={<OfficeList />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_OFFICE_DETAIL}
                element={<OfficeDetail />}
              />

              {/* ================ LAND ============================================ */}
              <Route
                path={PATH_AGENT_DASHBOARD_LAND_EDIT}
                element={<LandEdit />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_LAND_LIST}
                element={<LandList />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_LAND_DETAIL}
                element={<LandDetail />}
              />

              {/* ================ HALL ============================================ */}
              <Route
                path={PATH_AGENT_DASHBOARD_HALL_EDIT}
                element={<HallEdit />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_HALL_LIST}
                element={<HallList />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_HALL_DETAIL}
                element={<HallDetail />}
              />

              {/*============= ALL PURPOSE PROPERTY ========================================== */}
              <Route
                path={PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTY_LIST}
                element={<AllPurposePropertyList />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTY_EDIT}
                element={<AllPurposePropertyEdit />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTY_DETAIL}
                element={<AllPurposePropertyDetail />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTYUNIT_EDIT}
                element={<AllPurposePropertyUnitEdit />}
              />

              {/*============= LISTING =============================================== */}
              <Route
                path={PATH_AGENT_DASHBOARD_LISTING_LIST}
                element={<ListingList />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_LISTING_ADD}
                element={<AddListing />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_LISTING_EDIT}
                element={<BasicListingEdit />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_LISTING_DETAIL}
                element={<ListingDetail />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_FEATURE_LISTING}
                element={<FeatureListing />}
              />

              {/* ================ EDUCATION FACILITY ================================= */}
              <Route
                path={`${PATH_DYNAMIC_PROPERTY}/${PATH_AGENT_DASHBOARD_EDUCATION_FACILITY_ADD}`}
                element={<EducationFacility />}
              />

              <Route
                path={`${PATH_DYNAMIC_PROPERTY}/${PATH_AGENT_DASHBOARD_TRANSPORT_FACILITY_ADD}`}
                element={<TransportFacility />}
              />

              <Route
                path={`${PATH_DYNAMIC_PROPERTY}/${PATH_AGENT_DASHBOARD_POI_ADD}`}
                element={<PointOfInterest />}
              />

              <Route
                path={`${PATH_DYNAMIC_PROPERTY}/${PATH_AGENT_DASHBOARD_AMENITY_ADD}`}
                element={<Amenity />}
              />

              <Route
                path={`${PATH_DYNAMIC_PROPERTY}/${PATH_AGENT_DASHBOARD_PROPERTY_RULE_ADD}`}
                element={<PropertyRule />}
              />

              {/* PUBLIC LISTING */}
            </Route>
          </Route>
        </Route>

        <Route path={PATH_PUBLIC_LISTING} element={<PublicListingHome />}>
          <Route index element={<PublicListingList />} />
          <Route
            path={PATH_PUBLIC_LISTING_DETAIL}
            element={<PublicListingDetailPage />}
          />
          <Route path={PATH_SAVED_LISTINGS} element={<SavedListingPage />} />
          <Route
            path={PATH_LISTING_IMAGE_VIEW}
            element={<ListingImageView />}
          />
          <Route
            path={PATH_LISTING_VIDEO_VIEW}
            element={<ListingVideoView />}
          />
        </Route>

        <Route path={PATH_PROPERTY_HOME} element={<PropertyPage />}>
          <Route path={PATH_PROPERTY_ADD} element={<PropertyFormWizard />} />
          <Route
            path={PATH_PROPERTY_FILE_UPLOAD}
            element={<PropertyFileUpload />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
