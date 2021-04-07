import React, { Component } from "react";
import Files from "react-files";
class Csv extends Component {
  state = {
    amount: "",
    times: "",
    monthly: 0,
    yearly: 0,
  };

  onFilesError = (error, file) => {
    console.log("error code " + error.code + ": " + error.message);
  };

  onFilesChange = (files) =>{
    console.log("myfiles" ,files)
  }

  render() {
    return (
      <div>
        <Files
          className="files-dropzone"
          onChange={this.onFilesChange}
          onError={this.onFilesError}
          accepts={[".csv"]}
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          Drop files here or click to upload
        </Files>
      </div>
    );
  }
}

export default Csv;
