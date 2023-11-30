import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { api } from "../../../services/api";
import { Button } from "../../../components/Button";
import { formatDateForBR } from "../../../helpers/formatDateForBR";

const Card = ({ id, content, date, schedule, completed }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(completed);
    return (
        <View style={{
            backgroundColor: '#fff',
            width: 350,
            alignSelf: 'center',
            borderRadius: 10,
            padding: 15,
            justifyContent: 'space-between',
            gap: 15
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text style={{ fontSize: 15 }}>{formatDateForBR(date)}</Text>
                <Text style={{ fontSize: 15 }}>{schedule.weekday}</Text>
                <Text style={{ fontSize: 15 }}>{schedule.start_time}</Text>
            </View>
            <Text style={{ fontSize: 16, alignSelf: 'center' }} >{content}</Text>
            <View>
                <Button title={isCompleted ? 'Concluído' : 'Concluir'} isLoading={isLoading} bg={isCompleted ? "#50FA7B" : "#FFB86C"} onPress={() => {
                    setIsLoading(true);
                    api.put(`/study-blocks/${id}/atualizar`, {
                        completed: completed ? 0 : 1
                    })
                        .then(response => {
                            setIsCompleted(!isCompleted);
                            setIsLoading(false);
                        });
                }} />
            </View>
        </View>);
};

export const DetailGoalScreen = ({ route, navigation }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            title: 'Metas',
            headerLeft: () => (<>
                <Feather name="arrow-left" size={22} color="#fff" onPress={() => navigation.navigate('Goals')} style={{ marginRight: 20 }} />
            </>
            ),
        });
        loadData();

        // Adicionar listener para o evento de foco na tela
        const unsubscribe = navigation.addListener('focus', () => {
            // Carregar dados novamente quando a tela receber foco
            loadData();
        });

        return unsubscribe
    }, [navigation]);

    const loadData = () => {
        const { goal_id } = route.params;
        api.get(`/study-blocks?goal=${goal_id}`)
            .then(response => setData(response.data));
    };

    return (
        <View style={styles.container}>
            {data.length >= 1 ?
                <FlatList
                    data={data}
                    renderItem={({ item }) => <Card key={item.id} {...item} />}
                    ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                    ListHeaderComponent={() => <View style={{ height: 10 }} />}
                    ListFooterComponent={() => <View style={{ height: 10 }} />}
                />
                :
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Schedules', {
                        goal_id: route.params.goal_id
                    })}>
                        <Text style={{ color: '#fff' }}>
                            Nenhum horário cadastrado
                        </Text>
                        <Text style={{ color: '#fff' }}>
                            Clique aqui para cadastrar
                        </Text>
                    </TouchableOpacity>
                </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#44475A"
    }
});