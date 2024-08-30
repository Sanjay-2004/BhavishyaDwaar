import React from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const UserIcon = ({ color = "#332c49", size = 24 }) => {
    return <FontAwesome5 name="user-alt" size={size} color={color} />;
}

export default UserIcon;
