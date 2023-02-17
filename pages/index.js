import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Method from '../Components/Method.jsx'

//books api key: AIzaSyDAxZSwMEmisXkREO7Hxl3RVc45_RgJ538
//books api url: https://www.googleapis.com/books/v1/volumes?q={search-query}&key=AIzaSyDAxZSwMEmisXkREO7Hxl3RVc45_RgJ538

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Book Manager</title>
        <meta name="description" content="Library and Book manager" />
        <meta name='viewport' content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous"></link>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>

      </Head>
      <main>

      <div className='container'>
        <div className='row'>
          <div className='col-12 text-center'>
            <h1>Book Library</h1>
          </div>
          <div className='col-3'/>
          <div className='col-6 text-center'>
          <div className='row'>
            <div className='col-lg-4 col-md-2 col-sm-2'></div>

            <div id="carouselExampleSlidesOnly" className="carousel slide col-lg-4 col-md-8 col-sm-8" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img height='300px' src="https://covers.openlibrary.org/b/olid/OL28172760M-M.jpg" className="d-block w-100" alt="..."/>
              </div>
              <div className="carousel-item">
                <img height='300px' src="https://covers.openlibrary.org/b/olid/OL21058613M-M.jpg" className="d-block w-100" alt="..."/>
              </div>
              <div className="carousel-item">
                <img height='300px' src="https://covers.openlibrary.org/b/olid/OL21733390M-M.jpg" className="d-block w-100" alt="..."/>
              </div>
              <div className="carousel-item">
                <img height='300px' src="https://covers.openlibrary.org/b/olid/OL10682512M-M.jpg" className="d-block w-100" alt="..."/>
              </div>
              <div className="carousel-item">
                <img height='300px' src="https://covers.openlibrary.org/b/olid/OL2028412M-M.jpg" className="d-block w-100" alt="..."/>
              </div>
              <div className="carousel-item">
                <img height='300px' src="https://covers.openlibrary.org/b/olid/OL25928337M-M.jpg" className="d-block w-100" alt="..."/>
              </div>
              
              
            </div>
          </div>

            <div className='col-lg-4 col-md-2 col-sm-2'></div>
            </div>
            <p>Search for over thousands of books by author, name or genre. Save the books you enjoy to your Bookshelf and remove them when you're finished reading the books. Developed using OpenLibraryAPI.</p>
          </div>
          <div className='col-3'/>

          <div className='col-6 text-end'>
            <Method
              type='Sign Up'
              page='/SignUp'
            />
          </div>

          <div className='col-6 text-start'>
            <Method
              type='Log In'
              page='LogIn'
            />
          </div>
        </div>
      </div>
    
      </main>
    </div>
  )
}

//files created for db usage: lib/dbConnect.js, models/User.js, pages/api/users.js


//route to Library with login info as hash in the url, query the database with the hash and return books based off of interests
//using the same hash url to query the database, get the books added by the users