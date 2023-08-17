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
import axios from "axios";

export default function Orders(props) {
    const saveOrder= async ()=> {
        const Data = {
            userId:props.user,
            cardId:props.checkVacation._id
        }
        try {
            await axios.post("http://localhost:3001/order/add",Data);
            props.setUpdateOrders(!props.updateOrders)
        } catch (error){
            console.error(error);
        }

    }
    const deleteOrder = async (event)=>{
    console.log(event._id)
        try {
            await axios.delete(`http://localhost:3001/order/del/${event._id}`);
            const filteredOrder = props.allOrders.filter(order =>order._id &&  order._id !== event._id);
            props.setAllOrders([...filteredOrder])
            props.setUpdateOrders(!props.updateOrders)


        } catch (e) {
            console.error(e);
        }

    }
    return (
        <Layout>
            {props.allOrders && props.allOrders.map(order =>(<div className="mainOrder">
                <div className="orderContent" key={order._id}>
                    <h2 className="orderTitle">{order.cardId?order.cardId.name_place:order.name_place}</h2>
                    <div className="orderPrice">
            <span className="discountedPrice">
              {order.cardId?order.cardId.price:order.price}
            </span>
                        <span className="originalPrice">
              {order.cardId?order.cardId.discount:order.discount}
            </span>
                    </div>
                        <span className="dates"><RiHotelBedLine />
    {order.cardId ? moment(order.cardId.check_in).format('DD-MM-YYYY') + ' -> ' + moment(order.cardId.check_out).format('DD-MM-YYYY') :
        moment(order.check_in).format('DD-MM-YYYY') + ' -> ' + moment(order.check_out).format('DD-MM-YYYY')}
</span>


                    <div className="iconRow">
                        <div className="iconColumnLeft">
                            <div className="iconWithCaption">
                                <FaPlane className="icon"/>
                                <span className="caption">{order.cardId? order.cardId.Flight_Details:order.Flight_Details}</span>
                            </div>
                            <div className="iconWithCaption">
                                <RiHotelBedLine className="icon"/>
                                <span className="caption">{order.cardId?order.cardId.PropertyType:order.PropertyType}</span>
                            </div>
                            {(order.cardId?order.cardId.Water_park:order.Water_park) && <div className="iconWithCaption">
                                <FaTree className="icon"/>
                                <span className="caption">Park</span>
                            </div>}
                            {(order.cardId?order.cardId.Pool:order.Pool) &&<div className="iconWithCaption">
                                <FaSwimmingPool className="icon"/>
                                <span className="caption">Pool</span>
                            </div>}
                        </div>
                        <div className="iconColumnRight">

                            {(order.cardId?order.cardId.Wifi:order.Wifi) &&<div className="iconWithCaption">
                                <FaWifi className="icon"/>
                                <span className="caption">WIFI</span>
                            </div>}
                            {(order.cardId?order.cardId.Restaurant:order.Restaurant) &&<div className="iconWithCaption">
                                <FaUtensils className="icon"/>
                                <span className="caption">Restaurant</span>
                            </div>}
                            {(order.cardId?order.cardId.Gym:order.Gym) &&<div className="iconWithCaption">
                                <FaDumbbell className="icon"/>
                                <span className="caption">Gym</span>
                            </div>}
                        </div>
                    </div>

                    <div className="buttonsRow">
                        {!order.cardId &&<button onClick={saveOrder}>Add to Cart</button>}
                        {order.cardId &&<button onClick={()=> deleteOrder(order)}>delete to Cart</button>}
                        <button>Pay</button>
                    </div>
                </div>
                <div className="orderPicture">
                    <img
                        src={`http://localhost:3001/images/${order.cardId?order.cardId.imageSrc:order.imageSrc}`}
                        alt="Destination Picture"
                    />
                </div>
            </div>
            ))}
        </Layout>
    );
}