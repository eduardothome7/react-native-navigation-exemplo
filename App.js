import React from 'react';
import { StyleSheet, Text, Button, View, Image } from 'react-native';
// import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class Logo extends React.Component {
  render(){
    return(
      <View style={{flexDirection: "row"}}>
        <Image
          source={require('./assets/icon.png')}
          style={{width: 30, height: 30}}
        />
      </View>
    )
  }
}

class HomeScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: () => <Logo />,
      headerRight: () => (
        <Button
        // onPress={() => alert('This is a button!')}
        onPress={() => navigation.navigate('MyModal')}
        title="Info"
        // color="#fff"
        />
      )
    };
  };

  render(){
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button
          title="Tela de Detalhe"
          onPress={() => this.props.navigation.navigate('Details', {
            itemId: 86,
            name: 'Notebook Inspiron',
            brand: 'Dell',
            price: 1450.0 }
          )}
        />
      </View>
    );
  }
}

class ModalScreen extends React.Component {
  render(){
    return(
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Button
          onPress={()=> this.props.navigation.goBack()}
          title="Dismiss"
        />
        <Text style={{fontSize: 30}}>Este é o Modal!</Text>
      </View>
    )
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const { params } = navigation.state;

    return {
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  }

  render() {
    const { navigation } = this.props;
    return(
      <View style={styles.container}>
        <Text>{JSON.stringify(navigation.getParam('itemId'))}</Text>
        <Text>{navigation.getParam('name')}</Text>
        <Text>{navigation.getParam('brand')}</Text>
        <Text>R$ {navigation.getParam('price')}</Text>
        <Button
          title="Comprar"
          // onPress={() => this.props.navigation.navigate('Details')}
          // onPress={() => this.props.navigation.push('Details')}
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    )
  }
}

const MainStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#6b52ae',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
      }
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main: MainStack,
    MyModal: ModalScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);
const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render(){
    return <AppContainer/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
