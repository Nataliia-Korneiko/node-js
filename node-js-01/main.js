// import express from "express";
const express = require("express");

// -----------------------
const dependency = require("./dependency");
// require("./dependency"); // можно импортировать без const

// console.log("dependency", dependency);

// dependency.run();
// -----------------------
// import { json } from "express";
const { json } = require("express");

// -----------------------
// export default express;
module.exports = express;

// -----------------------
// export const a = 2;
// const a = 2;
// module.exports = {
//   a,
// };

// exports.a = a; - не рекомендуется!

// -----------------------
// console.log("a:", a); // из global
