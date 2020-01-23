import BookService from "./services/bookService"
const bookService = new BookService()
import { format } from "timeago.js"

class UI {

    async renderBooks() {
        const books = await bookService.getAllBooks()
        const booksCardContainer = document.getElementById("books-cards")
        booksCardContainer.innerHTML = ""

        //recorrer el arreglo de libros y crear la lista de books
        books.forEach(book => {
            const div = document.createElement("div");
            div.className = ""
            div.innerHTML = '<div class="card m-2">'+
                                '<div class="row">'+
                                    '<div class="col-md-4">'+
                                        '<img src="'+book.imagePath+'" alt="" class="img-fluid" />'+
                                    '</div>'+
                                    '<div class="col-md-8">'+
                                        '<div class="card-block px-2">'+
                                            '<h4 class="card-title">'+book.title+'</h4>'+
                                            '<p class="card-text">'+book.author+'</p>'+
                                            '<a href="#" class="btn btn-danger delete" _id="'+book._id+'">Eliminar</a>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="card-footer">'+
                                    format(book.created_at)+
                                '</div>'+
                            '</div>'

            booksCardContainer.appendChild(div)
        });

    }

    async addANewBook(book) {
        await bookService.saveBook(book);
        this.clearBookForm()
        this.renderBooks()
        this.renderMessage("Book Added", "success",3000)
    }

    clearBookForm() {
        document.getElementById("book-form").reset()
    }

    renderMessage(message,colorMessage,secondsToRemove) {
        const div = document.createElement("div")
        div.className = "alert alert-"+colorMessage+" message"
        div.appendChild(document.createTextNode(message))

        const container = document.querySelector(".col-md-4")
        const bookForm = document.querySelector("#book-form")

        container.insertBefore(div,bookForm)
        setTimeout(()=>{
            document.querySelector(".message").remove()
        },secondsToRemove)
    }

    async deleteBook(bookId) {
        const res = await bookService.deleteBook(bookId)
        this.renderBooks()
        this.renderMessage("Book Deleted", "danger", 3000)
    }

}

export default UI;