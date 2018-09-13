import * as types from './types';
import axios from 'axios';
const githubApiUrl = "https://api.github.com"

export const fetchFollowersAndFollowings = (username) => {
    return (dispatch) => {
        dispatch({
            type: types.FETCH_FOLLOWERS_FOLLOWINGS
        });

        Promise.all([
            axios.get(`${githubApiUrl}/users/${username}/followers`),
            axios.get(`${githubApiUrl}/users/${username}/following`)
        ]).then(res => {
            // console.log(res)
            const linkRegex = /<(https:\/\/[\w+\.\/]+\?page\=(\w+))>;\s+rel=["']last["']/g;
            const followers = res[0].data;
            const followings = res[1].data;

            const moreApiCalls = [
                {
                    type: "followers",
                    linksAsString: res[0].headers.link
                },
                {
                    type: "following",
                    linksAsString: res[1].headers.link
                }
            ].map((linksObj) => {
                if (linksObj.linksAsString) {
                    return Object.assign(
                        {
                            urls: linksObj.linksAsString.split(",").reduce((result, links) => {
                                const regexResult = linkRegex.exec(links.trim());
                                if (regexResult) return result.concat(
                                    Array.from(
                                        new Array(regexResult[2] - 1), (val, index) => index + 2
                                    ).map(page =>
                                        regexResult[1].replace(/\?page\=\d+/gi, `?page=${page}`)
                                    )
                                );

                                return result
                            }, [])
                        },
                        linksObj
                    )
                }

                return linksObj;
            }, []);
            Promise.all(
                moreApiCalls.map(call => {
                    return Promise.all(
                        call.urls ? (
                            call.urls.map(url => {
                                return axios.get(url)
                            })
                        ) : []
                    )
                })
            ).then(moreCallRes => {
                const followerRes = moreCallRes[0];
                const followingRes = moreCallRes[1];
                let moreFollowers = [];
                let moreFollowings = [];

                if (followerRes) {
                    moreFollowers = followerRes.reduce((result, next) => result.concat(next.data), [])
                    // console.log("r", moreFollowers)
                }

                if (followingRes) {
                    moreFollowings = followingRes.reduce((result, next) => result.concat(next.data), [])
                    // console.log("g", moreFollowings)
                }

                dispatch({
                    type: types.FETCHED_FOLLOWERS_FOLLOWINGS,
                    data: {
                        followers: moreFollowers.concat(followers),
                        followings: moreFollowings.concat(followings)
                    }
                });
                dispatch({
                    type: types.FIND_TRAITORS
                })
            })
        }).catch(err => {
            dispatch({
                type: types.FAILED_FETCH,
                data: err
            });
        });
    }
}

export const changeUserListTab = (newTab) => {
    return {
        type: types.CHANGE_USERLIST_TAB,
        data: newTab
    }
}

/*
<https://api.github.com/user/10096806/following?page=2>; rel="next", 
<https://api.github.com/user/10096806/following?page=2>; rel="last"
*/