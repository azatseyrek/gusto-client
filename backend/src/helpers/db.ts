export const serializeArray = (arrStr: string) => arrStr.split(",");

type ArrayString = string[] | number[];
export const convertArrayToDBString = (arr: ArrayString) => arr.join(",");

export const pushToDBArray = (dbArrStr:string, item:string|number) => {
    const tempArr = serializeArray(dbArrStr);

    if(!tempArr.includes(item.toString())) tempArr.push(item.toString());

    return convertArrayToDBString(tempArr);
};

export const deleteItemFromDBArray = (dbArrStr: string, item: string|number) => {
    const tempArr = serializeArray(dbArrStr).filter(el=>el===item.toString());

    return convertArrayToDBString(tempArr);
};

export const countDBArray = (dbArrStr: string) => serializeArray(dbArrStr).length-1;





const movie = {
    id:1,
    name: "Titanic",
    likes: "1,2,3,4",
}


// const like_controller = (req, res) => {
//     const { user_id, movie_id } = req.body;

//     // const movieObj = await Movie.find({movie_id});

//     // const newArray = pushToDBArray(movie.likes, user_id);

//     // Movie.update(movie_id, { likes: newArray })

//     const movieLikes = serializeArray(movie.likes); // [1,2,3]

//     // If user already liked
//     if(movieLikes.includes("user_id")) {
//         res.status(400).send({message: "Already liked!"})
//     } else {
//         const newLikeArray = pushToDBArray(movie.likes, user_id);

//         const newMovie = await Movie.update(movie_id, { likes: newLikeArray })

//         res.status(200).send({message:"Successfully liked"})
//     }
// };

// //     /movie/1

// function getMovieById(req,res){
//     const movie = Movies.find({movie_id: req.body.movie_id})

    

    
//     movie.likeCount = countDBArray(movie.likes)
//     movie.likeDisabled = serializeArray(movie.likes).includes(req.user.id);

//     {
//         id:1,
//         name: "Titanic",
//         likes: "1,2,3,4",
//         likeCount: 4,
//         likeDisabled: false,
//     }
//     res.send(movie)
// }
