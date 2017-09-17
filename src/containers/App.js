import React from 'react'
import { array } from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

import Header from './Header'
import Footer from '../components/Footer'
import Loading from './Loading'
import Home from './HomePage'
import PageTemplate from './PageTemplate'
import NoMatch from '../components/NoMatch'
import { getSlugFromUrl } from '../utils'

const { Content } = Layout

const App = ({
  topMenu,
}) => {
  const pageRoutes = topMenu.length > 0 ? topMenu.map(menu => {
    const slug = getSlugFromUrl(menu.url)

    if (slug === 'home') {
      return [
        <Route exact path="/" component={() => <Home pageId={menu.objectId} />} />,
        <Route path={`/${slug}`} component={() => <Home pageId={menu.objectId} />} />,
      ]
    }

    if (menu.children.length > 0) {
      return menu.children.map(subMenu => {
        if (subMenu.children.length > 0) {
          return subMenu.children.map(thirdMenu => <Route key={thirdMenu.objectId} path={`/${getSlugFromUrl(thirdMenu.url)}`} component={() => <PageTemplate pageId={thirdMenu.objectId} />} />)
        }

        return <Route key={subMenu.objectId} path={`/${getSlugFromUrl(subMenu.url)}`} component={() => <PageTemplate pageId={subMenu.objectId} />} />
      })
    }

    return <Route key={menu.objectId} path={`/${slug}`} component={() => <PageTemplate pageId={menu.objectId} />} />
  }) : <Route exact path="/" component={Home} />

  return (
    <Layout className="layout">
      <Header />
      <Content>
        <Switch>
          {pageRoutes}
          <Route component={NoMatch} />
        </Switch>
      </Content>
      <Footer />
      <Loading />
    </Layout>
  )
}

App.propTypes = {
  topMenu: array.isRequired,
}

export default App
