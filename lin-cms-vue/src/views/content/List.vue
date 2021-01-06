<template>
  <div class="container">
    <div class="title">期刊内容列表</div>
    <div class="add-button">
      <el-button type="primary"
                 @click="handAdd">添加内容</el-button>
    </div>
    <div class="table-container">
      <el-table :data="contentList">
        <el-table-column label="序号"
                         width="68"
                         type="index"></el-table-column>
        <el-table-column label="类型"
                         prop="type">
          <template slot-scope="scope">
            {{type[scope.row.type]}}
          </template>
        </el-table-column>
        <el-table-column label="标题"
                         prop="title"></el-table-column>
        <el-table-column label="期刊介绍"
                         prop="content"></el-table-column>
        <el-table-column label="音乐外链"
                         prop="url">
          <template slot-scope="scope">
            <audio controls
                   v-if="scope.row.url">
              <source :src="scope.row.url">
            </audio>
          </template>
        </el-table-column>
        <el-table-column label="发布时间"
                         prop="pubdate"
                         width="120"></el-table-column>
        <el-table-column label="点赞数"
                         width="120"
                         prop="fav_nums"></el-table-column>
        <el-table-column label="是否有效"
                         width="120"
                         prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 1"
                    type="success">有效</el-tag>
            <el-tag v-else
                    type="info">无效</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         fixed="right">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)"
                       v-permission="{permission:'编辑内容',type:'disabled'}">编辑</el-button>
            <el-button @click="handleDelete(scope.row)"
                       type='danger'
                       v-permission="{permission:'删除内容',type:'disabled'}">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title='dialogTitle'
               width="800px"
               :visible.sync="showDialog"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @close="resetForm">
      <el-form ref="form"
               :model="temp"
               label-width="90px"
               :rules="rules">
        <el-form-item label="内容封面"
                      prop="image">
          <upload-imgs ref="uploadEle"
                       :value="contentImgData"
                       :max-num="1"></upload-imgs>
        </el-form-item>
        <el-form-item label="内容类型"
                      prop="type">
          <el-radio v-model="temp.type"
                    :label="100"
                    :disabled="dialogTitle === '编辑内容'">电影</el-radio>
          <el-radio v-model="temp.type"
                    :label="200"
                    :disabled="dialogTitle === '编辑内容'">音乐</el-radio>
          <el-radio v-model="temp.type"
                    :label="300"
                    :disabled="dialogTitle === '编辑内容'">句子</el-radio>
        </el-form-item>
        <el-form-item label="内容标题"
                      prop="title">
          <el-col :span="11">
            <el-input v-model="temp.title"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="内容介绍"
                      prop="content">
          <el-col :span="11">
            <el-input type="textarea"
                      :row="2"
                      v-model="temp.content"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="音乐外链"
                      prop="url">
          <el-col :span="11">
            <el-input v-model="temp.url"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="发布时间"
                      prop="pubdate">
          <el-date-picker v-model="temp.pubdate"
                          type="date"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="有效状态"
                      prop="status">
          <el-switch v-model="temp.status"
                     :active-value="1"
                     :inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type='primary'
                   @click="dialogTitle === '添加内容' ? confirmAdd() : confirmEdit()">保存</el-button>
      </span>
    </el-dialog>

    <el-dialog title='提示'
               :visible.sync='showDeleteDialog'
               width='400px'>
      <span>确认删除内容？</span>
      <span slot='footer'
            class='dialog-footer'>
        <el-button @click='showDeleteDialog=false'>取消</el-button>
        <el-button type='danger'
                   @click='confirmDelete'>删除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { ContentModel } from '../../models/content'
import UploadImgs from '../../components/base/upload-imgs'

export default {
  name: 'list',
  components: {
    UploadImgs
  },
  data: () => ({
    contentList: [],
    type: {
      100: '电影',
      200: '音乐',
      300: '句子'
    },
    dialogTitle: '',
    showDialog: false,
    temp: {
      id: null,
      image: null,
      type: null,
      title: null,
      content: null,
      url: null,
      pubdate: '',
      status: '',
    },
    rules: {
      image: [{ required: true, message: '内容封面不能为空', trigger: 'blur' }],
      type: [{ required: true, message: '请指定内容类型', trigger: 'blur' }],
      title: [{ required: true, message: '内容标题不能为空', trigger: 'blur' }],
      content: [{ required: true, message: '内容介绍不能为空', trigger: 'blur' }],
      url: [{ required: false, message: 'url格式不正确', trigger: 'blur' }],
      pubdate: [{ required: true, message: '发布时间不能为空', trigger: 'blur' }],
    },
    contentImgData: [],
    showDeleteDialog: false
  }),
  created() {
    this.getContentList()
  },
  methods: {
    async getContentList() {
      this.contentList = await ContentModel.getContentList()
    },
    handleEdit(row) {
      this.dialogTitle = '编辑内容'
      this.showDialog = true

      this.temp.id = row.id
      this.temp.image = row.image
      this.temp.type = row.type
      this.temp.title = row.title
      this.temp.content = row.content
      this.temp.url = row.url
      this.temp.pubdate = row.pubdate
      this.temp.status = row.status

      this.contentImgData.push({ display: row.image })
    },
    handleDelete(row) {
      this.showDeleteDialog = true
      this.temp.id = row.id
      this.temp.type = row.type
    },
    handAdd() {
      this.dialogTitle = '添加内容'
      this.showDialog = true
    },
    resetForm() {
      this.contentImgData = []
      this.$refs.form.resetFields()
    },
    async confirmAdd() {
      const images = await this.$refs.uploadEle.getValue()
      this.temp.image = images.length < 1 ? '' : images[0].src
      this.$refs.form.validate(async valid => {
        if (valid) {
          delete this.temp.id
          const res = await ContentModel.addContent(this.temp)
          this.showDialog = false
          this.$message.success(res.message)
          this.getContentList()
        }
      })
    },
    async confirmEdit() {
      const images = await this.$refs.uploadEle.getValue()
      this.temp.image = images.length < 1 ? '' : images[0].display
      this.$refs.form.validate(async valid => {
        if (valid) {
          const res = await ContentModel.editContent(this.temp.id, this.temp)
          this.showDialog = false
          this.$message.success(res.message)
          this.getContentList()
        }
      })
    },
    async confirmDelete() {
      const res = await ContentModel.delContent(this.temp.id, this.temp.type)
      this.showDeleteDialog = false
      this.$message.success(res.message)
      this.getContentList()
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    border-bottom: 1px solid #daelec;
  }

  .add-button {
    padding: 20px 40px;
  }

  .table-container {
    padding: 0 40px 20px 40px;
  }
}
</style>
