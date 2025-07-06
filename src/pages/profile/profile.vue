<template>
  <view class="profile-container">
    <view class="header-background"></view>

    <scroll-view scroll-y class="content-scroll">
      <view class="user-info-header">
        <view class="user-details">
          <view class="avatar-wrapper">
            <image class="avatar" src="https://cdn.wot-design.com/common/logo-red.png" />
          </view>
          <text class="username">用户_5637621</text>
          <view class="header-icons">
            <wd-icon name="scan" color="#fff" size="22px"></wd-icon>
          </view>
        </view>
        <view class="user-stats">
          <view class="stat-item">
            <text class="stat-value">0</text>
            <text class="stat-label">我的收藏</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="stat-value">4</text>
            <text class="stat-label">我的足迹</text>
          </view>
        </view>
      </view>

      <view class="cards-container">
        <view class="card">
          <view class="card-header">
            <text class="card-title">我的订单</text>
            <view class="card-more">
              <text>查看更多</text>
              <wd-icon name="arrow-right" size="14px"></wd-icon>
            </view>
          </view>
          <wd-grid :column="5" border clickable>
            <wd-grid-item use-slot v-for="item in orderActions" :key="item.name">
              <view class="grid-item-content">
                <wd-icon :name="item.icon" size="28px" class="grid-icon-class" />
                <text class="grid-item-label">{{ item.name }}</text>
              </view>
            </wd-grid-item>
          </wd-grid>
        </view>

        <view class="info-cards-row">
          <view class="info-card">
            <view class="info-text">
              <text class="info-label">积分</text>
              <text class="info-value">0</text>
            </view>
            <view class="info-icon-wrapper">
              <wd-icon name="gift" size="24px" color="#fff" />
            </view>
          </view>
          <view class="info-card">
            <view class="info-text">
              <text class="info-label">优惠券</text>
              <text class="info-value">0</text>
            </view>
            <view class="info-icon-wrapper">
              <wd-icon name="coupon" size="24px" color="#fff" />
            </view>
          </view>
          <view class="info-card">
            <view class="info-text">
              <text class="info-label">卡券</text>
              <text class="info-value">0</text>
            </view>
            <view class="info-icon-wrapper">
              <wd-icon name="card" size="24px" color="#fff" />
            </view>
          </view>
        </view>

        <view class="card">
          <view class="card-header">
            <text class="card-title">菜单栏</text>
          </view>
          <wd-grid :column="4" border clickable>
            <wd-grid-item use-slot v-for="item in menuItems" :key="item.name">
              <view class="grid-item-content">
                <wd-icon :name="item.icon" size="28px" class="grid-icon-class" />
                <text class="grid-item-label">{{ item.name }}</text>
              </view>
            </wd-grid-item>
          </wd-grid>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 订单操作项
const orderActions = ref([
  { name: '待付款', icon: 'wallet' },
  { name: '待发货', icon: 'cart' },
  { name: '待收货', icon: 'next' },
  { name: '已完成', icon: 'check-circle' },
  { name: '售后', icon: 'refresh' }
]);
// 菜单栏项
const menuItems = ref([
  { name: '我的收藏', icon: 'star' },
  { name: '收货地址', icon: 'location' },
  { name: '绑定手机号', icon: 'phone' },
  { name: '分销中心', icon: 'share' },
  { name: '分类', icon: 'grid' }
]);
</script>

<style lang="scss">
page {
  background-color: #f7f8fa;
}

.profile-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

/* 1. 顶部红色渐变背景 */
.header-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 220px;
  background: linear-gradient(180deg, #ff6e6e 0%, #ff8a8a 100%);
  z-index: 1;
}

/* 2. 模拟的顶部自定义控件 */
.custom-header-controls {
  position: absolute;
  top: var(--status-bar-height); // 适配状态栏高度
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  z-index: 3;
  color: white;

  .notification-badge {
    font-size: 16px;
    font-weight: bold;
  }
  .win-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    .win-icon {
      font-family: monospace;
      font-size: 18px;
      font-weight: bold;
    }
  }
}

.content-scroll {
  position: relative;
  height: 100%;
  z-index: 2;
}

/* 3. 用户信息区域 */
.user-info-header {
  color: white;
  padding: 45px 15px 20px;
  padding-top: calc(var(--status-bar-height) + 45px); // 避开自定义控件
}

.user-details {
  display: flex;
  align-items: center;
  margin-bottom: 25px;

  .avatar-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .username {
    font-size: 18px;
    font-weight: 500;
    margin-left: 15px;
  }

  .header-icons {
    margin-left: auto;
    display: flex;
    gap: 15px;
  }
}

.user-stats {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .stat-value {
      font-size: 20px;
      font-weight: bold;
    }
    .stat-label {
      font-size: 13px;
      margin-top: 5px;
      opacity: 0.9;
    }
  }

  .stat-divider {
    width: 1px;
    height: 30px;
    background-color: rgba(255, 255, 255, 0.4);
  }
}

/* 4. 内容卡片区域 */
.cards-container {
  padding: 0 15px;
  margin-top: -10px; /* 核心技巧：让卡片向上移动，覆盖部分背景 */
}

.card {
  background-color: #fff;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    .card-title {
      font-size: 16px;
      font-weight: bold;
    }

    .card-more {
      display: flex;
      align-items: center;
      font-size: 13px;
      color: #999;
    }
  }
}

/* 4.2 中间信息卡片行 */
.info-cards-row {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.info-card {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .info-text {
    display: flex;
    flex-direction: column;
    .info-label {
      font-size: 14px;
      color: #333;
    }
    .info-value {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      margin-top: 5px;
    }
  }

  .info-icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

/* 通用宫格样式 */
.grid-item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;

  .grid-item-label {
    font-size: 12px;
    color: #333;
    margin-top: 8px;
  }
}

// 覆盖wot-design的宫格边框颜色
:deep(.wd-grid.is-border)::after {
  border-color: #fff; // 隐藏外部边框
}
</style>
