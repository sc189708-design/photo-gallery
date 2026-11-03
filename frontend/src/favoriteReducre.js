export const favoriteReducre = (state, action) => {
    switch (action.type) {
        case "TOGGLE_FAV":
            if (state.includes(action.photoId)) {
                return state.filter((id) => id !== action.photoId)
            }
            return ([...state, action.photoId])
        default:
            return state;
    }   
};