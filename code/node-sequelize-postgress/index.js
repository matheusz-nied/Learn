(async () => {
    const database = require("./db");
    const Product = require("./product");
    try {
        const result = await database.sync();
        //        console.log(result);

        // CREATE
        // const resultadoCreate = await Product.create({
        //     nome: "mouse",
        //     preco: 10,
        //     descricao: "Um mouse USB bonitão",
        // });
        // console.log(resultadoCreate);

        
        // FIND
        // const produtos = await Product.findAll();
        // console.log(produtos);
        
        //         const produto = await Product.findByPk(1);
        // console.log(produto)

        // UPDATE
        // const produto = await Product.findByPk(1);
        // produto.nome = "Mouse Top";

        // const resultadoSave = await produto.save();
        // console.log(resultadoSave);

        // DELETE
        //assim
        // Product.destroy({ where: { id: 1 } });

        //ou assim
        // const produto = await Product.findByPk(1);
        // produto.destroy();
    } catch (err) {
        console.error(err);
    }
})();
