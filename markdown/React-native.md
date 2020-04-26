## React-native

1、标签

```react
<StatusBar barStyle="dark-content">
  <SafeAreaView>
  	
  </SafeAreaView>
</StatusBar>
```

command + d:



2、FlatList

列表

> - 完全跨平台。
> - 支持水平布局模式。
> - 行组件显示或隐藏时可配置回调事件。
> - 支持单独的头部组件。ListHeaderComponent
> - 支持单独的尾部组件。ListFooterComponent
> - 支持自定义行间分隔线。ItemSeperaterComponent
> - 支持下拉刷新。refreshControl
> - 支持上拉加载。onEndReached
> - 支持跳转到指定行（ScrollToIndex）。
> - 支持多列布局。

例子：

```html
class List extends Component {
  render() {
    return (
    	<SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.name + index}
          ListHeaderComponent={this._renderHeader}
          ListFooterComponent={this._renderFooter}
          refreshControl={
            <RefreshControl
              title="loading....."
              refreshing={this.state.isRefresh}
              onRefresh={this._onRefresh}
            />
          }
          onEndReached={this._loadMore}
          onEndReachedThreshold={0.1}
          ItemSeparatorComponent={() => {
            return <View style={{margin: 10, height: 1, backgroundColor: '#ccc'}}></View>
          }}
        />
      </SafeAreaView>
    )
  }
}
```



安装react-navigation-stack的坑：

```html
npm install react-navigation-stack @react-native-community/masked-view react-native-safe-area-context
```

使用createStackNavigation

```javascript
// App.js
import { createAppContainer } from 'react-navigator' 
// createStackNavigation要用createAppContainer包起来
import { createStackNavigation } from 'react-navigation-stack'

import HomeScreen from './screen/HomeScreen'
import DetailScreen from './screen/DetailScreen'
import DetailChildScreen from './screen/DetailChildScreen'

let RootStack = createStackNavigation({
  Home: {
    screen: Home,
    navigationOptions: {
      title: '首页'，
      headerBackTitle: '返回首页'
    }
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: {
      title: '详情'，
      headerBackTitle: '返回详情页'
    }
  },
  DetailChild: {
    screen: DetailChildScreen,
    navigationOptions: {
      title: '详情child'，
      headerBackTitle: '返回详情child'
    }
  },
})
```

跳转：

```javascript
import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

export default class Home extends Component {
  render() {
    console.log('sthis.prosp', this.props)
    return (
      <View style={{flex: 1, backgroundColor: 'yellowgreen'}}>
        <Text>Home</Text>
        <Button title="详情" onPress={() => {
            this.props.navigation.navigate('Detail', {
              username: '我是首页的username',
              title: '我是首页title'
            })
          }} 
        />
      </View>
    )
  }
}

```

传参：

```javascript
import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

export default class Detail extends Component {
  render() {
    const { state: { params }, navigate } = this.props.navigation
    return (
      <View style={{flex: 1, backgroundColor: '#9cdcfe'}}>
        <Text>详情页内容</Text>
        <Text>{params.username}</Text>
        <Text>{params.title}</Text>
        <Button title="去详情页child" onPress={() => {
          navigate('DetailChild')
        }}/>
      </View>
    )
  }
}

```



tarBarIcon:

```javascript
npm install react-native-vectr-icons
react-native link  react-native-vector-icons
```















