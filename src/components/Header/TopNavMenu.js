import React from 'react'
import { array, string } from 'prop-types'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import classNames from 'classnames'

import { getSlugFromUrl } from '../../utils'
import './TopNavMenu.css'

const TopNavMenu = ({
  mode,
  topMenu,
  selectedKeys,
}) => (
  <div className="app-header__right">
    <div className="app-header__login">
      <Link to="/login">Log in</Link>
      <Link to="/register">Sign up</Link>
    </div>
    <Menu
      mode={mode}
      selectedKeys={selectedKeys}
    >
      {topMenu.length > 0 && topMenu.map(menu => {
        const hasSubMenu = menu.children.length > 0

        if (hasSubMenu) {
          const hasThridLevel = menu.children.some(subMenu => subMenu.children.length > 0)
          const classname = classNames({
            'app-header__horizontal-sub': hasThridLevel,
          })

          return (
            <Menu.SubMenu
              key={menu.id}
              title={menu.title}
              className={classname}
            >
              {menu.children.map(subMenu => {
                if (subMenu.children.length > 0) {
                  return (
                    <Menu.ItemGroup
                      key={subMenu.id}
                      title={subMenu.title}
                    >
                      {subMenu.children.map(thirdMenu => (
                        <Menu.Item key={getSlugFromUrl(thirdMenu.url)}>
                          <Link to={`/${getSlugFromUrl(thirdMenu.url)}`}>{thirdMenu.title}</Link>
                        </Menu.Item>
                      ))}
                    </Menu.ItemGroup>
                  )
                }

                return (
                  <Menu.Item key={getSlugFromUrl(subMenu.url)}>
                    <Link to={`/${getSlugFromUrl(subMenu.url)}`}>{subMenu.title}</Link>
                  </Menu.Item>
                )
              })}
            </Menu.SubMenu>
          )
        }

        return (
          <Menu.Item key={getSlugFromUrl(menu.url)}>
            <Link to={`/${getSlugFromUrl(menu.url)}`}>{menu.title}</Link>
          </Menu.Item>
        )
      })}
    </Menu>
  </div>
)

TopNavMenu.propTypes = {
  mode: string.isRequired,
  topMenu: array.isRequired,
  selectedKeys: array,
}

TopNavMenu.defaultProps = {
  selectedKeys: ['/'],
}

export default TopNavMenu
