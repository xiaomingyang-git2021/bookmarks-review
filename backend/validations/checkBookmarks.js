const checkName = (req, res, next) => {
  if (req.body.name) {
    next();
  } else {
    res.status(400).json({ error: "Name is required" });
  }
};
const checkFavorite = (req, res, next) => {
  if(typeof req.body.is_favorite === "boolean"){
    next();
  } else {
    res.status(400).json({ error: "is_favorite must be a boolean" });
  }
}
module.exports = { checkName, checkFavorite };

// const validateBookmark = (req, res, next) => {
//   let errorMsg = [];
//   if (req.body.name === undefined) {
//       errorMsg.push("name is required");
//   }
//   if(typeof req.body.is_favorite !== "boolean"){
//       errorMsg.push("is_favorite must be a boolean");
//   } 

//   if(errorMsg.length > 0){
//       res.status(400).json({ error: errorMsg.join(", ") });
//   } else {
//       next();
//   }

// };

// module.exports = { validateBookmark };