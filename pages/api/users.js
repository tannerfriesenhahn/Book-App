
import dbConnect from '../../lib/dbConnect'
import User from '../../models/User'
import bcrypt from 'bcrypt'
const saltRounds = 10

export default async function handler (req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({})
        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':

      //when the users is creating an account, the data they entered is sent here to be stored 
      if(req.body.source === 'signup'){
        try{
            User.findOne({name: req.body.name}, async function(err, found){
              if(found){
                res.send(JSON.stringify({result: 'Username Taken'}))
              }else{

                bcrypt.genSalt(saltRounds, function(err, salt) {
                  bcrypt.hash(req.body.password, salt, async function(err, hash) {
                    const user = await new User({
                      name: req.body.name,
                      password: hash
                    })
                    await user.save();
                    res.send(JSON.stringify({result: 'Account Created'}))
                    // res.status(201).json({ success: true, data: user })
                  });
                });
              }
            })
          } catch (error) {
            res.status(400).json({ success: false })
          }
      }
      //when the user is trying to login in, the login info is sent here to find a match
      else if(req.body.source === 'login'){
        User.findOne({name: req.body.name}, function(err, found){
            if (found){
              bcrypt.compare(req.body.password, found.password, function(err, result) {
                if(result === true){
                  res.send(JSON.stringify({result: 'found'}));
                }else{
                  res.send(JSON.stringify({result: 'wrong password'}))
                }
              });
            }else{res.send(JSON.stringify({result: 'wrong username and maybe password'}))}
        })
      }
      //adds posted book data to the current users library array, if the same book is already added, it will not add another
      else if(req.body.source === 'addBook'){
        const book = {
          title: req.body.title,
          author: req.body.author,
          bookID: req.body.bookID,
          img: req.body.img,
        }
        User.findOne({name: req.body.name}, (err, acc)=>{
          var iter = 0
          acc.library.map(function(item){
            if(item.bookID === book.bookID){
              res.send(JSON.stringify({result: 'In Collection'}))
            }else{
              iter++
            }
          })
          if(iter === acc.library.length){
            acc.library.push(book);
            acc.save();
            res.send(JSON.stringify({result: 'Added Book'}));
          }
        });
      }
      //removes a book from the users library array depending on the posted book data
      else if(req.body.source === 'removeBook'){
        User.findOne({name: req.body.name}, function(err, acc){
          acc.library.map((item, index)=>{
            if(acc.library.length > 0){
              if(item.bookID === req.body.bookID){
                acc.library.splice(index, 1);
                acc.save();
                res.send(JSON.stringify({new: acc.library}))
              }
            }else{
              res.send(JSON.stringify({new: 'no books'}))
            }
          })
          // res.send(JSON.stringify({result: acc.library.indexOf({title: req.body.title})}))
        })
      }
      //gets the users entire library
      else if(req.body.source === 'bookshelf'){

          User.findOne({name: req.body.name}, (err, acc)=>{
            if (acc.library.length > 0){
              res.send(JSON.stringify({data: acc.library}))
            }else{
              res.send(JSON.stringify({data: 'NBS'}))
            }
          })

        }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}