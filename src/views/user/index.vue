<template>
  <div class="user-container">
    <vab-page-header 
      description="管理系统用户，分配授权API使用权限" 
      :icon="['fas', 'users']" 
      title="用户管理" 
    />

    <vab-query-form>
      <vab-query-form-left-panel>
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">新增用户</el-button>
        <el-button icon="el-icon-refresh" type="info" @click="loadUsers">刷新列表</el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel>
        <el-form ref="searchForm" :inline="true" :model="searchForm" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="searchForm.username" placeholder="用户名" clearable />
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.status" placeholder="状态" clearable>
              <el-option label="全部" value="" />
              <el-option label="启用" value="active" />
              <el-option label="禁用" value="disabled" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" native-type="submit" type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      ref="userTable"
      v-loading="tableLoading"
      :data="userList"
      :element-loading-text="'加载中...'"
    >
      <el-table-column label="序号" width="60">
        <template #default="scope">
          {{ (searchForm.pageNo - 1) * searchForm.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="username" show-overflow-tooltip width="120" />
      <el-table-column label="昵称" prop="nickname" show-overflow-tooltip width="120" />
      <el-table-column label="角色" show-overflow-tooltip width="100">
        <template #default="{ row }">
          <el-tag :type="row.role === 'admin' ? 'danger' : 'primary'">
            {{ row.role === 'admin' ? '管理员' : '普通用户' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" show-overflow-tooltip width="80">
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            active-value="active"
            inactive-value="disabled"
            @change="handleStatusChange(row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="授权API数量" show-overflow-tooltip width="100">
        <template #default="{ row }">
          <el-link type="primary" @click="showUserProxies(row)">
            {{ row.proxyCount || 0 }} 个
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createdAt" show-overflow-tooltip width="160" />
      <el-table-column label="操作" show-overflow-tooltip min-width="200">
        <template #default="{ row }">
          <el-button 
            type="text" 
            icon="el-icon-edit" 
            @click="handleEdit(row)"
          >
            编辑
          </el-button>
          <el-button 
            type="text" 
            icon="el-icon-key" 
            @click="handleAssignProxy(row)"
          >
            分配权限
          </el-button>
          <el-button 
            type="text" 
            icon="el-icon-delete" 
            @click="handleDelete(row)"
            style="color: #f56c6c;"
            :disabled="row.role === 'admin'"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :background="true"
      :current-page="searchForm.pageNo"
      :layout="'total, sizes, prev, pager, next, jumper'"
      :page-size="searchForm.pageSize"
      :total="total"
      @current-change="handlePageChange"
      @size-change="handleSizeChange"
    />

    <el-dialog title="新增用户" :visible.sync="addDialogVisible" width="500px">
      <el-form ref="addForm" :model="addForm" :rules="addRules" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="addForm.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="addForm.role" placeholder="请选择角色">
            <el-option label="普通用户" value="user" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAdd" :loading="addLoading">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑用户" :visible.sync="editDialogVisible" width="500px">
      <el-form ref="editForm" :model="editForm" :rules="editRules" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled />
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="editForm.password" type="password" placeholder="不修改请留空" show-password />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="editForm.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="editForm.role" placeholder="请选择角色">
            <el-option label="普通用户" value="user" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmEdit" :loading="editLoading">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="分配授权API权限" :visible.sync="assignDialogVisible" width="700px">
      <el-transfer
        v-model="assignedProxies"
        :data="allProxies"
        :titles="['可用授权API', '已分配授权API']"
        :props="{
          key: 'token',
          label: 'phone'
        }"
        filterable
        filter-placeholder="搜索手机号"
      />
      <div slot="footer">
        <el-button @click="assignDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAssign" :loading="assignLoading">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'用户 ' + currentUser.username + ' 的授权API列表'" :visible.sync="proxyListDialogVisible" width="800px">
      <el-table :data="currentUserProxies" max-height="400">
        <el-table-column label="手机号" prop="phone" width="120" />
        <el-table-column label="反代链接" show-overflow-tooltip min-width="250">
          <template #default="{ row }">
            {{ getProxyUrl(row.token) }}
          </template>
        </el-table-column>
        <el-table-column label="到期时间" prop="expiredDate" width="160" />
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.isExpired ? 'danger' : 'success'">
              {{ row.isExpired ? '已过期' : '有效' }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer">
        <el-button @click="proxyListDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VabPageHeader from '@/components/VabPageHeader'
import { listUsers, createUser, updateUser, deleteUser, assignProxies, getUserProxies } from '@/api/user'
import { listProxies } from '@/api/proxy'
import { backendServerUrl } from '@/config/net.config'

export default {
  name: 'UserManagement',
  components: {
    VabPageHeader,
  },
  data() {
    return {
      searchForm: {
        username: '',
        status: '',
        pageNo: 1,
        pageSize: 10,
      },
      userList: [],
      total: 0,
      tableLoading: false,
      addDialogVisible: false,
      addLoading: false,
      addForm: {
        username: '',
        password: '',
        nickname: '',
        role: 'user',
      },
      addRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '用户名长度3-20个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度6-20个字符', trigger: 'blur' },
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'change' },
        ],
      },
      editDialogVisible: false,
      editLoading: false,
      editForm: {
        id: '',
        username: '',
        password: '',
        nickname: '',
        role: 'user',
      },
      editRules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'change' },
        ],
      },
      assignDialogVisible: false,
      assignLoading: false,
      currentUserId: '',
      assignedProxies: [],
      allProxies: [],
      proxyListDialogVisible: false,
      currentUser: {},
      currentUserProxies: [],
    }
  },
  mounted() {
    this.loadUsers()
  },
  methods: {
    async loadUsers() {
      this.tableLoading = true
      try {
        const res = await listUsers()
        if (res.success) {
          this.userList = res.data.map(item => ({
            ...item,
            createdAt: this.formatDateTime(item.createdAt),
          }))
          this.total = this.userList.length
        }
      } catch (error) {
        this.$message.error('加载用户列表失败')
      } finally {
        this.tableLoading = false
      }
    },
    formatDateTime(timestamp) {
      if (!timestamp) return '-'
      const date = new Date(timestamp)
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    },
    getProxyUrl(token) {
      return `${backendServerUrl}/proxy/${token}`
    },
    handleAdd() {
      this.addForm = {
        username: '',
        password: '',
        nickname: '',
        role: 'user',
      }
      this.addDialogVisible = true
    },
    async confirmAdd() {
      const form = this.$refs.addForm
      if (!form) return
      
      try {
        await form.validate()
      } catch (error) {
        return
      }

      this.addLoading = true
      try {
        const res = await createUser(this.addForm)
        if (res.success) {
          this.$message.success('新增用户成功')
          this.addDialogVisible = false
          this.loadUsers()
        } else {
          this.$message.error(res.msg || '新增失败')
        }
      } catch (error) {
        this.$message.error('新增用户失败')
      } finally {
        this.addLoading = false
      }
    },
    handleEdit(row) {
      this.editForm = {
        id: row.id,
        username: row.username,
        password: '',
        nickname: row.nickname,
        role: row.role,
      }
      this.editDialogVisible = true
    },
    async confirmEdit() {
      const form = this.$refs.editForm
      if (!form) return
      
      try {
        await form.validate()
      } catch (error) {
        return
      }

      this.editLoading = true
      try {
        const res = await updateUser(this.editForm.id, this.editForm)
        if (res.success) {
          this.$message.success('编辑用户成功')
          this.editDialogVisible = false
          this.loadUsers()
        } else {
          this.$message.error(res.msg || '编辑失败')
        }
      } catch (error) {
        this.$message.error('编辑用户失败')
      } finally {
        this.editLoading = false
      }
    },
    async handleDelete(row) {
      if (row.role === 'admin') {
        this.$message.warning('不能删除管理员用户')
        return
      }

      try {
        await this.$confirm('确定要删除该用户吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })

        const res = await deleteUser(row.id)
        if (res.success) {
          this.$message.success('删除成功')
          this.loadUsers()
        } else {
          this.$message.error(res.msg || '删除失败')
        }
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('删除失败')
        }
      }
    },
    async handleStatusChange(row) {
      try {
        const res = await updateUser(row.id, { status: row.status })
        if (res.success) {
          this.$message.success('状态更新成功')
        } else {
          row.status = row.status === 'active' ? 'disabled' : 'active'
          this.$message.error(res.msg || '状态更新失败')
        }
      } catch (error) {
        row.status = row.status === 'active' ? 'disabled' : 'active'
        this.$message.error('状态更新失败')
      }
    },
    async handleAssignProxy(row) {
      this.currentUserId = row.id
      
      const proxyRes = await listProxies()
      if (proxyRes.success) {
        this.allProxies = proxyRes.data
      }

      const userProxyRes = await getUserProxies(row.id)
      if (userProxyRes.success) {
        this.assignedProxies = userProxyRes.data.map(p => p.token)
      }

      this.assignDialogVisible = true
    },
    async confirmAssign() {
      this.assignLoading = true
      try {
        const res = await assignProxies(this.currentUserId, this.assignedProxies)
        if (res.success) {
          this.$message.success('分配权限成功')
          this.assignDialogVisible = false
          this.loadUsers()
        } else {
          this.$message.error(res.msg || '分配权限失败')
        }
      } catch (error) {
        this.$message.error('分配权限失败')
      } finally {
        this.assignLoading = false
      }
    },
    async showUserProxies(row) {
      this.currentUser = row
      try {
        const res = await getUserProxies(row.id)
        if (res.success) {
          const now = Date.now()
          this.currentUserProxies = res.data.map(item => ({
            ...item,
            expiredDate: this.formatDateTime(item.expireTime),
            isExpired: item.expireTime <= now,
          }))
        }
      } catch (error) {
        this.$message.error('获取用户授权API列表失败')
      }
      this.proxyListDialogVisible = true
    },
    handleSearch() {
      this.searchForm.pageNo = 1
      this.loadUsers()
    },
    handlePageChange(pageNo) {
      this.searchForm.pageNo = pageNo
      this.loadUsers()
    },
    handleSizeChange(pageSize) {
      this.searchForm.pageSize = pageSize
      this.searchForm.pageNo = 1
      this.loadUsers()
    },
  },
}
</script>

<style scoped>
.user-container {
  padding: 20px;
}
</style>
