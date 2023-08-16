import React, {useEffect} from 'react';
import Layout from '../Layout';
import '../Orders.css';
import {RiHotelBedLine} from "react-icons/ri";
import moment from "moment/moment";
import {FaPlane} from "react-icons/fa";
import axios from "axios";

export default function Orders(props) {

    const saveOrder= async ()=> {
        console.log(props.checkVacation._id)

        const Data = {

            userId:props.user,
            cardId:props.checkVacation._id
        }
        try {
             await axios.post("http://localhost:3001/order/add",Data);
        } catch (error){
            console.error(error);
        }

    }
    const deleteOrder = async ()=>{

    }
    const getOrders = async ()=>{
        const res= await axios.get(`http://localhost:3001/order/${props.user}`)
        const data = res.data.orders;
        console.log(data)
    }
    useEffect(()=>{
        getOrders()
    },[props.checkVacation !== null])

    return (
        <Layout>
            {props.checkVacation &&<div className="mainOrder">
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
        <span className="details">{props.checkVacation.Parking && <h1>{props.checkVacation._id}</h1>}</span>
        <button onClick={saveOrder}>save</button>
        <button onClick={deleteOrder}>delete</button>
        <button>pay</button>
    </div>

</div>}
        </Layout>
    );
}
