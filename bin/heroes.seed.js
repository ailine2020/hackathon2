require("dotenv").config();
const axios = require("axios");
const MongoClient = require("mongodb").MongoClient;
const heroes = require("./../json/heroes-fake-db.json").heroes.map((h) => {
  delete h.id;
  if (h.appearance && h.appearance.race === "null") h.appearance.race = null;
  return h;
});

function checkForImages() {
  return new Promise(async (resolve, reject) => {
    for (let heroe of heroes) {
      try {
        // if (heroe.name === "Atom") console.log(heroe);
        console.log(heroe.name);
        if (!heroe.image || !heroe.image.url) throw new TypeError("no image for this hero " + heroe.name);
        await axios.get(heroe.image.url); // if not found, the 404 error will be catched as well
      } catch (err) {
        // console.log(err.response && err.response.status || err);
        heroe.image = {};
        heroe.image.url =
          "https://res.cloudinary.com/gdaconcept/image/upload/v1594970568/no-image-logo_y5khfl.png";
        // console.error("no image for the heroe " + JSON.stringify(heroe));
      }
    }
    resolve("ready to insert");
  });
}

checkForImages().then((ok) => {

  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect(async (err) => {
    const db = client.db(process.env.MONGO_DB_NAME);

    try {
      const collection = db.collection("heroes");

      if (db.namespace.collection) {
        await collection.drop();
        console.log("heores collection dropped successfully !!!");
      }

      const dbRes = await collection.insertMany(heroes);
      console.log(
        "YAY ! " + dbRes.insertedCount + " heroes documents inserted !!!"
      );
      client.close();
    } catch (err) {
      console.error(err);
    }
  });

  // client.connect(async (err) => {
  //   const db = client.db(process.env.MONGO_DB_NAME);

  //   try {
  //     const collection = db.collection("heroes");

  //     if (db.namespace.collection) {
  //       await collection.drop();
  //       console.log("heores collection dropped successfully !!!");
  //     }

  //     const dbRes = await collection.insertMany(heroes);
  //     console.log(
  //       "YAY ! " + dbRes.insertedCount + " heroes documents inserted !!!"
  //     );
  //     client.close();
  //   } catch (err) {
  //     console.log("lààààà---");
  //     console.error(err);
  //   }
  // });
});
