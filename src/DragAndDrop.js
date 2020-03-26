import React from 'react';
import UploadBtn  from './UploadBtn'

const DragAndDrop = props => {

  const { data, dispatch } = props;

  const handlerDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1 })
  }

  const handlerDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth - 1 })
    if (data.dropDepth > 0) return
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone:  false })
  }

  const handlerDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true })
  }

  const handlerDrop = e => {
    e.preventDefault();
    e.stopPropagation();

    let files = [...e.dataTransfer.files];

    if (files && files.length > 0) {
      const existingFiles = data.fileList.map(f => f.name);
      files = files.filter(f => !existingFiles.includes(f.name));

      // Render thumbnail.
      for (let i =0; i < files.length; i++) {
        if (!files[i].type.match('image.*')) {
          dispatch({ type: 'ADD_FILE_TO_LIST', files: files[i] });
          continue;
        }

        let reader = new FileReader();

        reader.readAsDataURL(files[i]);

        reader.onload = e => {
          let result = e.target.result;
          files[i]['result'] = result;
          dispatch({ type: 'ADD_FILE_TO_LIST', files: files[i] });
        }
      }

      e.dataTransfer.clearData();
      dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
      dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
    }
  }

  return (
    <div className={data.inDropZone ? 'drag-drop-zone inside-drag-area' : 'drag-drop-zone'}
      onDrop={e => handlerDrop(e)}
      onDragEnter={e => handlerDragEnter(e)}
      onDragLeave={e => handlerDragLeave(e)}
      onDragOver={e => handlerDragOver(e)}
    >
      <UploadBtn dispatch={dispatch} data={data}/>
      <p>请点击选择文件或者拖放文件到此处</p>
    </div>
  )
}

export default DragAndDrop;