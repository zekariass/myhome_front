// @ts-nocheck
import {
  ALL_PURPOSE_PROPERTY_KEY,
  APARTMENT_KEY,
  ASSET_ALL_PURPOSE_PROPERTY_PICTURE,
  ASSET_APARTMENT_PICTURE,
  ASSET_COMMERCIAL_PROPERTY_PICTURE,
  ASSET_CONDOMINIUM_PICTURE,
  ASSET_HALL_PICTURE,
  ASSET_LAND_PICTURE,
  ASSET_OFFICE_PICTURE,
  ASSET_SHARE_HOUSE_PICTURE,
  ASSET_TRADITIONAL_HOUSE_PICTURE,
  ASSET_VILLA_PICTURE,
  COMMERCIAL_PROPERTY_KEY,
  CONDOMINIUM_KEY,
  HALL_KEY,
  LAND_KEY,
  OFFICE_KEY,
  PATH_PUBLIC_LISTING,
  SHARE_HOUSE_KEY,
  TRADITIONAL_HOUSE_KEY,
  VILLA_KEY,
} from "components/commons/Strings";
import {
  clearPublicListing,
  setSearchParams,
} from "features/listing/publicListingSlice";
import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const PropertyAlbum = () => {
  const systemAssets = useSelector((store) => store.systemAsset.assetList.data);
  const propertyCategories = useSelector(
    (store) => store.propertyCategory.propertyCategoryList.response.data
  );

  const storedSearchParams = useSelector(
    (store) => store.publicListing.searchParams.params
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getApartmentAsset = () => {
    const apartmentPictureObj = systemAssets.find(
      (asset) => asset?.owner === ASSET_APARTMENT_PICTURE
    );

    return apartmentPictureObj?.asset;
  };

  const getVillaAsset = () => {
    const villaAssetObj = systemAssets.find(
      (asset) => asset?.owner === ASSET_VILLA_PICTURE
    );

    return villaAssetObj?.asset;
  };

  const getCondominiumAsset = () => {
    const condominiumAssetObj = systemAssets.find(
      (asset) => asset?.owner === ASSET_CONDOMINIUM_PICTURE
    );

    return condominiumAssetObj?.asset;
  };

  const getTraditionalHouseAsset = () => {
    const tradHouseAssetObj = systemAssets.find(
      (asset) => asset?.owner === ASSET_TRADITIONAL_HOUSE_PICTURE
    );

    return tradHouseAssetObj?.asset;
  };

  const getShareHouseAsset = () => {
    const shareHouseAssetObj = systemAssets.find(
      (asset) => asset?.owner === ASSET_SHARE_HOUSE_PICTURE
    );

    return shareHouseAssetObj?.asset;
  };

  const getOfficeAsset = () => {
    const officeAssetObj = systemAssets.find(
      (asset) => asset?.owner === ASSET_OFFICE_PICTURE
    );

    return officeAssetObj?.asset;
  };

  const getCommercialPropertyAsset = () => {
    const commercialPropertyAssetObj = systemAssets.find(
      (asset) => asset?.owner === ASSET_COMMERCIAL_PROPERTY_PICTURE
    );

    return commercialPropertyAssetObj?.asset;
  };

  const getHallAsset = () => {
    const hallAssetObj = systemAssets.find(
      (asset) => asset?.owner === ASSET_HALL_PICTURE
    );

    return hallAssetObj?.asset;
  };

  const getAllPurposePropertyAsset = () => {
    const allPurposePropertyAssetObj = systemAssets.find(
      (asset) => asset?.owner === ASSET_ALL_PURPOSE_PROPERTY_PICTURE
    );

    return allPurposePropertyAssetObj?.asset;
  };

  const getLandAsset = () => {
    const landAssetObj = systemAssets.find(
      (asset) => asset?.owner === ASSET_LAND_PICTURE
    );

    return landAssetObj?.asset;
  };

  const onLinkClick = (property_cat_key) => {
    let propertyCategoryId;

    const propertyCategory = propertyCategories.find(
      (propCat) => propCat?.cat_key === property_cat_key
    );

    propertyCategoryId = propertyCategory ? propertyCategory?.id : -1;

    const searchParams = {
      ...storedSearchParams,
      property_category: propertyCategoryId,
    };

    // {
    //   for_rent: false,
    //   for_sale: false,
    //   location: -1,
    //   property_category: propertyCategoryId,
    //   page: 1,
    // };

    let urlParm = "";

    dispatch(clearPublicListing());
    dispatch(setSearchParams(searchParams));

    Object.keys(searchParams).forEach((paramKey) => {
      urlParm += `${paramKey}=${searchParams[paramKey]}&`;
    });

    urlParm = urlParm.substring(0, urlParm.length - 1);

    navigate(`${PATH_PUBLIC_LISTING}?${urlParm}`);
  };

  return (
    <div className="container my-5">
      <p className="fs-5">Choose properties by category</p>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-3">
        <div className="col">
          <Card>
            {/* <Card.Header> */}
            <Card.Img
              src={getApartmentAsset()}
              alt="Apartment"
              width="100%"
              height="225"
              className="rounded-top"
            />
            {/* </Card.Header> */}
            <Card.Body>
              <p className="flex-center-general fs-5">Apartments</p>
              <p className="card-text flex-center-general">
                Find apartments around your area for rent or sale.
              </p>
            </Card.Body>
            <Card.Footer>
              <div className="flex-center-general">
                <div
                  className="link-general link-size-small px-3 py-2"
                  role="button"
                  onClick={() => onLinkClick(APARTMENT_KEY)}
                >
                  Find Apartments
                </div>
              </div>
            </Card.Footer>
          </Card>
        </div>
        <div className="col">
          <Card>
            {/* <Card.Header> */}
            <Card.Img
              src={getVillaAsset()}
              alt="Apartment"
              width="100%"
              height="225"
              className="rounded-top"
            />
            {/* </Card.Header> */}

            <Card.Body>
              <p className="flex-center-general fs-5">Villas</p>
              <p className="card-text flex-center-general">
                Find Villas around your area for rent or sale.
              </p>
            </Card.Body>
            <Card.Footer>
              <div className="flex-center-general">
                <div
                  className="link-general link-size-small px-3 py-2"
                  role="button"
                  onClick={() => onLinkClick(VILLA_KEY)}
                >
                  Find Villas
                </div>
              </div>
            </Card.Footer>
          </Card>
        </div>
        <div className="col card-table">
          <Card>
            {/* <Card.Header> */}
            <Card.Img
              src={getCondominiumAsset()}
              alt="Apartment"
              width="100%"
              height="225"
              className="rounded-top"
            />
            {/* </Card.Header> */}

            <Card.Body>
              <p className="flex-center-general fs-5">Condominiums</p>
              <p className="card-text flex-center-general">
                Find Condominiums around your area for rent or sale.
              </p>
            </Card.Body>
            <Card.Footer>
              <div className="flex-center-general ">
                <div
                  className="link-general link-size-small px-3 py-2"
                  role="button"
                  onClick={() => onLinkClick(CONDOMINIUM_KEY)}
                >
                  Find Condominiums
                </div>
              </div>
            </Card.Footer>
          </Card>
        </div>
        <div>
          <Card>
            {/* <Card.Header> */}
            <Card.Img
              src={getTraditionalHouseAsset()}
              alt="Apartment"
              width="100%"
              height="225"
              className="rounded-top"
            />
            {/* </Card.Header> */}

            <Card.Body>
              <p className="flex-center-general fs-5">Traditional Properties</p>
              <p className="card-text flex-center-general">
                Find Traditional Properties around your area for rent or sale.
              </p>
            </Card.Body>
            <Card.Footer>
              <div className="flex-center-general">
                <div
                  className="link-general link-size-small px-3 py-2"
                  role="button"
                  onClick={() => onLinkClick(TRADITIONAL_HOUSE_KEY)}
                >
                  Find Traditional Properties
                </div>
              </div>
            </Card.Footer>
          </Card>
        </div>
        <div className="col">
          <Card>
            {/* <Card.Header> */}
            <Card.Img
              src={getShareHouseAsset()}
              alt="Apartment"
              width="100%"
              height="225"
              className="rounded-top"
            />
            {/* </Card.Header> */}

            <Card.Body>
              <p className="flex-center-general fs-5">Share Houses</p>
              <p className="card-text flex-center-general">
                Find Share Houses around your area for rent or sale.
              </p>
            </Card.Body>
            <Card.Footer>
              <div className="flex-center-general">
                <div
                  className="link-general link-size-small px-3 py-2"
                  role="button"
                  onClick={() => onLinkClick(SHARE_HOUSE_KEY)}
                >
                  Find Share Houses
                </div>
              </div>
            </Card.Footer>
          </Card>
        </div>
        <div className="col">
          <Card>
            {/* <Card.Header> */}
            <Card.Img
              src={getOfficeAsset()}
              alt="Apartment"
              width="100%"
              height="225"
              className="rounded-top"
            />
            {/* </Card.Header> */}

            <Card.Body>
              <p className="flex-center-general fs-5">Offices</p>
              <p className="card-text flex-center-general">
                Find Offices around your area for rent or sale.
              </p>
            </Card.Body>
            <Card.Footer>
              <div className="flex-center-general">
                <div
                  className="link-general link-size-small px-3 py-2"
                  role="button"
                  onClick={() => onLinkClick(OFFICE_KEY)}
                >
                  Find Offices
                </div>
              </div>
            </Card.Footer>
          </Card>
        </div>
        <div className="col">
          <Card>
            {/* <Card.Header> */}
            <Card.Img
              src={getCommercialPropertyAsset()}
              alt="Apartment"
              width="100%"
              height="225"
              className="rounded-top"
            />
            {/* </Card.Header> */}

            <Card.Body>
              <p className="flex-center-general fs-5">Commercial Properties</p>
              <p className="card-text flex-center-general">
                Find Commercial Properties around your area for rent or sale.
              </p>
            </Card.Body>
            <Card.Footer>
              <div className="flex-center-general">
                <div
                  className="link-general link-size-small px-3 py-2"
                  role="button"
                  onClick={() => onLinkClick(COMMERCIAL_PROPERTY_KEY)}
                >
                  Find Commercial Properties
                </div>
              </div>
            </Card.Footer>
          </Card>
        </div>
        <div className="col">
          <Card>
            {/* <Card.Header> */}
            <Card.Img
              src={getHallAsset()}
              alt="Apartment"
              width="100%"
              height="225"
              className="rounded-top"
            />
            {/* </Card.Header> */}

            <Card.Body>
              <p className="flex-center-general fs-5">Halls</p>
              <p className="card-text flex-center-general">
                Find Halls around your area for rent or sale.
              </p>
            </Card.Body>
            <Card.Footer>
              <div className="flex-center-general">
                <div
                  className="link-general link-size-small px-3 py-2"
                  role="button"
                  onClick={() => onLinkClick(HALL_KEY)}
                >
                  Find Halls
                </div>
              </div>
            </Card.Footer>
          </Card>
        </div>
        <div className="col">
          <Card>
            {/* <Card.Header> */}
            <Card.Img
              src={getAllPurposePropertyAsset()}
              alt="Apartment"
              width="100%"
              height="225"
              className="rounded-top"
            />
            {/* </Card.Header> */}

            <Card.Body>
              <p className="flex-center-general fs-5">All Purpose Properties</p>
              <p className="card-text flex-center-general">
                Find All Purpose Properties around your area for rent or sale.
              </p>
            </Card.Body>
            <Card.Footer>
              <div className="flex-center-general">
                <div
                  className="link-general link-size-small px-3 py-2"
                  role="button"
                  onClick={() => onLinkClick(ALL_PURPOSE_PROPERTY_KEY)}
                >
                  Find All Purpose Properties
                </div>
              </div>
            </Card.Footer>
          </Card>
        </div>
        <div className="col">
          <Card>
            {/* <Card.Header> */}
            <Card.Img
              src={getLandAsset()}
              alt="Apartment"
              width="100%"
              height="225"
              className="rounded-top"
            />
            {/* </Card.Header> */}

            <Card.Body>
              <p className="flex-center-general fs-5">Lands</p>
              <p className="card-text flex-center-general">
                Find Lands around your area for rent or sale.
              </p>
            </Card.Body>
            <Card.Footer>
              <div className="flex-center-general">
                <div
                  className="link-general link-size-small px-3 py-2"
                  role="button"
                  onClick={() => onLinkClick(LAND_KEY)}
                >
                  Find Lands
                </div>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyAlbum;
