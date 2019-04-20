<template>
  <div class="container">
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
        width="150"
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
            >查看考试成绩单</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="个人成绩单" :visible.sync="formVisible">
      <el-table :data="gridData">
        <el-table-column property="code" label="学号" width="150"></el-table-column>
        <el-table-column property="name" label="学科" width="200"></el-table-column>
        <el-table-column property="result" label="成绩"></el-table-column>
        <el-table-column property="rank" label="名次"></el-table-column>
      </el-table>
    </el-dialog>
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
        }
      ],
      gridData: [{
        code: '1',
        name: '数学',
        result: '85',
        rank: '10'
      }, {
        code: '1',
        name: '语文',
        result: '87',
        rank: '13'
      }, {
        code: '1',
        name: '英语',
        result: '86',
        rank: '18'
      }, {
        code: '1',
        name: '马克思',
        result: '82',
        rank: '5'
      }],
    };
  },
  methods: {
    edit(id) {
      this.formVisible = true
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
