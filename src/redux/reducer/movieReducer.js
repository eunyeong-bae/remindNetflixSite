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
    currentPage: null,
}
function movieReducer(state=initalState, action) {
    let {type, payload} = action;

    switch(type) {
        case "GET_MOVIES_REQUEST":
            return {...state, loading:true}
        case "SET_CURRENT_PAGE":
            return {...state, currentPage: payload.currentPage}
        case "GET_MOVIE_SUCCESS":
            return {...state,
                popularMovies: payload.popularMovies,
                topRatedMovies: payload.topRatedMovies,
                upcomingMovies: payload.upcomingMovies,
                genreList: payload.genreList,
                banner: false,
                loading: false,
                currentPage: null,
            }
        case "GET_MOVIE_DETAIL":
            return {...state, 
                detailMovie: payload.detailMovie, 
                genreList: payload.genreList,
                movieReviews: payload.movieReviews,
                recommandations: payload.recommandations,
                movieVideo: payload.movieVideo,
                banner: true,
                loading: false,
                currentPage: null,
            }
        case "GET_MOVIES_FAILURE":
            return {...state, loading:false}
        default:
            return {...state}
    }
}

export default movieReducer;