<style scoped>
.image {
  display: inline-block;
}
</style>
<template>
    <div class="image" :style="{width:width,height:height}">
        <img :src="url" />
    </div>
</template>
<script>
export default {
  name: "image",
  props: {
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    url: {
      type: String,
      required: true
    }
  }
};
</script>


