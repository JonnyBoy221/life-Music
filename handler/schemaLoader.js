const { readdirSync } = require("fs");

module.exports = (client) => {
    readdirSync("./mongoose/schemas").forEach(schema => {
        let pull = require(`../mongoose/schemas/${schema}`);
        pull.run(client);
    });
};
