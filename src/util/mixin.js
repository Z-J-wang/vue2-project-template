function mix (...mixins) {
    class Mix {
        constructor() {
            // eslint-disable-next-line prefer-const
            for (let Mixin of mixins) {
                copyProperties(this, new Mixin()) // 拷贝实例属性
            }
        }
    }

    // eslint-disable-next-line prefer-const
    for (let mixin of mixins) {
        copyProperties(Mix, mixin) // 拷贝静态属性
        copyProperties(Mix.prototype, mixin.prototype) // 拷贝原型属性
    }

    return Mix
}

function copyProperties (target, source) {
    // eslint-disable-next-line prefer-const
    for (let key of Reflect.ownKeys(source)) {
        if (key !== 'constructor' &&
            key !== 'prototype' &&
            key !== 'name') {
            const desc = Object.getOwnPropertyDescriptor(source, key)
            Object.defineProperty(target, key, desc)
        }
    }
}

export default mix
