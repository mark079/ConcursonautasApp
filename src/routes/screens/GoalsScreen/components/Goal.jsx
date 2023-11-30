import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import { api } from '../../../../services/api';
import { formatDateForBR } from "../../../../helpers/formatDateForBR";
import * as Progress from 'react-native-progress';

export const Goal = ({ content_to_study, test_date, type, id, studyBlocksCount, studyBlocksCountCompleted, navigation, loadData }) => {
    const remove = () => {
        api.delete(`/goals/${id}`).then(() => loadData());        
    };
    return (
        <View>
            <View

                style={styles.goalContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.content}>
                        <Text style={styles.text}>Conteúdo: {content_to_study}</Text>
                        <Text style={styles.text}>Data: {formatDateForBR(test_date)}</Text>
                        <Text style={styles.text}>Tipo: {type}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('DetailGoal', { goal_id: id })}>
                            <FontAwesome name="expand" size={30} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={remove}>
                            <Ionicons name="trash-outline" size={30} color="#FF5555" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.progressContainer}>
                    <Progress.Bar progress={studyBlocksCountCompleted / studyBlocksCount} width={250} height={15} />
                    <Text style={styles.text}>{`${studyBlocksCountCompleted}/${studyBlocksCount}`}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    goalContainer: {
        backgroundColor: '#282A36',
        width: 350,
        padding: 20,
        borderRadius: 6,
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    content: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    text: {
        color: 'white',
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 20
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 15,
    },
});
