import React from "react";
import { Card, Carousel } from "react-bootstrap";

const ListingCard = ({ listing }) => {
  return (
    <div>
      <Card>
        <Carousel>
          {listing.property_images.map((image_obj, index) => (
            <Carousel.Item key={index}>
              <Card.Img
                variant="top"
                src={image_obj?.image}
                height={300}
                width="100%"
              />
              <Carousel.Caption>
                <h6>{image_obj?.label_name}</h6>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <div className="row mb-2">
          <div className="col-6 flex-center-general">
            <button type="button" className="btn-general-outline py-2 px-3">
              Detail
            </button>
          </div>
          <div className="col-6 flex-center-general">
            <button type="button" className="btn-general-outline py-2 px-3">
              Contact
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ListingCard;
