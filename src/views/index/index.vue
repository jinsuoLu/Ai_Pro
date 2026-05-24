<template>
  <div class="index-container">
    <el-row :gutter="20">
      <!-- 统计卡片 -->
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24" v-for="(stat, index) in statList" :key="index">
        <el-card class="stat-card" shadow="never">
          <div class="stat-content">
            <div class="stat-icon" :style="{ background: stat.color }">
              <vab-icon :icon="['fas', stat.icon]" />
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 图表区域 -->
      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <el-card class="chart-card" shadow="never">
          <div slot="header">
            <span>访问趋势</span>
          </div>
          <div class="chart-wrapper">
            <vab-chart autoresize :option="visitChart" />
          </div>
        </el-card>
      </el-col>

      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <el-card class="chart-card" shadow="never">
          <div slot="header">
            <span>授权统计</span>
          </div>
          <div class="chart-wrapper">
            <vab-chart autoresize :option="authChart" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import VabChart from '@/plugins/echarts'

  export default {
    name: 'Index',
    components: {
      VabChart,
    },
    data() {
      return {
        statList: [
          { icon: 'users', label: '总用户数', value: '1,234', color: '#4d8af0' },
          { icon: 'key', label: '授权数量', value: '567', color: '#10b981' },
          { icon: 'eye', label: '今日访问', value: '8,901', color: '#f59e0b' },
          { icon: 'clock', label: '在线时长', value: '2.5h', color: '#ec4899' },
        ],
        visitChart: {
          color: ['#4d8af0'],
          grid: { top: '15%', left: '3%', right: '4%', bottom: '15%', containLabel: true },
          xAxis: [
            { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], axisLine: { lineStyle: { color: '#e4e7ed' } }, axisLabel: { color: '#909399' } },
          ],
          yAxis: [
            { type: 'value', splitLine: { lineStyle: { color: '#f5f7fa', type: 'dashed' } }, axisLabel: { color: '#909399' } },
          ],
          series: [
            { name: '访问量', type: 'line', smooth: true, data: [1200, 1350, 1100, 1400, 1600, 1800, 1500], lineStyle: { width: 3, color: '#4d8af0' }, itemStyle: { color: '#4d8af0' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(77,138,240,0.3)' }, { offset: 1, color: 'rgba(77,138,240,0.1)' }] } } },
          ],
        },
        authChart: {
          color: ['#10b981'],
          grid: { top: '15%', left: '3%', right: '4%', bottom: '15%', containLabel: true },
          xAxis: [
            { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], axisLine: { lineStyle: { color: '#e4e7ed' } }, axisLabel: { color: '#909399' } },
          ],
          yAxis: [
            { type: 'value', splitLine: { lineStyle: { color: '#f5f7fa', type: 'dashed' } }, axisLabel: { color: '#909399' } },
          ],
          series: [
            { name: '授权数', type: 'bar', barWidth: '60%', data: [65, 59, 80, 81, 56, 55, 40], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#10b981' }, { offset: 1, color: '#059669' }] }, borderRadius: [6, 6, 0, 0] } },
          ],
        },
      }
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .index-container {
    padding: 0 !important;
    margin: 0 !important;
    background: #f5f7f8 !important;

    .stat-card {
      border: none;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
      }

      .stat-content {
        display: flex;
        align-items: center;
        padding: 20px;

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          color: white;
          font-size: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .stat-info {
          flex: 1;

          .stat-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 5px;
          }

          .stat-label {
            font-size: 0.95rem;
            color: #7f8c8d;
            font-weight: 500;
          }
        }
      }
    }

    .chart-card {
      border: none;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

      .chart-wrapper {
        height: 300px;
        padding: 10px;
      }
    }
  }
</style>
