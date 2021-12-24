import { borderRadius, margin, textAlign } from '@mui/system';
import ManRoundedIcon from '@mui/icons-material/ManRounded';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Style/Style.css';
const Destination = () => {
    const { name } = useParams();
    const [data, setData] = useState({
        toPick: "",
        fromPick: ""
    });
    const [check, setCheck] = useState(false);
    console.log(check);
    console.log(data)
    const fackData = [
        "mirpur",
        "danmondi",
        "kolabagan",
        "kakrail",
        "kochukhat",
        "gulistan",
    ];
    const DriveImages = [
        {
            Bike: "https://imgd.aeplcdn.com/370x208/bw/models/bajaj-avenger-street-160-bs-vi20200211171236.jpg?q=85",
        
        },
        {
            Car: "https://imgd.aeplcdn.com/370x208/bw/models/bajaj-avenger-street-160-bs-vi20200211171236.jpg?q=85",
            
        },
        {
            Train: "https://imgd.aeplcdn.com/370x208/bw/models/bajaj-avenger-street-160-bs-vi20200211171236.jpg?q=85",
            
        },
        {
            Bus: "https://imgd.aeplcdn.com/370x208/bw/models/bajaj-avenger-street-160-bs-vi20200211171236.jpg?q=85",
            
        },
    ];
    const dat = DriveImages.map(dt => dt.name);
    console.log(dat);
    // const Rider = DriveImage.find(dt => dt === name);
    // console.log(Rider);
    const onBlur = (e) => {
        const getPlace = e.target.value;
        const matchPlace = fackData.find(dt => dt === getPlace)
        if (matchPlace) {
            console.log("match data")
            const stateValue = { ...data };
            stateValue[e.target.name] = e.target.value;
            setData(stateValue);
        }
    }
    const handleSubmit = (e) => {
        if (data.toPick && data.fromPick) {
            setCheck(!check);
        }
        else {
            alert("Wrong Place Type!!")
        }
        e.preventDefault();
    }
    const style1 = {
        width: "180px",
        height: "30px",
        margin: "5px",
        color: "white",
        borderRadius: "5px",
        backgroundColor: "red",
        border: "none"
    };
    const style2 = {
        backgroundColor: "pink",
        height: "400px",
        padding: "10px",
        borderRadius: "5px",
    }
    return (
        <div className='style1'>
            <div style={style2}>
                <form action="" onSubmit={handleSubmit}>
                    {check ? <div>
                        <div style={{ backgroundColor: "tomato", padding: "2px", borderRadius: "5px", color: "white" }}>
                            <h4>{data.toPick}</h4>
                            <h4>{data.fromPick}</h4>
                        </div>
                        <div className='style1' style={{ backgroundColor: "white", padding: "10px", borderRadius: "5px" }}>
                            <div>{name}</div>
                            <div><ManRoundedIcon /><b>4</b></div>
                            <div style={{ paddingLeft: "50px" }}>$65</div>
                        </div>
                        <div className='style1' style={{ backgroundColor: "white", padding: "10px", borderRadius: "5px" }}>
                            <div>{name}</div>
                            <div><ManRoundedIcon /><b>4</b></div>
                            <div style={{ paddingLeft: "50px" }}>$65</div>
                        </div>
                        <div className='style1' style={{ backgroundColor: "white", padding: "10px", borderRadius: "5px" }}>
                            <div>{name}</div>
                            <div><ManRoundedIcon /><b>4</b></div>
                            <div style={{ paddingLeft: "50px" }}>$65</div>
                        </div>
                    </div>
                        : <div><p>Pick From</p>
                            <input type="text" name="fromPick" onBlur={onBlur} id="" />
                            <br />
                            <p>Pick to</p>
                            <input type="text" name="toPick" onBlur={onBlur} id="" />
                            <br />
                            <input type="submit" value="Search" style={style1} />
                        </div>
                    }
                </form>
            </div>
            <div>
                <iframe src="https://www.google.com/maps/d/embed?mid=1Ud5DRnqhKifdeHQ0wjENsGgLp_0&ehbc=2E312F" width="640" height="480"></iframe>
            </div>
        </div>
    );
};

export default Destination;