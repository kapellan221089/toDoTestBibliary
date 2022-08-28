module.exports = {
    buildModules: [
      '@nuxtjs/vuetify',
      '@nuxtjs/google-fonts'
    ],
    plugins: [{ src: '@/plugins/socket', ssr: false },{src:'@/plugins/search'}],
    telemetry: false,
    target: 'static'
}