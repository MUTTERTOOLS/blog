module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-recommended-vue',
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'layer'],
      },
    ],
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
    'keyframe-block-no-duplicate-selectors': null,
  },
};
