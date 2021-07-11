import Vue from 'vue';
import messageBoxVue from '@/modules/case-show/modules/messageBox/components/messageBox.vue';

const MessageBox = Vue.extend(messageBoxVue); // 直接将Vue组件作为Vue.extend的参数

const messageBox = (message, title, config = {}) => {
  return new Promise((resolve, reject) => {
    const instance = new MessageBox({
      data: {
        message: message,
        title: title,
        lockScroll: config?.lockScroll === false ? false : true, // 是否在 MessageBox 出现时将 body 滚动锁定
        dangerouslyUseHTMLString: config?.dangerouslyUseHTMLString || false, // 是否将 message 属性作为 HTML 片段处理, 默认为 false
        showCancelButton: config?.showCancelButton === false ? false : true, // 取消按钮显示隐藏，默认 true
        showClose: config?.showClose === false ? false : true, // 默认 true
        confirmButtonText: config?.confirmButtonText || '确认', // 未配置文本，默认‘确认’
        cancelButtonText: config?.cancelButtonText || '取消', // 未配置文本，默认‘取消’
        type: config?.type || 'success'
      }
    });
    instance.vm = instance.$mount(); // 挂载但是并未插入dom，是一个完整的Vue实例
    instance.dom = instance.vm.$el;
    document.body.appendChild(instance.dom); // 将dom插入body

    instance.callback = ret => {
      if (ret === true) {
        resolve();
      } else if (ret === false) {
        reject();
      }
    };
  });
};

export default {
  install: Vue => {
    Vue.prototype.$messageBox = messageBox; // 将组件暴露出去，并挂载在Vue的prototype上
  }
};

