
import { LinRouter } from 'lin-mizar';
import { AddFlowValidator, EditFlowValidator, DeleteFlowValidator } from '../../validators/flow';
import { groupRequired } from '../../middleware/jwt';
import { logger } from '../../middleware/logger';
import { FlowDao } from '../../dao/flow';
import { FLowService } from '../../service/flow';

const flowApi = new LinRouter({
  prefix: '/v1/flow'
});

// 权限
// 日志
// https://doc.cms.talelin.com/server/koa/authority_model.html#%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86

flowApi.linPost(
  'addFlow', // 唯一表示
  '/', // 路径
  {
    permission: '新增最新期刊',
    module: '最新期刊管理',
    mount: true
  },
  groupRequired, // 被 groupRequired 装饰的视图函数需登陆且被授予相应的权限后才可访问,
  logger('{user.username}新增最新期刊'),
  async ctx => {
    console.log(ctx);
    // 校验参数
    const v = await new AddFlowValidator().validate(ctx);

    await FlowDao.createFlow(v);

    // 返回成功
    ctx.success({
      msg: '最新期刊内容新增成功'
    });
  });

flowApi.get('/', async ctx => {
  // flow
  // 根据结果里面的art_id，type字段去查询相应的期刊内容
  // 格式化数据
  // 返回数据

  const flowList = await FLowService.getFlowList();
  ctx.json(flowList);
});

flowApi.linPut(
  'editFlow',
  '/:id',
  {
    permission: '编辑最新期刊列表',
    module: '最新期刊管理',
    mount: true
  },
  groupRequired,
  logger('{user.username}编辑了最新期刊'),
  async ctx => {
    const v = await new EditFlowValidator().validate(ctx);

    const id = v.get('path.id');
    const index = v.get('body.index');
    const type = v.get('body.type');
    const art_id = v.get('body.art_id');
    const status = v.get('body.status');

    await FlowDao.editFlow(id, index, type, art_id, status);
    ctx.success({
      msg: '最新期刊编辑成功'
    });
  }
);

flowApi.linDelete(
  'delFlow',
  '/:id',
  {
    permission: '编辑最新期刊列表内容',
    module: '最新期刊管理',
    mount: true
  },
  groupRequired,
  logger('{user.username}删除了最新期刊'),
  async ctx => {
    const v = await new DeleteFlowValidator().validate(ctx);
    const id = v.get('path.id');
    await FlowDao.deleteFlow(id);
    ctx.success({
      msg: '最新期刊列表内容删除'
    });
  });

module.exports = { flowApi };