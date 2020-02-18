const http = require('http');
const url = require("url");
const petshop = require("./petshop");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/plain; charset=UTF-8" });


    res.write("** Bem vindos ao Petshop **");

    let urlCompleta = url.parse(req.url, true);//retorna obj com partes
    let queryString = urlCompleta.query;
    let rota = urlCompleta.pathname;

    console.log(urlCompleta);

    switch (rota) {
        case "/pets":
            const pets = petshop.listarPets();

            if (pets.length > 0) {
                res.write(pets);
            } else {
                res.write("Nenhum pet cadastrado :");
            }

            break;
        case "/pets/add":
            let novoPet = queryString;
            if (petshop.adicionarPet(novoPet)) {
                res.write(`${novoPet.nome} foi cadastrado com sucesso!`);
            } else {
                res.write("Ops, algo deu errado!");
            }

            break;
        case "/pets/buscar":
            let petsEncontrados = petshop.buscarPet(queryString.nome);

            if (petsEncontrados.length > 0) {
                res.write(`Encontramos ${petsEncontrados.length} 
            pets com o nome ${queryString.nome}`);
            } else {
                res.write("Ops, não encontramos nenhum pet com esse nome!");
            }

            break;

        default:
            res.write("** Petshop Dh **");
    }
    res.end();
})
    .listen(3000, "localhost", () => {
        console.log("O servidor foi iniciado!");
    });

