import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ResumeIcon = ({ color = "#332c49", size = 24 }) => {
    return <FontAwesome name="print" size={size} color={color} />;
}

export default ResumeIcon;
