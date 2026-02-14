function FileUploader({ types = ['PDF', 'DWG', 'DOC'] }) {
  return (
    <div className="file-uploader">
      <button type="button" className="btn btn-secondary">Upload File</button>
      <div className="dropzone">
        Drag and drop files here (Demo)
        <small>Allowed types: {types.join(', ')}</small>
      </div>
    </div>
  );
}

export default FileUploader;
