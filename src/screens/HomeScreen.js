import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Button,
    StatusBar,
    Image,
    FlatList,
    TouchableHighlight,
    ActivityIndicator
}
from 'react-native';

var ratesArr = { };
var currenciesArr = { }; 
var symbolArr = [];

function Item({ item }) {
    return (
        <View style={styles.item}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <View style={{ flex: 0.6, flexDirection: 'column' }}>
                    <Text style={styles.title,{fontWeight: "bold"}}>{item}</Text>
                    <Text style={styles.smallTitle}>{currenciesArr[item]}</Text>
                </View>
                <View style={{flex: 0.4, flexDirection: 'row-reverse'}}>
                    <Text style={styles.title}>{ratesArr[item]} MMK</Text>
                </View>
            </View>
        </View>
    );
}

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: true }
    }

    componentDidMount() {
        this.getLatestExchangeRates()
        this.getCurrencies()
    }

    getLatestExchangeRates = () => {
        fetch('http://forex.cbm.gov.mm/api/latest')
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson) {
                    var i = 0;
                    for (let key in responseJson.rates) {
                        if (responseJson.rates.hasOwnProperty(key)) {
                            ratesArr[key] = responseJson.rates[key]
                            symbolArr[i++] = key
                            console.log(`${key} : ${responseJson.rates[key]}`)
                            console.log(`Total ${symbolArr.length}`)
                        }
                    }

                    this.setState({
                        isLoading: false,
                        latestRate: responseJson,
                        rates: ratesArr
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getCurrencies = () => {
        fetch('http://forex.cbm.gov.mm/api/currencies')
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson) {
                    for (let key in responseJson.currencies) {
                        if (responseJson.currencies.hasOwnProperty(key)) {
                            currenciesArr[key] = responseJson.currencies[key]
                            console.log(`${key} : ${responseJson.currencies[key]}`)
                        }
                    }
                }

                this.setState({
                    ...this.state,
                    currencies: currenciesArr
                });
            })
            .catch((error) => {
                console.error(error);
            })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return <View style={{flex:1}}>
            <View style={{flex:0.1, flexDirection:'column', justifyContent:"center", alignItems: "center", marginTop: 10}}>
                <Text style={{fontSize: 20, fontWeight: "bold" }}>{this.state.latestRate.info}</Text>
                <Text style={{ fontSize: 10, fontWeight: "bold" }}>{this.state.latestRate.description}</Text>
            </View>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={symbolArr}
                    renderItem={({ item }) => <Item item={item} />}
                    keyExtractor={item => item}
                />
            </SafeAreaView>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.9,
        // marginTop: Constants.statusBarHeight,
    },
    item: {
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 2,
        marginHorizontal: 16,
        borderRadius: 4
    },
    title: {
        fontSize: 15,
    },
    smallTitle: {
        fontSize: 10,
    },
});


export default HomeScreen;