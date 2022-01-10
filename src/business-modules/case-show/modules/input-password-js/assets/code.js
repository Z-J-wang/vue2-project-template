const HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div class="pwd">
      <input type="text" class="password-input" value="1234" />
      <button class="btn-toggle" type="button">切换</button>
    </div>
    <script src="PasswordInput.js"></script>
    <script>
      window.onload = function() {
        new PasswordInput('.pwd', (e, status) => {
          console.log(e);
          console.log(status);
        });
      };
    </script>
  </body>
</html>`;

const Javascript = `// 密码输入框组件
class PasswordInput {
  /**
   * 构造函数
   * @param {String} constainer_selector 密码输入框父（容器）元素的样式选择器
   * @param {Function} toggleCallback  密码显示隐藏回调函数
   */
  constructor(constainer_selector, toggleCallback) {
    this.compositionStatue = false; // 中文输入的标记符：true 为正在进行中文输入
    this.compositionStartCursorIndex = 0; // 记录进行中文输入时光标的位置
    this._containerElem = document.querySelector(constainer_selector); // 密码框父（容器）元素
    this._inputElem = document.querySelector(
      \`\${constainer_selector} .password-input\`
    ); // 密码框 input 本身
    this._btnToggleElem = document.querySelector(
      \`\${constainer_selector} .btn-toggle\`
    ); // 密码显示隐藏按钮元素

    /**
     * 密码显示隐藏回调函数
     * @param {Element} 按钮本身
     * @param {String} 显示隐藏标识：show / hide
     */
    this._toggleCallback = toggleCallback;

    if (this._inputElem) {
      this.initInput();
    }

    if (this._btnToggleElem) {
      // 添加显示隐藏按钮点击事件
      this._btnToggleElem.addEventListener('click', this.btnToggleElemClick);
      this._btnToggleElem.addEventListener('paste', function() {
        return false;
      });
    }
  }

  /**
   * input 初始化
   */
  initInput() {
    this._inputElem.status = 'hide'; // 初始时，默认隐藏状态
    this._inputElem.pwdValue = ''; // pwdValue 属性，用于存储真正的密码
    this._inputElem.type = 'text'; // 强制 input type 为 text, 防止用户设置 password 类型从而造成影响
    this._inputElem.setAttribute('ime-mode', 'disabled');
    if (this._inputElem.value) {
      // 如果存在默认密码，则将默认密码存入 pwdValue，并渲染一次密码
      this._inputElem.pwdValue = this._inputElem.value;
      this.toggleRender();
    }

    // 开始进行中文输入时触发的事件
    this._inputElem.addEventListener('compositionstart', () => {
      this.compositionStartCursorIndex = this._inputElem.selectionStart; // 记录进行中文输入时光标的位置
      this.compositionStatue = true;
    });

    // 中文输入结束后触发的事件
    this._inputElem.addEventListener('compositionend', () => {
      this.limitCN();
      this.compositionStatue = false;
      this.compositionLength = 0;
    });

    // input 事件
    this._inputElem.addEventListener('input', () => {
      if (this.compositionStatue) {
        // 进行中文输入时不执行 inputHandle 函数
        return false;
      }
      this.inputHandle();
    });

    // 禁止粘贴
    this._inputElem.addEventListener('paste', (e) => {
      e.preventDefault();
      return false;
    });
  }

  // input 事件
  inputHandle = () => {
    const val = this._inputElem.value;
    let newPwd = ''; // 存储新的真正密码
    let oldPwd = this._inputElem.pwdValue || ''; // 获取存储的真正密码，将其定为旧密码
    const cursorIndex = this._inputElem.selectionStart; // 获取光标在输入框中的位置

    if (this._inputElem.status == 'hide') {
      // 当密码需要隐藏时，将密码转为*，真正的密码为 pwdValue
      if (oldPwd && oldPwd.length > val.length) {
        // 旧的真实密码存在，且其字符串长度大于输入框的字符串长度，说明用户进行删除操作
        const compositionStatue = oldPwd.length - val.length + cursorIndex; // 用户删除的字符串长度加光标的当前的位置，计算得出删除字符串的最后一个字符的位置
        const del_string = oldPwd.substring(cursorIndex, compositionStatue); // 获取用户删除的字符串
        newPwd = oldPwd.replace(del_string, ''); // 将旧的真实密码中对应的删除字符串替换为'',实现对真实密码的删除操作
      } else {
        const reg = /[^•]/.exec(val); // 获取虚假密码中新增的密码字符
        if (reg) {
          // 如果存在新增密码字符，则进行输入输入处理
          newPwd = this.insertStr(oldPwd, reg.index, reg[0]); // 将用户新输入的字符插入旧的真实密码
          this.cursorMove(this._inputElem, reg.index + 1); // 设置光标的位置
        } else {
          // 如果不存在新增密码字符，不做改变
          newPwd = oldPwd;
        }
      }
    } else {
      // 当不需要隐藏密码时，仍需要将密码存入 pwdValue
      newPwd = val;
    }
    this._inputElem.pwdValue = newPwd;
    this.toggleRender();
  };

  // 密码隐藏显示切换按钮 click 事件
  btnToggleElemClick = () => {
    if (this._inputElem.status == 'hide') {
      this._inputElem.status = 'show';
    } else {
      this._inputElem.status = 'hide';
    }
    this._toggleCallback(this._btnToggleElem, this._inputElem.status); /// 执行显示隐藏的回调函数
    this.toggleRender();
  };

  // 密码显示/隐藏切换时，对input value 的处理的渲染函数
  toggleRender() {
    const val = this._inputElem.value;
    if (this._inputElem.status == 'hide') {
      const replaceVal = val.replace(/[^•]/g, '•');
      this._inputElem.value = replaceVal;
    } else {
      this._inputElem.value = this._inputElem.pwdValue;
    }
  }

  /**
   * 根据位置在字符串中插入字符串
   * @params soure 原字符串
   * @params start 位置
   * @params newStr 要插入的字符串
   */
  insertStr(soure, start, newStr) {
    return soure.slice(0, start) + newStr + soure.slice(start);
  }

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
  }

  // 限制中文输入
  limitCN() {
    let val = this._inputElem.value; // 获取输入框中的值、
    val = val.replace(/[^\x00-\x80•]/gi, ''); // 把所有双字节字符替换为空(排除•)
    this._inputElem.value = val;
    this.cursorMove(this._inputElem, this.compositionStartCursorIndex); // 将光标重置为中文输入前的位置
  }
}`;

const CSS = '';

export default {
  HTML,
  Javascript,
  CSS
};
