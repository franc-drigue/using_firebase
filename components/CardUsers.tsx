import {
    View,
    Text,
    TouchableOpacity
} from "react-native";
import {Ionicons, FontAwesome} from "@expo/vector-icons"

interface userProps {
    name: string;
}

export default function CardUsers({name}: userProps) {
    return(
        <View className={styles.containerCard}>
           <Text>
             {name}
           </Text>
           <TouchableOpacity>
             <Ionicons name="trash" size={32} color={"#FF0000"}/>
           </TouchableOpacity>
        </View>
    )
}


const styles = {
    containerCard: `py-[8px] flex-row justify-between bg-[#DCDCDC] my-[7px] px-[8px] items-center rounded`
}