import { FlowDao } from '../dao/flow';
import { NotFound } from 'lin-mizar';
import { MovieModel } from '../models/movie';
import { MusicModel } from '../models/music';
import { SentenceModel } from '../models/sentence';

class FLow {
  static async getFlowList () {
    const flowList = await FlowDao.getFlowList();
    if (flowList.length === 0) {
      return flowList;
    }

    const newFlowList = [];

    for (let i = 0; i < flowList.length; i++) {
      let detail;
      switch (flowList[i].type) {
        case 100:
          detail = await MovieModel.findByPk(flowList[i].art_id);
          break;
        case 200:
          detail = await MusicModel.findByPk(flowList[i].art_id);
          break;
        case 300:
          detail = await SentenceModel.findByPk(flowList[i].art_id);
          break;
        default:
          throw new NotFound();
      }
      flowList[i].setDataValue('detail', detail);
      newFlowList.push(flowList[i]);
    }
    console.log(newFlowList);
    return newFlowList;
  }
}

export { FLow as FLowService };