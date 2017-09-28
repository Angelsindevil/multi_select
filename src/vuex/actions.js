
export const changeIndexObj=(store,payload)=>{//用户列表刷新标识
    return new Promise(function(resolve, reject) {
        store.commit('changeIndexObj',{indexArr:payload.indexObj,length:payload.length});
        resolve("ok");
    })
}
