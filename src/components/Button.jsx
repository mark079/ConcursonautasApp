import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Button = ({ title, onPress, isLoading = false, disabled, bg = "#50FA7B" }) => {
    return (
        <View>
            <TouchableOpacity style={[styles.button, {backgroundColor: bg}]} onPress={onPress} disabled={isLoading || disabled}>
                {isLoading ?
                    <ActivityIndicator color={'#282A36'} size={30} />
                    :
                    <Text style={styles.buttonTitle}>{title}</Text>
                }
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#50FA7B',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTitle: {
        color: '#282A36',
        fontSize: 16,
        fontWeight: '700'
    }
});