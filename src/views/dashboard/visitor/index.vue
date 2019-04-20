<template>
  <div class="container">
    <el-row class="row">
      <el-button
        type="primary"
        plain
        @click="create()"
      >添加学生信息</el-button>
      <div style="float:right">
        <el-input
          v-model="query.name"
          placeholder="输入学生名"
          clearable
          style="width: 130px"
        />
        <el-input
          v-model="query.code"
          placeholder="输入学生学号"
          clearable
          style="width: 130px"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="search()"
        >搜索</el-button>
      </div>
    </el-row>
    <el-table
      :data="studentsInfo"
      style="width: 100%"
      border
    >
      <el-table-column
        prop="id"
        label="ID"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="code"
        label="学籍号"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
      ></el-table-column>
      <el-table-column
        prop="cover"
        label="头像"
      >
        <template slot-scope="scope">
          <img
            :src="scope.row.cover"
            alt=""
            style="width:50px;height:50px"
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.sex===1?'女':'男' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="nation"
        label="民族"
      ></el-table-column>
      <el-table-column
        prop="place"
        label="籍贯"
      ></el-table-column>
      <el-table-column
        prop="class"
        label="班级"
      ></el-table-column>
      <el-table-column
        prop="idCard"
        label="身份证号"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.status?'正常':'关闭' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <div>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-delete"
              plain
              style="margin-left:5px"
              @click="edit(scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              plain
              style="margin-left:5px"
              @click="destory(scope.row.id)"
            >删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="formVisible"
    >
      <el-form
        ref="form"
        :model="form"
      >
        <el-form-item
          label-width="120px"
          label="学籍号:"
          prop="title"
        >
          <el-input v-model="form.code" />
        </el-form-item>
        <el-form-item
          label-width="120px"
          label="姓名:"
          prop="title"
        >
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item
          label-width="120px"
          label="民族:"
          prop="title"
        >
          <el-input v-model="form.nation" />
        </el-form-item>
        <el-form-item
          label-width="120px"
          label="籍贯:"
          prop="title"
        >
          <el-input v-model="form.place" />
        </el-form-item>
        <el-form-item
          label-width="120px"
          label="班级:"
          prop="description"
        >
          <el-input v-model="form.class" />
        </el-form-item>
        <el-form-item
          label-width="120px"
          label="身份证号:"
          prop="description"
        >
          <el-input v-model="form.idCard" />
        </el-form-item>
        <el-form-item
          label-width="120px"
          label="性别:"
          prop="description"
        >
          <el-select v-model="form.sex">
            <el-option
              v-for="item in sex_name"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label-width="120px"
          label="头像:"
          prop="cover"
        >
          <div v-show="form.cover">
            <img
              :src="form.cover"
              width="80px"
              height="80px"
            >
          </div>
          <el-upload
            ref="cover"
            :before-remove="beforeRemove"
            :on-preview="handlePreview"
            :on-success="handleChange"
            :file-list="fileList"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture"
          >
            <div style="text-align: left;">
              <el-button
                size="small"
                type="primary"
              >点击上传</el-button>
            </div>
            <div
              slot="tip"
              class="el-upload__tip"
            >只能上传/修改为jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item
          label-width="120px"
          label="状态:"
        >
          <el-select v-model="form.status">
            <el-option
              v-for="item in status_name"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="formVisible=false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?addInfo():editInfo()"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      v-if="total>15"
      :page="query.page"
      :page-size="query.page_size"
      :total="total"
      class="pagination-wrap"
      background
      layout="total,prev,pager,next,jumper"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 1,
      query: {
        page: 1,
        page_size: 15,
        code: '',
        name: ''
      },
      fileList: [],
      form: {
        code: "004",
        name: "张三",
        cover: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554898515265&di=e4cc494cb346f1cc58c804e36ee6d534&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01cb6958fdb4bfa8012160f7c06bde.jpg%401280w_1l_2o_100sh.png",
        sex: 1,
        nation: '汉',
        place: '江西',
        class: '计算机一班',
        idCard: '411122200301011288',
        entrance: '2016-01-01',
        status: 1
      },
      formVisible: false,
      textMap: {
        create: "新增学生信息",
        update: "编辑学生信息"
      },
      dialogStatus: "",
      status_name: [{ value: 0, name: "关闭" }, { value: 1, name: "正常" }],
      sex_name: [{ value: 1, name: "女" }, { value: 2, name: "男" }],
      studentsInfo: [
        {
          id: 1,
          code: "001",
          name: "王小虎",
          cover: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554898515266&di=6753b068c0b51c22dff13c1d8654d4bb&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b88258fdb4bfa8012160f794343c.jpg%401280w_1l_2o_100sh.jpg",
          sex: 2,
          nation: '汉',
          place: '北京',
          class: '计算机一班',
          idCard: '411122200501011234',
          entrance: '2016-01-01',
          status: 1
        },
        {
          id: 2,
          code: "002",
          name: "王小胖",
          cover: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554898515265&di=ae4c7b712c855b9037021e98dec847f7&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01635858fdb4bea8012160f74cbf09.jpg%402o.jpg",
          sex: 1,
          nation: '土家',
          place: '广东',
          class: '计算机一班',
          idCard: '411122200501011235',
          entrance: '2016-01-01',
          status: 1
        },
        {
          id: 3,
          code: "003",
          name: "王小刚",
          cover: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554898515265&di=e4cc494cb346f1cc58c804e36ee6d534&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01cb6958fdb4bfa8012160f7c06bde.jpg%401280w_1l_2o_100sh.png",
          sex: 1,
          nation: '汉',
          place: '江西',
          class: '计算机一班',
          idCard: '411122200501011238',
          entrance: '2016-01-01',
          status: 1
        }
      ]
    };
  },
  methods: {
    create() {
      this.formVisible = true
      this.dialogStatus = 'create'
    },
    edit(id) {
      this.formVisible = true
      this.dialogStatus = 'update'
      for (let index = 0; index < this.studentsInfo.length; index++) {
        const element = this.studentsInfo[index];
        if (element.id === id) {
          this.form = element
        }
      }
    },
    beforeRemove(file, fileList) {
      this.$refs.cover.clearFiles();
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleCurrentChange: function (page) {
      this.query.page = page;
      this.getBooks();
      console.log(this.query.page); // 点击第几页
    },
    handlePreview(file) {
      console.log(file);
    },
    handleChange(file, fileList) {
      console.log(fileList);
      this.form.cover = fileList.response.err_message.resource;
      if (this.form.cover) {
        this.$refs["form"].clearValidate();
      }
    },
    search() {
      // this.getBooks();
      location.reload()
    },
    destory(id) {
      const that = this;
      that.$confirm("此操作将永久删除该学生信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // book_del(id).then(res => {
          that.$message({
            type: "success",
            message: "删除成功!"
          });
          //   that.getBooks();
          // });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  margin: 10px 20px;
}
.row {
  margin: 10px 0;
}
</style>
