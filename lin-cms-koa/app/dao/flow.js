
import { FlowModel } from '../models/flow';
import { NotFound } from 'lin-mizar';
// import { NotFound } from 'lin-mizar';

class flow {
  static async createFlow (v) {
    const res = await FlowModel.create({
      index: v.get('body.index'),
      type: v.get('body.type'),
      art_id: v.get('body.art_id'),
      status: v.get('body.status')
    });
    return res;
  }

  static async getFlowList () {
    const res = await FlowModel.findAll({ order: ['index'] });
    return res;
  }

  static async editFlow (id, index, type, art_id, status) {
    const flow = await FlowModel.findByPk(id);

    if (!flow) {
      throw new NotFound();
    }

    await flow.update({ index, type, art_id, status });
  }

  static async deleteFlow (id) {
    const test = await FlowModel.findAll();
    console.log(test);
    const flow = await FlowModel.findByPk(id);
    console.log(id);
    console.log(flow);

    if (!flow) {
      throw new NotFound();
    }

    await flow.destroy();
  }
}

export { flow as FlowDao };