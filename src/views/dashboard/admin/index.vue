<template>
  <div class="container">
    <el-table :data="studentsInfo" style="width: 100%" border>
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="code" label="学籍号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="cover" label="头像">
        <template slot-scope="scope">
            <img :src="scope.row.cover" alt="" style="width:50px;height:50px">
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.sex===1?'女':'男' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nation" label="民族"></el-table-column>
      <el-table-column prop="place" label="籍贯"></el-table-column>
      <el-table-column prop="class" label="班级"></el-table-column>
      <el-table-column prop="idCard" label="身份证号"></el-table-column>
      <el-table-column prop="entrance" label="入学年月"></el-table-column>
      <el-table-column prop="phone" label="联系方式"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status?'正常':'关闭' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="200">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" size="small" icon="el-icon-delete" plain style="margin-left:5px">编辑</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" plain style="margin-left:5px">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentsInfo: [
        {
          id: 1,
          code: "001",
          name: "王小虎",
          cover: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554898515266&di=6753b068c0b51c22dff13c1d8654d4bb&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b88258fdb4bfa8012160f794343c.jpg%401280w_1l_2o_100sh.jpg",
          sex: 2,
          nation: '汉',
          place: '北京',
          class: '六(1)班',
          idCard: '411122200501011234',
          entrance: '2016-01-01',
          phone: '13312341234',
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
          class: '六(2)班',
          idCard: '411122200501011235',
          entrance: '2016-01-01',
          phone: '13312341234',
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
          class: '六(3)班',
          idCard: '411122200501011238',
          entrance: '2016-01-01',
          phone: '13312341234',
          status: 1
        }
      ]
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  margin: 10px 20px;
}
</style>
