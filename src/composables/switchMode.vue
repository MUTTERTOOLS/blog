<template>
  <svg
    aria-hidden="true"
    style="position:absolute; width:0; height:0; overflow:hidden"
  ><symbol
    id="icon-sun"
    viewBox="0 0 1024 1024"
  ><path
    d="M960 512l-128 128v192h-192l-128 128-128-128H192v-192l-128-128 128-128V192h192l128-128 128 128h192v192z"
    fill="#FFD878"
    p-id="8420"
  /><path
    d="M736 512a224 224 0 1 0-448 0 224 224 0 1 0 448 0z"
    fill="#FFE4A9"
    p-id="8421"
  /><path
    d="M512 109.248L626.752 224H800v173.248L914.752 512 800 626.752V800h-173.248L512 914.752 397.248 800H224v-173.248L109.248 512 224 397.248V224h173.248L512 109.248M512 64l-128 128H192v192l-128 128 128 128v192h192l128 128 128-128h192v-192l128-128-128-128V192h-192l-128-128z"
    fill="#4D5152"
    p-id="8422"
  /><path
    d="M512 320c105.888 0 192 86.112 192 192s-86.112 192-192 192-192-86.112-192-192 86.112-192 192-192m0-32a224 224 0 1 0 0 448 224 224 0 0 0 0-448z"
    fill="#4D5152"
    p-id="8423"
  /></symbol><symbol
    id="icon-moon"
    viewBox="0 0 1024 1024"
  ><path
    d="M611.370667 167.082667a445.013333 445.013333 0 0 1-38.4 161.834666 477.824 477.824 0 0 1-244.736 244.394667 445.141333 445.141333 0 0 1-161.109334 38.058667 85.077333 85.077333 0 0 0-65.066666 135.722666A462.08 462.08 0 1 0 747.093333 102.058667a85.077333 85.077333 0 0 0-135.722666 65.024z"
    fill="#FFB531"
    p-id="11345"
  /><path
    d="M329.728 274.133333l35.157333-35.157333a21.333333 21.333333 0 1 0-30.165333-30.165333l-35.157333 35.157333-35.114667-35.157333a21.333333 21.333333 0 0 0-30.165333 30.165333l35.114666 35.157333-35.114666 35.157334a21.333333 21.333333 0 1 0 30.165333 30.165333l35.114667-35.157333 35.157333 35.157333a21.333333 21.333333 0 1 0 30.165333-30.165333z"
    fill="#030835"
    p-id="11346"
  /></symbol></svg>

  <a
    class="icon-V"
    title="切换日间/夜间模式"
    @click="switchNightMode()"
  ><svg
    width="48"
    height="48"
    viewBox="0 0 1024 1024"
  ><use
    id="modeicon"
    xlink:href="#icon-moon"
  /></svg>
  </a>
</template>

<script setup>
/* eslint-disable */
function checkNightMode() {
  localStorage.getItem('isDark') === '1'
    ? ($('body').addClass('DarkMode'),
    $('#changeMode-top').removeClass('fa-moon').addClass('fa-sun'),
    $('#modeicon').attr('xlink:href', '#icon-sun'))
    : localStorage.getItem('isDark') === '0'
      ? $('#modeicon').attr('xlink:href', '#icon-moon')
      : new Date().getHours() >= 20 || new Date().getHours() < 7
        ? ($('body').addClass('DarkMode'),
        $('#changeMode-top').removeClass('fa-moon').addClass('fa-sun'),
        $('#modeicon').attr('xlink:href', '#icon-sun'))
        : matchMedia('(prefers-color-scheme: dark)').matches
          ? ($('body').addClass('DarkMode'),
          $('#changeMode-top').removeClass('fa-moon').addClass('fa-sun'),
          $('#modeicon').attr('xlink:href', '#icon-sun'))
          : $('#modeicon').attr('xlink:href', '#icon-moon');
}
function switchNightMode() {
  $(
    '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>',
  ).appendTo($('body')),
  setTimeout(() => {
    $('body').hasClass('DarkMode')
      ? ($('body').removeClass('DarkMode'),
      localStorage.setItem('isDark', '0'),
      $('#changeMode-top').removeClass('fa-sun').addClass('fa-moon'),
      $('#modeicon').attr('xlink:href', '#icon-moon'))
      : ($('body').addClass('DarkMode'),
      localStorage.setItem('isDark', '1'),
      $('#changeMode-top').removeClass('fa-moon').addClass('fa-sun'),
      $('#modeicon').attr('xlink:href', '#icon-sun')),
    setTimeout(() => {
      $('.Cuteen_DarkSky').fadeOut(1e3, function () {
        $(this).remove();
      });
    }, 2e3);
  });
  const nowMode = document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light';
  if (nowMode === 'light') {
    // activateDarkMode();
    // saveToLocal.set('theme', 'dark', 2);
    // GLOBAL_CONFIG.Snackbar !== undefined
    //   && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
    $('#modeicon').attr('xlink:href', '#icon-moon');
  } else {
    // activateLightMode();
    // saveToLocal.set('theme', 'light', 2);
    // GLOBAL_CONFIG.Snackbar !== undefined
    //   && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
    $('body').addClass('DarkMode'),
    $('#changeMode-top').removeClass('fa-moon').addClass('fa-sun'),
    $('#modeicon').attr('xlink:href', '#icon-sun');
  }
  // handle some cases
  typeof utterancesTheme === 'function' && utterancesTheme();
  typeof FB === 'object' && window.loadFBComment();
  window.DISQUS
    && document.getElementById('disqus_thread').children.length
    && setTimeout(() => window.disqusReset(), 200);
}
function switchNightModeTop() {
  $('body').hasClass('DarkMode')
    ? ($('body').removeClass('DarkMode'),
    localStorage.setItem('isDark', '0'),
    $('#changeMode-top').removeClass('fa-sun').addClass('fa-moon'),
    $('#modeicon').attr('xlink:href', '#icon-moon'))
    : ($('body').addClass('DarkMode'),
    localStorage.setItem('isDark', '1'),
    $('#changeMode-top').removeClass('fa-moon').addClass('fa-sun'),
    $('#modeicon').attr('xlink:href', '#icon-sun'));
}
// switchNightMode()
</script>

<style>
.Cuteen_DarkSky,
.Cuteen_DarkSky::before {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 88888888;
  content: "";
}

.Cuteen_DarkSky {
  background: linear-gradient(#feb8b0, #fef9db);
}

.Cuteen_DarkSky::before {
  background: linear-gradient(#4c3f6d, #6c62bb, #93b1ed);
  opacity: 0;
  transition: 2s ease all;
}

.DarkMode .Cuteen_DarkSky::before {
  opacity: 1;
}

.Cuteen_DarkPlanet {
  position: fixed;
  top: -50%;
  left: -50%;
  z-index: 99999999;
  width: 200%;
  height: 200%;
  transform-origin: center bottom;
  animation: CuteenPlanetMove 2s cubic-bezier(0.7, 0, 0, 1);
}

@keyframes CuteenPlanetMove {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes CuteenPlanetMove {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

.Cuteen_DarkPlanet::after {
  position: absolute;
  top: 40%;
  left: 35%;
  width: 9.375rem;
  height: 9.375rem;
  background: linear-gradient(#fefefe, #fffbe8);
  border-radius: 50%;
  content: "";
}

.search span {
  display: none;
}

.menus_item a {
  text-decoration: none !important;
}

/* 深色模式按钮 */
.icon-V {
  /* position: relative;
  top: 2rem;
  left: 8rem; */
  z-index: 9999;
  width: 18px;
  height: 18px;
  overflow: hidden;
  border-radius: 6px;
  transition: 1.3s cubic-bezier(0.53, 0, 0.15, 1.3);
}

.icon-V svg {
  /* position: absolute;
  right: 1px;
  bottom: 0; */
  width: 22px;
  height: 22px;
  margin: auto;
}
</style>
