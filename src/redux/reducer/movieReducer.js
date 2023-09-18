let initalState = {
    popularMovies: {},
    topRatedMovies: {},
    upcomingMovies: {},
}
function movieReducer(state=initalState, action) {
    let {type, payload} = action;

    switch(type) {
        case "GET_MOVIE_SUCCESS":
            return {...state,
                popularMovies: payload.popularMovies,
                topRatedMovies: payload.topRatedMovies,
                upcomingMovies: payload.upcomingMovies,
            }
        default:
            return {...state}
    }
}

export default movieReducer;