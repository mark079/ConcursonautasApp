import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { api } from "../../../services/api";
import { Goal } from "./components/Goal";

export function GoalsScreen({ navigation }) {
    const [data, setData] = useState([]);
    const loadData = () => {
        api.get('/goals')
            .then(response => setData(response.data));
    };

    useEffect(() => {
        navigation.setOptions({
            title: 'Metas',
            headerRight: () => (
                <TouchableOpacity style={{ backgroundColor: "#6272A4", padding: 7, borderRadius: 5 }} onPress={() => navigation.navigate('NewGoal')}>
                    <Text style={{ color: "#fff" }}>Nova Meta</Text>
                </TouchableOpacity>
            ),
        });
        loadData();


        const unsubscribe = navigation.addListener('focus', () => {
            loadData();
        });

        return unsubscribe
    }, [navigation]);



    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#44475A" }}>
            {data.length >= 1 ?
                <FlatList
                    data={data}
                    renderItem={({ item }) => <Goal key={item.id} {...item} navigation={navigation} loadData={loadData}/>}
                    ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                    ListHeaderComponent={() => <View style={{ marginTop: 20 }} />}
                    ListFooterComponent={() => <View style={{ marginBottom: 20 }} />}
                />
                :
                <View>
                    <Text style={{ color: '#fff' }}>
                        Nenhuma meta cadastrada
                    </Text>
                </View>
            }
        </View>
    );
}