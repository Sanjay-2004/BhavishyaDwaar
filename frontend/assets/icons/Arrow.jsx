import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Arrow = ({ color = "#332c49", size = 24, name }) => {
    if (name === "left") {
        return (
            <FontAwesome5 name="arrow-left" size={size} color={color} />
        );
    }
    return (
        <FontAwesome5 name="arrow-right" size={size} color={color} />
    );
}

export default Arrow;