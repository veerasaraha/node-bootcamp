import fs from "fs"

//Blocking , synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8")
// const textOut = `this is what we know about avocado: ${textIn}. \n created on ${new Date()}`
// fs.writeFileSync("./txt/output.txt", textOut)
// console.log("File written!")

// Non-Blocking , asynchronous way

fs.readFile("./txt/start.txt", { encoding: "utf-8" }, (err, data) => {
  fs.readFile(`./txt/${data}.txt`, { encoding: "utf-8" }, (err, data2) => {
    fs.readFile("./txt/append.txt", { encoding: "utf-8" }, (err, data3) => {
      if (err) return console.log("EROR : check the file name")
      console.log(data3)
      fs.writeFile("./txt/final.txt", `${data2} \n ${data3}`, (err) => {
        console.log("your fle has been written!")
      })
    })
  })
})
console.log("Reading file int the backgroud...")
