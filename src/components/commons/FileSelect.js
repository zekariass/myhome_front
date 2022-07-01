import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileSelect = ({ attachedFiles, setAttachedFiles, accept }) => {
  const onDrop = useCallback(
    (acceptedFile) => {
      attachedFiles = [...attachedFiles, acceptedFile[0]];
      setAttachedFiles(attachedFiles);
    },
    [attachedFiles]
  );

  const { getInputProps, getRootProps } = useDropzone({
    accept: accept,
    onDrop,
  });
  return (
    <div className="my-4">
      <div
        {...getRootProps({
          className: "footer-bg flex-center-general ",
          id: "agent-logo-input-div",
          role: "button",
        })}
      >
        <input {...getInputProps()} />
        <div>
          <p className="fs-1"> +</p>
        </div>
      </div>
    </div>
  );
};

export default FileSelect;
