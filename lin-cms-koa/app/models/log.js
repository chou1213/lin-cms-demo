import sequelize from '../libs/db';
import { Model, Sequelize } from 'sequelize';

class Log extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      message: this.message,
      time: this.create_time,
      user_id: this.user_id,
      username: this.username,
      status_code: this.status_code,
      method: this.method,
      path: this.path,
      permission: this.permission
    };
    return origin;
  }

  static createLog (args, commit) {
    const log = Log.build(args);
    commit && log.save();
    return log;
  }
}

Log.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: Sequelize.STRING({ length: 450 })
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING(20)
    },
    status_code: {
      type: Sequelize.INTEGER
    },
    method: {
      type: Sequelize.STRING(20)
    },
    path: {
      type: Sequelize.STRING(50)
    },
    permission: {
      type: Sequelize.STRING(100)
    }
  },
  {
    sequelize,
    tableName: 'lin_log',
    modelName: 'log',
    createdAt: 'create_time',
    updatedAt: 'update_time',
    deletedAt: 'delete_time',
    paranoid: true,
    getterMethods: {
      createTime () {
        // @ts-ignore
        return new Date(this.getDataValue('create_time')).getTime();
      },
      updateTime () {
        // @ts-ignore
        return new Date(this.getDataValue('update_time')).getTime();
      }
    }
  }
);

export { Log as LogModel };
