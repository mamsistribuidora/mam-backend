const express = require("express");
const app = express();

app.use(express.json());

app.post("/release", (req, res) => {

    const data = req.body;

    console.log("NOVO LANÇAMENTO:");
    console.log(data);

    const xml = `
    <Release>
        <Title>${data.titulo}</Title>
        <Artist>${data.artista}</Artist>
        <ISRC>${data.isrc}</ISRC>
        <UPC>${data.upc}</UPC>
    </Release>
    `;

    console.log(xml);

    res.json({ success: true });
});

app.listen(3000, () => console.log("Servidor ativo"));
