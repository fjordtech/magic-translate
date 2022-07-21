import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeData = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
        return true
    } catch (error) {
        return false
    }
}

export const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return JSON.parse(value)
        }
    } catch (error) {
        return false
    }
}

export const clearData = async () => {
    try {
        await AsyncStorage.clear()
        return true
    }catch(error){
        return false
    }
}
