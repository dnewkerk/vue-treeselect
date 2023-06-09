<template>
  <div>
    <treeselect
      :options="options"
      :value="value"
      :searchable="false"
      @update:modelValue="updateValue"
      />
    <treeselect-value :value="value" />
  </div>
</template>

<script>
  import { createStore, mapState, mapMutations } from 'vuex'
  import { generateOptions } from './utils'

  const store = createStore({
    state() {
      return {
        value: 'a',
      }
    },
    mutations: {
      updateValue(state, value) {
        state.value = value
      },
    },
  })

  export default {
    store,

    data: () => ({
      options: generateOptions(2),
    }),

    computed: {
      ...mapState([ 'value' ]),
    },

    methods: {
      ...mapMutations([ 'updateValue' ]),
    },
  }
</script>
