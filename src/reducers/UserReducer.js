const initialState = {
    avatar: '',
    userservices: [],
    useravailability: []
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setAvatar':
                return {...state, avatar: action.payload.avatar};
            break;
    
        default:
            return state;
    }
};

export default UserReducer;