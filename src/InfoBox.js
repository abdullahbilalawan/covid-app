import React from 'react';
import { Card,CardContent, Typography } from '@material-ui/core'
import './InfoBox.css'

export default function InfoBox({title, cases, total }) {
    return (
        <div>
            <Card className = "infoBox">
                <CardContent>
                    <Typography color="textSecondary">
                        {title}
                    </Typography>

                    <h2 className = "infoBox__cases" >{cases}</h2>

                    <Typography color = "textSecondary">
                        {total} Total
                    </Typography>

                </CardContent>
            </Card>
            
        </div>
    )
}
