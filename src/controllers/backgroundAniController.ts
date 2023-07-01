interface BackgroundAnimation {
  play(): any;
  stop(): any;
}

class ParticlesAnimation implements BackgroundAnimation {
  tsparticles: any; // 粒子动画实例

  constructor(private playFn: () => any, src: string) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      this.tsparticles = playFn();
    };
    document.body.append(script);
  }

  stop() {
    this.tsparticles.destroy();
  }

  play() {
    return this.playFn();
  }
}

const starAni = new ParticlesAnimation(async () => {
  await loadStarsPreset(tsParticles);
  await tsParticles.load('tsparticles', {
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

export default new BackgroundAniController(starAni);
export const aniList = [
  { name: '星星', animation: starAni },
  { name: '火星', animation: fireAni },
];
