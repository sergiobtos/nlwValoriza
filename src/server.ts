import express from "express";


const app = express();

app.get("/test", (req, res) => {
    //req => tudo que está entrando
    //res => tudo que esta saindo
    return res.send("ola nlw")
});

app.post("/test-post", (req, res) => {
    return res.send("ola NLW metodo Post" )
})

// http://localhost:3000
app.listen(3000, () => console.log("Server is running ok!"))