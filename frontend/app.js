import "./styles/app.css"
import UI from "./UI"
const ui = new UI()

document.addEventListener("DOMContentLoaded",()=>{
    ui.renderBooks()
})

document.getElementById("book-form")
    .addEventListener("submit", (e)=>{
        //evita que se realice su comportamiento por defecto, que se reinicie la pagina
        e.preventDefault()

        //capturar los datos del formulario
        const title = document.getElementById("title").value 
        const author = document.getElementById("author").value
        const isbm = document.getElementById("isbm").value 
        const image = document.getElementById("image").files

        const formData = new FormData()

        formData.append("title",title)
        formData.append("author",author)
        formData.append("isbm",isbm)
        formData.append("image",image[0])

        ui.addANewBook(formData)


    })

    document.getElementById("books-cards")
        .addEventListener("click", (e)=>{
            if (e.target.classList.contains("delete")){
                const bookId = e.target.getAttribute("_id")
                ui.deleteBook(bookId)
            }
        })