import fs from "fs"
import http from "http"
import path from "path"

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

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName)
  output = output.replace(/{%PRODUCT_IMAGE%}/g, product.image)
  output = output.replace(/{%PRODUCT_FROM%}/g, product.from)
  output = output.replace(/{%PRODUCT_NUTR%}/g, product.nutrients)
  output = output.replace(/{%PRODUCT_QUANTITY%}/g, product.quantity)
  output = output.replace(/{%PRODUCT_PRICE%}/g, product.price)
  output = output.replace(/{%PRODUCT_DESC%}/g, product.description)
  output = output.replace(/{%ID%}/g, product.id)

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic")
  }
  return output
}

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
  const pathName = req.url

  //OVERVIEW
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" })
    const cardsHtml = productData
      .map((el) => replaceTemplate(tempCard, el))
      .join("")

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml)
    res.end(output)
  }
  //PRODUCT
  else if (pathName === "/product") {
    res.end("This is PRODUCT page!")
  }
  //API
  else if (pathName === "/api") {
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
