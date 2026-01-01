const UserModel=require('../model/UserModel');
const ProductModel=require('../model/ProductModel');
const CategoryModal = require('../model/CategoryModal');
const dashboard = async (req, res) => {
   let id= req.session.userid;
    const data=await UserModel.findById(id);
    res.render("admin/admindashboard",{data});
};

const users = async (req , res) => {

    let alluser = await UserModel.find({});

    res.render('admin/users' , {alluser});
}

const deleteuser = async (req , res) => {
    let id = req.params.id;
    let user = await UserModel.findByIdAndDelete(id);
    res.redirect('/dash/users');
}

const updateuser = async (req , res) => {
  let id = req.params.id;
  let user = await UserModel.findById(id);
  res.render('admin/edituser' , {user});
}

const edituser = async (req , res) =>{
  const {id, firstname, lastname, email} = req.body;
  await UserModel.findByIdAndUpdate(id , {
    Firstname: firstname,
    Lastname: lastname,
    Email: email
  });
  res.redirect('/dash/users');
}

const products = async (req , res) => {

   let allprod = await ProductModel.find({});

    res.render('admin/products' , {allprod});
}

const addproduct = async (req, res) => {
   let id= req.session.userid;
    const data=await UserModel.findById(id);
    res.render("admin/addproducts",{data});
};
const uploadproduct = async (req, res) => {
  const {price,title,desc,specifications,dimensions,material}=req.body;
   const img1 = req.files['image1']?.[0]?.originalname;
  const img2 = req.files['image2']?.[0]?.originalname;
  const img3 = req.files['image3']?.[0]?.originalname;

  const product= await ProductModel.create({
    Title:title,
    Price:price,
    Description:desc,
    Dimensions:dimensions,
    Specifications:specifications,
    Material:material,
    Image1: "uploads/"+img1,
    Image2: "uploads/"+img2,
    Image3: "uploads/"+img3

  });
    const user = await UserModel.findById(req.session.userid);
    
  if(product){
    res.render("admin/addproducts",{data:user,success:true,product});
  }
};

const deleteproduct = async (req , res) => {
  let id = req.params.id;
  await ProductModel.findByIdAndDelete(id);
  res.redirect('/dash/products');
}

const updateproduct = async (req , res) => {
  let id = req.params.id;
  const product = await ProductModel.findById(id);
  res.render("admin/editproducts" , {product});
}

const editproduct = async (req , res) => {
  let {id, title, price, desc, specifications, dimensions, material} = req.body;

  const updateprod = {
    Title: title,
    Price: price,
    Description: desc,
    Specifications: specifications,
    Dimensions: dimensions,
    Material: material
  }

  if(req.files.image1) updateprod.Image1 = "/uploads/" + req.files.image1[0].originalname;
  if(req.files.image2) updateprod.Image2 = "/uploads/" + req.files.image2[0].originalname;
  if(req.files.image3) updateprod.Image3 = "/uploads/" + req.files.image3[0].originalname;

  await ProductModel.findByIdAndUpdate(id, updateprod);
   res.redirect("/dash/products");
}

const category = async (req , res) => {
    
    let allcat = await CategoryModal.find({});

    res.render('admin/category' , {allcat});
}

const addcategory = async (req , res) => {
  
  res.render("admin/addcategory" , {category: null});
}

const uploadcategory = async (req ,res) => {
  const {Title} = req.body;
  await CategoryModal.create({Title: Title});
  res.redirect('/dash/category');
}

const deletecategory = async (req , res) => {
  let id = req.params.id;
  await CategoryModal.findByIdAndDelete(id);
  res.redirect("/dash/category");
}

const editcategory = async (req , res) => {
  let id = req.params.id;
  let category = await CategoryModal.findById(id);
  res.render("admin/editcategory" , {category});
}

const updatecategory = async (req , res) => {
  const {id, Title} = req.body;
  await CategoryModal.findByIdAndUpdate(id , {Title: Title});
  res.redirect("/dash/category");

}

module.exports = {
  dashboard,
  users,
  products,
  category,
  addproduct,
  uploadproduct,
  deleteuser, 
  addcategory,
  uploadcategory,
  deleteproduct,
  updateproduct,
  editproduct,
  deletecategory,
  editcategory,
  updatecategory,
  updateuser,
  edituser
};
