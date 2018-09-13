import * as types from '../actions/types';

const initialState = {
    isFetching: false,
    error: null,
    data: {
        followers: [],
        followings: [],
        traitors: [],
        notFollowed: []
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_FOLLOWERS_FOLLOWINGS:
            return {
                ...state,
                isFetching: true
            }
        case types.FETCHED_FOLLOWERS_FOLLOWINGS:
            return {
                ...state,
                isFetching: false,
                error: null,
                data: {
                    followers: action.data.followers,
                    followings: action.data.followings,
                    traitors: [],
                    notFollowed: []
                }
            }
        case types.FAILED_FETCH:
            const message = action.data.response.status === 404 ? "Not Found" : "Servise Error"; 
            
            return {
                ...state,
                isFetching: false,
                error: {
                    statusCode: action.data.response.status,
                    message
                }
            }
        case types.FIND_TRAITORS:
            const notFollowed = state.data.followers.reduce((result, follower) => {
                return state.data.followings.find(following => following.id === follower.id) ? result : result.concat(follower);
            }, []);

            const traitors = state.data.followings.reduce((result, following) => {
                return state.data.followers.find(follower => follower.id === following.id) ? result : result.concat(following);
            }, []);

            return {
                ...state,
                data: {
                    ...state.data,
                    traitors,
                    notFollowed
                }
            }
        default:
            return state;
    }
}