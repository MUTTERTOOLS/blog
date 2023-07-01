import { reactive } from 'vue';

class BackgroundController {
  private style = reactive({
    '--bg': '',
    background: 'var(--bg)',
    'background-repeat': 'no-repeat',
    'background-size': 'cover',
    'background-position': 'center',
  });

  constructor(url: string = '/img/bg1.webp') {
    this.setBackgroundImg(url);
  }

  /**
   * Get the background style.
   *
   * @return {style} The background style.
   */
  getBackgroundStyle() {
    return this.style;
  }

  /**
   * Sets the background image of the element.
   *
   * @param {string} bg - The URL or color value for the background image.
   */
  setBackgroundImg(bg: string) {
    if (bg.includes('/')) {
      this.style['--bg'] = `url(${bg})`;
    } else {
      this.style['--bg'] = bg;
    }
  }
}

export default new BackgroundController();
