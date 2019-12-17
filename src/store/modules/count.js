import * as Types from '../mutationsType'

export default {
    namespaced: true,
    /**
     * 唯一容器state
     */
    state: {
      count: 100
    },

    getters: {
        filterCount: (state) => state.count >= 120 ? 120 : state.count
    },

    mutations: {
        /**
         * 增加
         * @param {*} state 数据
         * @param {*} payload 载荷
         */
        [Types.INCREMENT](state, payload) {
            state.count += payload.step;
        },

        /**
         * 减少
         * @param {*} state 数据
         * @param {*} payload 载荷
         */
        [Types.DECREMENT](state, payload) {
            state.count -= payload.step;
        }
    },
    
    actions: {
        /**
         * action 事件处理
         * @param {*} param0 
         */
        addAction({commit, dispatch}) {
            setTimeout(() => {
                // 改变状态，提交mutaions
                commit(Types.INCREMENT,{
                step: 5
                })
                dispatch('textAction', {text: '测试'});
            },1000);
        },
        textAction(context, parames){
            console.log(parames);
        }
    }
};
  