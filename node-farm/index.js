import fs from "fs"
import http from "http"
import url from "url"
import replaceTemplate from "../node-farm/modules/replaceTemplate.js"
/////////////////////////////////////////////////////////
// FS MODULE //
/////////////////////////////////////////////////////////

//Blocking , synchronous way
/*
const textIn = fs.readFileSync("./txt/input.txt", "utf-8")
const textOut = `this is what we know about avocado: ${textIn}. \n created on ${new Date()}`
fs.writeFileSync("./txt/output.txt", textOut)
console.log("File written!")

*/

// Non-Blocking , asynchronous way

/*
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
*/

/////////////////////////////////////////////////////////
// HTTP MODULE //
/////////////////////////////////////////////////////////

const tempOverview = fs.readFileSync(
  `./templates/template-overview.html`,
  "utf-8"
)
const tempCard = fs.readFileSync(`./templates/template-card.html`, "utf-8")
const tempProduct = fs.readFileSync(
  `./templates/template-product.html`,
  "utf-8"
)

const data = fs.readFileSync(`./dev-data/data.json`, "utf-8")

const productData = JSON.parse(data)

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true)

  //OVERVIEW
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" })
    const cardsHtml = productData
      .map((el) => replaceTemplate(tempCard, el))
      .join("")

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml)
    res.end(output)
  }
  //PRODUCT
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" })
    const product = productData[query.id]
    const output = replaceTemplate(tempProduct, product)

    res.end(output)
  }
  //API
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" })

    res.end(data)
  }
  //PAGE_NOT_FOUND
  else {
    res.end("<h1>Page Not Found</h1>")
  }
})

server.listen(8000, () => {
  console.log("Listening server : PORT 8000")
})
