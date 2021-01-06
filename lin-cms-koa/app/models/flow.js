import sequelize from '../libs/db';
import { Model, Sequelize } from 'sequelize';

class Flow extends Model {

}

Flow.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    index: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    type: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    art_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    status: {
      type: Sequelize.INTEGER
    }
  },
  {
    sequelize,
    // 表名
    tableName: 'flow',
    // 模型名
    modelName: 'flow',
    // 开启软删除
    paranoid: true,
    // 自动写入时间
    timestamps: true,
    // 重命名时间字段
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  }
);

export { Flow as FlowModel };