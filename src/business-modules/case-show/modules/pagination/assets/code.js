const HTML = `<template>
  <div class="common-pagination-front" v-if="!(hideOnSinglePage && total < pageSize)">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :current-page="currentPage"
      :total="total"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <div class="toolbar">
      <div class="total-page">共 {{totalPages}} 页</div>
      <div class="jumpTo">
        <div class="jumpToInput">
          <span>到第</span>
          <el-input type="number" v-model.number="jumpToPage" @keyup.native.enter="jump"></el-input>
          <span>页</span>
        </div>
        <el-button @click="jump">确定</el-button>
      </div>
    </div>
  </div>
</template>
`;

const Javascript = `<script>
export default {
  name: 'common-pagination-front',
  props: {
    total: {
      // 总条数
      type: Number,
      require: true,
      default: 0
    },
    pageSize: {
      // 分页大小，即一页显示多少条
      type: Number,
      default: 10
    },
    currentPage: {
      // 当前页
      type: Number,
      default: 1
    },
    hideOnSinglePage: {
      // 只有一页时是否隐藏,默认开启
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      jumpToPage: ''
    };
  },
  computed: {
    /**
     * 总页数
     */
    totalPages() {
      let all = this.total / this.pageSize;
      if (this.total % this.pageSize > 0) {
        // 如果不能整除，则向下取整并+1
        all = Math.floor(all) + 1;
      }

      return all;
    }
  },
  methods: {
    /**
     * 当前分页切换事件
     */
    handleCurrentChange(val) {
      this.$emit('currentChange', val);
    },

    /**
     * 页码跳转
     */
    jump() {
      if (this.jumpToPage < 1) {
        this.currentPage = 1;
      } else if (this.jumpToPage > this.totalPages) {
        this.currentPage = this.totalPages;
      } else {
        this.currentPage = this.jumpToPage;
      }
      this.$emit('currentChange', this.currentPage);
    }
  }
};
</script>`;

const CSS = `<style lang="less" scoped>
.common-pagination-front {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 14px;
  color: #666666;
  .el-pagination {
    /deep/ button {
      min-width: 40px;
      height: 40px;
      line-height: 40px;
      background-color: #fff;
      border: 1px solid #e5e5e5;
      &:hover {
        color: #3677fb;
        border-color: #3677fb;
      }
    }
    /deep/ .el-pager {
      li {
        min-width: 40px;
        height: 40px;
        line-height: 40px;
        background-color: #fff;
        border: 1px solid #e5e5e5;
        &:hover {
          color: #3677fb;
          border-color: #3677fb;
        }
      }
      li.active {
        background-color: #3677fb;
        border-color: #3677fb;
        &:hover {
          color: #fff;
        }
      }
    }
  }
  .toolbar {
    display: flex;
    .total-page {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 8px;
    }
    .jumpTo {
      display: flex;
      .jumpToInput {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
        .el-input {
          flex: 1;
          width: 40px;
          margin-left: 4px;
          margin-right: 4px;
          /deep/ .el-input__inner {
            text-align: center;
            padding-top: 11px;
            padding-bottom: 11px;
            padding-left: 5px;
            padding-right: 5px;
            border-color: #e5e5e5;
            &::-webkit-inner-spin-button {
              -webkit-appearance: none;
            }
            &::-webkit-outer-spin-button {
              -webkit-appearance: none;
            }
          }
        }
      }
      .el-button {
        width: 80px;
        min-width: 80px;
        border-color: #e5e5e5;
      }
    }
  }
}
</style>`;

export default {
  HTML,
  Javascript,
  CSS
};
