function classMixin(...mixins) {
  class Mix {
    constructor() {
      // eslint-disable-next-line prefer-const
      for (let Mixin of mixins) {
        copyProperties(this, new Mixin()); // 拷贝实例属性
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}

function copyProperties(target, source) {
  /**
	 * for in                     => 用于遍历对象的"可枚举"属性，包括"自有属性、原型属性"
	 * Object.keys                => 返回对象的部分自有属性，包括"可枚举"
	 * Object.getOwnPropertyNames => 返回对象的所有自有属性，包括"可枚举"、"不可枚举"
	 * Reflect.ownKeys            => 返回对象的所有自有属性，包括"可枚举"、"不可枚举"、"Symbols"
	 */
  for (let key of Reflect.ownKeys(source)) {
    if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
      const desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

export { classMixin };
