import React from 'react'
import { array } from 'prop-types'
import { Route } from 'react-router'
import { Layout } from 'antd'

import Header from './Header'
import Loading from './Loading'
import Home from './HomePage'
import PageTemplate from './PageTemplate'
import { getSlugFromUrl } from '../utils'

const { Content, Footer } = Layout

const App = ({
  topMenu,
}) => {
  const pageRoutes = topMenu.length > 0 ? topMenu.map(menu => {
    const slug = getSlugFromUrl(menu.url)

    return slug === 'home' ?
      (
        <div key={menu.objectId}>
          <Route exact path="/" component={() => <Home pageId={menu.objectId} />} />
          <Route path={`/${slug}`} component={() => <Home pageId={menu.objectId} />} />
        </div>
      ) : <Route key={menu.objectId} path={`/${slug}`} component={() => <PageTemplate pageId={menu.objectId} />} />
  }) : <Route exact path="/" component={Home} />

  return (
    <Layout className="layout">
      <Header />
      <Content>
        {pageRoutes}
      </Content>
      <Footer>
        Wordpress Single Page App ©2017 Chris Zhou
      </Footer>
      <Loading />
    </Layout>
  )
}

App.propTypes = {
  topMenu: array.isRequired,
}

export default App
