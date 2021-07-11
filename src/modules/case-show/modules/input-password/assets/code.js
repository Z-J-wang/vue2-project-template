const HTML = `<template>
<div class="password-input" :style="{ width: width }">
  <input
    style="ime-mode: disabled"
    :value="hideValue"
    @compositionstart="compositionstartHandle"
    @compositionend="compositionendHandle"
    @input="inputHandel"
    @paste.capture.prevent="pasteHandle"
    ref="password-input"
    :placeholder="placeholder"
  />
  <div class="btn-show" @click="isShow = !isShow">
    <img
      v-if="isShow"
      src="@/modules/case-show/modules/input-password/assets/pwd-show.png"
    />
    <img
      v-else
      src="@/modules/case-show/modules/input-password/assets/pwd-hide.png"
    />
  </div>
</div>
</template>
`;

const Javascript = `<script>
export default {
  name: 'password-input',
  props: {
    modelVal: String,
    placeholder: {
      type: String,
      default: '请输入'
    },
    width: {
      type: String,
      default: '300px'
    }
  },
  model: {
    prop: 'modelVal', //指向props的参数名
    event: 'input' //事件名称
  },
  data() {
    return {
      isShow: false,
      hideValue: '',
      compositionStatue: false,
      compositionStartCursorIndex: 0
    };
  },
  watch: {
    isShow: function() {
      this.render(this.modelVal);
    },
    modelVal: function(val) {
      this.render(val);
    }
  },
  methods: {
    render(val) {
      if (this.isShow) {
        this.hideValue = val;
      } else {
        this.hideValue = val.replace(/[^•]/g, '•');
      }
    },

    compositionstartHandle() {
      this.compositionStartCursorIndex = this.$refs[
        'password-input'
      ].selectionStart; // 记录进行中文输入时光标的位置
      this.compositionStatue = true;
    },

    compositionendHandle() {
      this.limitCN();
      this.compositionStatue = false;
      this.compositionLength = 0;
    },

    inputHandel() {
      if (this.compositionStatue) {
        // 进行中文输入时不执行 inputHandle 函数
        return false;
      }
      this.formatPassword();
    },

    pasteHandle() {
      return false;
    },

    formatPassword() {
      let new_pwd = ''; // 存储新的真实密码
      let old_pwd = this.modelVal || ''; // 获取旧的真实密码
      const pwd_input_elem = this.$refs['password-input']; // 获取密码输入框DOM
      let val = this.$refs['password-input'].value; // 获取输入框中的值
      const cursorIndex = pwd_input_elem.selectionStart; // 获取光标在输入框中的位置
      if (this.isShow) {
        // 明码显示,不做处理
        new_pwd = val;
      } else {
        // 隐藏密码
        if (old_pwd && old_pwd.length > val.length) {
          // 旧的真实密码存在，且其字符串长度大于输入框的字符串长度，说明用户进行删除操作
          const stop = old_pwd.length - val.length + cursorIndex; // 用户删除的字符串长度加光标的当前的位置，计算得出删除字符串的最后一个字符的位置
          const del_string = old_pwd.substring(cursorIndex, stop); // 获取用户删除的字符串
          new_pwd = old_pwd.replace(del_string, ''); // 将旧的真实密码中对应的删除字符串替换为'',实现对真实密码的删除操作
        } else {
          const reg = /[^•]/.exec(val); // 获取虚假密码中新增的密码字符
          new_pwd = this.insertStr(old_pwd, reg.index, reg[0]); // 将用户新输入的字符插入旧的真实密码
          this.cursorMove(pwd_input_elem, reg.index + 1); // 设置光标的位置
        }
      }
      this.$emit('input', new_pwd);
    },

    /**
     * 根据位置在字符串中插入字符串
     * @params soure 原字符串
     * @params start 位置
     * @params newStr 要插入的字符串
     */
    insertStr(soure, start, newStr) {
      return soure.slice(0, start) + newStr + soure.slice(start);
    },

    /**
     * 控制光标的位置
     */
    cursorMove(elem, spos) {
      // spos 光标的位置 -1为最后一位
      if (spos < 0) spos = elem.value.length;
      if (elem.setSelectionRange) {
        //兼容火狐,谷歌
        setTimeout(function() {
          elem.setSelectionRange(spos, spos);
          elem.focus();
        }, 0);
      } else if (elem.createTextRange) {
        //兼容IE
        var rng = elem.createTextRange();
        rng.move('character', spos);
        rng.select();
      }
    },

    // 限制中文输入
    limitCN() {
      let val = this.$refs['password-input'].value; // 获取输入框中的值
      // eslint-disable-next-line no-control-regex
      val = val.replace(/[^\x00-\x80•]/gi, '');
      this.$refs['password-input'].value = val;
      this.cursorMove(
        this.$refs['password-input'],
        this.compositionStartCursorIndex
      ); // 将光标重置为中文输入前的位置
    }
  }
};
</script>`;

const CSS = `
<style lang="less" scoped>
.password-input {
  position: relative;
  margin: 0 auto;
  input {
    height: 28px;
    width: 100%;
    line-height: 28px;
    padding-left: 10px;
    padding-right: 30px;
    box-sizing: border-box;
  }
  .btn-show {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    display: flex;
    height: 100%;
    width: 30px;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>`;

export default {
  HTML,
  Javascript,
  CSS
};
