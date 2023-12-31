let initalState = {
    activePage: 1,
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
        sort: '',
        score:[0, 10],
        genre: '',
        year:[0, 2023],
    },
    favoriteMovies:{
        currentPg: 'Favorite',
        results: [],
    },
}

function movieReducer(state=initalState, action) {
    let {type, payload} = action;
    const removeFavoriteMovie = type === "REMOVE_FAVORITE_MOVIE_SUCCESS" 
        && state.favoriteMovies.results.filter(item => JSON.stringify(item) !== JSON.stringify(payload.favoriteMovies));
    
    switch(type) {
        case "GET_MOVIES_REQUEST":
            return {...state, loading:true}
        case "SET_CURRENT_PAGE":
            return {...state, 
                currentPage: payload.currentPage
            }
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
                activePage: payload.activePage,
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
                loading:false,
            }
        case "GET_SORT_FILTER_MOVIE_SUCCESS":
            return {...state, 
                searchMovies: payload.searchMovies,
                filterValue: {
                    sort: payload.filterValue.sort,
                    score: payload.filterValue.score,
                    genre: payload.filterValue.genre,
                    year: payload.filterValue.year,
                },
                loading:false,
            }
        case "SET_FAVORITE_MOVIE_SUCCESS":
            return {...state, 
                favoriteMovies: {
                    ...state.favoriteMovies,
                    results: [
                        ...state.favoriteMovies.results, 
                        payload.favoriteMovies
                    ]
                }
            }
        case "REMOVE_FAVORITE_MOVIE_SUCCESS":
            return {...state,
                favoriteMovies: {
                    ...state.favoriteMovies,
                    results: removeFavoriteMovie.length === 0 ? [] : removeFavoriteMovie
                }
            }
        case "GET_MOVIES_FAILURE":
            return {...state, loading:false}
        default:
            return {...state}
    }
}

export default movieReducer;