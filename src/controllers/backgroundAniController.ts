declare const tsParticles: any;
declare const loadStarsPreset: Function;
declare const loadFirePreset: Function;

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
    script.onload = () => {
      this.tsparticles = this.playFn();
    };
    document.body.append(script);
  }
}

const starAni = new ParticlesAnimation(async () => {
  await loadStarsPreset(tsParticles);
  await tsParticles.load('tsparticles', {
    fpsLimit: 90,
    background: {
      color: {
        value: 'transparent',
      },
    },
    preset: 'stars',
  });
}, 'https://cdnjs.cloudflare.com/ajax/libs/tsparticles-preset-stars/2.10.1/tsparticles.preset.stars.bundle.min.js');

const fireAni = new ParticlesAnimation(async () => {
  await loadFirePreset(tsParticles);
  await tsParticles.load('tsparticles', {
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

class BackgroundAniController {
  constructor(private ani: BackgroundAnimation) {
    ani.play();
  }

  // 卸载当前动画
  unload() {
    this.ani.stop();
  }

  // 启动动画
  load() {
    this.ani.play();
  }

  // 切换动画
  toggle(ani: BackgroundAnimation) {
    this.ani = ani;
    this.load();
  }
}

export const backgroundAniController = new BackgroundAniController(starAni);
export const aniList = [
  { name: '星星', animation: starAni },
  { name: '火星', animation: fireAni },
];
