import colors from "colors";
import dotenv from "dotenv";
dotenv.config()
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./model/userModel.js";
import Product from "./model/productModel.js";
import Order from "./model/orderModel.js";
import connectDB from "./config/db.js";


connectDB()
const importData = async() =>{
    try{
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return {...product, user: adminUser}
        });
        await Product.insertMany(sampleProducts)
        console.log("Data Imported!".green.inverse);
        process.exit();

    }catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1); // Exit with failure

    }
}

const destroyData = async()=>{
    try{
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        console.log("Data Destroyed!".red.inverse);
        process.exit();
    }catch(error){
        console.log(`${error}`.red.inverse);
        process.exit(1); // Exit with failure
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}