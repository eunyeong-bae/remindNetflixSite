import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

function getMovies() {
    return async(dispatch, getState) => {
        try{
            dispatch({
                type:"GET_MOVIES_REQUEST",
            })
            const popularMovieApi = api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
            const topRatedMovieApi = api.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);;
            const upComingMovieApi = api.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);;
            const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en`);

            let [popularMovies, topRatedMovies, upcomingMovies, genreList] = await Promise.all([
                popularMovieApi, 
                topRatedMovieApi, 
                upComingMovieApi,
                genreApi
            ]);
    
            dispatch({
                type:"GET_MOVIE_SUCCESS",
                payload: {
                    popularMovies: popularMovies.data,
                    topRatedMovies: topRatedMovies.data,
                    upcomingMovies: upcomingMovies.data,
                    genreList: genreList.data.genres,
                }
            })
        } catch(e) {
            //error handling area
            dispatch({
                type:"GET_MOVIES_FAILURE",
            })
        }
    }
}

function getMovieDetails(movieId) {
    return async(dispatch, getState) => {
        try{
            dispatch({
                type:"GET_MOVIES_REQUEST"
            })
    
            const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en`);
            const movieDetailApi = api.get(`/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
            const movieReviewApi = api.get(`/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`)
            const recommandationApi = api.get(`/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
            const movieVideoApi = api.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
            
            let [ genreList, 
                  detailMovie, 
                  movieReviews, 
                  recommandations, 
                  movieVideo
                ] = await Promise.all([
                    genreApi, 
                    movieDetailApi,
                    movieReviewApi,
                    recommandationApi,
                    movieVideoApi
                ]);
                
                // console.log(movieVideo)
            dispatch({
                type:"GET_MOVIE_DETAIL_SUCCESS",
                payload: {
                    detailMovie: detailMovie.data,
                    genreList: genreList.data.genres,
                    movieReviews: movieReviews.data.results,
                    recommandations: recommandations.data.results,
                    movieVideo: movieVideo.data.results,
                }
            })
        }catch(e) {
            dispatch({
                type:"GET_MOVIES_FAILURE"
            })
        }
    }
}

function getSearchMovies(query){
    return async(dispatch, getState) => {
        try{
            dispatch({
                type:"GET_MOVIES_REQUEST"
            });

            const searchMovieLists = await api.get(`/search/movie?api_key=${API_KEY}&query=${query}`)
                .then((res) => {
                    return res.data;
                })
                .catch(e => {
                    console.log(e);
                    dispatch({
                        type:"GET_MOVIES_FAILURE"
                    });
                })

            dispatch({
                type:"GET_SEARCH_MOVIE_SUCCESS",
                payload:{
                    searchMovies: searchMovieLists
                }
            })
            // console.log("searchMovieLists:",searchMovieLists)
        }
        catch(e) {
            console.log(e);
            dispatch({
                type:"GET_MOVIES_FAILURE"
            });
        }
    }
}

function getSortFilterMovie(sortType, query){
    return async(dispatch, getState) => {
        try{
            dispatch({
                type:"GET_MOVIES_REQUEST"
            });

            console.log("yaer or score :",query)

            let sort_by = '';
            let with_genres = '';
            let year = '';
            let vote_average_gte = '';

            switch(sortType) {
                case "sort_by":
                    sort_by = query;
                    break;
                case "with_genres":
                    with_genres = query;
                    break;
                case "year":
                    year = query;
                    break;
                case "score":
                    vote_average_gte = query;
                    break;
                default:
                    break;
            }
            // console.log("check sort Type: ", sortType, year)
            const discoverMovies = await api.get(`/discover/movie?api_key=${API_KEY}&language=en-US&page=1&sort_by=${sort_by}&vote_average.gte=${vote_average_gte}&with_genres=${with_genres}&year=${year}`)
                .then((res) => {
                    return res.data;
                })
                .catch(e => {
                    console.log(e);
                    dispatch({
                        type:"GET_MOVIES_FAILURE"
                    })
                })
            
                // console.log(sortType," : ", discoverMovies)
            dispatch({
                type:"GET_SORT_FILTER_MOVIE_SUCCESS",
                payload: {
                    searchMovies: discoverMovies,
                    filterValue: {
                        year: sortType === 'year' && [query, 2023],
                        score: sortType === 'score' && [vote_average_gte, 10]
                    }
                }
            });
            
                
        }catch(e){
            dispatch({
                type:"GET_MOVIES_FAILURE"
            })
        }
    }
}

export const movieAction = { 
    getMovies,
    getMovieDetails,
    getSearchMovies,
    getSortFilterMovie,
}

/**
 * url 에서 중독되는 부분을 처리하는 방법
 * 
 * axios 사용하자
 * 
 * api 호출하는 방법 3 가지
 * 1. fetch (기본 내장 함수)
 * 2. ajax (jquery 에서 종종 사용)
 * 3. axios 라이브러리
 * 
 * 근데 사람들이 fetch 보다 axios 더 많이 사용한다
 * 이유 ?
 * 비슷하긴 하나, axios 가 좀 더 많은 기능을 제공해준다
 * - timeOut 
 * - baseUrl
 * - request 받을 때마다 print 할 수 있는 등의 기능 때문
 * 
 * 
 */