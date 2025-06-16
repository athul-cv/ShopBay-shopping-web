const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const { connect, Schema, model, default: mongoose } = require("mongoose");
const multer = require("multer");
const { request } = require("https");
const { parse } = require("querystring");
const mailer = require('nodemailer')
const argon2 = require('argon2');
const { log } = require("console");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("./public"));



const PATH = "./public/images";
const upload = multer({
    storage: multer.diskStorage({
        destination: PATH,
        filename: function (req, file, cb) {
            let origialname = file.originalname;
            let ext = origialname.split(".").pop();
            let filename = origialname.split(".").slice(0, -1).join(".");
            cb(null, filename + "." + ext);
        },
    }),
});

const db = "mongodb+srv://athulcv46:athulcv46@cluster0q.rloci.mongodb.net/dbshopbay";

app.listen(port, async () => {
    console.log("Server is Running")
    try {
        await connect(db)
        console.log("DB Connection Established");
    } catch (err) {
        console.error(err.message);
        process.exit(1)

    }
});
//shema.....
//AdminShema........
const collectionAdminSchema = new Schema({
    adminName: {
        type: String,
        require: true,
    },
    adminEmail: {
        type: String,
        require: true,
    },
    adminPassword: {
        type: String,
        require: true,
    }
})
const modelAdmin = model("tblAdmin", collectionAdminSchema);

//Create Admin.......
app.post('/Admin', async (req, res) => {
    try {
        const { adminName, adminEmail, adminPassword } = req.body
        const newAdmin = new modelAdmin({
            adminName,
            adminEmail,
            adminPassword
        })
        await newAdmin.save();
        res.json(newAdmin);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Get Admin.....
app.get("/GetAdmin", async (req, res) => {
    try {
        const Admins = await modelAdmin.find();
        res.json(Admins);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Upadte Admin......
app.put("/UpadteAdmin/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { adminName, adminEmail, adminPassword } = req.body;

        const UpadteAdmin = await modelAdmin.findByIdAndUpdate(
            id,
            { adminName, adminEmail, adminPassword },
            { new: true }
        );
        res.json(UpadteAdmin);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Delete Admin.....
app.delete("/deleteAdmin/:id", async (req, res) => {
    const id = req.params.id
    try {
        await modelAdmin.findByIdAndDelete(id);
        res.json("admin removed");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//..............................................................................................................//
//..............................................................................................................//



//DistrictShema......
const collectionDistrictShema = new Schema({
    districtName: {
        type: String,
        require: true,
    }
})
const modelDistrict = model("tblDistrict", collectionDistrictShema);

//Create district........
app.post("/district", async (req, res) => {
    try {
        const { districtName } = req.body;
        const newDistricts = new modelDistrict({
            districtName
        });

        await newDistricts.save();
        res.json(newDistricts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");

    }
});

//GET dISTRICT.......
app.get("/GetDistrict", async (req, res) => {
    try {
        const getDistricts = await modelDistrict.find();

        res.json(getDistricts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});


//GET dISTRICT By Id.......
app.get("/GetDistrict/:Id", async (req, res) => {
    try {
        const Id = req.params.Id
        const getDistricts = await modelDistrict.find({ _id: Id });;
        res.json(getDistricts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//upadte District.......
app.put("/upadteDistrict/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { districtName } = req.body;
        const upadteDistrict = await modelDistrict.findByIdAndUpdate(
            id,
            { districtName }, { new: true }
        )
        res.json(upadteDistrict);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
});

//Delete District.......
app.delete("/deleteDistrict/:id", async (req, res) => {
    const id = req.params.id
    try {
        await modelDistrict.findByIdAndDelete(id);
        res.json("District Removed")
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error")
    }
});

//..............................................................................................................//
//..............................................................................................................//



//Placeshema.......
const collectionPlaceShema = new Schema({
    place: {
        type: String,
        require: true,
    },
    districtId: {
        type: Schema.Types.ObjectId,
        ref: "tblDistrict",
        require: true

    }
})
const modelPlaces = model("tblPlaces", collectionPlaceShema);

//Create Place................
app.post("/Place", async (req, res) => {
    try {
        const { place, districtId } = req.body;
        const newPlaces = new modelPlaces({
            place, districtId
        });
        await newPlaces.save();
        res.json(newPlaces);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error")
    }
});

//Get Places...............
app.get("/getPlaces", async (req, res) => {
    try {
        const getPlaces = await modelPlaces.find();
        res.json(getPlaces);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Get Places by Id...............
app.get("/getPlacesById/:id", async (req, res) => {
    try {
        const Id = req.params.id;
        const getPlaces = await modelPlaces.find({ _id: Id });
        res.json(getPlaces);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Get Places with district id...............
app.get("/placeWithDistrict", async (req, res) => {
    try {
        const Places = await modelPlaces.find().populate("districtId");
        const filteredPlaces = Places.filter(
            (Place) => Place.districtId
        );
        res.json(filteredPlaces);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Get  district based places...............
app.get("/districtWithPlaces/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const place = await modelPlaces.find({ districtId: id });
        if (place.length === 0) {
            return res.json([]);
        }
        else {
            res.json(place).status(200);
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});




//Update Places.............
app.put("/updatePlace/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { place, districtId } = req.body;
        const updatePlaces = await modelPlaces.findByIdAndUpdate(
            id,
            { place, districtId },
            { new: true }
        );
        res.json(updatePlaces);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Delete Places...............
app.delete("/deletePlace/:id", async (req, res) => {
    const id = req.params.id
    try {
        await modelPlaces.findByIdAndDelete(id);
        res.json("place removed");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//..............................................................................................................//
//..............................................................................................................//



//CategoryShema.....
const colletionCategoryShema = new Schema({
    category: {
        type: String,
        require: true,
    },
    Categoryimgsrc: {
        type: String,
        require: true,
    }
})
const modelCategory = model("tblCategory", colletionCategoryShema);

//Create category...............
app.post("/shopCategory",
    upload.fields([
        { name: "categoryPhoto", maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            var fileValue = JSON.parse(JSON.stringify(req.files));
            var Categoryimgsrc = `http://127.0.0.1:${port}/images/${fileValue.categoryPhoto[0].filename}`;
            console.log(Categoryimgsrc);
            const { category } = req.body;
            const newCategory = new modelCategory({
                category, Categoryimgsrc
            });
            await newCategory.save();
            res.json(newCategory);


        } catch (err) {
            console.error(err.message);
            res.status(500).send("server error");
        }
    });

//Get Category..............
app.get("/getCategory", async (req, res) => {
    try {
        const getCategory = await modelCategory.find();
        res.json(getCategory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});

//Get Category by id..............
app.get("/getCategoryById/:id", async (req, res) => {
    try {
        const Id = req.params.id;
        const getCategory = await modelCategory.find({ _id: Id });
        res.json(getCategory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});

//Update Category...................
app.put("/updateCategory/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { category } = req.body;
        const updateCategory = await modelCategory.findByIdAndUpdate(
            id,
            { category }, { new: true }
        );
        res.json(updateCategory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Delete Category.................
app.delete("/deleteCategory/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await modelCategory.findByIdAndDelete(id);
        res.json("Category Removed");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//..............................................................................................................//
//..............................................................................................................//



//SubCategoryShema......
const collectionSubCategory = new Schema({
    subCategoryName: {
        type: String,
        require: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "tblCategory",
        require: true,
    },
    subCategoryimgsrc: {
        type: String,
        require: true,
    },

})
const modelSubCategory = model("tblSubCategory", collectionSubCategory);

//Create subCategory................
app.post("/subCategory",
    upload.fields([
        { name: "subCategoryPhoto", maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            var fileValue = JSON.parse(JSON.stringify(req.files));
            var subCategoryimgsrc = `http://127.0.0.1:${port}/images/${fileValue.subCategoryPhoto[0].filename}`;
            console.log(subCategoryimgsrc);

            const { subCategoryName, categoryId } = req.body;
            const newsubCategory = new modelSubCategory({
                subCategoryName, categoryId, subCategoryimgsrc
            });
            await newsubCategory.save();
            res.json(newsubCategory);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("server Error")
        }
    });

//Get subCategory...............
app.get("/getSubCategory", async (req, res) => {
    try {
        const getsubCategory = await modelSubCategory.find();
        res.json(getsubCategory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Get subCategory by id...............
app.get("/getSubCategoryById/:id", async (req, res) => {
    try {
        const Id = req.params.id
        const getsubCategory = await modelSubCategory.find({ _id: Id });
        res.json(getsubCategory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});


//Get subCategory by same categoryid...............
app.get("/getSubCategoryByCategoryId/:id", async (req, res) => {
    try {
        const Id = req.params.id
        const getsubCategory = await modelSubCategory.find({ categoryId: Id });
        res.json(getsubCategory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

// subCategory with category.............
app.get("/subCategoryWithCategory", async (req, res) => {
    try {
        const subCategories = await modelSubCategory.find().populate("categoryId");
        const filteredSubCategories = subCategories.filter(
            (SubCategory) => SubCategory.categoryId
        );
        res.json(filteredSubCategories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

// subCategory with category.............
app.get("/subCategoryWithCategoryHome/:id", async (req, res) => {
    const Id = req.params.id;
    try {
        const subCategories = await modelSubCategory.find({ categoryId: Id }).populate("categoryId");

        res.json(subCategories);
        // console.log(categorySubcategoryMap);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

// Category Based Subcategories.................
app.get("/categoryWithSubcategory/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const subCategorys = await modelSubCategory.find({ categoryId: id }).populate("categoryId")
        if (subCategorys.length === 0) {
            return res.json([]);
        }
        res.json(subCategorys).status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Update subCategory.............
app.put("/updateSubCategory/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { subCategoryName, categoryId } = req.body;
        const updateSubCategory = await modelSubCategory.findByIdAndUpdate(
            id,
            { subCategoryName, categoryId },
            { new: true }
        );
        res.json(updateSubCategory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Delete subCategory...............
app.delete("/deleteSubCategory/:id", async (req, res) => {
    const id = req.params.id
    try {
        await modelSubCategory.findByIdAndDelete(id);
        res.json("subCategory removed");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//..............................................................................................................//
//..............................................................................................................//


//Shop shema......
const collectionShopShema = new Schema({
    shopName: {
        type: String,
        require: true,
    },
    shopEmail: {
        type: String,
        require: true,
    },
    ShopContact: {
        type: Number,
        require: true,
    },
    shopAddress: {
        type: String,
        require: true,
    },
    placeId: {
        type: Schema.Types.ObjectId,
        ref: "tblPlaces",
        require: true,
    },
    districtId: {
        type: Schema.Types.ObjectId,
        ref: "tblDistrict",
        require: true,
    },
    Shopimgsrc: {
        type: String,
        require: true,
    },
    ShopProofsrc: {
        type: String,
        require: true,
    },
    shopPassword: {
        type: String,
        require: true,
    },
    shopVStatus: {
        type: String,
        require: true,
    },
})
const modelShop = model("tblShop", collectionShopShema);

//Create Shop...............
app.post("/Shop",
    upload.fields([
        { name: "shopPhoto", maxCount: 1 },
        { name: "shopProof", maxCount: 1 },
    ]),

    async (req, res) => {
        try {
            var fileValue = JSON.parse(JSON.stringify(req.files));
            var Shopimgsrc = `http://127.0.0.1:${port}/images/${fileValue.shopPhoto[0].filename}`;
            var ShopProofsrc = `http://127.0.0.1:${port}/images/${fileValue.shopProof[0].filename}`;
            console.log(ShopProofsrc);


            const { shopName, shopEmail, ShopContact, shopAddress, placeId, shopPassword, shopVStatus } = req.body;
            const newShop = new modelShop({
                shopName, shopEmail, ShopContact, shopAddress, placeId, Shopimgsrc, ShopProofsrc, shopPassword, shopVStatus
            });
            await newShop.save();
            res.json(newShop);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("server error");
        }
    });

//Get Shop..............
app.get("/getShop", async (req, res) => {
    try {
        const getShop = await modelShop.find();
        res.json(getShop);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});

// shop with Place.............
app.get("/placeWithShop", async (req, res) => {
    try {
        const placeWithShop = await modelShop.find().populate("placeId").populate("districtId");
        const filteredplaceWithShop = placeWithShop.filter(
            (placeWithShop) => placeWithShop.placeId
        );
        res.json(filteredplaceWithShop);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

// Shop Based Places.................
app.get("/shopWithPlace/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const shopWithPlace = await modelShop.find({ placeId: id }).populate("placeId").populate("districtId");
        if (shopWithPlace.length === 0) {
            return res.status(404).json({ msg: "no Shops found" });
        }
        res.json(shopWithPlace).status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Update Shop...................
app.put("/updateShop/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { shopName, shopEmail, ShopContact, shopAddress, placeId, ShopPhoto, shopProof, shopPassword, shopVStatus } = req.body;
        const updateShop = await modelShop.findByIdAndUpdate(
            id,
            { shopName, shopEmail, ShopContact, shopAddress, placeId, ShopPhoto, shopProof, shopPassword, shopVStatus }, { new: true }
        );
        res.json(updateShop);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Delete Shop.................
app.delete("/deleteShop/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await modelShop.findByIdAndDelete(id);
        res.json("Shop Removed");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//..............................................................................................................//
//..............................................................................................................//



//Customer Shema.....
const collectionCustomerShema = new Schema({
    customerName: {
        type: String,
        require: true,
    },
    customerEmail: {
        type: String,
        require: true,
    },
    customerContact: {
        type: String,
        require: true,
    },
    customerAddress: {
        type: String,
        require: true,
    },
    placeId: {
        type: Schema.Types.ObjectId,
        ref: "tblPlaces",
        require: true,
    },
    profileimgsrc: {
        type: String,
        require: true,
    },
    customerPassword: {
        type: String,
        require: true,
    }
})
const modelCustomer = model("tblCustomer", collectionCustomerShema);

//Create Customer...............
app.post("/Customer",
    upload.fields([
        { name: "customerPhoto", maxCount: 1 },

    ]),
    async (req, res) => {
        try {
            var fileValue = JSON.parse(JSON.stringify(req.files));
            var profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.customerPhoto[0].filename}`;
            console.log(profileimgsrc);

            const { customerName, customerEmail, customerContact, customerAddress, placeId, customerPassword, } = req.body;
            const hashPassword = await argon2.hash("customerPassword")
            const newCustomer = new modelCustomer({
                customerName, customerEmail, customerContact, customerAddress, placeId, profileimgsrc, customerPassword: hashPassword
            });
            await newCustomer.save();
            res.json(newCustomer);


        } catch (err) {
            console.error(err.message);
            res.status(500).send("server error");
        }
    });

//Get Customer..............
app.get("/getCustomer", async (req, res) => {
    try {
        const getCustomer = await modelCustomer.find({ Email: customerEmail, Password: customerPassword });
        res.json(getCustomer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});

//Get Customer with id..............
app.get("/getCustomer/:id", async (req, res) => {
    const Id = req.params.id
    try {
        const getCustomer = await modelCustomer.findOne({ _id: Id });
        res.json(getCustomer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});

//Get Customer with email..............
app.post("/getCustomerWithEmail", async (req, res) => {
    const getEmail = req.body.email;
    const newPassword = req.body.newPassword
    try {
        const getCustomer = await modelCustomer.findOne({ customerEmail: getEmail });
        const hashPassword = await argon2.hash("newPassword")
        const updateCustomer = await modelCustomer.findByIdAndUpdate(
            getCustomer._id,
            { customerPassword: hashPassword }, { new: true }
        );
        res.json(updateCustomer);
        console.log(updateCustomer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});

// Customer with Place.............
app.get("/placeWithCustomer", async (req, res) => {
    try {
        const placeWithCustomer = await modelCustomer.find().populate("placeId");
        const filteredplaceWithCustomer = placeWithCustomer.filter(
            (placeWithCustomer) => placeWithCustomer.placeId
        );
        res.json(filteredplaceWithCustomer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

// Customer Based Places.................
app.get("/customerWithPlace/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const customerWithPlace = await modelCustomer.find({ placeId: id })
        if (customerWithPlace.length === 0) {
            return res.status(404).json({ msg: "no subCategories found" });
        }
        res.json(customerWithPlace).status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Update Customer...................
app.put("/updateCustomer/:id", async (req, res) => {
    const id = req.params.id;
    const oldpswrd = req.body.oldpaswrd;
    try {
        const { customerName, customerEmail, customerContact, customerAddress, placeId, customerPhoto, customerPassword } = req.body;
        const customerData = await modelCustomer.findById(id);
        // console.log(customerData.customerPassword);

        if (argon2.verify(customerData.customerPassword, oldpswrd)) {
            // password match
            const hashPassword = await argon2.hash("customerPassword")
            const updateCustomer = await modelCustomer.findByIdAndUpdate(
                id,
                { customerName, customerEmail, customerContact, customerAddress, placeId, customerPhoto, customerPassword: hashPassword }, { new: true }
            );
            let msg = "";
            msg = 'Password updated successfully!'
            res.json({ updateCustomer, msg });
        } else {
            let msg = ""
            msg = 'Old password is incorrect.'
            res.json(msg);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Delete Customer.................
app.delete("/deleteCustomer/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await modelCustomer.findByIdAndDelete(id);
        res.json("Customer Removed");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//..............................................................................................................//
//..............................................................................................................//



//Product Shema....
const collectionProductshema = new Schema({
    productName: {
        type: String,
        require: true,
    },
    ProductDescription: {
        type: String,
        require: true,
    },
    productRate: {
        type: String,
        require: true,
    },
    prdctimgsrc: {
        type: String,
        require: true,
    },
    subCategoryId: {
        type: Schema.Types.ObjectId,
        ref: "tblSubCategory",
        require: true,
    },
    shopId: {
        type: Schema.Types.ObjectId,
        ref: "tblShop",
        require: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "tblCategory",
        require: true,
    }
})
const modelProduct = model("tblProduct", collectionProductshema);

//Create product...............
app.post("/Product",
    upload.fields([
        { name: "productPhoto", maxCount: 1 },

    ]),
    async (req, res) => {
        try {

            var fileValue = JSON.parse(JSON.stringify(req.files));
            var prdctimgsrc = `http://127.0.0.1:${port}/images/${fileValue.productPhoto[0].filename}`;
            console.log(prdctimgsrc);

            const { productName, ProductDescription, productRate, subCategoryId, shopId, } = req.body;
            const newProduct = new modelProduct({
                productName, ProductDescription, productRate, prdctimgsrc, subCategoryId, shopId,
            });
            await newProduct.save();
            res.json(newProduct);


        } catch (err) {
            console.error(err.message);
            res.status(500).send("server error");
        }
    });

//Get product..............
app.get("/getProduct", async (req, res) => {
    try {
        const getProduct = await modelProduct.find();
        res.json(getProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//seraching products in home page with text............
app.get("/searchingProducts/:text", async (req, res) => {
    const inputData = req.params.text;
    console.log(inputData);
    try {
        const searchedProducts = await modelProduct.find({ productName: inputData })
        res.json(searchedProducts);
        console.log(searchedProducts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error")
    }
})

//Get Mobile Phones product ..............
app.get("/geMobileProduct/:id", async (req, res) => {
    const Id = req.params.id;
    console.log(Id);
    try {
        const getProducts = await modelProduct.find().populate({
            path: "subCategoryId",
            populate: {
                path: "categoryId",
                model: "tblCategory",
            }
        });
        ;

        const filteredProducts = getProducts.filter(product => product.subCategoryId.categoryId._id == Id);

        res.json(filteredProducts);
        console.log(filteredProducts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});


//Get product with id..............
app.get("/getProductWithId/:id", async (req, res) => {
    const Id = req.params.id
    try {
        const getProduct = await modelProduct.find({ _id: Id });
        console.log(getProduct);
        res.json(getProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});


// //Get product with id..............
// app.get("/getProductWithId/:id", async (req, res) => {
//     const Id = req.params.id
//     try {
//         const getProduct = await modelProduct.find({ _id: Id });
//         console.log(getProduct);
//         res.json(getProduct);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("server eror");
//     }
// });

// Product with Subcategory.............
app.get("/subCategoryWithProduct", async (req, res) => {
    try {
        const id = req.params.id
        const subCategoryWithProduct = await modelProduct
            .find()
            .populate("subCategoryId")
            .populate("shopId")
            .populate({
                path: "subCategoryId",
                populate: {
                    path: "categoryId",
                    model: "tblCategory",
                },
            });

        const filteredSubCategoryWithProduct = subCategoryWithProduct.filter(
            (subCategoryWithProduct) => subCategoryWithProduct.subCategoryId
        );
        console.log(filteredSubCategoryWithProduct);
        res.json(filteredSubCategoryWithProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//subcategory with products.............
app.get("/subCategoryWithProduct/:id", async (req, res) => {
    try {
        const id = req.params.id
        const subCategoryWithProduct = await modelProduct
            .find({ "subCategoryId.categoryId._id": id })

            .populate("subCategoryId")
            .populate("shopId")
            .populate({
                path: "subCategoryId",
                populate: {
                    path: "categoryId",
                    model: "tblCategory",
                },
            });


        const filteredSubCategoryWithProduct = subCategoryWithProduct.filter(
            (subCategoryWithProduct) => subCategoryWithProduct.subCategoryId
        );
        console.log(filteredSubCategoryWithProduct);
        res.json(filteredSubCategoryWithProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//subcategoryId with products in mobiles Page.............
app.get("/subCategoryMobileProducts/:ids", async (req, res) => {
    try {
        const ids = req.params.ids.split(","); // Split the ids string into an array
        console.log("hello");
        console.log(ids);
        const subCategoryWithProduct = await modelProduct.find({ subCategoryId: { $in: ids } });

        // console.log(subCategoryWithProduct);
        res.json(subCategoryWithProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});




// Category with Product...........
app.get("/CategoryWithProduct", async (req, res) => {
    try {
        const categoryWithProduct = await modelProduct.find().populate("categoryId").populate("shopId");
        const filteredCategoryWithProduct = categoryWithProduct.filter(
            (categoryWithProduct) => categoryWithProduct.categoryId
        );
        res.json(filteredCategoryWithProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
})

// Product Based subCategory.................
app.get("/productWithSubCategory/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const productWithSubCategory = await modelProduct.find({ subCategoryId: id }).populate("subCategoryId").populate("shopId")
        if (productWithSubCategory.length === 0) {
            return res.status(404).json({ msg: "no products found" });
        }
        res.json(productWithSubCategory).status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Update product...................
app.put("/updateProduct/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { productName, ProductDescription, productRate, productPhoto, subCategoryId, shopId, } = req.body;
        const updateProduct = await modelProduct.findByIdAndUpdate(
            id,
            { productName, ProductDescription, productRate, productPhoto, subCategoryId, shopId, }, { new: true }
        );
        res.json(updateProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Delete Product.................
app.delete("/deleteProduct/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await modelProduct.findByIdAndDelete(id);
        res.json("Product Removed");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//..............................................................................................................//
//..............................................................................................................//



//Gallery Shema.....
const collectionGalleryShema = new Schema({
    Galleryimgsrc: {
        type: String,
        require: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "tblProduct",
        require: true,
    }
})
const modelGallery = model("tblGallery", collectionGalleryShema);

//Create Gallery...............
app.post("/Gallery",
    upload.fields([
        { name: "galleryImage", maxCount: 1 },

    ]),
    async (req, res) => {
        try {

            var fileValue = JSON.parse(JSON.stringify(req.files));
            var Galleryimgsrc = `http://127.0.0.1:${port}/images/${fileValue.galleryImage[0].filename}`;
            console.log(Galleryimgsrc);

            const { productId } = req.body;
            const newGallery = new modelGallery({
                Galleryimgsrc, productId
            });
            await newGallery.save();
            res.json(newGallery);


        } catch (err) {
            console.error(err.message);
            res.status(500).send("server error");
        }
    });

//Get Galley..............
app.get("/getGallery", async (req, res) => {
    try {
        const getGallery = await modelGallery.find();
        res.json(getGallery);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});

// gallery with Product.............
app.get("/productWithGallery", async (req, res) => {
    try {
        const productWithGallery = await modelGallery.find().populate("productId");
        const filteredproductWithGallery = productWithGallery.filter(
            (productWithGallery) => productWithGallery.productId
        );
        if (filteredproductWithGallery.length === 0) {
            res.json(filteredproductWithGallery);
        } else {
            res.json([]);

        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

// Gallery Based Product.................
app.get("/galleryWithProduct/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const galleryWithProduct = await modelGallery.find({ productId: id }).populate("productId")
        if (galleryWithProduct.length === 0) {
            return res.status(500).json({ msg: "no Gallery found" });
        }
        res.json(galleryWithProduct).status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Update Gallery...................
app.put("/updateGallery/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { galleryImage, productId } = req.body;
        const updateGallery = await modelGallery.findByIdAndUpdate(
            id,
            { galleryImage, productId }, { new: true }
        );
        res.json(updateGallery);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Delete Gallery.................
app.delete("/deleteGallery/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await modelGallery.findByIdAndDelete(id);
        res.json("Category Removed");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//..............................................................................................................//
//..............................................................................................................//



//booking Shema....
const collectionBookingShema = new Schema({
    bookingDate: {
        type: String,
        require: true,
    },
    deliveryDate: {
        type: String,
        require: true,
    },
    dayName: {
        type: String,
        require: true,
    },
    bookingTotalAmount: {
        type: String,
        require: true,
    },
    paymentStatus: {
        type: String,
        require: true,
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "tblCustomer",
        require: true,
    }
})
const modelBooking = model("tblBooking", collectionBookingShema);

//Create Booking...............
app.post("/Booking", async (req, res) => {
    try {
        const { bookingDate, customerId, deliveryDate, dayName } = req.body;
        const latestBooking = await modelBooking.findOne({ __v: 0, customerId }).sort({ _id: -1 });
        if (latestBooking) {
            res.json(latestBooking);

        }
        else {
            const newBooking = new modelBooking({
                bookingDate, customerId, deliveryDate, dayName
            });
            await newBooking.save();
            res.json(newBooking);

        }



    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

// Place Order from Cart.............
app.post("/placeOrder/:id", async (req, res) => {
    let email = req.body.email;
    let Id = req.params.id;
    let customerName = req.body.customerName;
    console.log(Id);
    try {
        // const cartWithBooking = await modelCart.find().populate("bookingId").populate("productId")
        // const filteredcartWithBooking = cartWithBooking.filter(
        //     (cartWithBooking) => cartWithBooking.productId
        // );
        const updatedBooking = await modelBooking.findOneAndUpdate(
            { __v: 0, customerId: Id },
            { __v: 1 },
            { new: true }
        );
        let content = `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    line-height: 1.6;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                h1 {
                    font-size: 24px;
                    margin-bottom: 20px;
                }
                p {
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Confirmation Number: ${Id}</h1>
                <p>Hello ${customerName},</p>
                <p>We’re happy to let you know that we’ve received your order.</p>
                <p>Once your package ships, we will send you an email with a tracking number and link so you can see the movement of your package.</p>
                <p>If you have any questions, contact us here <a href="ShopBay@gmail.com">ShopBay@gmail.com</a>!</p>
                <p>We are here to help!</p>
                <p>Returns: If you would like to return your product(s), please see <a href="ShopBay@gmail.com">ShopBay@gmail.com</a> or contact us.</p>
            </div>
        </body>
        </html>
`
        sendEmail(email, content)
        res.json(updatedBooking);



    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Get Booking..............
app.get("/getBooking", async (req, res) => {
    try {
        const getBooking = await modelBooking.find();
        res.json(getBooking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});


//Get Booking ordered..............
app.get("/getOrderedBooking", async (req, res) => {
    try {
        const getOrderedBooking = await modelBooking.find({ __v: { $gt: 0 } }).populate('customerId');
        res.json(getOrderedBooking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});

//Get Booking MyOrder inUser..............
app.get("/myOrderWithBooking/:id", async (req, res) => {
    const Id = req.params.id;
    try {
        const myOrderWithBooking = await modelBooking.find({
            __v: { $gt: 0 },
            customerId: Id,
            __v: { $ne: 5 } // Exclude orders with status 4
        }).populate('customerId');
        res.json(myOrderWithBooking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});

// Booking with Customer.............
app.get("/bookingWithCustomer", async (req, res) => {
    try {
        const bookingWithCustomer = await modelBooking.find().populate("customerId");
        const filteredbookingWithCustomer = bookingWithCustomer.filter(
            (bookingWithCustomer) => bookingWithCustomer.customerId
        );
        res.json(filteredbookingWithCustomer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

// booking Based Customer.................
app.get("/customerWithBooking/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const customerWithBooking = await modelBooking.find({ customerId: id })
        if (customerWithBooking.length === 0) {
            return res.status(404).json({ msg: "no booking found" });
        }
        res.json(customerWithBooking).status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});



//Update Booking...................
app.put("/updateBooking/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { bookingDate, bookingTotalAmount, bookingStatus, paymentStatus, customerId } = req.body;
        const updateBooking = await modelBooking.findByIdAndUpdate(
            id,
            { bookingDate, bookingTotalAmount, bookingStatus, paymentStatus, customerId }, { new: true }
        );
        res.json(updateBooking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Delete Booking.................
app.delete("/deleteBooking/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await modelBooking.findByIdAndDelete(id);
        res.json("Booking Removed");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//..............................................................................................................//
//..............................................................................................................//



//Cart Shema....
const collectionCartShema = new Schema({
    cartQuantity: {
        type: Number,
        require: true,
        default: 1,
    },
    bookingId: {
        type: Schema.Types.ObjectId,
        ref: "tblBooking",
        require: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "tblProduct",
        require: true,
    },
    cartStatus: {
        type: String,
        require: true,
    }
})
const modelCart = model("tblCart", collectionCartShema);

//Create Cart...............
app.post("/Cart", async (req, res) => {
    try {
        const { cartQuantity, bookingId, productId, cartStatus } = req.body;
        const existingCart = await modelCart.findOne({ bookingId, productId })

        if (existingCart) {
            res.send({ message: "Already Inserted" })
        } else {

            console.log(existingCart);
            const newCart = new modelCart({
                cartQuantity, bookingId, productId, cartStatus
            });
            await newCart.save();
            res.json({ message: "Added to Cart" });
        }




    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//Get Cart..............
app.get("/getCart", async (req, res) => {
    try {
        const getCart = await modelCart.find();
        res.json(getCart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});

//Get Cart with Booked products..............
app.get("/getBookedProducts/:id", async (req, res) => {
    const Id = req.params.id;
    try {
        const getBookedProducts = await modelCart.find({ bookingId: Id }).populate("productId");
        res.json(getBookedProducts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});


// Booking with cart.............
app.get("/cartWithBooking/:id", async (req, res) => {
    const Id = req.params.id;
    try {
        // const cartWithBooking = await modelCart.find().populate("bookingId").populate("productId")
        // const filteredcartWithBooking = cartWithBooking.filter(
        //     (cartWithBooking) => cartWithBooking.productId
        // );

        const cartWithBooking = await modelCart.find({ __v: 0 }).populate({
            path: 'bookingId',
            match: {
                __v: 0,
                customerId: Id,
            }
        }).populate("productId");



        const filteredcartWithBooking = cartWithBooking.filter(
            (cartWithBooking) => cartWithBooking.bookingId
        );
        res.json(filteredcartWithBooking);


    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

// Buy now Booking to checkout.............
app.get("/buyNowWithBooking/:id", async (req, res) => {
    const Id = req.params.id;
    try {
        // const cartWithBooking = await modelCart.find().populate("bookingId").populate("productId")
        // const filteredcartWithBooking = cartWithBooking.filter(
        //     (cartWithBooking) => cartWithBooking.productId
        // );

        const cartWithBooking = await modelCart.find({ __v: 0 }).populate({
            path: 'bookingId',
            match: {
                __v: 1,
                customerId: Id,
            }
        }).populate("productId");

        const filteredcartWithBooking = cartWithBooking.filter(
            (cartWithBooking) => cartWithBooking.bookingId
        );
        res.json(filteredcartWithBooking);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});



// cart to myorder.............
app.get("/cartWithMyorder/:id", async (req, res) => {
    const Id = req.params.id;
    try {


        const cartWithMyorder = await modelCart.find({ __v: 0 }).populate({
            path: 'bookingId',
            match: {
                __v: { $gt: 0 },
                customerId: Id,
            }
        }).populate("productId");



        const filteredcartWithMyorder = cartWithMyorder.filter(
            (cartWithMyorder) => cartWithMyorder.bookingId
        );
        res.json(filteredcartWithMyorder);


    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

// cart to shop order status.............
app.get("/cartWithOrderStatus/:id", async (req, res) => {
    const Id = req.params.id;
    try {


        const cartWithOrderStatus = await modelCart.find({ __v: 0 }).populate({
            path: 'bookingId',
            match: {
                __v: 1,
            }
        }).populate({
            path: 'productId',
            match: {
                shopId: Id
            }
        });



        const filteredcartWithOrderStatus = cartWithOrderStatus.filter(
            (cartWithOrderStatus) => cartWithOrderStatus.bookingId
        );
        res.json(filteredcartWithOrderStatus);


    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});




// buyNowStatusChange.............
app.post("/buyNowStatusChange/:id", async (req, res) => {
    const Id = req.params.id;
    try {
        // const cartWithBooking = await modelCart.find().populate("bookingId").populate("productId")
        // const filteredcartWithBooking = cartWithBooking.filter(
        //     (cartWithBooking) => cartWithBooking.productId
        // );
        const updatedBooking = await modelBooking.findOneAndUpdate(
            { __v: 0, customerId: Id },
            { __v: 1 },
            { new: true }
        );

        res.json(updatedBooking);



    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

// Change Order status.............
app.post("/chageStatus/:status/:id", async (req, res) => {
    const Id = req.params.id;
    const status = req.params.status;

    console.log(Id)
    console.log(typeof (status))
    try {
        // const cartWithBooking = await modelCart.find().populate("bookingId").populate("productId")
        // const filteredcartWithBooking = cartWithBooking.filter(
        //     (cartWithBooking) => cartWithBooking.productId
        // );
        const updatedBooking = await modelBooking.findOneAndUpdate(
            { _id: Id },
            { __v: status },
            { new: true }
        );

        res.json(updatedBooking);
        console.log(updatedBooking);


    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});


// Getting Order status.............
app.get("/getOrderStatus/:id", async (req, res) => {
    const Id = req.params.id;
    try {
        const getOrderStatus = await modelBooking.findOne({ _id: Id });
        res.json(getOrderStatus);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});

//  Buy now total.............
app.get("/BuyNowTotal/:id", async (req, res) => {
    const Id = req.params.id;
    try {
        // const cartWithBooking = await modelCart.find().populate("bookingId").populate("productId")
        // const filteredcartWithBooking = cartWithBooking.filter(
        //     (cartWithBooking) => cartWithBooking.productId
        // );

        const cartWithBooking = await modelCart.find({ __v: 0 }).populate({
            path: 'bookingId',
            match: {
                __v: 1,
                customerId: Id,
            }
        }).populate("productId");



        const filteredcartWithBooking = cartWithBooking.filter(
            (cartWithBooking) => cartWithBooking.bookingId
        );

        console.log(filteredcartWithBooking);
        let totalPrice = 0
        const Amount = filteredcartWithBooking.map((data) => {
            totalPrice += parseInt(data.cartQuantity) * parseInt(data.productId.productRate)
            console.log(totalPrice);

        })
        console.log(totalPrice);


        res.json(totalPrice);


    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//  cart total.............
app.get("/CartTotal/:id", async (req, res) => {
    const Id = req.params.id;
    try {
        // const cartWithBooking = await modelCart.find().populate("bookingId").populate("productId")
        // const filteredcartWithBooking = cartWithBooking.filter(
        //     (cartWithBooking) => cartWithBooking.productId
        // );

        const cartWithBooking = await modelCart.find({ __v: 0 }).populate({
            path: 'bookingId',
            match: {
                __v: 0,
                customerId: Id,
            }
        }).populate("productId");



        const filteredcartWithBooking = cartWithBooking.filter(
            (cartWithBooking) => cartWithBooking.bookingId
        );

        console.log(filteredcartWithBooking);
        let totalPrice = 0
        const Amount = filteredcartWithBooking.map((data) => {
            totalPrice += parseInt(data.cartQuantity) * parseInt(data.productId.productRate)
            console.log(totalPrice);

        })
        console.log(totalPrice);


        res.json(totalPrice);


    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

// cart Based booking.................
app.get("/bookingWithCart/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const bookingWithCart = await modelCart.find({ bookingId: id }).populate("bookingId").populate("productId")
        if (bookingWithCart.length === 0) {
            return res.status(404).json({ msg: "Empty Cart" });
        }
        res.json(bookingWithCart).status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Update Cart...................
app.put("/updateIncrementCart/:id", async (req, res) => {
    const id = req.params.id;
    try {
        let cart = await modelCart.findById({ _id: id })
        cart.cartQuantity = cart.cartQuantity + 1

        const updateCart = await modelCart.findByIdAndUpdate(
            id,
            cart, { new: true }
        ).populate("productId");

        res.json(updateCart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

app.put("/updateDecrementCart/:id", async (req, res) => {
    const id = req.params.id;
    try {


        let cart = await modelCart.findById({ _id: id })
        if (cart.cartQuantity > 1) {

            cart.cartQuantity = cart.cartQuantity - 1
        }



        const updateCart = await modelCart.findByIdAndUpdate(
            id,
            cart, { new: true }
        );
        res.json(updateCart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Delete Cart.................
app.delete("/deleteCart/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const dltDta = await modelCart.findByIdAndDelete(id).populate("productId");
        res.json(dltDta);
        console.log("deletd dataaaaa");
        console.log(dltDta);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//..............................................................................................................//
//..............................................................................................................//



//Review Shema....
const collectionReviewShema = new Schema({
    reviewRating: {
        type: Number,
        require: true,
    },
    reviewContent: {
        type: String,
        require: true,
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "tblCustomer",
        require: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "tblProduct",
        require: true,
    },
    reviewDateTime: {
        type: String,
        require: true,
    },
    customerName: {
        type: String,
        require: true,
    },
    reviewTitle: {
        type: String,
        require: true,
    },
})
const modelReview = model("tblReview", collectionReviewShema);

//Create Review...............
app.post("/Review", async (req, res) => {
    try {
        const { reviewRating, reviewContent, customerId, productId, reviewDateTime, customerName, reviewTitle } = req.body;
        const newReview = new modelReview({
            reviewRating, reviewContent, customerId, productId, reviewDateTime, customerName, reviewTitle
        });
        await newReview.save();
        res.json(newReview);


    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//Get review..............
app.get("/getReview", async (req, res) => {
    try {
        const getReview = await modelReview.find();
        res.json(getReview);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});


//Get getRatingAverage..............
app.get("/getRatingAverage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const getReview = await modelReview.find({ productId: id });

        let sumOfRatings = 0;
        for (let i = 0; i < getReview.length; i++) {
            sumOfRatings += getReview[i].reviewRating;
        }

        const totalReviewsCount = await modelReview.countDocuments({ productId: id });

        res.status(200).json({ reviews: getReview, sumOfRatings, totalReviewsCount });


    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});

//Get getRatingAverage..............
app.get("/getReview/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const getReview = await modelReview.find({ productId: id }).populate({
            path: "customerId",
            populate: {
                path: "placeId",
                model: "tblPlaces",
                populate: {
                    path: "districtId", // Assuming "district" is a field in the tblPlaces model
                    model: "tblDistrict" // Replace "DistrictModel" with the actual model name for district
                }
            }
        });
        res.json(getReview);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});

// review with customer.............
app.get("/reviewWithCustomer", async (req, res) => {
    try {
        const reviewWithCustomer = await modelReview.find().populate("customerId").populate("shopId")
        const filteredreviewWithCustomer = reviewWithCustomer.filter(
            (reviewWithCustomer) => reviewWithCustomer.customerId
        );
        res.json(filteredreviewWithCustomer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

// customer based Review.................
app.get("/customerWithReview/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const customerWithReview = await modelReview.find({ customerId: id }).populate("customerId").populate("shopId")
        if (customerWithReview.length === 0) {
            return res.status(404).json({ msg: "no Review Found" });
        }
        res.json(customerWithReview).status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Update review...................
app.put("/updateReview/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { reviewRating, reviewContent, customerId, productId, reviewDateTime, customerName, reviewTitle } = req.body;
        const updateReview = await modelReview.findByIdAndUpdate(
            id,
            { reviewRating, reviewContent, customerId, productId, reviewDateTime, customerName, reviewTitle }, { new: true }
        );
        res.json(updateReview);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Delete Review.................
app.delete("/deleteReview/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await modelReview.findByIdAndDelete(id);
        res.json("cart Removed");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//..............................................................................................................//
//..............................................................................................................//



//Complaint Shemaa.....
const collectionComplaintShema = new Schema({
    complaintTitle: {
        type: String,
        require: true,
    },
    complaintContent: {
        type: String,
        require: true,
    },
    complaintDate: {
        type: String,
        require: true,
    },
    complaintStatus: {
        type: String,
        require: true,
    },
    complaintReplay: {
        type: String,
        require: true,
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "tblCustomer",
        require: true,
    }
})
const modelComplaint = model("tblComplaint", collectionComplaintShema);

//Create Complaint...............
app.post("/Complaint", async (req, res) => {
    try {
        const { complaintTitle, complaintContent, complaintDate, complaintStatus, complaintReplay, customerId } = req.body;
        const newComplaint = new modelComplaint({
            complaintTitle, complaintContent, complaintDate, complaintStatus, complaintReplay, customerId
        });
        await newComplaint.save();
        res.json(newComplaint);


    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//Get Complaint..............
app.get("/getComplaint", async (req, res) => {
    try {
        const getComplaint = await modelComplaint.find();
        res.json(getComplaint);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

// Complaint with customer.............
app.get("/complaintWithCustomer", async (req, res) => {
    try {
        const complaintWithCustomer = await modelComplaint.find().populate("customerId");
        const filteredcomplaintWithCustomer = complaintWithCustomer.filter(
            (complaintWithCustomer) => complaintWithCustomer.customerId
        );
        res.json(filteredcomplaintWithCustomer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

// customer based Review.................
app.get("/customerWithComplaint/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const customerWithComplaint = await modelComplaint.find({ customerId: id }).populate("customerId");
        if (customerWithComplaint.length === 0) {
            return res.status(404).json({ msg: "no complaint found" });
        }
        res.json(customerWithComplaint).status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});


//Update Complaint...................
app.put("/updateComplaint/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { complaintTitle, complaintContent, complaintDate, complaintStatus, complaintReplay, customerId } = req.body;
        const updateComplaint = await modelComplaint.findByIdAndUpdate(
            id,
            { complaintTitle, complaintContent, complaintDate, complaintStatus, complaintReplay, customerId }, { new: true }
        );
        res.json(updateComplaint);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Delete Complaint.................
app.delete("/deleteComplaint/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await modelComplaint.findByIdAndDelete(id);
        res.json("Complaint Removed");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//..............................................................................................................//
//..............................................................................................................//



//FeedBack Shema....
const collectionFeedbackShema = new Schema({
    feedbackContent: {
        type: String,
        require: true,
    },
    feedbackDate: {
        type: String,
        require: true,
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "tblCustomer",
        require: true,
    }
})
const modelFeedback = model("tblFeedback", collectionFeedbackShema);

//Create Feedback...............
app.post("/Feedback", async (req, res) => {
    try {
        const { feedbackContent, feedbackDate, customerId } = req.body;
        const newFeedback = new modelFeedback({
            feedbackContent, feedbackDate, customerId
        });
        await newFeedback.save();
        res.json(newFeedback);


    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//Get FeedBack..............
app.get("/getFeedback", async (req, res) => {
    try {
        const getFeedback = await modelFeedback.find();
        res.json(getFeedback);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});

// feedback with customer.............
app.get("/feedbackWithCustomer", async (req, res) => {
    try {
        const feedbackWithCustomer = await modelFeedback.find().populate("customerId")
        const filteredfeedbackWithCustomer = feedbackWithCustomer.filter(
            (feedbackWithCustomer) => feedbackWithCustomer.customerId
        );
        res.json(filteredfeedbackWithCustomer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

// customer based feedback.................
app.get("/customerWithFeedback/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const customerWithFeedback = await modelFeedback.find({ customerId: id }).populate("customerId")
        if (customerWithFeedback.length === 0) {
            return res.status(404).json({ msg: "no feedback found" });
        }
        res.json(customerWithFeedback).status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});


//Update Feedback...................
app.put("/updateFeedback/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { feedbackContent, feedbackDate, customerId } = req.body;
        const updateFeedback = await modelFeedback.findByIdAndUpdate(
            id,
            { feedbackContent, feedbackDate, customerId }, { new: true }
        );
        res.json(updateFeedback);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Delete Feedback.................
app.delete("/deleteFeedback/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await modelFeedback.findByIdAndDelete(id);
        res.json("Feedback Removed");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//..............................................................................................................//
//..............................................................................................................//

//wishlist Shema....
const collectionWishlistShema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "tblCustomer",
        require: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "tblProduct",
        require: true,
    }
})
const modelWishlist = model("tblWishlist", collectionWishlistShema);

//Create wishlist...............
app.post("/Wishlist", async (req, res) => {
    try {
        const { productId, customerId } = req.body;
        const newWishlist = await modelWishlist.findOne({ productId, customerId });
        const existingWishlist = await modelWishlist.findOne({ productId, customerId });
        if (existingWishlist) {
            console.log(existingWishlist._id);
            await modelWishlist.findByIdAndDelete(existingWishlist._id);
            res.send({ message: "Already Inserted" })

        } else {

            console.log(newWishlist);
            let msg = ""
            if (newWishlist) {
                console.log(newWishlist);
                msg = "Remove from Wishlist"
            }

            else {
                const newWishlist = new modelWishlist({
                    productId, customerId
                });
                await newWishlist.save();
                msg = "Added to Wishlist"
            }

            res.json({ message: msg });
        }





    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//Get wishlist..............
app.get("/getWishlist/:id", async (req, res) => {
    const id = req.params.id
    try {

        const getWishlist = await modelWishlist.find({ customerId: id }).populate("productId");
        res.json(getWishlist);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});


//Get wishlist with productId..............
app.get("/getWishlistPrdct/:id", async (req, res) => {
    const id = req.params.id
    try {
        const getWishlist = await modelWishlist.find({ productId: id });
        if (getWishlist.length > 0) {
            res.json(true);
        } else {
            res.json(false);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});



//Delete wishlist.................
app.delete("/deleteWishlist/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await modelWishlist.findByIdAndDelete(id);
        res.json("wishllist product Removed....");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});


//Create Login...............
app.post("/loginCheck", async (req, res) => {

    const { userEmail, userPassword } = req.body;
    console.log(req.body);

    const customer = await modelCustomer.findOne({ customerEmail: userEmail })
    const Shop = await modelShop.findOne({ shopEmail: userEmail })
    const Admin = await modelAdmin.findOne({ adminEmail: userEmail })

    if (customer) {
        console.log(customer.customerPassword);
        if (argon2.verify(customer.customerPassword, userPassword)) {
            res.send({
                message: "Login Successful",
                id: customer._id,
                name: customer.customerName,
                login: "customer"
            })
        }
    }


    if (Shop) {
        if (Shop.shopPassword===userPassword) {
            res.send({
                message: "Login Successful",
                id: Shop._id,
                login: "Shop"
            })
        }
    }


    if (Admin) {
            if (Admin.adminPassword === userPassword) {
                res.send({
                    message: "Login Successful",
                    id: Admin._id,
                    login: "admin"
                })
            }
        // res.json(newLogin);
        // console.log(newLogin);
    }
});



// function sendEmail(email, "Hello");
// res.send({
//     sectionsubport: "Data Saved",
// });



var transporter = mailer.createTransport({
    service: "gmail",
    auth: {
        user: "bayshop649@gmail.com", //from email Id
        pass: "tpte dnja tbzh hfxe", // App password created from google account
    },
});

function sendEmail(to, content) {
    const mailOptions = {
        from: "bayshop649@gmail.com", //from email Id for recipient can view
        to,
        subject: "OrderCofirmation",
        html: content,

    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sented");
        }
    });
}

// sent otp to Eamil.............................

app.post('/sendOTP', (req, res) => {
    const email = req.body.email;
    const OTP = generateOTP();
    const OTPContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Email</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #333;">Your One-Time Password ${OTP}</h2>
        <p style="color: #555;">Hello,</p>
        <p style="color: #555;">Your OTP is:</p>
        <div style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; text-align: center; font-size: 24px; margin-bottom: 20px;">
          <strong style="color: #333;"> ${OTP}</strong>
        </div>
        <p style="color: #555;">This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
        <p style="color: #555;">Thank you!</p>
      </div>
    </body>
    </html>
    `

    const mailOptions = {
        from: "bayshop649@gmail.com", //from email Id for recipient can view
        to: email,
        subject: "OTP Verification Code",
        html: OTPContent,

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sented");
        }
    });


    res.json({
        Email: email,
        OTP: OTP // Assuming generatedOTP holds the OTP value
    });
});

function generateOTP() {
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}



//delivery checking Shema....
const collectionPincodesSchema = new Schema({
    pincode: {
        type: String,
        required: true,
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "tblCustomer",
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "tblProduct",
    },
    serviceable: {
        type: Boolean,
        default: true,
    }
});

const modelPincodes = model("tblPincodes", collectionPincodesSchema);

app.post('/postPincodes', async (req, res) => {
    try {
        const { pincode, serviceable } = req.body
        const newPincodes = new modelPincodes({
            pincode,
            serviceable,
            
        })
        await newPincodes.save();
        res.json(newPincodes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

// Endpoint to check pincode serviceability
app.post('/checkPincode', async (req, res) => {
    const pincode  = req.body.userPincode;
    console.log(pincode);
    if (!pincode) {
        return res.status(400).json({ error: 'Pincode is required' });
    }
    
    try {
        const result = await modelPincodes.findOne({ pincode: pincode });
        if (result) {
            return res.json({ serviceable: result.serviceable });
        } else {
            return res.json({ serviceable: false });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});