const http = require("http");
const calculate = require("./calculator");

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/html" });
//   res.write("<h1>Addition : " + calculate.add(5, 7) + "</h1>");
//   res.write("<h1>Subtraction : " + calculate.sub(10, 3) + "</h1>");
//   res.end("<h1>Multiplication : " + calculate.mul(5, 7) + "</h1>");
// });

// server.listen(3000, () => {
//   console.log("Server is running on http://127.0.0.1:3000");
// });

// fs.readFile("sample.txt", "utf8", (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(data);
// });

// fs.writeFile("sample1.txt", "hello world", (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
// });

const fs = require("fs");

function readData() {
  fs.readFile("sample.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(JSON.parse(data));
  });
}

function addData(nobj) {
  fs.readFile("sample.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const obj = JSON.parse(data);
    const nobj = [...obj, nobj];
    fs.writeFile("sample.json", JSON.stringify(nobj), (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  });
}

function deleteData(delName) {
  fs.readFile("sample.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const obj = JSON.parse(data);
    const nobj = obj.filter((item) => item.name !== delName);
    fs.writeFile("sample.json", JSON.stringify(nobj), (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  });
}

function updateData(upName, upAge) {
  fs.readFile("sample.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const obj = JSON.parse(data);
    const nobj = obj.map((item) => {
      if (item.name === upName) {
        item.age = upAge;
      }
      return item;
    });
    fs.writeFile("sample.json", JSON.stringify(nobj), (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  });
}

//readData();
//addData({ name: "John", age: 30, city: "New York" });
//deleteData("Doe");
//readData();
updateData("Smith", 35);

