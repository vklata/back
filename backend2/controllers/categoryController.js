import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import fs from "fs";
export const createCategoryController = async (req, res) => {
  try {
    // const { name } = req.body;
    const { name } =  req.fields;
    const { photo } = req.files;
    // if (!name) {
    //   return res.status(401).send({ message: "Name is required" });
    // }
    switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exisits",
      });
    }
//     const category = await new categoryModel({
//       name,
//       slug: slugify(name),
//     }).save();
//     res.status(201).send({
//       success: true,
//       message: "new category created",
//       category,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//     //   errro,
//       message: "Errro in Category",
//     });
//   }
// };
const category = new categoryModel({ ...req.fields, slug: slugify(name) });
if (photo) {
  category.photo.data = fs.readFileSync(photo.path);
  category.photo.contentType = photo.type;
}
await category.save();
res.status(201).send({
  success: true,
  message: "Category Created Successfully",
  category,
});
} catch (error) {
console.log(error);
res.status(500).send({
  success: false,
  error,
  message: "Error in crearing category",
});
}
};


//update category
// export const updateCategoryController = async (req, res) => {
//   try {
//     const { name } = req.body;
//     const { id } = req.params;
//     const category = await categoryModel.findByIdAndUpdate(
//       id,
//       { name, slug: slugify(name) },
//       { new: true }
//     );
//     res.status(200).send({
//       success: true,
//       messsage: "Category Updated Successfully",
//       category,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error while updating category",
//     });
//   }
// };
export const updateCategoryController = async (req, res) => {
    try {
      const { name} =req.fields;
      // const { photo } = req.files;
      //alidation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        // case photo && photo.size > 1000000:
        //   return res
        //     .status(500)
        //     .send({ error: "photo is Required and should be less then 1mb" });
      }
  
      const category = await categoryModel.findByIdAndUpdate(
        req.params.pid,
        { ...req.fields, slug: slugify(name) },
        { new: true }
      );
      // if (photo) {
      //   category.photo.data = fs.readFileSync(photo.path);
      //   category.photo.contentType = photo.type;
      // }
      await category.save();
      res.status(201).send({
        success: true,
        message: "Category Updated Successfully",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Updte product",
      });
    }
  };


// get all cat
// export const categoryControlller = async (req, res) => {
//   try {
//     const category = await categoryModel.find({});
//     res.status(200).send({
//       success: true,
//       message: "All Categories List",
//       category,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error while getting all categories",
//     });
//   }
// };
export const categoryControlller = async (req, res) => {
    try {
      const category = await categoryModel
      .find({})
        // .populate("category")
        // .select("-photo")
        .limit(12)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        counTotal: category.length,
        message: "Category ",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in getting products",
        error: error.message,
      });
    }
  };

// single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

//delete category
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};
// export const categoryPhotoController = async (req, res) => {
//     try {
//       const category = await categoryModel.findById(req.params.pid).select("photo");
//       if (category.photo.data) {
//         res.set("Content-type", category.photo.contentType);
//         return res.status(200).send(category.photo.data);
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         success: false,
//         message: "Erorr while getting photo",
//         error,
//       });
//     }
//   };


// import categoryModel from "../models/categoryModel.js";
// import slugify from "slugify";
// export const createCategoryController = async (req, res) => {
//   try {
//     const { name } = req.body;
//     if (!name) {
//       return res.status(401).send({ message: "Name is required" });
//     }
//     const existingCategory = await categoryModel.findOne({ name });
//     if (existingCategory) {
//       return res.status(200).send({
//         success: false,
//         message: "Category Already Exisits",
//       });
//     }
//     const category = await new categoryModel({
//       name,
//       slug: slugify(name),
//     }).save();
//     res.status(201).send({
//       success: true,
//       message: "new category created",
//       category,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       errro,
//       message: "Errro in Category",
//     });
//   }
// };

// //update category
// export const updateCategoryController = async (req, res) => {
//   try {
//     const { name } = req.body;
//     const { id } = req.params;
//     const category = await categoryModel.findByIdAndUpdate(
//       id,
//       { name, slug: slugify(name) },
//       { new: true }
//     );
//     res.status(200).send({
//       success: true,
//       messsage: "Category Updated Successfully",
//       category,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error while updating category",
//     });
//   }
// };

// // get all cat
// export const categoryControlller = async (req, res) => {
//   try {
//     const category = await categoryModel.find({});
//     res.status(200).send({
//       success: true,
//       message: "All Categories List",
//       category,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error while getting all categories",
//     });
//   }
// };

// // single category
// export const singleCategoryController = async (req, res) => {
//   try {
//     const category = await categoryModel.findOne({ slug: req.params.slug });
//     res.status(200).send({
//       success: true,
//       message: "Get SIngle Category SUccessfully",
//       category,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error While getting Single Category",
//     });
//   }
// };

// //delete category
// export const deleteCategoryCOntroller = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await categoryModel.findByIdAndDelete(id);
//     res.status(200).send({
//       success: true,
//       message: "Categry Deleted Successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "error while deleting category",
//       error,
//     });
//   }
// };