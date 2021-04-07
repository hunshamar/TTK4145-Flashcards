import { useRef, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@material-ui/core";
import KeyboardTabIcon from "@material-ui/icons/KeyboardTab";
import FormatIndentIncreaseIcon from "@material-ui/icons/FormatIndentIncrease";

import RotateLeftIcon from "@material-ui/icons/RotateLeft";
const HTMLTextField = ({
  onChange,
  value,
  useIndent,
  inputProps,
  fullWidth,
  required,
  multiline,
  rows,
  label,
}) => {
  const [indent, setIndent] = useState(useIndent);

  const inputRef = useRef();

  const addTabs = (e) => {
    if (!indent) {
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();

      const { selectionStart, selectionEnd } = e.target;

      const tab = "\t";

      if (e.shiftKey) {
        if (value[selectionStart - 1] == "\t") {
          let newValue =
            value.substring(0, selectionStart - 1) +
            value.substring(selectionEnd);
          inputRef.current.value = newValue;
          onChange(newValue);
        }

        inputRef.current.selectionStart = inputRef.current.selectionEnd =
          selectionStart - tab.length;
      } else {
        const newValue =
          value.substring(0, selectionStart) +
          tab +
          value.substring(selectionEnd);

        // setHTMLString(newHTMLString)

        inputRef.current.value = newValue;
        onChange(newValue);

        inputRef.current.selectionStart = inputRef.current.selectionEnd =
          selectionStart + tab.length;
      }
    }
  };

  return (
    <TextField
      // onKeyDown={addTabs}
      inputRef={inputRef}
      onKeyDown={addTabs}
      onChange={(e) => onChange(e.target.value)}
      fullWidth={fullWidth}
      required={required}
      multiline={multiline}
      rows={rows}
      label={label}
      variant="outlined"
      color="secondary"
      value={value}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" style={{ margin: "auto 0 15px" }}>
            <div>
              <Tooltip
                title={indent ? "disable tab indent" : "enable tab indent"}
              >
                <IconButton onClick={() => setIndent(!indent)} tabIndex="-1">
                  {indent ? <FormatIndentIncreaseIcon /> : <KeyboardTabIcon />}
                </IconButton>
              </Tooltip>
            </div>
          </InputAdornment>
        ),
        ...inputProps,
      }}
    />
  );
};

export default HTMLTextField;
