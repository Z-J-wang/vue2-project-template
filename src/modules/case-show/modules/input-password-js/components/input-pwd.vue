<template>
  <div class="pwd">
    <input type="text" class="password-input" value="1234" />
    <button class="btn-toggle" type="button">切换</button>
  </div>
</template>

<script>
import PasswordInput from '@/modules/case-show/modules/input-password-js/components/PasswordInput';
export default {
  mounted() {
    new PasswordInput('.pwd', (e, status) => {
      console.log(e);
      console.log(status);
    });
  }
};
</script>
