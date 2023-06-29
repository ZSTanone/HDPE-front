<template>
  <div class="OutBox">
    <div class="t_line_box">
      <i class="t_l_line"></i>
      <i class="l_t_line"></i>
    </div>
    <div class="t_line_box">
      <i class="t_r_line"></i>
      <i class="r_t_line"></i>
    </div>
    <div class="t_line_box">
      <i class="l_b_line"></i>
      <i class="b_l_line"></i>
    </div>
    <div class="t_line_box">
      <i class="r_b_line"></i>
      <i class="b_r_line"></i>
    </div>
    <div class="main_title">
      {{ mainTitle }}
    </div>
    <slot name="chart"></slot>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    mainTitle: String,
}>()
</script>

<style scoped lang="scss">
$dfPaddindLeft: 15px;
.OutBox {
    position: relative;
    width: 680px;
    height: 340px;
    margin: 0 auto;
    box-sizing: border-box;
    border: 1px solid #2C58A6;
    box-shadow: 0 0 10px #2C58A6;
}

.t_line_box {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0
}

.t_line_box i {
  background-color: #4788fb;
  box-shadow: 0px 0px 10px #4788fb;
  position: absolute;
}

.l_t_line {
  position: absolute;
  width: 5px;
  height: 24px;
  left: -3px;
  top: -3px;
}

.t_l_line {
  position: absolute;
  height: 5px;
  width: 26px;
  left: -3px;
  top: -3px;
}

.t_r_line {
  position: absolute;
  height: 5px;
  width: 26px;
  right: -3px;
  top: -3px;
}

.r_t_line {
  position: absolute;
  width: 5px;
  height: 24px;
  right: -3px;
  top: -3px;
}

.l_b_line {
  position: absolute;
  width: 5px;
  height: 24px;
  left: -3px;
  bottom: -3px;
}

.b_l_line {
  position: absolute;
  height: 5px;
  width: 26px;
  left: -3px;
  bottom: -3px;
}

.r_b_line {
  position: absolute;
  width: 5px;
  height: 24px;
  right: -3px;
  bottom: -3px;
}

.b_r_line {
  position: absolute;
  height: 5px;
  width: 26px;
  right: -3px;
  bottom: -3px;
}

.main_title {
  width: 200px;
  height: 35px;
  line-height: 33px;
  background-color: #2C58A6;
  border-radius: 18px;
  position: absolute;
  top: -17px;
  left: 50%;
  margin-left: -100px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  box-sizing: border-box;
  padding-left: var(--pl, $dfPaddindLeft);
  z-index: 1000;
}
</style>
