import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import React, { useRef, useState } from "react";
import { PageWrapper } from "../../static/wrappers";
import DivHTMLSanatized from "../submodules/divHTMLSanitized";
import HTMLTextField from "../submodules/HTMLTextField";

export const TagTitle = styled(Box)({
  fontWeight: "bold",
  width: "150px",
  display: "inline-block",
});

const HTMLTagListItem = ({ tag, desc }) => {
  return (
    <React.Fragment>
      <Grid item xs={3} style={{ marginLeft: "20px" }}>
        {"\t"} <b>{tag}</b>
      </Grid>
      <Grid item xs={8}>
        {desc}
      </Grid>
    </React.Fragment>
  );
};

const exampleString = `
<div style="font-size: 70%">
\t<h1> This is a Heading </h1>
\t<h2> This is a smaller Heading </h2>

\t<p>
\t\tThis is a normal paragraph you can add <i> a italic text </i>, 
\t\t<b> bold text </b>,<u> underlined text </u> <small> small 
\t\ttext </small>  with tags inside the paragraph.
\t</p>

\t<p 
\t\tstyle="background-color: red; 
\t\tcolor: white; 
\t\tfont-size: 12px; 
\t\ttext-align: center"
\t>
\t\tYou can add inline styling to paragraphs and other HTML tags. 
\t\tChanging colors, font-size, alignment and more </br>
\t\tYou can also add a break tag for... <br/> <br/>
\t\t...new lines
\t</p>

\t<h2> You can also add images: </h2>

\t<p style="color: #404040">
\t\tYou need a url to images to add them. They can be resized by 
\t\tsetting the height and width property of the image tag   
\t</p>

\t<img 
\t\tsrc="https://i.postimg.cc/ZRqR7dgZ/91-I89-Qh5-Jz-L.png" 
\t\twidth="50%" 
\t/>

\t<h2> Unordered list</h2>
\t<ul>
\t\t<li> List item 1 </li>  
\t\t<li> List item 2 </li>  
\t</ul>

\t<div style="text-align: left; color: purple">
\t\t<p> 
\t\t\tBy default the HTML of the cards will be centered. Wrap 
\t\t\tall orsome elements inside a div styled with 
\t\t\t'text-align: left' to bypass this 
\t\t</p>
\t\t<h2> Ordered list, Aligned left </h2>
        
\t\t<ol>
\t\t\t<li> List item 1 </li>  
\t\t\t<li> List item 2 </li>  
\t\t</ol>
\t</div>
</div>
`;

const HTMLGuide = () => {
  const [HTMLString, setHTMLString] = useState(exampleString);

  const inputRef = useRef();

  const addTabs = (e) => {
    console.log(e.key);
    if (e.key === "Tab") {
      e.preventDefault();
      console.log(inputRef);

      const { selectionStart, selectionEnd } = e.target;

      const tab = "\t";

      const newHTMLString =
        HTMLString.substring(0, selectionStart) +
        tab +
        HTMLString.substring(selectionEnd);

      // setHTMLString(newHTMLString)

      inputRef.current.value = newHTMLString;
      setHTMLString(newHTMLString);

      inputRef.current.selectionStart = inputRef.current.selectionEnd =
        selectionStart + tab.length;
    }
  };

  return (
    <PageWrapper>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            HTML Guide With Examples
          </Typography>
          <Typography variant="body2" color="textSecondary">
            This is meant as a short guide for simple HTML / CSS that can be
            added to flashcards. Check out{" "}
            <Link color="textPrimary" href="https://www.w3schools.com/html/">
              W3schools HTML tutorial
            </Link>{" "}
            for a better tutorial and more examples
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">
            <b>Usefull HTML components (Tags):</b> <br />
            <Grid container spacing={0}>
              <HTMLTagListItem
                tag={"<h1>...</h1>"}
                desc={"Headings - h1 is the largest. h6 is the smallest "}
              />
              <HTMLTagListItem
                tag={"<div>...</div>"}
                desc={
                  "Division. Can be used as containers, to style multiple objects "
                }
              />
              <HTMLTagListItem tag={"<p>...</p>"} desc={"Paragraphs "} />
              <HTMLTagListItem tag={"<b>...</b>"} desc={"Bold text"} />
              <HTMLTagListItem tag={"<i>...</i>"} desc={"Italics text"} />
              <HTMLTagListItem tag={"<u>...</u>"} desc={"Underlined text"} />
              <HTMLTagListItem tag={"<br/>"} desc={"Line Break "} />

              <HTMLTagListItem
                tag={'<img src=""/>'}
                desc={
                  "Image. Must be url. Recomended to use  https://postimages.org/ for upload"
                }
              />

              <HTMLTagListItem tag={"<ul>...</ul>"} desc={"Unordered list "} />
              <HTMLTagListItem tag={"<ol>...</ol>"} desc={"Ordered list "} />
              <HTMLTagListItem tag={"<li>...</li>"} desc={"List item "} />
              <HTMLTagListItem
                tag={"<code>...</code>"}
                desc={
                  "Code.  The content inside is displayed in the browser's default monospace font "
                }
              />
            </Grid>
          </Typography>
        </Grid>

        {/* <Grid item xs={12}>
                   <Divider />
                </Grid> */}
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">
            <b>Styling:</b> <br />
            If you wish to style components, you can add a style prop. For
            example: <br />
            <code>
              {'<p style="color: white; background-color: red"> Hello </p>'}
            </code>{" "}
            <br />
            will return a paragraph, with red background color and white text
            color.
            <br />
            Check out{" "}
            <Link
              color="textPrimary"
              href="https://www.w3schools.com/html/html_css.asp"
            >
              W3Schools CSS Tutorial{" "}
            </Link>{" "}
            <br />
            for more examples
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">
            <b>Test:</b> <br />
            Below is an example with some HTML tags <br />
            You are welcome to change the HTML in the textfield and try your own{" "}
            <br />A much better alternative is to use{" "}
            <Link
              color="textPrimary"
              href="https://www.w3schools.com/tryit/tryit.asp?filename=tryhtml_default"
            >
              W3Schools Online HTML Code Editor{" "}
            </Link>{" "}
            <br />
            You can also create a HTML file in VS Code and open it using the web
            browser. <br />
            Keep the HTML simple for flashcards.
          </Typography>
        </Grid>

        <Grid item xs={7}>
          <Typography variant="caption" color="textSecondary">
            <b>HTML Input:</b> <br />
          </Typography>
          <HTMLTextField
            onChange={setHTMLString}
            value={HTMLString}
            fullWidth
            required
            multiline
            useIndent
            inputProps={{
              style: {
                padding: "0px",
                fontSize: "12px",
              },
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{ margin: "auto 0 15px" }}
                >
                  <div>
                    <Tooltip title="Reset Example">
                      <IconButton onClick={(e) => setHTMLString(exampleString)}>
                        <RotateLeftIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={5}>
          <Typography variant="caption" color="textSecondary">
            <b>HTML Result:</b> <br />
          </Typography>
          <Box
            border={1}
            borderColor="secondary.light"
            borderRadius={5}
            align="center"
            style={{ height: "auto", backgroundColor: "white", color: "black" }}
          >
            <DivHTMLSanatized text={HTMLString} />
          </Box>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default HTMLGuide;
