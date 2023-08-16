import React from 'react';
import Layout from '../Layout';
import '../Orders.css';
import { RiHotelBedLine } from "react-icons/ri";
import moment from "moment/moment";
import {
    FaDumbbell,
    FaPlane,
    FaSwimmingPool,
    FaTree,
    FaUtensils,
    FaWifi,
} from "react-icons/fa";

export default function Orders(props) {
    function handleClick() {}

    return (
        <Layout>
            <div className="mainOrder">
                <div className="orderContent">
                    <h2 className="orderTitle">{props.checkVacation.name_place}</h2>
                    <div className="orderPrice">
            <span className="discountedPrice">
              {props.checkVacation.price}
            </span>
                        <span className="originalPrice">
              {props.checkVacation.discount}
            </span>
                    </div>
                    <div className="iconRow">
                        <div className="iconColumnLeft">
                            <div className="iconWithCaption">
                                <FaPlane className="icon" />
                                <span className="caption">Flight</span>
                            </div>
                            <div className="iconWithCaption">
                                <RiHotelBedLine className="icon" />
                                <span className="caption">Hotel</span>
                            </div>
                            <div className="iconWithCaption">
                                <FaTree className="icon" />
                                <span className="caption">Park</span>
                            </div>
                            <div className="iconWithCaption">
                                <FaSwimmingPool className="icon" />
                                <span className="caption">Pool</span>
                            </div>
                        </div>
                        <div className="iconColumnRight">

                            <div className="iconWithCaption">
                                <FaWifi className="icon" />
                                <span className="caption">WIFI</span>
                            </div>
                            <div className="iconWithCaption">
                                <FaUtensils className="icon" />
                                <span className="caption">Restaurant</span>
                            </div>
                            <div className="iconWithCaption">
                                <FaDumbbell className="icon" />
                                <span className="caption">Gym</span>
                            </div>
                        </div>
                    </div>

                    <div className="buttonsRow">
                        <button onClick={handleClick}>Add to Cart</button>
                        <button>Pay</button>
                    </div>
                </div>
                <div className="orderPicture">
                    <img
                        src={`http://localhost:3001/images/${props.checkVacation.imageSrc}`}
                        alt="Destination Picture"
                    />
                </div>
            </div>
        </Layout>
    );
}
