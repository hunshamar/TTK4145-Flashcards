

import DOMPurify from 'dompurify';


const DivHTMLSanatized= ({text, style}) =>{
    
    return(
        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(text)}} style={style}/>
    )
}

export default DivHTMLSanatized


