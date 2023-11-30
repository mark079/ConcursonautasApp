import { useEffect, useState } from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export const NewGoalScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            title: 'Nova Meta'
        });
        setContentToStudy(content_to_study[selectType][0]);
    }, []);

    const [selectType, setSelectType] = useState('C');
    const [selectContentToStudy, setContentToStudy] = useState();

    // Quando a categoria for trocado ele atualiza a sub categoria
    useEffect(() => {
        setContentToStudy(content_to_study[selectType][0])
    }, [selectType]);

    // date picker
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Selecione');

    const [error, setError] = useState(undefined);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setText(fDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode)
    };

    const type = [
        { key: 'C', value: 'Concurso' },
        { key: 'V', value: 'Vestibular' }
    ];
    const content_to_study = {
        'C': [
            'PRF',
            'Recita Federal',
            'Banco Central'
        ],
        'V': [
            'ENEM',
            'USP',
            'Unicamp'
        ]
    };

    const dataCaptureAndSendForSchedulesScreen = () => {
        setError(undefined);
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 8);
        if (new Date(date) >= currentDate) {
            return navigation.navigate('Schedules', {
                user_id: 1,
                type: selectType,
                test_date: `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`,
                content_to_study: selectContentToStudy
            });
        } else {
            setError('A data precisa ser uma semana depois de hoje');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.picker}
                    selectedValue={selectType}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectType(itemValue)
                    }>
                    {type.map(el => <Picker.Item key={el.key} label={el.value} value={el.key} />)}
                </Picker>
            </View>

            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.picker}
                    selectedValue={selectContentToStudy}
                    onValueChange={(itemValue, itemIndex) =>
                        setContentToStudy(itemValue)
                    }>
                    {content_to_study[selectType].map(el => <Picker.Item key={el} label={el} value={el} />)}
                </Picker>
            </View>

            <View>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => showMode('date')}>
                    <Text style={styles.buttonText}>
                        Data da Prova: {text}
                    </Text>
                </TouchableOpacity>
                {
                    error &&
                    <View>
                        <Text style={{ alignSelf: 'center', color: 'red' }}>
                            {error}
                        </Text>
                    </View>
                }
                {show && <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    display='default'
                    is24Hour={true}
                    onChange={onChange}
                />}
            </View>

            <TouchableOpacity
                style={[styles.buttonContainer, { backgroundColor: '#BD93F9' }]}
                onPress={dataCaptureAndSendForSchedulesScreen}
            >
                <Text style={[styles.buttonText, { color: '#000' }]}>Adicionar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#44475A",
        paddingHorizontal: 30,
        gap: 20
    },
    pickerContainer: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#282A36'
    },
    picker: {
        color: '#fff',
        backgroundColor: '#282A36'
    },
    buttonContainer: {
        backgroundColor: '#282A36',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700'
    }
});
