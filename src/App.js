import React,{useState} from 'react';
import styled, {ThemeProvider} from 'styled-components/native';
import theme from './theme';
import { StatusBar } from 'react-native';
import Input from './components/Input';
import Task from './components/Task';
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AppLoading from 'expo';
import AppLoading from 'expo-app-loading';
import Button from './components/Button';


const Container = styled.View`
  flex: 1;  
  background-color: ${({theme}) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({theme}) => theme.main};
  align-self: center;
  margin: 0 20px;
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({width}) => width - 40}px;
`;

const tmpData = {
  '1':{id:'1', text:'1교시', completed:false },
  '2':{id:'2', text:'이제 2교시', completed:false },
  '3':{id:'3', text:'아직도 3교시', completed:false },
  '4':{id:'4', text:'시간이 안가요', completed:false }
};


export default function App() {
  
  const [isReady, setIsReady] = useState(false);  //앱 실행준비 상태
  const [newTask, setNewTask ] = useState('');    //새로운 항목
  const [tasks, setTasks] = useState({});         //항목 리스트
  
  //로컬저장소에 데이터 저장하기
  const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
        setTasks(value);w
      } catch (e) {
        // saving error
      }
    }
    
    //로컬저장소에 데이터 가져오하기
    const getData = async (key) => {
      try {
        const jsonValue = await AsyncStorage.getItem(key)
        console.log(jsonValue);
        const tasks = jsonValue != null ? JSON.parse(jsonValue) : {};
        setTasks(tasks);
      } catch(e) {
        console.log('데이터 가져오기:'+jsonValue);
      }
    }
    
    //로컬저장소 삭제 by key
    const removeValue = async (key) => {
      try {
        await AsyncStorage.removeItem(key);
      } catch(e) {
        // remove error
      }
      
      console.log('항목삭제:'+key);
    }
    
    //전체 삭제
    const clearAll = async () => {
      try {
        await AsyncStorage.clear()
      } catch(e) {
        // clear error
      }
      
      console.log('전체 삭제 Done.')
    }
    const _saveTasks = async tasks => {
    try{
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks);
    }catch(e){
      console.error(e);
    }
  };

  const _lodTasks = async () => {
    const loadedTasks = await AsyncStorage.getItem('tasks');
    setTasks(JSON.parse(loadedTasks ||'{}'));
  };
  
  //추가
  const _addTask = () =>{
    console.log('입력완료');
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]:{id:ID, text:newTask, completed:false},
    };
    setNewTask('');
    // _saveTasks({...tasks, ...newTaskObject});
    storeData('tasks', {...tasks, ...newTaskObject});  //로컬저장소에 저장
  };
  
  const _handleTextChange = text => {
    setNewTask(text);
  };
  
  //삭제
  const _deleteTask = id => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    //setTasks(currentTasks); //tasks = currentTasks;
    storeData('tasks', currentTasks);  //로컬저장소에 저장
    
  };
  
  //완료
  const _toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id] ['completed'];
    setTasks(currentTasks); //tasks = currentTasks;
    storeData('tasks', currentTasks);  //로컬저장소에 저장
  };
  
  //수정
  const _updateTask = item =>{
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    //setTasks(currentTasks); //tasks = currentTasks;
    storeData('tasks', currentTasks);
  }
  
  const _onBlur = () => {
    setNewTask('');
  }
  
  //전체삭제
  const _clearAll = () => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id][clearAll] = !currentTasks[id] ['clearAll'];
    // _saveTasks(currentTasks);
    storeData('tasks', currentTasks);
  }
  
  const width = Dimensions.get('window').width;

  return !isReady ? (
    <AppLoading     
    // 앱 로딩전 실행할 로직     
    startAsync={()=>{getData('tasks')}}
    //startAsync호출이 성공적으로 수행되면
    onFinish={()=>setIsReady(true)}
    //startAsync호출이 실패하면
    onError={console.error}
    />
    ):(
      <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle= "light-content"
          backgroundColor={theme.background}
          />
        <Title>버킷 리스트</Title>  

        <Input 
          placeholder= "+ 항목추가"
          value={newTask}
          onChangeText={_handleTextChange}
          onSubmitEditing={_addTask}
          onBlur={_onBlur}
          clearAll={_clearAll}
        />
        <List width={width}>
        {Object.values(tasks)
                 .reverse()
                 .map(item=>(<Task key={item.id} 
                                   item={item}
                                   deleteTask={_deleteTask}
                                   toggleTask={_toggleTask}
                                   updateTask={_updateTask}
                                   clearAll={_clearAll}
                                   />))}
        </List>
        <Button/>
      </Container>
    </ThemeProvider>
  );
}
