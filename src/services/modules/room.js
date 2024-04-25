import newRequest from "../new"

// 客房
export function getroommsg() {
    return newRequest.get({
        url: "/frontadmin/room"
    })
}

// 登录
export function roomlogin(data) {
    return newRequest.post({
        url: '/frontadmin/login',
        data
    })
}

// 注册
export function roomregus(data) {
    console.log('1111data', data);
    return newRequest.post({
        url: "/frontadmin/regues",
        data: data
    })
}

// 预订并生成订单
export function reserveAorder(data) {
    console.log(data);
    return newRequest.post({
        url: "/frontadmin/reserve",
        data
    })
}

// 修改个人信息
export function updategus(data) {
    return newRequest.post({
        url: "/frontadmin/update",
        data
    })
}