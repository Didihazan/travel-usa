import React from 'react';
import Layout from '../Layout';
import '../Orders.css';
import {RiHotelBedLine} from "react-icons/ri";
import moment from "moment/moment";
import {FaPlane} from "react-icons/fa";

export default function Orders(props) {

    function handleClick() {

    }

    return (
        <Layout>
<div className="mainOrder">
    <div className="picture">
        <img src={`http://localhost:3001/images/${props.checkVacation.imageSrc}`} alt="Destination Picture" />
    </div>
    <div className="content">
        <h2>{props.checkVacation.name_place}</h2>
        <div className="title">
            <span className="price">{props.checkVacation.price}</span>
            <span className="discount">{props.checkVacation.discount}</span>
        </div>
        <div className="hotel">
            <RiHotelBedLine />
            <span className="dates"> {moment(props.checkVacation.check_in).format('DD-MM-YYYY')} -> {moment(props.checkVacation.check_out).format('DD-MM-YYYY')}</span>
        </div>
        <div className="flight">
            <FaPlane />
            <span className="details">{props.checkVacation.Flight_Details}</span>
        </div>
        <span className="details">{props.checkVacation.Parking && <h1>ff</h1>}</span>
        <button onClick={handleClick}>save</button>
        <button>pay</button>
    </div>


</div>
        </Layout>
    );
}
