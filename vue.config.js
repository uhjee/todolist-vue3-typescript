/**
 * vue3 설정 파일
 * 기본으로 생성해주지 않는다 직접 만든 뒤
 * yarn global add @vue/cli-init
 * 최종적으로 webpack-merge를 통해 합쳐짐
 */

module.exports = {
  configureWebpack: {},
  css: {
    sourceMap: true,
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/assets/scss/_mixins.scss";
          @import "@/assets/scss/_variables.scss";
        `,
      },
    },
  },
};

/**
 * default 로 resolve @ => src/ 로 잡혀있다.
 */
