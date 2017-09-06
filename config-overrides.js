const { injectBabelPlugin } = require('react-app-rewired') // eslint-disable-line
const rewireLess = require('react-app-rewire-less') // eslint-disable-line
const theme = require('./config/theme')

module.exports = function override(config, env) {
  let newConfig = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config)

  newConfig = rewireLess(newConfig, env, {
    modifyVars: theme,
  })

  return newConfig
}
