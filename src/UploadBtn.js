import React from 'react';

const UploadBtn = (props) => {

  const { data, dispatch } = props;

  const handlerChange = e => {
    let files = [...e.target.files];

    if (files && files.length > 0) {
      let existingFiles = data.fileList.map(f => f.name)
      files = files.filter(f => !existingFiles.includes(f.name))

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
  
      dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
      dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
    }
  }

  return (
    <div className="input-btn">
      <input
        className="upload"
        type="file"
        multiple
        onChange={e => handlerChange(e)}
      />
    </div>
  )
}

export default UploadBtn;