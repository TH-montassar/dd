const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");

// set the storage
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  /**cb call back */
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init Upload    ///ya9bem mel cline image wo 5aliha ttsajel Middelware
const upload = multer({
  storage: storage,
  limits: { fileSize: 20000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("fileIM"); /////nbadelha bech nda5erm barcha tswer fi nafs lwa9t

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext //* extention lmsmo7 nbhom
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extetion
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime //*nw3 bdabe
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only pls!");
  }
}

// Init app
const app = express();

// EJS
app.set("view engine", "ejs"); //* t5ali  node yfhem l html
//public folder
app.use(
  "/public" /*<----route */,
  express.static(__dirname + "/public/uploads") /**<-------dousi elli n7bou public */
);
app.get("/", (req, res) => res.render("index")); //reteur*
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render("index", {
        msg: err,
      });
    } else {
      console.log(req.file);
     if (req.file==undefined){
        res.render("index", {
            msg:'Error : no file selected !'
          });
         
     }else{
        res.render("index", {
            msg:' file uploaded with success',
            file: req.file.filename
          });

     }
    }
  });
});

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
