import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';


const initialState = {
  prominantDisclosure: false,
  wakeUpTime: null,
  bedTime: null,
  weight: null,
  dailyIntake: null,

};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'prominantDisclosure', 'wakeUpTime', 'bedTime', 'weight', 'dailyIntake',
  ], //it will  save in persist load from initial state object
};

_update = (key, value) => {
  let t = Object.create(initialState);
  t[key] = value;
  return t;
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROMINANT_DISCLOSOURE':
      return { ...state, prominantDisclosure: action.value }
    case 'SET_WAKE_UP_TIME':
      return { ...state, wakeUpTime: action.value }
    case 'SET_BED_TIME':
      return { ...state, bedTime: action.value }
    case 'SET_DAILY_INTAKE':
      return { ...state, dailyIntake: action.value }
    case 'SET_WEIGHT':
      return {...state, weight: action.value}
  }
  return state;
};

export default persistReducer(persistConfig, userReducer);
