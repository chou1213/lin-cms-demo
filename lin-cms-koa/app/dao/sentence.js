
import { SentenceModel } from '../models/sentence';
import { NotFound } from 'lin-mizar';

class Sentence {
  static async getSentenceList () {
    const res = await SentenceModel.findAll();
    return res;
  }

  static async addSentence (v) {
    const res = await SentenceModel.create(v);
    return res;
  }

  static async editSentence (id, params) {
    const sentenc = await SentenceModel.findByPk(id);
    if (!sentenc) {
      throw new NotFound();
    }

    const res = await sentenc.update({ ...params });
    return res;
  }

  static async deleteSentence (id) {
    const res = await SentenceModel.destroy({
      where: { id }
    });
    return res;
  }
}

export { Sentence as SentenceDao };