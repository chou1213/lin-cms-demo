import { LinRouter } from 'lin-mizar';
import { AddContentValidator, EditContentValidator, DeleteContentValidator } from '../../validators/content';
import { ContentService } from '../../service/content';
import { groupRequired } from '../../middleware/jwt';
import { logger } from '../../middleware/logger';

const contentApi = new LinRouter({
  prefix: '/v1/content'
});

// 权限
// 日志
// https://doc.cms.talelin.com/server/koa/authority_model.html#%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86

contentApi.linPost(
  'addContent', // 唯一表示
  '/', // 路径
  {
    permission: '添加期刊内容',
    module: '内容管理',
    mount: true
  },
  groupRequired, // 被 groupRequired 装饰的视图函数需登陆且被授予相应的权限后才可访问,
  logger('{user.username}添加期刊内容'),
  async ctx => {
    console.log(ctx);
    // 校验参数
    const v = await new AddContentValidator().validate(ctx);
    // return ctx.json(v.get('body'));

    // 执行业务逻辑
    // 新增内容
    await ContentService.addContent(v.get('body'));
    // 返回成功
    ctx.success({
      msg: '期刊内容新增成功'
    });
  });

contentApi.get('/', async ctx => {
  const contentList = await ContentService.getContentList();
  ctx.json(contentList);
});

contentApi.linPut(
  'editContent', // 唯一表示
  '/:id', // 路径
  {
    permission: '修改期刊内容',
    module: '内容管理',
    mount: true
  },
  groupRequired, // 被 groupRequired 装饰的视图函数需登陆且被授予相应的权限后才可访问,
  logger('{user.username}修改期刊'),
  async ctx => {
    const v = await new EditContentValidator().validate(ctx);
    const id = v.get('path.id');
    const params = v.get('body');

    await ContentService.editContent(id, params);
    ctx.success({
      msg: '期刊内容更新成功'
    });
  });

contentApi.linDelete(
  'delContent', // 唯一表示
  '/:id', // 路径
  {
    permission: '删除期刊内容',
    module: '内容管理',
    mount: true
  },
  groupRequired, // 被 groupRequired 装饰的视图函数需登陆且被授予相应的权限后才可访问,
  logger('{user.username}删除期刊'),
  async ctx => {
    const v = await new DeleteContentValidator().validate(ctx);
    const id = v.get('path.id');
    const type = v.get('query.type');

    await ContentService.deleteContent(id, type);
    ctx.success({
      msg: '期刊内容删除成功'
    });
  });

module.exports = { contentApi };