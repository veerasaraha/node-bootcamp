import fs from "fs"

const textIn = fs.readFileSync("./txt/input.txt", "utf-8")

const textOut = `this is what we know about avocado: ${textIn}. \n created on ${new Date()}`

fs.writeFileSync("./txt/output.txt", textOut)
console.log("File written!")
