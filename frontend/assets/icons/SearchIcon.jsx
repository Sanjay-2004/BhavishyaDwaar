import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const SearchIcon = ({ color = "#332c49", size = 24 }) => {
    return <FontAwesome5 name="search" size={size} color={color} />;
}

export default SearchIcon;