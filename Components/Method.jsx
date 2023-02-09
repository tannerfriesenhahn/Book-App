import React from 'react'
import Link from 'next/link'


function Method(props){
    return(
        

        <Link href={props.page}>
            <div className='btn btn-primary'>{props.type}</div>
        </Link>
    )
}

export default Method