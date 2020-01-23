class BookService {
    constructor() {
        this.URI = "/api/books"
    }

    async getAllBooks() {

        const response = await fetch(this.URI) //llamar a la api
        const books = await response.json() //convertir a json
        return books

    }

    async saveBook(book) {
        const response = await fetch(this.URI, {
            method: "POST",
            body: book
        })

        const data = await response.json()
        console.log(data)
    }

    async deleteBook(bookId) {

        const response = await fetch(this.URI + '/' + bookId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        //const data = await response.json()
        //console.log(data)

    }

}

export default BookService;