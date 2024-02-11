const pool = require('../db-connect');


async function selectAllMovies(){
    const sql = "SELECT * FROM movies_data;"

    const result = await pool.query(sql);

    return result.rows.map(row => convertMovieData(row));
}



//-----------------------------------------------------------------////
function convertMovieData(data){
    if (!data || data == Object.keys(data).length === 0) {
        return {};
    }
    return {
        id: data.id,
        title: data.title,
        rating: data.rating,
        price: Number(data.price),
        image: (data.image)
    }

}

module.exports = {
    getAllMovies : selectAllMovies 
}