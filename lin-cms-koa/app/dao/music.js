
import { MusicModel } from '../models/music';
import { NotFound } from 'lin-mizar';

class Music {
  static async getMusicList () {
    const res = await MusicModel.findAll();
    return res;
  }

  static async addMusic (v) {
    const res = await MusicModel.create(v);
    return res;
  }

  static async editMusic (id, params) {
    const music = await MusicModel.findByPk(id);
    if (!music) {
      throw new NotFound();
    }

    const res = await music.update({ ...params });
    return res;
  }

  static async deleteMusic (id) {
    const res = await MusicModel.destroy({
      where: { id }
    });
    return res;
  }
}

export { Music as MusicDao };