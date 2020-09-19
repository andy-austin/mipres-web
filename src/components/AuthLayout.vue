<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card mt-5">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {name: "authLayout"};
</script>
