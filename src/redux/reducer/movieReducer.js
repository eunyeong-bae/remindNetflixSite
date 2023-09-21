let initalState = {
    popularMovies: {},
    topRatedMovies: {},
    upcomingMovies: {},
    genreList: [],
    detailMovie: {},
    movieReviews: [],
    recommandations: [],
    movieVideo:[],
    banner: false, //false : home, true: movie Detail page
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
                genreList: payload.genreList,
                banner: false,
                loading: false,
            }
        case "GET_MOVIE_DETAIL":
            return {...state, 
                detailMovie: payload.detailMovie, 
                genreList: payload.genreList,
                movieReviews: payload.movieReviews,
                recommandations: payload.recommandations,
                movieVideo: payload.movieVideo,
                banner: true,
                loading: false
            }
        case "GET_MOVIES_FAILURE":
            return {...state, loading:false}
        default:
            return {...state}
    }
}

export default movieReducer;