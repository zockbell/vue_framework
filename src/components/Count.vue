<template>
  <div class="countWrapper">
    <div class="vuex_demo">
      <van-button plain hairline type="info" @click="deHandle({step: 2})">-</van-button>
      <span>{{count}}</span>
      <van-button plain hairline type="info" @click="addHandle">+</van-button>
    </div>
    <p>{{num2}}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import * as Types from '../store/mutationsType'

export default {
  name: 'count',
  // computed: mapState({
    // num: state => state.count
    // num: 'count'
    /*
    num(state) {
      return state.count;
    }
    */
    // count: 'count'
  // }),
  // computed: mapState(['count']),
  computed: {
    ...mapGetters('count', {
      num2: 'filterCount'
    }),
    ...mapState('count', ['count'])
  },
  data(){
    return {
      loading: true
    }
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    // 加
    ...mapActions('count', {
      addHandle: 'addAction'
    }),

    // 减
    ...mapMutations('count', { // 使用辅助函数再传参，需要在@click方法调用时传参
      deHandle: Types.DECREMENT
    })
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/components/count';
</style>
