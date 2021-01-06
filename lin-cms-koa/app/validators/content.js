import { LinValidator, Rule } from 'lin-mizar';

// 新增内容检验器
class AddContentValidator extends LinValidator {
  constructor () {
    super();

    this.image = [
      new Rule('isNotEmpty', '内容封面不能为空')
    ];

    this.type = [
      new Rule('isNotEmpty', '内容类型不能为空'),
      new Rule('isInt', '内容类型id必须为数字')
    ];

    this.title = [
      new Rule('isNotEmpty', '内容标题不能为空')
    ];

    this.content = [
      new Rule('isNotEmpty', '内容介绍不能为空')
    ];
    this.url = [
      new Rule('isOptional'),
      new Rule('isURL', '内容外链不必须是合法url地址')
    ];
    this.pubdate = [
      new Rule('isNotEmpty', '发布不能为空'),
      new Rule('isISO8601', '发布日期格式不正确')
    ];
    this.status = [
      new Rule('isNotEmpty', '内容有效状态为指定'),
      new Rule('isInt', '内容有效状态标识不正确')
    ];
  }
}

// 编辑内容校验器
class EditContentValidator extends AddContentValidator {
  constructor () {
    super();

    this.id = [
      new Rule('isNotEmpty', '期刊内容id不能为空'),
      new Rule('isInt', '期刊内容id必须是数字且大于0', { min: 1 })

    ];
  }
}

class DeleteContentValidator extends LinValidator {
  constructor () {
    super();

    this.id = [
      new Rule('isNotEmpty', '期刊内容id不能为空'),
      new Rule('isInt', '期刊内容id必须是数字且大于0', { min: 1 })
    ];

    this.type = [
      new Rule('isNotEmpty', '期刊类型不能为空'),
      new Rule('isInt', '期刊类型表示必须为数字')
    ];
  }
}

export { AddContentValidator, EditContentValidator, DeleteContentValidator };