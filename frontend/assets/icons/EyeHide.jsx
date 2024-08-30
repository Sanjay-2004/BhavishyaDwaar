import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const eyeHide = ({ className = "#332c49", size = 24 }) => {
    return <FontAwesome5 name="eye-slash" size={size} color={`${className}`} />
}

export default eyeHide