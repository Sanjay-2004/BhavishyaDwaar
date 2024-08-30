import React from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const ListIcon = ({ color = "#332c49", size = 24 }) => {
    return <FontAwesome5 name="list-alt" size={size} color={color} />;
}

export default ListIcon;
