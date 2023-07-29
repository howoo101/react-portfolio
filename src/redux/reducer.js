import axios from 'axios';
import { combineReducers } from 'redux';
import { config } from '../asset/apikey';

// action type
const SET_MEMBERS = 'SET_MEMBERS';
const SET_YOUTUBE = 'SET_YOUTUBE';

const getData = async (json) => {
	return (await axios.get(json)).data;
};

const initMember = (await getData(`${process.env.PUBLIC_URL}/DB/department.json`)).members;
const initYoutube = (
	await getData(
		`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${config.youtubePlayListId}&key=${config.youtubeApiKey}&maxResults=50`
	)
).items;

const memberReducer = (state = initMember, action) => {
	switch (action.type) {
		case SET_MEMBERS:
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

const youtubeReducer = (state = { youtuebe: initYoutube }, action) => {
	switch (action.type) {
		case SET_YOUTUBE:
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ memberReducer, youtubeReducer });
export default reducers;
