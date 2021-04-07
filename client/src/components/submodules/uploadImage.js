import { Input, Button, Tooltip, IconButton } from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import { useState } from "react";

const UploadImage = ({ style }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const fileSelectedHandler = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const fileUploadHandler = () => {};

  return (
    <div style={style}>
      <input
        // className={classes.input}
        accept="image/*"
        type="file"
        id="icon-button-file"
        style={{ display: "none" }}
        onChange={fileSelectedHandler}
      />
      <label htmlFor="icon-button-file">
        <Tooltip title={"Add image to card"} placement="right">
          <IconButton component="span">
            <ImageOutlinedIcon />
          </IconButton>
        </Tooltip>
      </label>
    </div>
  );

  return (
    <div style={style}>
      <Input
        // className={classes.input}
        accept="image/*"
        type="file"
        id="contained-button-file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Add Image to Flashcard
        </Button>
      </label>
    </div>
  );
};

export default UploadImage;
