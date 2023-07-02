declare const tsParticles: any;
declare const loadStarsPreset: Function;
declare const loadFirePreset: Function;
declare const loadFountainPreset: Function;
declare const loadSnowPreset: Function;

interface BackgroundAnimation {
  play(): any;
  stop(): any;
}

class ParticlesAnimation implements BackgroundAnimation {
  tsparticles: any; // 粒子动画实例

  constructor(private playFn: () => any, private src: string) {}

  stop() {
    this.tsparticles.destroy();
  }

  play() {
    const script = document.createElement('script');
    script.src = this.src;
    script.onload = async () => {
      this.tsparticles = await this.playFn();
    };
    document.body.append(script);
  }
}

const starAni = new ParticlesAnimation(async () => {
  await loadStarsPreset(tsParticles);
  return tsParticles.load('star', {
    fpsLimit: 90,
    background: {
      color: {
        value: 'transparent',
      },
    },
    preset: 'stars',
  });
}, 'https://cdnjs.cloudflare.com/ajax/libs/tsparticles-preset-stars/2.10.1/tsparticles.preset.stars.bundle.min.js');

const snowAni = new ParticlesAnimation(async () => {
  await loadSnowPreset(tsParticles);
  return tsParticles.load('snow', {
    fpsLimit: 90,
    background: {
      color: {
        value: 'transparent',
      },
    },
    preset: 'snow',
  });
}, 'https://cdnjs.cloudflare.com/ajax/libs/tsparticles-preset-snow/2.10.1/tsparticles.preset.snow.bundle.min.js');

const fireAni = new ParticlesAnimation(async () => {
  await loadFirePreset(tsParticles);
  return tsParticles.load('fire', {
    fpsLimit: 90,
    background: {
      color: {
        value: 'transparent',
      },
      image: '',
    },
    preset: 'fire',
  });
}, 'https://cdnjs.cloudflare.com/ajax/libs/tsparticles-preset-fire/2.10.1/tsparticles.preset.fire.bundle.min.js');

const fountainAni = new ParticlesAnimation(async () => {
  await loadFountainPreset(tsParticles);
  return tsParticles.load('fountain', {
    background: {
      color: 'transparent',
    },
    particles: {
      move: {
        trail: {
          enable: !0,
          fillColor: 'transparent',
          length: 3,
        },
      },
    },
    preset: 'fountain',
  });
}, 'https://cdnjs.cloudflare.com/ajax/libs/tsparticles-preset-fountain/2.10.1/tsparticles.preset.fountain.bundle.min.js');

class BackgroundAniController {
  constructor(private ani: BackgroundAnimation) {}

  // 卸载动画
  unload() {
    this.ani.stop();
  }

  // 启动动画
  load() {
    this.ani.play();
  }

  // 切换动画
  toggle(ani: BackgroundAnimation) {
    this.unload();
    this.ani = ani;
    this.load();
  }
}

export const backgroundAniController = new BackgroundAniController(starAni);
export const aniList = [
  {
    name: '星星', animation: starAni, controller: new BackgroundAniController(starAni), open: false,
  },
  {
    name: '火星', animation: fireAni, controller: new BackgroundAniController(fireAni), open: false,
  },
  {
    name: '水滴', animation: fountainAni, controller: new BackgroundAniController(fountainAni), open: false,
  },
  {
    name: '雪花', animation: snowAni, controller: new BackgroundAniController(snowAni), open: false,
  },
];
