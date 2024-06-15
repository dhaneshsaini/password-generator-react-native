import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';

export default function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [up, setUp] = useState(true);
  const [lo, setLo] = useState(true);
  const [nu, setNu] = useState(true);
  const [sy, setSy] = useState(true);
  const [copiedText, setCopiedText] = useState('');
  const [sliderVal, setSliderVal] = useState(8);
  const [password, setPassword] = useState('Click To Generate');

  const copyToClipboard = () => {
    Clipboard.setString(password);
  };

  function generatePassword() {
    const cap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      sml = 'abcdefghijklmnopqrstuvwxyz',
      nur = '1234567890',
      sbl = '~@#$%^&*()';

    let chr = '';

    if (up && lo && nu && sy) {
      chr = cap + sml + nur + sbl;
    }
    if (!up && !lo && !nu && sy) {
      chr = sbl;
    }
    if (up && !lo && !nu && !sy) {
      chr = cap;
    }
    if (!up && lo && !nu && !sy) {
      chr = sml;
    }
    if (!up && !lo && nu && !sy) {
      chr = nur;
    }
    if (!up && !lo && nu && sy) {
      chr = nur + sbl;
    }
    if (!up && lo && !nu && sy) {
      chr = sml + sbl;
    }
    if (!up && lo && nu && !sy) {
      chr = sml + nur;
    }
    if (up && !lo && !nu && sy) {
      chr = cap + sbl;
    }
    if (up && !lo && nu && !sy) {
      chr = cap + nur;
    }
    if (up && lo && !nu && !sy) {
      chr = cap + sml;
    }
    if (up && lo && nu && !sy) {
      chr = cap + sml + nur;
    }
    if (up && lo && !nu && sy) {
      chr = cap + sml + sbl;
    }
    if (up && !lo && nu && sy) {
      chr = cap + nur + sbl;
    }
    if (!up && lo && nu && sy) {
      chr = sml + nur + sbl;
    }
    if (!up && !lo && !nu && !sy) {
      chr = 'x';
    }

    let pass = '';
    for (let i = 0; i < sliderVal; i++) {
      const rn = Math.floor(Math.random() * chr.length);
      pass += chr[rn];
    }
    setPassword(pass);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text
            style={[
              isDarkMode ? styles.lightText : styles.darkText,
              styles.title,
            ]}>
            Password Generator
          </Text>
        </View>
        <View style={styles.inputBox}>
          <Text
            style={[
              isDarkMode ? styles.lightText : styles.darkText,
              {fontSize: 18},
            ]}>
            {password}
          </Text>
          <TouchableOpacity>
            <Icon
              onPress={copyToClipboard}
              name="copy"
              size={16}
              color="#333"
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Text onPress={generatePassword} style={styles.button}>
              New Password
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 20,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Slider
            value={sliderVal}
            onValueChange={e => setSliderVal(e)}
            style={{width: 280, height: 40}}
            minimumValue={1}
            maximumValue={22}
            step={1}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
          />
          <Text style={[isDarkMode ? styles.lightText : styles.darkText]}>
            {sliderVal}
          </Text>
        </View>
        <View style={{marginVertical: 20}}>
          <View style={styles.checkboxDiv}>
            <CheckBox
              disabled={false}
              value={up}
              onValueChange={e => setUp(e)}
            />
            <Text>Uppercase</Text>
          </View>
          <View style={styles.checkboxDiv}>
            <CheckBox
              disabled={false}
              value={lo}
              onValueChange={e => setLo(e)}
            />
            <Text>Lowercase</Text>
          </View>
          <View style={styles.checkboxDiv}>
            <CheckBox
              disabled={false}
              value={nu}
              onValueChange={e => setNu(e)}
            />
            <Text>Number</Text>
          </View>
          <View style={styles.checkboxDiv}>
            <CheckBox
              disabled={false}
              value={sy}
              onValueChange={e => setSy(e)}
            />
            <Text>Symbols</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  lightText: {
    color: '#FFFFFF',
  },
  darkText: {
    color: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputBox: {
    marginBottom: 20,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#CCC',
  },
  button: {
    color: '#FFFFFF',
    padding: 12,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: '#000000',
  },
  text: {
    fontSize: 16,
  },
  checkboxDiv: {
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
