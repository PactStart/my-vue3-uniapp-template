<template>
  <view class="center flex-col">
    <image class="h-200 w-200 mt-25 ml-auto mr-auto mb-6.25" src="/static/logo.png"></image>
    <view class="center">
      <text class="text-36 text-#8f8f94">{{ title }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello',
    }
  },
  onLoad() {},
  methods: {},
}
</script>