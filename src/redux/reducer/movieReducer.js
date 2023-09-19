let initalState = {
    popularMovies: {},
    topRatedMovies: {},
    upcomingMovies: {},
    loading: true,
}
function movieReducer(state=initalState, action) {
    let {type, payload} = action;

    switch(type) {
        case "GET_MOVIES_REQUEST":
            return {...state, loading:true}
        case "GET_MOVIE_SUCCESS":
            return {...state,
                popularMovies: payload.popularMovies,
                topRatedMovies: payload.topRatedMovies,
                upcomingMovies: payload.upcomingMovies,
                loading: false,
            }
        case "GET_MOVIES_FAILURE":
            return {...state, loading:false}
        default:
            return {...state}
    }
}

export default movieReducer;