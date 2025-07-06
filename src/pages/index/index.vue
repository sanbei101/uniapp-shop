<template>
  <view class="home-container">
    <wd-navbar title="首页" fixed placeholder custom>
      <template #right>
        <view class="nav-right">
          <wd-icon name="more" size="20px"></wd-icon>
          <view class="nav-right-win-controls">
            <text class="win-icon">-</text>
            <text class="win-icon">○</text>
          </view>
        </view>
      </template>
    </wd-navbar>

    <view class="search-section">
      <wd-search v-model="searchValue" placeholder="请输入搜索的商品" hide-cancel>
        <template #suffix>
          <wd-button size="small" type="danger" @click="onSearch">搜索</wd-button>
        </template>
      </wd-search>
    </view>

    <scroll-view scroll-y class="scroll-view">
      <view class="banner-wrapper">
        <image
          class="banner-image"
          src="https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6"
          mode="aspectFill"></image>
        <view class="banner-text-overlay">
          <text class="char">香</text>
          <view class="text-group">
            <text class="title">米香四溢</text>
            <text class="subtitle">开袋闻香, 唇齿留香</text>
            <text class="subtitle">无添加 / 无抛光</text>
          </view>
        </view>
      </view>

      <view class="recommend-section">
        <view class="recommend-title">为你推荐</view>
        <wd-grid :column="2" border clickable square>
          <wd-grid-item use-slot v-for="item in productList" :key="item.id">
            <view class="product-card">
              <image class="product-image" :src="item.image" mode="aspectFill"></image>
              <view class="product-info">
                <view class="product-tags">
                  <wd-tag
                    v-for="(tag, index) in item.tags"
                    :key="index"
                    custom-class="product-tag"
                    plain
                    :type="tag.type"
                    >{{ tag.text }}</wd-tag
                  >
                </view>
                <text class="product-title">{{ item.title }}</text>
                <view class="product-price">
                  <text class="price-symbol">¥</text>
                  <text class="price-value">{{ item.price }}</text>
                </view>
              </view>
            </view>
          </wd-grid-item>
        </wd-grid>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 搜索值
const searchValue = ref('');

// 生成商品列表数据的函数
function generateProductList(count = 10) {
  const baseTags = [
    [
      { text: '不抛光不打蜡', type: 'primary' },
      { text: '口感软糯，老幼皆宜', type: 'success' },
      { text: '精选东北珍珠大米', type: 'warning' }
    ],
    [
      { text: '米中精品', type: 'primary' },
      { text: '粒粒甄选', type: 'success' },
      { text: '国标二级', type: 'danger' }
    ]
  ];
  const titles = ['【木禾优选】东北珍珠米', '【木禾优选】东北长粒香米'];
  const prices = ['31.99', '41.99'];
  const image = 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6';
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push({
      id: i + 1,
      title: titles[i % titles.length],
      price: prices[i % prices.length],
      image,
      tags: baseTags[i % baseTags.length]
    });
  }
  return list;
}

const productList = ref(generateProductList(10));

// 搜索事件
const onSearch = () => {
  if (!searchValue.value) {
    uni.showToast({
      title: '请输入商品名称',
      icon: 'none'
    });
    return;
  }
  console.log(`正在搜索: ${searchValue.value}`);
  // 这里可以执行实际的搜索逻辑
};
</script>

<style lang="scss">
/* 全局页面背景 */
page {
  background-color: #f7f7f7;
  height: 100%;
}

.home-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f7f7f7;
}

/* 1. 自定义导航栏样式 */
.nav-right {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-right: 12px;
}
.nav-right-win-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  .win-icon {
    font-family: monospace;
    font-size: 18px;
  }
}

/* 2. 搜索栏区域 */
.search-section {
  padding: 0 10px 10px;
  background-color: #ffffff;
  /* 自定义搜索按钮样式 */
  :deep(.wd-button--small) {
    height: 34px !important;
    border-radius: 8px;
  }
}

/* 3. 滚动区域 */
.scroll-view {
  flex: 1;
  overflow-y: auto;
  box-sizing: border-box;
}

/* 3.1 Banner 样式 */
.banner-wrapper {
  position: relative;
  width: 100%;
  height: 180px;
  .banner-image {
    width: 100%;
    height: 100%;
  }
  .banner-text-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    color: white;

    .char {
      font-size: 80px;
      font-weight: bold;
      margin-right: 15px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
    .text-group {
      display: flex;
      flex-direction: column;
      .title {
        font-size: 24px;
        font-weight: bold;
      }
      .subtitle {
        font-size: 14px;
        margin-top: 5px;
        opacity: 0.9;
      }
    }
  }
}

/* 3.2 推荐区域样式 */
.recommend-section {
  margin-top: 15px;
  padding: 0 10px;
}

.recommend-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  padding-left: 5px;
}

/* 商品卡片自定义样式 */
:deep(.wd-grid-item) {
  // 覆盖 wot-design-uni 的默认背景色
  background-color: transparent !important;
}
:deep(.wd-grid-item__content) {
  padding: 0 !important;
  // 覆盖默认的内边距和圆角
  border-radius: 8px;
  overflow: hidden;
  background-color: #ffffff;
  margin: 5px;
}

.product-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  .product-image {
    width: 100%;
    height: 160px; // 固定高度
  }
  .product-info {
    padding: 8px;
    .product-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-bottom: 8px;
      // 自定义标签样式
      .product-tag {
        transform: scale(0.9); // 缩小一点标签
        transform-origin: left;
        padding: 2px 4px !important;
        margin-right: 0 !important;
      }
    }
    .product-title {
      font-size: 14px;
      color: #333;
      // 文字超出两行显示省略号
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      min-height: 38px; // 保证两行的高度
    }
    .product-price {
      margin-top: 8px;
      color: #fa2c19;
      .price-symbol {
        font-size: 12px;
        margin-right: 2px;
      }
      .price-value {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}
</style>
