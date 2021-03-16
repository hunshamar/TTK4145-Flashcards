import { Divider, Grid, Typography, TextField, Box, Link,InputAdornment, Tooltip, IconButton , withStyles} from "@material-ui/core"
import { PageWrapper } from "../../static/wrappers" 
import React, { useState } from 'react';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateLeft from "@material-ui/icons/RotateLeft";
import { styled } from '@material-ui/core/styles';



export const TagTitle = styled(Box)({
    fontWeight: "bold",
    width: "150px",
    display: "inline-block"
})



const TagListItem = ({tag, desc}) => {
    
    return(
        <React.Fragment>
            <Grid item xs={6}>
                {tag}
            </Grid>  
            <Grid item xs={6}>
                {desc}
            </Grid>  
        </React.Fragment>
    )
}

const exampleString =   
`   
 <div style="font-size: 70%">
    <h1> This is a Heading </h1>
    <h2> This is a smaller Heading </h2>

    <p>
        This is a normal paragraph you can add <i> a italic text </i>, 
        <b> bold text </b>,<u> underlined text </u> <small> small 
        text </small>  with tags inside the paragraph.
    </p>

    <p 
        style="background-color: red; 
        color: white; 
        font-size: 12px; 
        text-align: center"
    >
        You can add inline styling to paragraphs and other HTML tags. 
        Changing colors, font-size, alignment and more </br>
        You can also add a break tag for... <br/> <br/>
        ...new lines
    </p>

    <h2> You can also add images: </h2>

    <p style="color: #404040">
        You need a url to images to add them. They can be resized by 
        setting the height and width property of the image tag   
    </p>

    <img 
        src="https://i.postimg.cc/ZRqR7dgZ/91-I89-Qh5-Jz-L.png" 
        width="50%" 
    />

    <h2> Unordered list</h2>
    <ul>
        <li> List item 1 </li>  
        <li> List item 2 </li>  
    </ul>

    <div style="text-align: left; color: purple">
        <p> 
            By default the HTML of the cards will be centered, wrap all or
            some elements inside a div styled with 'text-align: left' to 
            bypass this 
        </p>
        <h2> Ordered list, Aligned left </h2>
        
        <ol>
            <li> List item 1 </li>  
            <li> List item 2 </li>  
        </ol>
    </div>
</div>
`


const HTMLGuide = () => {

    const [HTMLString, setHTMLString] = useState(exampleString)

    console.log(HTMLString)
    return(
        <PageWrapper>
            <Grid container spacing={2}>
                <Grid item xs={12}  >
                    <Typography variant="h4" gutterBottom >
                        HTML Guide With Examples
                    </Typography>
                    <Typography variant="body2" color="textSecondary" >
                        This is meant as a short guide for simple HTML / CSS that can be added to flashcards.
                        Check out <Link color="textPrimary" href="https://www.w3schools.com/html/">W3schools HTML tutorial</Link> for a better tutorial and more examples
                    </Typography>
                </Grid> 
                <Grid item xs={12}>
                    <Divider />
                </Grid> 
                <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary">
                        <b>Usefull HTML components (Tags):</b> <br/>    
                        <ul>
                            <li><TagTitle>{"<h1>...</h1>"}</TagTitle>Headings - h1 is the largest. h6 is the smallest </li> 
                            <li><TagTitle>{"<div>...</div>"}</TagTitle>Division. Can be used as containers, to style multiple objects </li> 
                            <li><TagTitle>{"<p>...</p>"}</TagTitle>Paragraphs </li> 
                            <li><TagTitle>{"<b>...</b>"}</TagTitle><b>bold</b> </li> 
                            <li><TagTitle>{"<i>...</i>"}</TagTitle><i>Italics</i> </li> 
                            <li><TagTitle>{"<u>...</u>"}</TagTitle><u>Underlined</u> </li> 
                            <li><TagTitle>{"<br/>"}</TagTitle>Line Break </li> 
                            <li>
                                <TagTitle>{'<img src="">...</img>'}</TagTitle>
                                 Image. Must be url. Recomended to use <Link  color="textPrimary" href="https://postimages.org/">postimages</Link>. 
                                Upload->copy Direct Link
                            </li> 
                            <li><TagTitle>{"<ul>...</ul>"}</TagTitle>Unordered list </li> 
                            <li><TagTitle>{"<ol>...</ol>"}</TagTitle>Ordered list </li> 
                            <li><TagTitle>{"<li>...</li>"}</TagTitle>List item </li> 
                            <li><TagTitle>{"<code>...</code>"}</TagTitle>Code.  The content inside is displayed in the browser's default monospace font  </li> 
                        </ul>
                    </Typography>
                </Grid>         
                
                
                {/* <Grid item xs={12}>
                   <Divider />
                </Grid> */}
                <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                        <b>Styling:</b> <br/>   
                        If you wish to style components, you can add a style prop.
                        For example: <br/>
                        <code>{'<p style="color: white; background-color: red"> Hello </p>'}</code> <br/>
                        will return a paragraph, with red background color and white text color.
                        <br />
                        Check out <Link color="textPrimary" href="https://www.w3schools.com/html/html_css.asp" >W3Schools CSS Tutorial     </Link>     <br/>    
                        for more examples

                        

                        </Typography>
                </Grid>

                <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                        <b>Test:</b> <br/>   
                        Below is an example with some HTML tags <br/>
                        You are welcome to change the HTML in the textfield and try your own     <br/>
                        A much  better alternative is to use <Link color="textPrimary" href="https://www.w3schools.com/tryit/tryit.asp?filename=tryhtml_default" >W3Schools Online HTML Code Editor     </Link>     <br/>    
                        You can also create a HTML file in VS Code and open it using the web browser. <br/>
                        Keep the HTML simple for flashcards.
                    </Typography>
                    </Grid>
                        


                    <Grid item xs={7} >
                    <Typography variant="caption" color="textSecondary">
                            <b>HTML Input:</b> <br/> 
                        </Typography>
                <TextField
                    onChange={e => setHTMLString(e.target.value)} 
                    fullWidth 
                    required
                    variant="outlined"
                    color="secondary"
                    value={HTMLString}
                    InputProps={{
                        style: {
                            padding: "2px",
                            fontSize: "12px"
                        },
                        endAdornment: <InputAdornment position="end" style={{margin: "auto 0 15px"}}>
                            <div>
                                <Tooltip title="Reset Example">
                                    <IconButton onClick={e => setHTMLString(exampleString)} >
                                        <RotateLeftIcon color="secondary" />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </InputAdornment>,
                    }}
                    multiline
                    />

                </Grid>
                <Grid item xs={5}>
                    <Typography variant="caption" color="textSecondary">
                            <b>HTML Result:</b> <br/> 
                        </Typography>
                    <Box border={1} borderColor="secondary.light" borderRadius={5} align="center" style={{height: "auto", backgroundColor: "white", color: "black"}} >
                        <div dangerouslySetInnerHTML={{__html: HTMLString}} />
                    </Box>

                </Grid>

            </Grid>

         </PageWrapper>
    )
}

export default HTMLGuide