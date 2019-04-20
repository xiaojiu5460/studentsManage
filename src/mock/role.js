import Mock from 'mockjs'
import { deepClone } from '@/utils'
import { filterAsyncRoutes } from '@/store/modules/permission'
import { asyncRoutes, constantRoutes } from '@/router'

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    key: 'admin',
    name: '超级管理员（教师）',
    description: '超级管理员。有权查看所有页面',
    routes: routes
  },
  {
    key: 'editor',
    name: '编辑者',
    description: '普通编辑。可以看到除权限页面之外的所有页面',
    routes: filterAsyncRoutes(routes, ['editor'])
  },
  {
    key: 'visitor',
    name: '访问者（学生）',
    description: '只能看到主页和文档页面',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
]

export default {
  getRoutes() {
    return routes
  },
  getRoles() {
    return roles
  },
  addRole() {
    return Mock.mock('@integer(300, 5000)')
  },
  updateRole() {
    const res = {
      data: 'success'
    }
    return res
  },
  deleteRole() {
    const res = {
      data: 'success'
    }
    return res
  }
}
