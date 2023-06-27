<template>
  <div class="flex w-full px-16">
    <div class="motto w-1/3">
      <h3>格言🧬</h3>
      <p class="leading-7">
        再看看那个光点，它就在这里，这是家园，这是我们 —— 你所爱的每一个人，你认识的一个人，你听说过的每一个人，曾经有过的每一个人，都在它上面度过他们的一生✨
      </p>
    <!-- <el-button>点击开启</el-button> -->
    </div>
    <div class="guessWant mx-20 w-1/3">
      <h3 class="pl-[40px]">
        猜你想看💡
      </h3>
      <div class="flex">
        <ul class="flex h-40 flex-col justify-between">
          <li><a href="#">我的朋友</a></li>
          <li><a href="#">关于作者</a></li>
          <li><a href="#">文章分类</a></li>
          <li><a href="#">我的画廊</a></li>
          <li><a href="#">建设进程</a></li>
        </ul>
        <ul class="flex h-40 flex-col justify-between">
          <li><a href="#">我的朋友</a></li>
          <li><a href="#">关于作者</a></li>
          <li><a href="#">文章分类</a></li>
          <li><a href="#">我的画廊</a></li>
          <li><a href="#">建设进程</a></li>
        </ul>
      </div>
    </div>

    <div class="recommanFriend w-1/3">
      <h3>推荐友链⌛</h3>
      <div class="flex flex-wrap justify-around">
        <span class="w-1/4">
          <el-avatar
            size="large"
            shape="square"
            src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
          />
        </span>
        <span class="w-1/4">
          <el-avatar
            size="large"
            shape="square"
            src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
          />
        </span>
        <span class="w-1/4">
          <el-avatar
            size="large"
            shape="square"
            src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
          />
        </span>
        <span class="w-1/4">
          <el-avatar
            size="large"
            shape="square"
            src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
          />
        </span>
        <span class="w-1/4">
          <el-avatar
            size="large"
            shape="square"
            src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
          />
        </span>
        <span class="w-1/4">
          <el-avatar
            size="large"
            shape="square"
            src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
          />
        </span>
        <span class="w-1/4">
          <el-avatar
            size="large"
            shape="square"
            src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
          />
        </span>
        <span class="w-1/4">
          <el-avatar
            size="large"
            shape="square"
            src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>

</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}

ul {
  /* padding: 0; */
}

.el-avatar {
  margin: 20px 5px;
}
</style>
