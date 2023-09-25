import api from "../api"

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
                type:"GET_MOVIE_DETAIL",
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

export const movieAction = { 
    getMovies,
    getMovieDetails,
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