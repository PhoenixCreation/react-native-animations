import React from 'react'
import { StyleSheet, Text, View, Image, Flatlist, TouchableOpacity, ScrollView } from 'react-native';

const ITEM_SIZE = 140
const SPACING = 12

const cars = [
  {
    key: 1,
    image: "https://www.vw.com/idhub/content/dam/onehub_pkw/us/en/mofa/virtual-carlines/VW_NGW6_Models_ID4.jpg",
    name: "ID.4",
    description: "Electric car",
  },
  {
    key: 2,
    name: "Atlas",
    description: "A compact SUV",
    image: "https://www.vwimg.com/vw-CA2-my2021/iris?COSY-EU-100-1713VV%25lXm0kYNazzSU9mu0fO7AS6yyJ1vTvsd2SlppEKhjTtKSK8CM92MM8H2Lvyr0Q%25UOVggA9CPNC8G5GdTB00SsFT%2599QfjxxSuGqwCeeu8CnJSzqQNDAbCCtkvyrO3zeVVPE1WtJAhTYYpoxKPMieBBKuAnWTQL2kkD%25t7HzV5ToFlJQQ6CH4IZwIFC0FVbtTU0kYb96hm8dt3QGsmlIHMPP7tGmEi2WRppGDGzwwJU2777l1R2CCENNBRRVZKCrrXi3x66tmSdNN5DIUqq9o5PAAZTeGSSiC2meeftR2oo2Bmg%25%25nOsUDDuPqiaa0Gjg11FGFK88x8xkjjBjwHyyTdrLmmWJDMppGtI3wwJQWV77lTfFCCEjpvRRVtgOrrXEPd66tHX8NN5YXvqq97x%25AAZkaWSSiK2Eeefsgkoo2Kfg%25%25nLfqDDubg3aa0dVI11FGCk88xSUtjjB34GyyTUKnmmWdZMppGMDCwwJf5V77l79bCCEnjdRRVeNLrrXm3q66tpFdNN5nLGqq9MdpAAZATQSSiRNAeefrAooo2nuQ%25%25nfTFDDuacfaa0vhR11FJ1k88xBPojjBe8fyyTC6emmWICappGRiEwwJ1Rs77l4RbCCEq0uRRVht5rrX3KP66t69WNN52ejqq9ctIAAZAn2SSiDTUeefMigoo2YFg%25%25n%25AqDDuEDkaa0Ad911FO0h88x253jjBQWOyyTPwKmmW%253FppGsvxwwJ5Ag77l9m4CCEg7ORRVxwGrrX3%25F66t2td&width=864",
  },
  {
    key: 3,
    name: "Atlas Cross Sports",
    description: "Atlas in Sport version",
    image: "https://www.vwimg.com/vw-CMC-my2021/iris?COSY-EU-100-1713VV%25lXm0kYNazzSU9mu0fO7AS6yyJ1vTvsd2SlppEKhjTtKSK8CM%25CMM8H2Lvyr0Q%25UOVggAa5hP4KYwqeQeOOn1byyJ8H3WDZ4HvCJii8vHRwoo0gZrnZlO4O6bLKKFNMbTggAcEvvFHOu5ZxxHlZkPF%25uAnW07ZZU8pVfRD%25xIIrsJYUP01bCCtBvyrm3xLLyH0kYbAwh88WTU9j%25I4bBMdPAA2Zjeqz5qMZKMI7UbSK8C7g21X6CrDAONO4zaHrr9UOXs3hLRttOWO%2555PSh999dJihZZsnnLiiIzyZffQ3Dv22UXF6nn4WqSuugB4r00zbxOFF3ZhXxxcUihBBhLXoTTkRNMWWHru3GGKYKjJJMJM1llvlt8EELripVVbOTyXXYQN%25ttOqbs55PL3K99dlXmZZsPCRiiI11KffQwsb22UtKxnn4aTLuug83P00zrSYFF38zSxxcmz2BBhpSoTTkRd6WWHb5aGGKeqLJJMN13llvCU8EEL8xtVVbT%25hXXYzQdttOtUp55PcJR99d0fmZZsEo2iiIVHRffQcmb22UjRVnn4nvNuug9fn00zZnFFF3chNxxczveBBhTo9TTkyD9WWHYWaGGKMCFJJMtZullvrtBEEL54OVVbT5RXXYq5mttOfhc55P%25sl99de17ZZsZQviiIzuGffQosr22U23znn4xMNuug84A00zpkAFF3F2fxxcOxDBBh2CQTTkwh%25WWHzIeGGK6vwJJM7V1llvFekEELRjHVVbI2AXXYQlqttOAXw55PHVL99deFkZZsMoAiiI3IR&width=864",
  },
  {
    key: 4,
    name: "Tiguan",
    description: "Somethin Something",
    image: "https://www.vwimg.com/vw-CMC-my2021/iris?COSY-EU-100-1713VV%25lXm0kYNazzSU9mu0fO7AS6yyJ1vTvsd2SlppEKhjTtKSK8CM%25CMM8H2Lvyr0Q%25UOVggAa5hP4KYwqeQeOOn1byyJ8H3WDZ4HvCJii8vHRwoo0gZrnZlO4O6bLKKFNMbTggAcEvvFHOu5ZxxHlZkPF%25uAnW07ZZU8pVfRD%25xIIrsJYUP01bCCtBvyrm3xLLyH0kYbAwh88WTU9j%25I4bBMdPAA2Zjeqz5qMZKMI7UbSK8C7g21X6CrDAONO4zaHrr9UOXs3hLRttOWO%2555PSh999dJihZZsnnLiiIzyZffQ3Dv22UXF6nn4WqSuugB4r00zbxOFF3ZhXxxcUihBBhLXoTTkRNMWWHru3GGKYKjJJMJM1llvlt8EELripVVbOTyXXYQN%25ttOqbs55PL3K99dlXmZZsPCRiiI11KffQwsb22UtKxnn4aTLuug83P00zrSYFF38zSxxcmz2BBhpSoTTkRd6WWHb5aGGKeqLJJMN13llvCU8EEL8xtVVbT%25hXXYzQdttOtUp55PcJR99d0fmZZsEo2iiIVHRffQcmb22UjRVnn4nvNuug9fn00zZnFFF3chNxxczveBBhTo9TTkyD9WWHYWaGGKMCFJJMtZullvrtBEEL54OVVbT5RXXYq5mttOfhc55P%25sl99de17ZZsZQviiIzuGffQosr22U23znn4xMNuug84A00zpkAFF3F2fxxcOxDBBh2CQTTkwh%25WWHzIeGGK6vwJJM7V1llvFekEELRjHVVbI2AXXYQlqttOAXw55PHVL99deFkZZsMoAiiI3IR&width=864",
  },
  {
    key: 5,
    name: "Jetta",
    description: "Looks good",
    image: "https://www.vwimg.com/vw-BU3-my2021/iris?COSY-EU-100-1713VV%25lXm0kYNazzSU9mu0fO7AS6yyJ1vTvsd2SlppEKhjTtKSK8CqC3MM8H2Lvyr0Q%25UOVggAa5hP4KYwqeQeOOnDYyyJ8H3WDZ4HvCJii8vHRwoo0gZrnZlO4O6bLKKFNMbTggAcEvvFHOu5ZxxHlZkPF%25uAnW07ZZU8pVfReibIIrsJYUP3xjCCtBvyrX3xLLyH0kYbswX88WTU9j%25I4bBMdfAA2Zjeqz5qMZKMI7UbSK8C7g21X65zDAONvxhOHrr9UOXs3OTMttOWEN55PSh999dJihZZsEQviiIuuKffQ3mi22UcaLnn4YUNuug5Bq00zKn%25FF3le%25xxcG3eBBhPWyTTk2tZWWHEuaGGK3uMJJMQIbllvClBEELABHVVbctrXXYIYMttOtO%2555P5fw99d9t7ZZseF6iiI%25%25lffQ4Xr22UhDmnn4aQ3uug9fr00z490FF3i3Sxxcs7HBBhJCgTTkRRNWWHSh4GGK0syJJMC5UllvrbDEELDypVVbrLyXXYqjmttOQuw55PGaD99d4SQZZsm8UiiIusKffQw4g22U%25M6nn46tFuugmUq00zZuAFF3YEUxxcEWqBBh2pyTTknd%25WWHEJ2GGKOANJJMnGzllvlU8EELBGHVVbTlKXXYOP8ttOAUs55P9nT99dqCBZZszZRiiIQ%25XffQL5t22UaMlnn4BGXuug8BZ00zTbhFF3iRtxxcjA2BBhLLPTTkRtHWWHVgKGGK6vLJJMRA1llvlr0EELEYTVVbs9%25XXY6LmttOtIp55PSOh99d9V7ZZskZ6iiIVuRffQX8z22UbjAnn4vf9uug5Lq00zjgAFF3QONxxcMAqBBhIrATTkmJ%25WWHnq3GGKuBaJJM727llvdiNEEL6lyVVbcJKXXYqnVttOUOp&width=864",
  },
  {
    key: 6,
    name: "Jetta GLI",
    description: "Name change, high price",
    image: "https://www.vwimg.com/vw-BU3-my2020/iris?COSY-EU-100-1713VV%25lXm0kYNazzSU9mu0fO7AS6yyJ1vTvsd2SMppEKhjTtKSK8CqC3MM8H2Lvyr0Q%25UOVggAa5hP4KYwqeQeOOnagyyJ8H3WDZ4HvCJii8sGeIoo0gZrnZlO4O6bLKKFNMbTggAcEvvFHOu5ZxxHlZkPF%25uAnW07ZZU8pVfReibIIrsJYUP3xjCCtBvyrX3xLLyH0kYbswX88WTU9j%25I4bBMdPAA2Zjeqz5qMZKMI7UbSK8C7g21X6CrDAONm4jSurr9UOXs3OTMttOWEN55PSh999dJihZZsEQviiIuubffQ3mi22UcaLnn4YUNuug5Bq00zKn%25FF3le0xxcG3qBBhPWVTTk2KyWWHEuaGGK3uMJJMQHqllvCl8EELABHVVbctkXXYIYCttOdEj55P5fw99d9t7ZZseF6iiI%25%25lffQ4Xg22UhDmnn4aQ3uugIBh00zZ26FF3gZFxxcMxZBBh2hoTTkQRfWWHEryGGK6H1JJMPAJllvxQ5EEL5GOVVb6izXXYqPkttOkYw55Pj7R99dAP7ZZsowCiiIzBrffQVyj22UcDznn4Cp3uugB4z00zrchFF3wS1xxcjOOBBhefGTTkRc%25WWHuTDGGKI0hJJM9V%25llvxrXEELB4jVVb9txXXYQDottOBOD55P5cw99dlXbZZsE5YiiIQUwffQDcg22UnZynn4%25qluugHuA00z3jiFF3d2fxxcmO5BBhlXiTTkwluWWHEseGGK0AfJJM7D1llvddUEELAfbVVbZ0XXXYePdttOADJ55P5Sc99d9IEZZsgnjiiIedRffQfzz22UaQvnn4nZNuugLuD00zZTAFF3iwsxxcs75BBhPFATTk2d%25WWH7u4GGK6vwJJMgA%25llvCX8EELxoHVVbBJyXXY6cVttOUue55PSt799dKXsZZsoxWiiI3IR&width=864",
  },
  {
    key: 7,
    name: "Passat",
    description: "Looks Classssic",
    image: "https://www.vwimg.com/vw-A34-my2021/iris?COSY-EU-100-1713VV%25lXm0kYNazzSU9mu0fO7AS6yyJ1vTvsd2SlppEKhjTtKSK8CPN4MM8H2Lvyr0Q%25UOVggA9CPNC8G5GdTB00SsFT%2599QfjxxSuGqwCeeu8CnJSzqQNDAbCCtkvyrO3zeVVPE1WtJAhTYYpoxKPMQOBBKuAnWTQL2kkD%25t7HzV5ToFlrQQ6CH4IZwIFC0FVbtTU0kYb96hmdYP3QGs7lIH7PP7tGmEiG%25FppGplNwwJaCf77l8VFCCENNQRRVZKCrrXi3x66tmSdNN5DIUqq9o5CAAZV73SSikSreefbr5oo2Y1g%25%25nXaVDDuTuiaa0ayc11FYVI88xTekjjBox4yyTfj9mmWFM3ppGQfvwwJ1y377lGbTCCENZuRRVvlBrrXmuS66tW3dNN5eRsqq9hDTAAZHfdSSid4zeefHi4oo2rPQ%25%25nQdFDDujniaa0y%25S11FcAy88xe4QjjBeQ%25yyTyV4mmWZNyppGNCHwwJ1UR77l82bCCENLtRRVq65rrXf0j66tcvxNN5hRBqq9qBIAAZC6XSSiRqteef2nIoo2vr%25%25%25nKM%25DDuWDcaa0au911FBA288xpt3jjBig0yyT%25wOmmWdHappGgqJwwJ6IO77l39NCCEgkYRRV4l5rrXrZZ66tS0dNN5xNSqq97M2AAZH9QSSi0Iseefbn2oo2KlR%25%25n61KDDuWwOaa0GoX11FOCO88xlxk&width=864",
  },
  {
    key: 8,
    name: "Arteon",
    description: "Upgrade of Passat? looks like.",
    image: "https://www.vwimg.com/vw-3H7-my2019/iris?COSY-EU-100-1713VV%25lXm0kYNazzSU9mu0fO7AS6yyJ1vTvsd2MzppEKhjTtKSK8Cte7MM8H2Lvyr0Q%25UOVggA9CPNC8G5GdTB00SsFT%2599QfjxxSuGqwCeeu8CnJSzqQNDAbCCtkvyrO3zeVVPE1WtJAhTYYpoxKPfieBBKuAnWTQL2kkD%25t7HzV5ToFlrQQ6CH4IZwIFC0FVbtTU0kYb96hTdd83QGsOieHqPP7tGmEimNxppGDKvwwJU2P77l8VFCCE9H7RRVlV5rrXi3x66tTXdNN5pesqq9u6gAAZ1UgSSiDZseefRiPoo2ruc%25%25n96uDDuWw3aa0Goc11FXVh88xY8ojjBQouyyTfpYmmWVWYppGpGEwwJwrL77l7pbCCE4nhRRVxyGrrX5m966tpXKNN5cXiqq9VrJAAZC6dSSi9U4eefab5oo2Yfc%25%25nQfzDDuqlHaa04Qc11FYwt88xPTijjB3K9yyTPBKmmWC3IppGs3vwwJUML77l32hCCE9eQRRVjHkrrXiz966tbMYNN5KsJqq9cBIAAZI7oSSiROEeefrS4oo2oB0%25%25nlpoDDup84aa0AY111FSXe88xpyojjBfBHyyTVz2mmW4HappGaquwwJ%25LD77l72bCCEjpWRRVy7GrrXt5P66t3oYNN5zIIqq9uqQAAZiHRSSiCAEeefENYoo2vJ7%25%25nL8qDDujE4aa0AQj11FOjz88xlltjjBQrTyyTCiFmmW4JgppGQ31wwJwE077l56zCCEUJtRRVR95rrX3VF66tc7yNN5Kfsqq9qRJAAZTAWSSiRDUeefrbVoo2rJQ%25%25nLNtDDuTg4aa0dxL11Fbyq88xS4njjBOZ8yyTV6QmmWX8dppGQmLwwJ11B77l4SxCCEcmnRRViVO&width=864",
  },
  {
    key: 9,
    name: "Golf",
    description: "Looks golf cart.",
    image: "https://www.vwimg.com/vw-AU2-my2021/iris?COSY-EU-100-1713VV%25lXm0kYNazzSU9mu0fO7AS6yyJ1vTvsd2SlppEKhjTtKSK8CPC2MM8H2Lvyr0Q%25UOVggA9CPNC8G5GdTB00SsFT%2599QfjxxSuGqwCeeu8CnJSzqQNDAbCCtkvyrO3zeVVPE1WtJAhTYYpoxKPMieBBKuAnWTQL2kkD%25t7HzV5ToFlrQQ6CH4IZwIFC0FVbtTU0kYb96hmdYP3QGsmlCUMPP7tGmEiG%25FppGpZSwwJaML77l4nCCCE8rnRRV46OrrXrkp66tp9WNN5eeJqq9nbNAAZuHGSSilZUeefRa4oo2BSh%25%25nm3EDDujn4aa0qu211FAC688xpeHjjBneTyyTV6KmmWZBMppGspEwwJz1O77l0RQCCECk%25RRVZVsrrXrXH66t6SdNN5Nrsqq9ha4AAZHHwSSi2RUeefxKOoo2Mig%25%25nZCxDDuPVxaa0Aog11FuA188xpl5jjBljHyyT%25TJmmW24oppGRgxwwJzz%2577lKGFCCEj2gRRVgS0rrX35b66tbsgNN53tsqq9MBLAAZu8USSiCYbeefFKuoo2IP0%25%25n82EDDuUFxaa0dcZ11FZoh88xI1fjjBO5HyyTHowmmWD3oppGgTvwwJ1pL77l79aCCEne7RRVeNLrrXm3q66tpFdNN5eAmqq9ubvAAZvsdSSiRjEeef7SVoo2oJg%25%25nNSZDDuqoiaa0Fxg11FOJh88xjNmjjBYKNyyTVyMmmWGIappGDmuwwJujV77l42%25CCEqe1RRVzqmrrXA0b66tpv8NN5nnxqq9M1ZAAZvknSSiaJpeefbxcoo2vPN%25%25n%250qDDuTjOaa0Lnc11F1WW88xPF5jjBjDcyyT9yWmmWD4nppGngYwwJafL77l48FCCETuvRRVhgGrrXk5g66tTMYNN53Ssqq9wbVAAZhmhSSiHZneefxyLoo2vez%25%25nXSuDDubwbaa0deV11FJFh&width=864",
  },
  {
    key: 10,
    name: "Golf GTI",
    description: "just name and price change.",
    image: "https://www.vwimg.com/vw-AU2-my2021/iris?COSY-EU-100-1713VV%25lXm0kYNazzSU9mu0fO7AS6yyJ1vTvsd2SlppEKhjTtKSK8CPC2MM8H2Lvyr0Q%25UOVggA9CPNC8G5GdTB00SsFT%2599QfjxxSuGqwCeeu8CnJSzqQNDAbCCtkvyrO3zeVVPE1WtJAhTYYpoxKPMieBBKuAnWTQL2kkD%25t7HzV5ToFlrQQ6CH4IZwIFC0FVbtTU0kYb96hmdYP3QGsmlCUMPP7tGmEiG%25FppGpZSwwJu5V77l1vbCCEguRRRVj6urrXgNP66t6HwNN5wZGqq9oolAAZuYqSSi0KJeefEi4oo2r1g%25%25nTekDDupc%25aa0yug11FA0v88xSTYjjBwoOyyTuoWmmWXNMppGiTzwwJIwV77l38TCCEFrBRRVRHDrrXiXx66t9CYNN5Nesqq9q6IAAZk1gSSiKK7eefnruoo2BMP%25%25nvfzDDuijBaa0dXB11FS%25z88x0S8jjBwE9yyTEyemmWDWlppGng%25wwJrzd77l33DCCEMJxRRVynzrrXzeF66tc9YNN5YIzqq9c5IAAZvTbSSi0j4eefROYoo2xM0%25%25nQdFDDujn0aa04xB11Fshi88xi%25kjjBQ82yyTP9DmmWK%257ppGacuwwJzWL77l8wbCCECZ1RRVuyJrrXoqb66tpcANN5wxsqq9oSCAAZ0YlSSiLIreefryVoo2C2P%25%25n%25lzDDuqeiaa0A%25H11FxBz88xPlkjjBdC2yyTOMqmmWXmvppGJQ1wwJapc77l0yXCCEgnDRRVAo8rrX3Ap66tSFWNN5wLjqq9uuBAAZv8iSSiLHueef1wcoo2YBh%25%25nLdqDDuDFAaa0WyP11Fbuh88x8GGjjBdx9yyTyahmmWZmPppGaguwwJuzp77l12bCCEglYRRVW0LrrXkzJ66tcMsNN5WvOqq9ceIAAZ7YXSSikJ8eefKiuoo2Bmb%25%25nLo3DDute0aa0Y7Y11FsoX88xlxk&width=864",
  },
  {
    key: 11,
    name: "Taos",
    description: "Image is too flashy.",
    image: "https://www.vw.com/idhub/content/dam/onehub_pkw/us/en/mofa/virtual-carlines/VW_NGW6_Showroom_Taos_JellyBean.png",
  }
]

function Main({ navigation }) {
  return (
    <ScrollView style={{flex:1, padding: SPACING /2, backgroundColor: "white" }}>
    {
      cars.map((car,i) => {
        return (
          <TouchableOpacity key={i} onPress={() => navigation.navigate("VehicalFullView", { car })}>
            <View style={styles.item}>
              <View>
                <Text style={styles.model}>{car.name}</Text>
                <Text style={styles.description}>{car.description}</Text>
              </View>
            </View>
            <Image
              source={{ uri: car.image }}
              style={styles.image}
            />
          </TouchableOpacity>
        );
      })
    }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  item: {
    height: ITEM_SIZE,
    borderRadius: 12,
    marginBottom: SPACING,
    padding: SPACING,
    backgroundColor: "#ddd"
  },
  model: {
    fontSize: 20,
    fontWeight: '700',
    position: "absolute",
  },
  description: {
    fontSize: 15,
    opacity: 0.7,
    width: 100,
    position: "absolute",
    top: 28,
  },
  image: {
    height: ITEM_SIZE * 1.2,
    width: "100%",
    position: "absolute",
    bottom: 0,
    right: '-55%',
    resizeMode: "center",
  },
})

export default Main
