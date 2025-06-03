// import jwt from "jsonwebtoken";
// import { Request, Response } from "express";
// // const ProductModel = require("../Models/Product.js");
// import ProductModel from "../Models/Product";

// const logProduct = async (req: Request, res: Response): Promise<Response> => {
//   try {
//     const { productName, productPrice } = req.body;
//     const product = await ProductModel.findOne({ productName });
//     if (product) {
//       return res
//         .status(409)
//         .json({ message: "Product already exists", sucess: false });
//     }

//     const productModel = new ProductModel({ productName, productPrice });
//     await productModel.save();
//     return res
//       .status(200)
//       .json({ message: "Product logged succesfull", success: true });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "Internal server error", success: false });
//   }
// };

// const searchProduct = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const { productName, productPrice } = req.body;
//     const product = await ProductModel.findOne({ productName });
//     if (!product) {
//       return res
//         .status(404)
//         .json({ message: "Product not found", success: false });
//     }

//     return res.status(200).json({
//       message: "Product found",
//       success: true,
//       productName,
//       productPrice,
//     });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "Internal Server error", success: false });
//   }
// };

// module.exports = { logProduct, searchProduct };
