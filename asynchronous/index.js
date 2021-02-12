import fs from "fs"
import superagent from "superagent"

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("Could not find the file...")
      resolve(data)
    })
  })
}

readFilePro("./dog.txt")
  .then((data) => {})
  .catch()

fs.readFile(`./dog.txt`, { encoding: "utf-8" }, (err, data) => {
  console.log(`BreedL ${data}`)

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        if (err) return console.log(err.message)
        console.log("Random don image saved in file!")
      })
    })
    .catch((err) => {
      console.log(err.message)
    })
})
