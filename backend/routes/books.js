const { Router } = require("express")
const router = Router();
const Book = require("../models/Book")
const {unlink} = require("fs-extra")
const path = require("path")

router.get("/", async (req, res) => {
    const books = await Book.find()
    res.json(books)
})


router.post("/", async (req, res) => {
    const {title, author,isbm} = req.body;
    const imagePath = "/uploads/"+req.file.filename
    const newBook = new Book({title,author,isbm, imagePath})
    await newBook.save()

    res.json({message:"libro guardado"})
    
})

router.delete("/:id", async (req, res) => {
    console.log("Libro a eliminar: ",req.params.id);
    const deletedBook = await Book.findByIdAndDelete(req.params.id)
    unlink(path.resolve("./backend/public"+deletedBook.imagePath ))
    res.send("Libro eliminado")
})
module.exports = router;