import React, { useState, useEffect } from 'react'
import getSessionStorage from '../Components/getSessionStorage'
import updateBooks from '../Components/updateBooks'
import Book from '../Components/Book'
import Link from 'next/link'


function Bookshelf(props){

    const [bookArr, setBookArr] = useState([])
    const name = getSessionStorage('name')

    const url = process.env.API_URL
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            source: 'bookshelf',
            name: name
        })
    }

    //sends post req to database, gets the users books back in return
    async function userBooks(){
        if(bookArr.length === 0){
            await fetch(url, options)
            .then((response)=>{return response.json()})
            .then((data)=>{
                if(data.data === 'NBS'){
                    setBookArr[{title: 'No Books Found'}]
                    if(document.getElementById('NBS') === null){
                        //creates an element to show there are no books found
                        const noBooks = document.createElement('h1')
                        document.getElementById('shelf').appendChild(noBooks)
                        noBooks.textContent = 'No Books Found'
                        noBooks.id = 'NBS'
                        noBooks.className = 'col-lg-12 text-center'
                    }
                }else{
                    setBookArr([...data.data]);
                    console.log(data)
                }
            })
        }

    }

    // sends post req to database to remove a certain book from the users bookShelf
    function removeBook(bookInfo){
        //add the book id property to this object then in the api remove book based off id instead of title
        const bookObj ={
            title: bookInfo.name,
            bookID: bookInfo.bookID,
            source: 'removeBook',
            name: name
        }
        const url = process.env.API_URL
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(bookObj)
        }
        fetch(url, options)
        .then((response)=> response.json())
        .then((data)=>{
            console.log(data.new)
            if(data.new !=undefined){
                setBookArr([...data.new])
            }
        })
    }

    return(
        <div className='container'>
        <div className='row'>
            <div className='col-lg-2'>
                <h1>Bookshelf</h1>
                <button className='btn btn-primary' onClick={userBooks}>Find my Books</button>
            </div>
            <div className='col-lg-8'>
                <div id='shelf' className='row'>
                    {bookArr.map(function(book, index){
                        console.log(book.bookID)
                        {
                        
                            return (
                                <div key={index} className='col-lg-4 text-center'>
                                    <Book
                                        key={index}
                                        name={book.title}
                                        bookID={book.bookID}
                                        img={book.img}
                                        type={
                                            {
                                                func: removeBook,
                                                text: 'Remove Book'
                                            }
                                        }
                                    />
                                </div>
                            )

                            }
                    })}
                </div>
            </div>
            <div className='col-lg-2'>
                <Link className='col text-end' href={'/Library'}><div className='btn btn-secondary'>Go to Library</div></Link>
            </div>
        </div>
        </div>
    )
}

export default Bookshelf