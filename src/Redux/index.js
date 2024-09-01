//write Dispatch functions here
import { connect as _ } from 'react-redux';
import __ from './Reducer';

export function mapStateToProps(state) {
  return {
    prominantDisclosure: state.prominantDisclosure,
    wakeUpTime: state.wakeUpTime,
    bedTime: state.bedTime,
    weight: state.weight,
    dailyIntake: state.dailyIntake,
  };
}

//action functions to update redux state value
export function mapDispatchToProps(dispatch) {
  return {
    setPromininantDisclosoure: val => dispatch({ type: 'SET_PROMINANT_DISCLOSOURE', value: val }),
    setWakeUpTIme: val => dispatch({type: 'SET_WAKE_UP_TIME', value: val}),
    setBedTime: val => dispatch({type: 'SET_BED_TIME', value: val}),
    setDailyIntake: val => dispatch({type: 'SET_DAILY_INTAKE', value: val}),
    setWeight: val => dispatch({type: 'SET_WEIGHT', value: val}),
  };
}

export const connect = _;

export const Reducer = __;
