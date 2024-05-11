import gsap from "gsap";

// 深度复制函数
export function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    const newObj = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            newObj[key] = deepClone(obj[key]);
        }
    }
    return newObj;
}

// 节流函数
export function throttle(fn:(args) => void, delay = 3000){
    let time = 0
    return function(this:unknown, ...args:unknown[]){
        if(Date.now() - time > delay){
            fn.apply(this, args)
            time = Date.now()
        }
    }
}

export const gsapScrollTo =  throttle((args: gsap.TweenVars)=>{
    gsap.to(window, {
        ...args,
        duration: 2
    })
}, 2000)
