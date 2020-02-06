import React from 'react';
import Grid from '@material-ui/core/Grid';



export class PerfilUsuario extends React.Component {

    constructor(props){
        super(props);
    }
    

    render() {
        
        return(
            <div align="center">
            <br></br>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        User Panel grid
                        <br/>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAAB9CAMAAABH0HuwAAAAM1BMVEX///8EBARBQUHu7u4TExNQUFBgYGCfn5+/v78xMTHf39+urq4iIiLOzs5vb29/f3+Pj495u2v7AAAB7UlEQVR4nO2a3ZLCIAxGCxT6p63v/7Rr6apbW0iVEDqz37ncG88kJiRZqwoAAAAAAAAAAADDqJVHj0NZEzPV6g/1ZMq53FYqXudWSMXodxWfrSLBuW7C8huc63lcStiYS8hFqYt0pmzYRSkr6zLEXJSS7TiRJPlESbo0cRelGkGZjpLp5Fx6ykWpXkyGzJJknhwt48Rkdh+lNfp/ytAuSonJEC1vRq7tnSpNp5KZaJlJTIZ4s2fk3m1DywjOV9HRakZyvGopmVZQ5lTDFRUa0cCcayCvTHBtui9O4kvlNSxTYKUMjnuSwzhlU8TlnqmdAr8UyNGCGd9dxoLXoqpfzeZObkHZxzTOr3Sda0pGBYBP6EcbfJlbO0pWVevXA7v7kUuxa6khon1uKnYzdg/P0UJEx6wmmdo1z/j0jVvNFTZ73xl25hjt2f69zryvHLjMrN6HjCqGvOW902VL1ecu+Wy+cclm85VLpivsh9/dFxm+xQfOrSHYp+I+sidR1NxPFXl3iMG8YZJnhzi879SBK14M1gtfYmB4Q/N1WT9gLO8DNzwKvj6c0GMe8PWapLpe4KvudBe+f2wk19IMVz3dOGS4fj6SXNgzXMWd2H4XuJpwwoP9omaS4XBhKyfIhNAsMMkAAAAAAAAAAABbfgDbHBA8m0omHgAAAABJRU5ErkJggg=="></img>
                    </Grid>
                    <Grid item xs={6}>
                        Info grid<br></br>
                        
                    </Grid>
                </Grid>
            </div>
        );
    }
}

//