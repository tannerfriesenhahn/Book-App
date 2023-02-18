require('dotenv').config()
import React, { useState, useEffect } from 'react'
import Book from '../Components/Book.jsx'
import Link from 'next/link'
import getSessionStorage from '../Components/getSessionStorage.js'

function Library(){

    const [list, setList] = useState([]);
    const name = getSessionStorage('name')
    const [addedBooks, setAddedBooks] = useState([])

    function titleChecker(string){
        return string.replaceAll(' ', '').toLowerCase();
    }

    function deleteDuplicate(originalArr, comparedArr){
        console.log(comparedArr)
        comparedArr.forEach((item)=>{
            for(var i = 0; i < originalArr.length; i++){
                if(originalArr[i].title === item.title){
                    originalArr.splice(originalArr.indexOf(originalArr[i]), 1)
                }
            }
        })
        return originalArr
    }

    //sends req to openlibrary api with the parameters from the search query
    async function getBooks(event){

        event.preventDefault();
        const title = document.getElementById('title').value.trim().replaceAll( ' ', '%20')
        const author = document.getElementById('author').value.trim().replaceAll( ' ', '%20')
        const genre = document.getElementById('genre').value.trim().replaceAll(' ', '%20')

        //creates an array that will contain the users already added books
        var alreadyAdded = []

        await fetch(process.env.API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                source: 'bookshelf',
                name: name
            })
        })
        .then((response)=>{return response.json()})
        .then((userBooks)=>{
            alreadyAdded = userBooks.data
            console.log(alreadyAdded)
        })

        //gets book data from OpenLibrary API
        await fetch( title && author ? 'https://openlibrary.org/search.json?title=' + title + '&author=' + author : title && !author ? 'https://openlibrary.org/search.json?title=' + title : author && !title ? 'https://openlibrary.org/search.json?author=' + author :  'https://openlibrary.org/search.json?q=' + genre)
        .then(res => res.json())
        .then(async(data)=>{

            // creates an element if there are no books found
            if(data.docs.length === 0){
                if(document.getElementById('NBF')===null){
                    const noBooks = document.createElement('h1')
                    document.getElementById('row2').appendChild(noBooks)
                    noBooks.textContent = 'No Books Found'
                    noBooks.className = 'col-lg-12 text-center'
                    noBooks.id = 'NBF'
                }
            }else{
                if(document.getElementById('NBF') != null){
                    document.getElementById('NBF').remove()
                }
            }

            console.log(data.docs)

            //if the user already has books added in their library, those books will be removed from the rendered books
            var results = []
            var foundBooks
            if(alreadyAdded === 'NBS'){
                foundBooks = data.docs
            }else{
                foundBooks = await deleteDuplicate(data.docs, alreadyAdded)
            }

            //goes through the filtered book array and creates an object with the needed data to be rendered 
            foundBooks.forEach((book, index)=>{
                if(book.cover_edition_key){
                    if(index < 20){
                    var displayBook = {
                        title: book.title,
                        author: book.author_name,
                        img: 'https://covers.openlibrary.org/b/OLID/' + book.cover_edition_key + '-M.jpg',
                        key: book.key
                    }
                    results.push(displayBook)
                }}
            })
            
            //resets search query values
            document.getElementById('title').value = ''
            document.getElementById('author').value = ''
            document.getElementById('genre').value = ''

            //uses use state to update the list of books found
            setList([...results])
        })
        //'https://i.stack.imgur.com/D2VB2.png'

    }

    //sends post to database with book and acc info to be added to the current users database
    async function addBook(bookInfo){
        const bookObj = {
            img: bookInfo.img,
            title: bookInfo.name,
            author: bookInfo.author,
            source: 'addBook',
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

        await fetch(url, options)
        .then((response) => response.json())
        .then((data)=>{

            //when a book is added, an element is created and added to the 'addedBooks' array so the user can remember what book they added
            if(data.result === 'Added Book'){
                document.getElementById(bookInfo.name).innerHTML = 'Added Book'
                 const tempBook = {
                     img: bookInfo.img,
                    title: bookInfo.name
                }
                setAddedBooks((prevValue)=>{
                    return [...prevValue, tempBook]
                })
            }
        })
    }

    return(
        <div className='container'>
            <div className='row'>
                <div className='col-lg-2'>
                     <h1>Search By</h1>
                     <input id='title' type='text' placeholder='Title' autoComplete='off'></input>
                     <input id='author' type='text' placeholder='Author' autoComplete='off'></input>
                     <h3>Or by</h3>
                     <input id='genre' type='text' placeholder='Genre' autoComplete='off'></input>
                     <button className='btn btn-primary' onClick={getBooks}>Find Books</button>
                </div>

                <div className='col-lg-8'>
                    <div id='row2' className='row'>
                    {
                    list.map((book, index)=>{
                        return(
                            <div key={index} className='col-lg-6 text-center'>
                                <Book
                                key={index}
                                img={!book.img ? 'https://i.stack.imgur.com/D2VB2.png' : book.img}
                                name={book.title}
                                author={book.author}
                                type={{
                                    func: addBook,
                                    text: 'Add Book'
                                }}
                                />

                            </div>

                    )
                })}
                        
                    </div>
                </div>

                <div className='col-lg-2'>
                 <Link href={'/Bookshelf'}><div className='btn btn-secondary'>Go to Bookshelf</div></Link>
                 <h3>Added Books</h3>
                 {
                    addedBooks.map((book, index)=>{
                        return(
                            <div key={index}>
                                <img src={book.img}></img>
                                <h3>{book.title}</h3>
                            </div>
                        )
                    })
                 }
                </div>
            </div>
        </div>
    )
}

export default Library