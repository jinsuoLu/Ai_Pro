<template>
  <div class="proxy-container">
    <vab-page-header 
      description="授权API管理，支持手机号绑定、验证码实时获取和有效期管理" 
      :icon="['fas', 'key']" 
      title="授权API管理" 
    />

    <vab-query-form>
      <vab-query-form-left-panel>
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">新增授权API</el-button>
        <el-button icon="el-icon-files" type="warning" @click="handleBatchAdd">批量添加</el-button>
        <el-button 
          icon="el-icon-upload2" 
          type="success" 
          @click="handleBatchExport"
          :disabled="selectedRows.length === 0"
        >
          批量导出链接
        </el-button>
        <el-button icon="el-icon-refresh" type="info" @click="loadProxies">刷新列表</el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel>
        <el-form ref="searchForm" :inline="true" :model="searchForm" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="searchForm.phone" placeholder="手机号" clearable />
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.apiUrl" placeholder="API连接" clearable />
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.status" placeholder="状态">
              <el-option label="全部" value="" />
              <el-option label="有效" value="active" />
              <el-option label="已过期" value="expired" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" native-type="submit" type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      ref="proxyTable"
      v-loading="tableLoading"
      :data="proxyList"
      :element-loading-text="'加载中...'"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" width="60">
        <template #default="scope">
          {{ (searchForm.pageNo - 1) * searchForm.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" prop="phone" show-overflow-tooltip width="120" />
      <el-table-column label="API连接" prop="apiUrl" show-overflow-tooltip min-width="250" />
      <el-table-column label="验证码" show-overflow-tooltip width="140">
        <template #default="{ row }">
          <div class="captcha-container">
            <el-tag 
              :type="row.captchaCode ? 'success' : 'info'" 
              @click="row.captchaCode && copyCaptcha(row)"
              style="cursor: pointer;"
              class="captcha-tag"
            >
              {{ row.captchaCode || '暂无' }}
            </el-tag>
            <el-button 
              v-if="!row.isExpired"
              size="mini" 
              icon="el-icon-refresh" 
              @click="refreshCaptcha(row)"
              loading-text="刷新中"
              class="refresh-btn"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="获取时间" prop="captchaTime" show-overflow-tooltip width="160">
        <template #default="{ row }">
          {{ row.captchaTime ? formatDateTime(row.captchaTime) : '-' }}
        </template>
      </el-table-column>
      <el-table-column label="到期时间" prop="expiredDate" show-overflow-tooltip width="180" />
      <el-table-column label="剩余时间" show-overflow-tooltip width="120">
        <template #default="{ row }">
          <el-tag :type="getTimeTagType(row.remainingTime)">
            {{ formatDuration(row.remainingTime) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="授权链接" show-overflow-tooltip min-width="200">
        <template #default="{ row }">
          <el-link 
            v-if="!row.isExpired" 
            type="primary" 
            :href="getProxyUrl(row.token)" 
            target="_blank"
          >
            {{ getProxyUrl(row.token) }}
          </el-link>
          <span v-else class="text-gray">已过期</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip width="180">
        <template #default="{ row }">
          <el-button 
            type="text" 
            icon="el-icon-copy-document" 
            @click="copyUrl(row)"
            :disabled="row.isExpired"
          >
            复制链接
          </el-button>
          <el-button 
            type="text" 
            icon="el-icon-delete" 
            @click="handleDelete(row)"
            style="color: #f56c6c;"
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

    <el-dialog title="新增授权API" :visible.sync="addDialogVisible" width="500px">
      <el-form ref="addForm" :model="addForm" :rules="addRules" label-width="100px">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="API连接" prop="apiUrl">
          <el-input v-model="addForm.apiUrl" placeholder="请输入API目标URL" />
        </el-form-item>
        <el-form-item label="有效期" prop="expireMinutes">
          <el-select v-model="addForm.expireMinutes" placeholder="请选择有效期">
            <el-option label="30分钟" :value="30" />
            <el-option label="1小时" :value="60" />
            <el-option label="6小时" :value="360" />
            <el-option label="12小时" :value="720" />
            <el-option label="1天" :value="1440" />
            <el-option label="7天" :value="10080" />
          </el-select>
        </el-form-item>
        <el-form-item label="图片上传">
          <div class="image-upload-area" @click="triggerImageUpload">
            <img v-if="addForm.imageUrl" :src="addForm.imageUrl" class="preview-image" />
            <div v-else class="upload-placeholder">
              <i class="el-icon-upload"></i>
              <span>点击上传图片</span>
            </div>
          </div>
          <input 
            type="file" 
            ref="imageFile" 
            accept="image/*" 
            class="hidden-upload" 
            @change="handleImageUpload" 
          />
          <el-button v-if="addForm.imageUrl" type="text" @click="clearImage">清除图片</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAdd" :loading="addLoading">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="批量添加授权API" :visible.sync="batchAddDialogVisible" width="650px">
      <el-form ref="batchAddForm" :model="batchAddForm" label-width="100px">
        <el-form-item label="批量数据">
          <el-input
            type="textarea"
            v-model="batchAddForm.dataText" 
            :rows="8"
            placeholder="请输入批量数据，每行一条记录，格式如下：&#10;手机号----待反代链接----有效期----时间单位(m/h/d)&#10;&#10;示例：&#10;13800138000----https://api.example.com/sms----60----m&#10;13900139000----https://api.sms8.net/api/record?token=xxx----24----h&#10;13600136000----https://api.test.com/sms----7----d"
          />
          <span class="form-tip">时间单位：m=分钟，h=小时，d=天。不填单位默认分钟。不填有效期默认60分钟。</span>
        </el-form-item>
        <el-form-item label="统一有效期">
          <div class="expire-input-group">
            <el-input 
              v-model="batchAddForm.expireValue" 
              type="number" 
              min="1" 
              placeholder="请输入数值"
              :disabled="!batchAddForm.useCustomExpire"
            />
            <el-select 
              v-model="batchAddForm.expireUnit" 
              placeholder="选择单位"
              :disabled="!batchAddForm.useCustomExpire"
            >
              <el-option label="分钟" value="m" />
              <el-option label="小时" value="h" />
              <el-option label="天" value="d" />
            </el-select>
            <label class="checkbox-label">
              <el-checkbox v-model="batchAddForm.useCustomExpire" />
              <span>启用统一有效期（将覆盖每行设置）</span>
            </label>
          </div>
        </el-form-item>
        <el-form-item label="统一图片">
          <div class="batch-image-upload">
            <div class="image-preview-area" @click="triggerBatchImageUpload">
              <img v-if="batchAddForm.imageUrl" :src="batchAddForm.imageUrl" class="preview-image" />
              <div v-else class="upload-placeholder">
                <i class="el-icon-upload"></i>
                <span>点击上传图片</span>
                <span class="tip-text">（可选，统一应用到所有记录）</span>
              </div>
            </div>
            <input 
              type="file" 
              ref="batchImageFile" 
              accept="image/*" 
              class="hidden-upload" 
              @change="handleBatchImageUpload" 
            />
            <el-button v-if="batchAddForm.imageUrl" type="text" @click="clearBatchImage" style="margin-left: 10px;">清除图片</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="batchAddDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmBatchAdd" :loading="batchAddLoading">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VabPageHeader from '@/components/VabPageHeader'
import { createProxy, listProxies, deleteProxy, refreshCaptcha, getProxyUrl, batchCreateProxy, uploadImage } from '@/api/proxy'

export default {
  name: 'ApiAuthorization',
  components: {
    VabPageHeader,
  },
  data() {
    return {
      searchForm: {
        phone: '',
        apiUrl: '',
        status: '',
        pageNo: 1,
        pageSize: 10,
      },
      proxyList: [],
      total: 0,
      tableLoading: false,
      addDialogVisible: false,
      addLoading: false,
      addForm: {
        phone: '',
        apiUrl: '',
        expireMinutes: 60,
        imageUrl: '',
        imageBase64: '',
      },
      batchAddDialogVisible: false,
      batchAddLoading: false,
      batchAddForm: {
        dataText: '',
        expireValue: '',
        expireUnit: 'm',
        useCustomExpire: false,
        imageUrl: '',
        imageBase64: '',
      },
      addRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' },
        ],
        apiUrl: [
          { required: true, message: '请输入API连接URL', trigger: 'blur' },
          { type: 'url', message: '请输入有效的URL', trigger: 'blur' },
        ],
        expireMinutes: [
          { required: true, message: '请选择有效期', trigger: 'change' },
        ],
      },
      selectedRows: [],
      refreshTimers: [],
    }
  },
  mounted() {
    this.loadProxies()
  },
  beforeDestroy() {
    this.refreshTimers.forEach(timer => clearInterval(timer))
  },
  watch: {
    addDialogVisible(val) {
      if (!val) {
        this.addForm = {
          phone: '',
          apiUrl: '',
          expireMinutes: 60,
          imageUrl: '',
          imageBase64: '',
        }
        if (this.$refs.imageFile) {
          this.$refs.imageFile.value = ''
        }
      }
    },
    batchAddDialogVisible(val) {
      if (!val) {
        this.batchAddForm = {
          dataText: '',
          expireValue: '',
          expireUnit: 'm',
          useCustomExpire: false,
          imageUrl: '',
          imageBase64: '',
        }
        if (this.$refs.batchImageFile) {
          this.$refs.batchImageFile.value = ''
        }
      }
    },
  },
  methods: {
    async loadProxies() {
      this.tableLoading = true
      try {
        const res = await listProxies()
        if (res.success) {
          this.proxyList = res.data.map(item => ({
            ...item,
            remainingTime: this.calculateRemainingTime(item.expireTime),
            isExpired: item.expireTime <= Date.now(),
          }))
          this.total = this.proxyList.length
        }
      } catch (error) {
        this.$message.error('加载授权API列表失败')
      } finally {
        this.tableLoading = false
      }
    },
    calculateRemainingTime(expireTime) {
      const remaining = expireTime - Date.now()
      return remaining > 0 ? remaining : 0
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
    formatDuration(milliseconds) {
      if (milliseconds <= 0) return '已过期'
      const seconds = Math.floor(milliseconds / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)

      if (days > 0) {
        return `${days}天${hours % 24}小时`
      } else if (hours > 0) {
        return `${hours}小时${minutes % 60}分钟`
      } else if (minutes > 0) {
        return `${minutes}分钟`
      } else {
        return `${seconds}秒`
      }
    },
    getTimeTagType(remainingTime) {
      if (remainingTime <= 0) return 'danger'
      const minutes = Math.floor(remainingTime / 1000 / 60)
      if (minutes < 30) return 'warning'
      return 'success'
    },
    getProxyUrl(token) {
      return getProxyUrl(token)
    },
    handleAdd() {
      this.addForm = {
        phone: '',
        apiUrl: '',
        expireMinutes: 60,
        imageUrl: '',
        imageBase64: '',
      }
      this.addDialogVisible = true
    },
    triggerImageUpload() {
      this.$refs.imageFile.click()
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const maxSize = 5 * 1024 * 1024
        if (file.size > maxSize) {
          this.$message.error('图片大小不能超过5MB')
          return
        }
        
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        if (!validTypes.includes(file.type)) {
          this.$message.error('只支持JPG、PNG、GIF、WebP格式的图片')
          return
        }
        
        const reader = new FileReader()
        reader.onload = (e) => {
          const base64 = e.target.result
          this.addForm.imageUrl = base64
          this.addForm.imageBase64 = base64
        }
        reader.readAsDataURL(file)
      }
    },
    clearImage() {
      this.addForm.imageUrl = ''
      this.addForm.imageBase64 = ''
      if (this.$refs.imageFile) {
        this.$refs.imageFile.value = ''
      }
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
        let imageId = ''
        
        if (this.addForm.imageBase64) {
          const imageRes = await uploadImage(this.addForm.imageBase64)
          if (imageRes.success) {
            imageId = imageRes.data.imageId
          }
        }
        
        const res = await createProxy({
          phone: this.addForm.phone,
          targetUrl: this.addForm.apiUrl,
          expireMinutes: this.addForm.expireMinutes,
          imageId: imageId,
        })
        if (res.success) {
          this.$message.success('新增授权API成功')
          this.addDialogVisible = false
          this.loadProxies()
        } else {
          this.$message.error(res.msg || '新增失败')
        }
      } catch (error) {
        this.$message.error('新增授权API失败')
      } finally {
        this.addLoading = false
      }
    },
    async handleDelete(row) {
      try {
        await this.$confirm('确定要删除该授权API吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })

        const res = await deleteProxy(row.token)
        if (res.success) {
          this.$message.success('删除成功')
          this.loadProxies()
        } else {
          this.$message.error(res.msg || '删除失败')
        }
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('删除失败')
        }
      }
    },
    async refreshCaptcha(row) {
      try {
        const res = await refreshCaptcha(row.token)
        if (res.success) {
          const proxy = this.proxyList.find(p => p.token === row.token)
          if (proxy) {
            proxy.captchaCode = res.data.code || '-'
            proxy.captchaTime = res.data.code_time ? new Date(res.data.code_time).getTime() : Date.now()
          }
          this.$message.success('刷新验证码成功')
        } else {
          this.$message.error(res.msg || '刷新失败')
        }
      } catch (error) {
        this.$message.error('刷新验证码失败')
      }
    },
    copyCaptcha(row) {
      this.$copyText(row.captchaCode).then(() => {
        this.$message.success('验证码已复制')
      })
    },
    copyUrl(row) {
      this.$copyText(this.getProxyUrl(row.token)).then(() => {
        this.$message.success('链接已复制')
      })
    },
    handleSearch() {
      this.searchForm.pageNo = 1
      this.loadProxies()
    },
    handlePageChange(pageNo) {
      this.searchForm.pageNo = pageNo
      this.loadProxies()
    },
    handleSizeChange(pageSize) {
      this.searchForm.pageSize = pageSize
      this.searchForm.pageNo = 1
      this.loadProxies()
    },
    handleSelectionChange(rows) {
      this.selectedRows = rows
    },
    handleBatchAdd() {
      this.batchAddForm = {
        dataText: '',
        expireValue: '',
        expireUnit: 'm',
        useCustomExpire: false,
        imageUrl: '',
        imageBase64: '',
      }
      this.batchAddDialogVisible = true
    },
    triggerBatchImageUpload() {
      this.$refs.batchImageFile.click()
    },
    handleBatchImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const maxSize = 5 * 1024 * 1024
        if (file.size > maxSize) {
          this.$message.error('图片大小不能超过5MB')
          return
        }
        
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        if (!validTypes.includes(file.type)) {
          this.$message.error('只支持JPG、PNG、GIF、WebP格式的图片')
          return
        }
        
        const reader = new FileReader()
        reader.onload = (e) => {
          const base64 = e.target.result
          this.batchAddForm.imageUrl = base64
          this.batchAddForm.imageBase64 = base64
        }
        reader.readAsDataURL(file)
      }
    },
    clearBatchImage() {
      this.batchAddForm.imageUrl = ''
      this.batchAddForm.imageBase64 = ''
      if (this.$refs.batchImageFile) {
        this.$refs.batchImageFile.value = ''
      }
    },
    async confirmBatchAdd() {
      if (!this.batchAddForm.dataText.trim()) {
        this.$message.error('请输入批量数据')
        return
      }

      const lines = this.batchAddForm.dataText.trim().split('\n').filter(line => line.trim())
      if (lines.length === 0) {
        this.$message.error('请输入有效的批量数据')
        return
      }

      const items = []
      const errors = []

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()
        const parts = line.split('----')
        
        if (parts.length < 2) {
          errors.push(`第${i + 1}行格式错误，缺少分隔符`)
          continue
        }

        const phone = parts[0].trim()
        let targetUrl = parts[1].trim()
        let expireValue = parts[2] ? parseInt(parts[2].trim()) : 60
        let expireUnit = parts[3] ? parts[3].trim().toLowerCase() : 'm'

        targetUrl = targetUrl.replace(/^`|`$/g, '').replace(/^['"]|['"]$/g, '')

        let expireMinutes = this.convertToMinutes(expireValue, expireUnit)

        if (this.batchAddForm.useCustomExpire && this.batchAddForm.expireValue) {
          expireMinutes = this.convertToMinutes(parseInt(this.batchAddForm.expireValue), this.batchAddForm.expireUnit)
        }

        if (!targetUrl) {
          errors.push(`第${i + 1}行：待反代链接不能为空`)
          continue
        }

        if (isNaN(expireMinutes) || expireMinutes <= 0) {
          errors.push(`第${i + 1}行：有效期无效`)
          continue
        }

        items.push({
          phone,
          targetUrl,
          expireMinutes: expireMinutes || 60,
        })
      }

      if (errors.length > 0) {
        this.$message.error('数据格式有误：\n' + errors.join('\n'))
        return
      }

      this.batchAddLoading = true
      try {
        let imageId = ''
        
        if (this.batchAddForm.imageBase64) {
          const imageRes = await uploadImage(this.batchAddForm.imageBase64)
          if (imageRes.success) {
            imageId = imageRes.data.imageId
          }
        }
        
        const res = await batchCreateProxy(items, imageId)
        if (res.success) {
          const { successCount, errorCount } = res.data
          let message = `批量添加完成！成功：${successCount}条`
          if (errorCount > 0) {
            message += `，失败：${errorCount}条`
          }
          this.$message.success(message)
          this.batchAddDialogVisible = false
          this.loadProxies()
        } else {
          this.$message.error(res.msg || '批量添加失败')
        }
      } catch (error) {
        this.$message.error('批量添加失败')
      } finally {
        this.batchAddLoading = false
      }
    },
    convertToMinutes(value, unit) {
      value = parseInt(value) || 0
      switch (unit) {
        case 'h':
          return value * 60
        case 'd':
          return value * 24 * 60
        case 'm':
        default:
          return value
      }
    },
    handleBatchExport() {
      if (this.selectedRows.length === 0) {
        this.$message.warning('请先选择要导出的记录')
        return
      }

      const exportData = this.selectedRows.map(row => ({
        phone: row.phone,
        proxyUrl: this.getProxyUrl(row.token),
        expiredDate: row.expiredDate,
        captchaCode: row.captchaCode || ''
      }))

      let csvContent = '手机号,反代链接,到期时间,验证码\n'
      exportData.forEach(item => {
        const line = [
          `"${item.phone}"`,
          `"${item.proxyUrl}"`,
          `"${item.expiredDate}"`,
          `"${item.captchaCode}"`
        ].join(',')
        csvContent += line + '\n'
      })

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `proxy_links_${Date.now()}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      this.$message.success('导出成功')
    },
  },
}
</script>

<style scoped>
.proxy-container {
  padding: 20px;
}

.captcha-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.captcha-tag {
  flex: 1;
}

.refresh-btn {
  padding: 0;
  width: 32px;
  height: 28px;
}

.text-gray {
  color: #999;
}

.batch-image-upload {
  display: flex;
  align-items: center;
}

.image-preview-area {
  width: 120px;
  height: 120px;
  border: 2px dashed #dcdfe6;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: border-color 0.3s;
}

.image-preview-area:hover {
  border-color: #409eff;
}

.image-preview-area .preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #8c939d;
  font-size: 12px;
}

.upload-placeholder i {
  font-size: 28px;
  margin-bottom: 8px;
}

.upload-placeholder .tip-text {
  font-size: 11px;
  color: #c0c4cc;
  margin-top: 4px;
}

.hidden-upload {
  display: none;
}

.form-tip {
  color: #909399;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.expire-input-group {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.expire-input-group .el-input {
  width: 120px;
}

.expire-input-group .el-select {
  width: 100px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  margin-top: 10px;
  color: #606266;
  font-size: 13px;
}

.checkbox-label .el-checkbox {
  margin-right: 8px;
}
</style>
