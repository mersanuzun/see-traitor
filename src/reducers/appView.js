import * as types from '../actions/types';

const initialState = {
    userListTab: {
        activeTab: "followers"
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_USERLIST_TAB:
        console.log(action)
            return {
                ...state,
                userListTab: {
                    ...state.userListTab,
                    activeTab: action.data
                }
            }

        case types.FETCHED_FOLLOWERS_FOLLOWINGS:
        return {
            ...state,
            userListTab: {
                ...state.userListTab,
                activeTab: "followers"
            }
        }
        default:
            return state;
    }
}