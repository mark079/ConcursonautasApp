import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '../../../components/Button';
import { api } from '../../../services/api';
import { Card } from './components/ScheduleCard';

export const ScheduleScreen = ({ route, navigation }) => {
    const params = route.params;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            title: 'Horários',
        });
    }, []);

    const daysOfWeek = [
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
        'Domingo',
    ];

    const [schedules, setSchedules] = useState({});
    const [buttonText, setButtonText] = useState('Cadastrar');

    const updateSchedule = (day, schedule) => {
        setSchedules((prevSchedules) => ({ ...prevSchedules, [day]: schedule }));
    };

    const isButtonDisabled = !Object.values(schedules).some(Boolean);


    const registerData = () => {
        let goal_id;
        setIsLoading(true);
        const date = new Date(params.test_date);
        const dataToSend = {
            user_id: 1,
            type: params.type,
            test_date: `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
                '0' + date.getDate()
            ).slice(-2)}`,
            content_to_study: params.content_to_study,
        };

        api.post('/goals', dataToSend).then(async response => {
            goal_id = response.data.data.id;

            try {
                const form = daysOfWeek.map((day, index) => ({
                    weekday: index + 1,
                    user_id: 1,
                    goal_id: goal_id,
                    start_time: schedules[day],
                }));

                const filteredForm = form.filter((item) => item.start_time);

                await api.post('/schedules', filteredForm);

                await api.post('/study-blocks', {
                    goal_id: goal_id,
                });

                setIsLoading(false);

                setTimeout(() => {
                    return navigation.navigate('DetailGoal', { goal_id });
                }, 2000);
            } catch (error) {
                setIsLoading(false);
                setButtonText('Aconteceu algo de errado');
                // caso ocorra algum erro ele apagará a meta e, em cascata, seus relacionamentos
                api.delete(`/goals/${goal_id}`).then(() => {
                    setTimeout(() => {
                        return navigation.navigate('Goals');
                    }, 2000);
                });
            }
        });
    };

    return (
        <View style={styles.container}>
            {daysOfWeek.map((day) => (
                <Card key={day} title={day} setSchedule={(schedule) => updateSchedule(day, schedule)} />
            ))}
            <Button title={buttonText} onPress={registerData} isLoading={isLoading} disabled={isButtonDisabled} bg={isButtonDisabled ? '#44475A' : '#BD93F9'} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#44475A',
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
});
