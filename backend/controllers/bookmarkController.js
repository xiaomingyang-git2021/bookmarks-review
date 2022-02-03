const express = require("express");
const bookmarks = express.Router();
const { getAllBookmarks, getBookmark, createBookmark, updateBookmark } = require('../queries/bookmarks.js');
const { checkName, checkFavorite } = require("../validations/checkBookmarks.js");

// INDEX
bookmarks.get("/", async (req, res)=>{
  try {
    const allBookmarks = await getAllBookmarks();
    if(allBookmarks[0]){
      res.status(200).json(allBookmarks);
    } else {
      res.status(500).json({ error: "server error" });
    }
  }catch(err){
    console.log(err);
  }
})

bookmarks.get("/:id", async (req, res)=>{
  const { id } = req.params;
  try{
    const bookmark = await getBookmark(id);
    // console.log(bookmark); 
    // res.json("Testing get bookmark");
    if(bookmark.id){
      res.status(200).json(bookmark);
    } else {
      res.status(500).json({error: "server error"});
    }
  }catch(err){
    console.log(err)
  }
})

bookmarks.post("/", checkName, checkFavorite, async (req, res)=>{
  const { body } = req;
  try{
    const createdBookmark = await createBookmark(body);
    if(createdBookmark.id){
      res.status(200).json(createdBookmark);
    } else {
      res.status(500).json({error: "Bookmark creation error"});
    }
  } catch(err){
    console.log(err);
  }
})

bookmarks.delete("/:id", async(req, res)=>{
  const { id } = req.params;
  const deletedBookmark = await deletedBookmark(id);
  if(deletedBookmark.id){
    res.status(200).json(deletedBookmark);
  } else {
    res.status(404).json({error: "Bookmark not found"});
  }
})

bookmarks.put("/:id", async(req, res)=>{
  const { id } = req.params;
  const { body } = req;
  const updatedBookmar = await updateBookmark(id, body)
  if(updatedBookmar.id){
    res.status(200).json(updatedBookmar);
  } else {
    res.status(404).json({error: "Bookmark not found"});
  }
})


module.exports = bookmarks;