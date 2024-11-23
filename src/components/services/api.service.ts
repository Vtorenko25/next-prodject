import {base, baseId, genres, token} from "@/components/constants/urls";
import {Imoviees} from "@/components/models/Imoviess";
import {Igenre} from "@/components/models/Imovies";



export const urlBuilder = {
    moviesBaseUrl: (newPage: number) => `/movie?language=uk-UA&page=${newPage}`,
    allMovies: (newPage: number) => base + urlBuilder.moviesBaseUrl(newPage),
    movieBaseUrl:(id:string) => `/movie/${id}?language=uk-UA`,
    movie:(id:string) => baseId + urlBuilder.movieBaseUrl(id),
    movieGenresUrl:() => genres,
};

export const movieService = {
    getMovies: async (newPage: number): Promise<Imoviees> => {
        try {
            const response = await fetch(urlBuilder.allMovies(newPage), {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    },
    getMovie: async (id: string) => {
        try{
            const response= await fetch(urlBuilder.movie(id), {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.json();
        }
        catch (error) {
            console.error("Error fetching movie:", error);
            throw error;
        }
    },
    getGenres: async  ():Promise<Igenre> => {
        try {
            const response = await fetch(urlBuilder.movieGenresUrl(), {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error("Error fetching genres:", error);
            throw error;
        }
    }
};

