import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const Editor = forwardRef(({ readOnly = false, value, onChange }, ref) => {
  const containerRef = useRef(null);
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);

  useLayoutEffect(() => {
    onChangeRef.current = onChange;
  });

  useEffect(() => {
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );
    const quill = new Quill(editorContainer, {
      theme: "snow",
      readOnly,
    });

    // Attach Quill instance to ref
    if (ref) ref.current = quill;

    if (valueRef.current) {
      quill.setText(valueRef.current); // ✅ Ensures only text is inserted
    }

    quill.on("text-change", () => {
      const plainText = quill.getText().trim(); // ✅ Extracts plain text (No <p>)
      console.log( plainText);
      onChangeRef.current?.(plainText);
    });

    return () => {
      if (ref) ref.current = null;
      container.innerHTML = "";
    };
  }, [ref, readOnly]);

  return <div ref={containerRef}></div>;
});

Editor.displayName = "Editor";

Editor.propTypes = {
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Editor;
