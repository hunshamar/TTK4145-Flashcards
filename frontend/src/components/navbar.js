

import React from "react"

const Navbar = props => {




    if (props.loggedin){
        return(
            <div> logged in</div>
        )
    }
    else{
        return(
            <div> Not logged in </div>
        )
    }


}

export default Navbar