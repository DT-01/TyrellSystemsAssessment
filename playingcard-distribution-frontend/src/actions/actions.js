// Actions Type
export const GET_PLAYERHANDS = 'get_playerhands';
export const SET_PLAYERHANDS = 'set_playerhands';
// Actions
export const getPlayerHands = () => ({
    type: GET_PLAYERHANDS,
});

export const setPlayerHands = (playerHandsList) => ({
    type: SET_PLAYERHANDS,
    payload: {
        playerHandsList
    },
});