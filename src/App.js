import React, {useReducer} from 'react';
import './App.css';
import DragAndDrop from './DragAndDrop'

function App() {

  const initalState = {
    dropDepth: 0, inDropZone: false, fileList: []
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_DROP_DEPTH':
        return {...state, dropDepth: action.dropDepth}
      case 'SET_IN_DROP_ZONE':
        return {...state, inDropZone: action.inDropZone}
      case 'ADD_FILE_TO_LIST':
        return {...state, fileList: state.fileList.concat(action.files)}
      default:
        return state
    }
  }
  
  // useReducer第二个参数可以初始化state
  const [data, dispatch] = useReducer(reducer, initalState)

  return (
    <div className="App">
      <header className="App-header">
        <code>React drag-and-drop component</code>
        <DragAndDrop data={data} dispatch={dispatch}/>
      </header>
      <ol className="dropped-files">
        {data.fileList.map(f => {
          return (
            <li key={f.name}>
              {f.result && <img width="100" height="120" src={f.result} alt={f.name}/>}
              {f.name}
            </li>
          )
        })}
      </ol>
    </div>
  );
}

export default App;
