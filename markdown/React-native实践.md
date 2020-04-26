#### React-native实践

技术栈：

​	react-native

​	redux

​	router

##### 1、搭建好环境之后，初始化一个react-native项目：

```html
npx react-native init reactNativeDouban
```

![image-20200311175923447](/Users/su/Library/Application Support/typora-user-images/image-20200311175923447.png)

过程比较慢，是正常的，先来运行一下这个初始化的项目。也可以直接打开xcode，点build

```
cd reactNativeDouban && react-native run-ios
```

##### 2、修改目录，增加src/router views reducer

![](/Users/su/Library/Application Support/typora-user-images/image-20200311180439053.png)



command + d 关掉热刷新，每次修改后command + r ，刷新查看即可。

![image-20200311181059879](/Users/su/Library/Application Support/typora-user-images/image-20200311181059879.png)

因为要用到导航，所以先安装两个包：

```javascript
npm install react-navigation react-navigation-stack react-navigation-tabs --save
cd ios
pod install // 要在ios目录安装
```



##### 3、初始化导航

router/index.js

```javascript
import { createAppContainer, createSwitchNavigator } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import Find from '../views/Find'
import Home from '../views/Home'
import Index from '../views/Index'
import Welcome from '../views/Welcome'

const TabNavigator = createBottomTabNavigator({
  Index: {
    screen: Index,
    navigationOptions: {
      title: '热映',
    }
  },
  Find: {
    screen: Find,
    navigationOptions: {
      title: '找片',
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      title: '我的',
    }
  }
}, {
  initialRouteName: 'Index',
  defaultNavigationOptions: {
    // activeTintColor
    activeTintColor: '#e91e63'
  }
})
// 刚进入app时的广告页面
const InitNavigator = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      header: null
    }
  }
})
const SwitchNavigator = createSwitchNavigator({
  Init: InitNavigator,
  Main: TabNavigator
})
const AppNavigator = createAppContainer(SwitchNavigator)
export default AppNavigator
```

运行之后如果有报错：

![image-20200311183831784](/Users/su/Library/Application Support/typora-user-images/image-20200311183831784.png)



![image-20200311184334008](/Users/su/Library/Application Support/typora-user-images/image-20200311184334008.png)

安装react-navigation-stack tabs的坑：

```javascript
npm install 
	react-navigation-stack 
	react-navigation-tabs  
	@react-native-community/masked-view 
	react-native-safe-area-context
  react-native-reanimated 
  react-native-gesture-handler
  react-native-screens 
--save
cd ios && pod install
```



```javascript
// tab
npm install @react-navigation/material-top-tabs react-native-tab-view
```































