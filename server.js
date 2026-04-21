const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// 📁 Pasta de releases
const RELEASES_DIR = "./releases";

if (!fs.existsSync(RELEASES_DIR)) {
    fs.mkdirSync(RELEASES_DIR);
}

// 🔥 GERAR DDEX REAL (BASE)
function generateDDEX(data) {
    return `
<NewReleaseMessage>
    <Release>
        <Title>${data.titulo}</Title>
        <Artist>${data.artista}</Artist>
        <ISRC>${data.isrc}</ISRC>
        <UPC>${data.upc}</UPC>
    </Release>
</NewReleaseMessage>
`;
}

// 🚀 RECEBER LANÇAMENTO
app.post("/release", (req, res) => {

    const data = req.body;

    const folderName = Date.now().toString();
    const releasePath = path.join(RELEASES_DIR, folderName);

    fs.mkdirSync(releasePath);

    // Guardar metadata
    fs.writeFileSync(
        path.join(releasePath, "metadata.json"),
        JSON.stringify(data, null, 2)
    );

    // Gerar XML DDEX
    const ddex = generateDDEX(data);

    fs.writeFileSync(
        path.join(releasePath, "release.xml"),
        ddex
    );

    console.log("Release criado:", folderName);

    res.json({
        success: true,
        message: "Release processado automaticamente"
    });
});

app.listen(3000, () => console.log("Servidor profissional ativo"));
