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
    searchMovies:{},
    filterValue: {
        year:[1990, 2023],
        score:[0, 10]
    }
}
function movieReducer(state=initalState, action) {
    let {type, payload} = action;
    console.log("filtervalue: ", payload)

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
                searchMovies: {},
            }
        case "GET_MOVIE_DETAIL_SUCCESS":
            return {...state, 
                detailMovie: payload.detailMovie, 
                genreList: payload.genreList,
                movieReviews: payload.movieReviews,
                recommandations: payload.recommandations,
                movieVideo: payload.movieVideo,
                banner: true,
                loading: false,
                currentPage: null,
                searchMovies: {},
            }
        case "GET_SEARCH_MOVIE_SUCCESS":
            return {...state, 
                searchMovies: payload.searchMovies, 
                loading:false
            }
        case "GET_SORT_FILTER_MOVIE_SUCCESS":
            return {...state, 
                searchMovies: payload.searchMovies,
                filterValue: {
                    year: payload.filterValue.year,
                    score: payload.filterValue.score,
                }
            }
        case "GET_MOVIES_FAILURE":
            return {...state, loading:false}
        default:
            return {...state}
    }
}

export default movieReducer;