import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [data, setData] = useContext(UserContext);
    const location = useLocation();
    console.log(data.displayName);
    if (!data.displayName) {
        return <Navigate to="/login" state={{ from: location }} />;
    };
    return children;
};

export default PrivateRoute;