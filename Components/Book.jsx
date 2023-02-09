import React, { useState, useEffect } from 'react'
import getSessionStorage from './getSessionStorage'


function Book(props){
    const name = getSessionStorage('name')
    const bookInfo = {
        img: props.img,
        name: props.name,
        author: props.author
    }

    return(
    <div>
        <img src={props.img}></img>
        <h5>{props.name}</h5>
        <p>{props.author}</p>
        <p>{props.desc}</p>
        <p> {!props.cat ? '' : "Genre: " + props.cat}</p>
    <button id={props.name} className='btn btn-secondary' onClick={ ()=>{ return props.type.func(bookInfo)}}>{props.type.text}</button>
    </div>
    )
}


export default Book