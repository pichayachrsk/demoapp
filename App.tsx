/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import CheckBox from '@react-native-community/checkbox';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
  Button,
  TextInput,
  Text,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as storeService from './src/service/storeService';

interface TodoItem {
  text: string;
  checked: boolean;
}

const checkBoxDefaultColor = { true: 'blue', false: 'gray' };

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const defaultTodoList: TodoItem[] = [
    { text: 'Do homework', checked: false },
    { text: 'Read a book', checked: true },
    { text: 'Clean a shelf', checked: false },
  ];
  const [list, setList] = useState<TodoItem[]>([]);
  const [inputText, onChangeText] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const storedList = await storeService.getData('todoList');
    storedList?.length ? setList(storedList) : setList(defaultTodoList);
  };

  const onPressSubmit = () => {
    if (inputText.trim() === '') return;

    const newList = [...list, { text: inputText, checked: false }];
    setList(newList);
    storeService.storeData('todoList', JSON.stringify(newList));
    onChangeText('');
  };

  const onInputKeyPress = (e: SyntheticEvent) => {
    const event = e.nativeEvent as React.KeyboardEvent;

    if (event?.key !== 'Enter') return;

    onPressSubmit();
  };

  const onPressDelete = (index: number) => {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
    storeService.storeData('todoList', JSON.stringify(newList));
  };

  const onToggleCheckBox = (index: number, value: boolean) => {
    const newList = list.map((item, i) =>
      i === index ? { ...item, checked: value } : item,
    );
    setList(newList);
    storeService.storeData('todoList', JSON.stringify(newList));
  };

  const sortedList = [...list].sort(
    (a, b) => Number(a.checked) - Number(b.checked),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>To-Do List</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter your to do here"
          style={styles.input}
          value={inputText}
          onChangeText={onChangeText}
          onKeyPress={onInputKeyPress}
        />
        <Button title="submit" onPress={() => onPressSubmit()} />
      </View>
      <View>
        {sortedList.map((item, index) => (
          <View key={index} style={styles.inputWrapper}>
            <CheckBox
              value={item.checked}
              onValueChange={value =>
                onToggleCheckBox(list.indexOf(item), value)
              }
              tintColors={checkBoxDefaultColor}
            />
            <Text
              style={[styles.textWrapper, item.checked && styles.markedText]}
            >
              {item.text}
            </Text>
            <Button
              title="delete"
              onPress={() => onPressDelete(list.indexOf(item))}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    padding: 10,
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    gap: 10,
    width: '70%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    padding: 10,
    gap: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    width: '80%',
  },
  markedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default App;
