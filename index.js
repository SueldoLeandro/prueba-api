import express  from 'express';
import fs from 'fs';
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.json());


// LEER
const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

// ESCRIBIR
const writeData = (data) => {
    try {
         fs.writeFileSync("./db.json", JSON.stringify(data));
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

app.get("/", (req, res) => {
    res.send("asd");
});

// mostrar los libros
app.get("/books", (req, res) => {
    const data = readData();
    res.json(data.books);
});

// mostrar un libro
app.get("/books/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const book = data.books.find((book) => book.id === id);
    res.json(book);
});

// agregar
app.post("/books", (req,res) =>{
    const data = readData();
    const body = req.body;
    const newBook = {
        id: data.books.length + 1,
        ...body,
    };
    data.books.push(newBook);
    writeData(data);
    res.json(newBook);
});

// modificar
app.put("/books/:id",(req, res)=>{
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books[bookIndex] = {
        ...data.books[bookIndex],
        ...body,
    };
    writeData(data);
    res.json({message: "Libro modificado con éxito"});
});

// delete
app.delete("/books/:id", (req,res) =>{
    const data = readData();
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books.splice(bookIndex, 1);
    writeData(data);
    res.json({message: "Libro borrado con éxito"});

})

app.listen(3001,()=>{
    console.log("Bienvenido a mi servidor.");
});

