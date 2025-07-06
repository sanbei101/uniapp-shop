<template>
  <view class="category-container">
    <wd-navbar title="商品分类" fixed placeholder />

    <view class="search-section">
      <wd-search v-model="searchValue" placeholder="搜索分类或商品" hide-cancel />
    </view>

    <view class="main-content">
      <scroll-view scroll-y class="left-sidebar">
        <wd-sidebar v-model="activeCategoryIndex" @change="onCategoryChange">
          <wd-sidebar-item v-for="item in categoryList" :key="item.id" :label="item.name" />
        </wd-sidebar>
      </scroll-view>

      <scroll-view scroll-y class="right-content">
        <view v-if="currentCategory" class="content-wrapper">
          <image class="category-banner" :src="currentCategory.bannerUrl" mode="aspectFill"></image>
          <wd-grid :column="3" border clickable>
            <wd-grid-item
              use-slot
              v-for="subItem in currentCategory.subCategories"
              :key="subItem.id">
              <view class="subcategory-item">
                <image class="subcategory-image" :src="subItem.imageUrl" mode="aspectFit"></image>
                <text class="subcategory-name">{{ subItem.name }}</text>
              </view>
            </wd-grid-item>
          </wd-grid>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const searchValue = ref('');
const activeCategoryIndex = ref(0); // 当前激活的一级分类索引

// 模拟分类数据
const categoryList = ref([
  {
    id: 'c1',
    name: '粮油米面',
    bannerUrl:
      'https://img.zcool.cn/community/0178c75c8f1a1fa801213f26d7f369.jpg@1280w_1l_2o_100sh.jpg',
    subCategories: [
      { id: 's101', name: '大米', imageUrl: 'https://cdn.wot-design.com/common/nav_rice.png' },
      { id: 's102', name: '面粉', imageUrl: 'https://cdn.wot-design.com/common/nav_flour.png' },
      { id: 's103', name: '食用油', imageUrl: 'https://cdn.wot-design.com/common/nav_oil.png' },
      { id: 's104', name: '杂粮', imageUrl: 'https://cdn.wot-design.com/common/nav_grain.png' },
      { id: 's105', name: '面条', imageUrl: 'https://cdn.wot-design.com/common/nav_noodle.png' },
      {
        id: 's106',
        name: '调味品',
        imageUrl: 'https://cdn.wot-design.com/common/nav_condiment.png'
      }
    ]
  },
  {
    id: 'c2',
    name: '时令水果',
    bannerUrl:
      'https://img.zcool.cn/community/017a7d59439c17a8012193a3237119.jpg@1280w_1l_2o_100sh.jpg',
    subCategories: [
      { id: 's201', name: '苹果', imageUrl: 'https://cdn.wot-design.com/common/nav_apple.png' },
      { id: 's202', name: '橙子', imageUrl: 'https://cdn.wot-design.com/common/nav_orange.png' },
      { id: 's203', name: '香蕉', imageUrl: 'https://cdn.wot-design.com/common/nav_banana.png' },
      { id: 's204', name: '葡萄', imageUrl: 'https://cdn.wot-design.com/common/nav_grape.png' },
      {
        id: 's205',
        name: '西瓜',
        imageUrl: 'https://cdn.wot-design.com/common/nav_watermelon.png'
      },
      { id: 's206', name: '草莓', imageUrl: 'https://cdn.wot-design.com/common/nav_strawberry.png' }
    ]
  },
  {
    id: 'c3',
    name: '肉禽蛋品',
    bannerUrl:
      'https://img.zcool.cn/community/019b845b4ed76da80121b9942d9976.jpg@1280w_1l_2o_100sh.jpg',
    subCategories: [
      { id: 's301', name: '猪肉', imageUrl: 'https://cdn.wot-design.com/common/nav_pork.png' },
      { id: 's302', name: '牛肉', imageUrl: 'https://cdn.wot-design.com/common/nav_beef.png' },
      { id: 's303', name: '羊肉', imageUrl: 'https://cdn.wot-design.com/common/nav_mutton.png' },
      { id: 's304', name: '鸡肉', imageUrl: 'https://cdn.wot-design.com/common/nav_chicken.png' },
      { id: 's305', name: '鸭肉', imageUrl: 'https://cdn.wot-design.com/common/nav_duck.png' },
      { id: 's306', name: '鸡蛋', imageUrl: 'https://cdn.wot-design.com/common/nav_egg.png' }
    ]
  },
  {
    id: 'c4',
    name: '乳品冷饮',
    bannerUrl:
      'https://img.zcool.cn/community/01a4ba5ae35489a80120a895786f34.jpg@1280w_1l_2o_100sh.jpg',
    subCategories: [
      { id: 's401', name: '牛奶', imageUrl: 'https://cdn.wot-design.com/common/nav_milk.png' },
      { id: 's402', name: '酸奶', imageUrl: 'https://cdn.wot-design.com/common/nav_yogurt.png' },
      {
        id: 's403',
        name: '冰淇淋',
        imageUrl: 'https://cdn.wot-design.com/common/nav_ice_cream.png'
      }
    ]
  }
  // 可以继续添加更多分类
]);

// 计算属性，根据激活的索引获取当前分类的详细信息
const currentCategory = computed(() => {
  return categoryList.value[activeCategoryIndex.value];
});

// 分类切换事件
const onCategoryChange = ({ value }: any) => {
  console.log(`切换到分类索引: ${value}`);
  // 可以在这里请求新分类的数据
};
</script>

<style lang="scss">
/* 全局页面背景 */
page {
  background-color: #f7f7f7;
  height: 100%;
}

.category-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 2. 搜索栏区域 */
.search-section {
  padding: 0 10px 10px;
  background-color: #ffffff;
  border-bottom: 1px solid #eee;
}

/* 3. 主体内容区 */
.main-content {
  flex: 1;
  display: flex;
  overflow: hidden; // 防止内容溢出
}

/* 3.1 左侧一级分类 */
.left-sidebar {
  width: 100px;
  background-color: #f7f7f7;
  height: 100%;
}

/* 3.2 右侧二级分类内容 */
.right-content {
  flex: 1;
  height: 100%;
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;

  .content-wrapper {
    display: flex;
    flex-direction: column;
  }
}

.category-banner {
  width: 100%;
  height: 90px;
  border-radius: 8px;
  margin-bottom: 15px;
}

// 覆盖宫格item默认内边距
:deep(.wd-grid-item__content) {
  padding: 8px 4px !important;
}

.subcategory-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .subcategory-image {
    width: 60px;
    height: 60px;
    margin-bottom: 8px;
  }

  .subcategory-name {
    font-size: 12px;
    color: #666;
  }
}
</style>
