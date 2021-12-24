import React, { useContext } from 'react';
import { UserContext } from '../../App';
import image from '../Logo/Home.jpg';
import Ride from '../Ride/Ride';
import './Home.css'
const Home = () => {
    const style = {
        display: 'flex',
        margin: '40px',
        justifyContent: 'space-between'
    }
    const data = [
        {
            imgUrl: "https://imgd.aeplcdn.com/370x208/bw/models/bajaj-avenger-street-160-bs-vi20200211171236.jpg?q=85",
            name: "Bike"
        },
        {
            imgUrl: "https://media.istockphoto.com/photos/generic-red-suv-on-a-white-background-side-view-picture-id1157655660?k=20&m=1157655660&s=612x612&w=0&h=WOtAthbmJ9iG1zbKo4kNUsAGMe6-xM-E7a8TMxb5xmk=",
            name: "Car"
        },
        {
            imgUrl: "https://cms.eichertrucksandbuses.com/uploads/truck/sub-category/a933e5958e4a354cfb8d22665bd244fd.png",
            name: "Bus"
        },
        {
            imgUrl: "https://media.istockphoto.com/photos/red-highspeed-train-with-blurred-motion-picture-id457433171?k=20&m=457433171&s=612x612&w=0&h=Xx9WWF-YrRD8y28U3y6rIA_6ztXY0DAMLTS8HmqcT74=",
            name: "Train"
        }
    ]
    // const [data1, setData1] = useContext(UserContext);
    // setData1(data);
    return (
        <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${image})` }} className="Home">
            <div style={style}>
                {
                    data.map(data => <Ride data={data} />)
                }
            </div>
        </div>
    );
};

export default Home;