import { MovieModel } from '../models/movie';
import { NotFound } from 'lin-mizar';

class Movie {
  static async getMovieList () {
    const res = await MovieModel.findAll();
    return res;
  }

  static async addMovie (v) {
    const res = await MovieModel.create(v);
    return res;
  }

  static async editMovie (id, params) {
    const movie = await MovieModel.findByPk(id);
    if (!movie) {
      throw new NotFound();
    }

    const res = await movie.update({ ...params });
    return res;
  }

  static async deleteMovie (id) {
    const res = await MovieModel.destroy({
      where: { id }
    });
    return res;
  }
}

export { Movie as MovieDao };