import axios from 'axios';
import { combineReducers } from 'redux';

// action type
const SET_MEMBERS = 'SET_MEMBERS';

async function getMembers() {
	return (await axios.get(`${process.env.PUBLIC_URL}/DB/department.json`)).data.members;
}

const initMember = await getMembers();

const memberReducer = (state = initMember, action) => {
	switch (action.type) {
		case SET_MEMBERS:
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ memberReducer });
export default reducers;
