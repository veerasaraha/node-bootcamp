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

const writePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not writ file")
      resolve("Sucess")
    })
  })
}

const getDogPic = async () => {
  try {
    const data = await readFilePro("./dog.txt")
    console.log(`Breed ${data}`)

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    )
    console.log(res.body.message)

    await writePro("./dog-img.txt", res.body.message)
    console.log("Random dog image saved to file!")
  } catch (error) {
    throw error
  }
  return "loaded dog pic...."
}

;(async () => {
  try {
    console.log("1: will get dog pics")
    const returnValue = await getDogPic()
    console.log(returnValue)
    console.log("3 : Done getting dog pics")
  } catch (error) {
    console.log(error)
  }
})()

/*
console.log("1: will get dog pics")
getDogPic()
  .then((x) => {
    console.log(x)
    console.log("3 : Done getting dog pics")
  })
  .catch((err) => console.log(err))

 */
/*
readFilePro("./dog.txt")
  .then((data) => {
    console.log(`Breed ${data}`)

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
  })
  .then((res) => {
    return writePro("./dog-img.txt", res.body.message)
  })
  .then(() => {
    console.log("Random dog image saved to file!")
  })
  .catch((err) => {
    console.log(err)
  })


  */
