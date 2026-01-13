// src/components/DocUploader.jsx
export default function DocUploader({ label, hint, files, onFiles, error }){
  function add(list){
    const arr = Array.from(list || []);
    onFiles([...(files||[]), ...arr]);
  }
  return (
    <div className="field">
      <div className="label">{label}</div>
      <div
        className={error ? "drop invalid" : "drop"}
        onDragOver={(e)=>e.preventDefault()}
        onDrop={(e)=>{ e.preventDefault(); add(e.dataTransfer.files); }}
      >
        <div className="dropTitle">Drag & drop files here</div>
        <div className="dropHint">{hint}</div>
        <input
          type="file"
          multiple
          onChange={(e)=>add(e.target.files)}
        />
      </div>
      {files?.length ? (
        <ul className="fileList">
          {files.map((f, i)=><li key={i}>{f.name}</li>)}
        </ul>
      ) : null}
      {error ? <div className="error">{error}</div> : null}
    </div>
  );
}
