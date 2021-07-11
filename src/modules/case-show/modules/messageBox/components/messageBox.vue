<template>
  <transition name="extends">
    <div
      v-show="visible"
      id="messageBox"
      class="messageBox"
      @click="cloceModal"
    >
      <div class="contain">
        <header>
          <i class="close el-icon-close" v-if="showClose" @click="close"></i>
        </header>
        <main>
          <div>
            <img
              v-if="type === 'success'"
              width="40"
              src="@/modules/case-show/modules/messageBox/assets/success.png"
            />
            <img
              v-if="type === 'warning'"
              width="40"
              src="@/modules/case-show/modules/messageBox/assets/warning.png"
            />
            <img
              v-if="type === 'error'"
              width="40"
              src="@/modules/case-show/modules/messageBox/assets/error.png"
            />
            <img
              v-if="type === 'info'"
              width="40"
              src="@/modules/case-show/modules/messageBox/assets/info.png"
            />
            <img
              v-if="type === 'question'"
              width="40"
              src="@/modules/case-show/modules/messageBox/assets/question.png"
            />
          </div>
          <div class="content">
            <h3 v-if="title">{{ title }}</h3>
            <p v-if="dangerouslyUseHTMLString" v-html="message"></p>
            <p v-else>{{ message }}</p>
          </div>
        </main>
        <footer>
          <el-button v-if="showCancelButton === true" @click="close">{{
            cancelButtonText
          }}</el-button>
          <el-button type="primary" @click="confirm">{{
            confirmButtonText
          }}</el-button>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'message-box',
  data() {
    return {
      visible: false,
      message: '',
      title: '',
      lockScroll: true,
      showCancelButton: true,
      dangerouslyUseHTMLString: false,
      showClose: false,
      closeOnClickModal: false,
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'success', // success、warning、error、info、question
      callback: null
    };
  },
  created() {
    if (this.lockScroll) {
      // 是否在 MessageBox 出现时将 body 滚动锁定
      document.body.classList.add('messageBox-srcoll-hideen');
    }
    this.$nextTick(() => {
      this.visible = true;
    });
  },
  methods: {
    close() {
      this.visible = false;
      this.callback && this.callback(false);
      this.remove();
    },
    cloceModal() {
      if (this.closeOnClickModal) {
        this.close();
      }
    },
    confirm() {
      this.visible = false;
      this.callback && this.callback(true);
      this.remove();
    },

    // 组件移除事件
    remove() {
      setTimeout(() => {
        this.$destroy(this);
        document.body.classList.remove('messageBox-srcoll-hideen');
        document.querySelector('#messageBox').remove(); // 等过渡效果结束后，再移除组件
      }, 500);
    }
  }
};
</script>
<style lang="less">
.messageBox-srcoll-hideen {
  overflow: hidden;
}
.messageBox {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2001;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  .contain {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 240px;
    border-radius: 4px;
    box-sizing: border-box;

    background-color: #ffffff;
    header {
      width: 100%;
      height: 36px;
      text-align: right;
      padding: 5px;
      box-sizing: border-box;
      .close {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 36px;
        height: 36px;
        font-weight: bold;
        cursor: pointer;
        &:hover,
        &:focus {
          background: #1367da14;
          border-radius: 4px;
          color: #1367da;
        }
      }
    }
    main {
      display: flex;
      width: 100%;
      max-height: 127px;
      overflow-y: hidden;
      padding: 30px 40px;
      box-sizing: border-box;
      & > div:first-child {
        width: 40px;
        height: 40px;
      }
      .content {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        width: 350px;
        min-height: 40px;
        padding-left: 16px;
        & * {
          width: 100%;
        }
        h3 {
          margin-bottom: 4px;
          font-size: 18px;
          font-weight: bold;
          color: #333333;
          line-height: 22px;
        }
        p {
          text-align: left;
          font-size: 14px;
          color: #999999;
        }
      }
    }
    footer {
      // box-sizing: border-box;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 67px;
      padding: 13px 16px;
      text-align: right;
    }
  }
}
</style>

