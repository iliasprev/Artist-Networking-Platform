// Get the functions in the db.js file to use
const db = require('../services/db');
const bcrypt = require("bcryptjs");


class User {

    //name of the User
    name;
    // Id of the user
    id;

    // Email of the user
    email;

    constructor(email) {
        console.log("constructor",email)
        this.email = email;
        console.log(this.email)
    }

async edit(){
    console.log("Inside_Edit_Info",this.id);
}

    
    // Checks to see if the submitted email address exists in the Users table
async getIdFromEmail() {
    var sql = "SELECT * FROM Users WHERE users.Email = ?";
    const result = await db.query(sql, [this.email]);
    console.log("RESULTS FROM getIdFromEmail",result);
    return result
    // Error checks
    // if (JSON.stringify(result) != '[]') {
    //     this.id = result[0].id;
    //     return this.id;
    // }
    // else {
    //     return false;
    // }
}


    //     web-1         |   Address: 'dsjafks',
    //     web-1         |   City: 'sdjafas',
    //     web-1         |   Zipcode: '123123',
    //     web-1         |   CardName: 'saidsa',
    //     web-1         |   Cardnum: '1111222233334444',
    //     web-1         |   ExpDate: '2/24',
    //     web-1         |   CVV: '223'
    //     web-1         | }
    //     web-1         | constructor 123123
    //     web-1         | 123123
    //     web-1         | MyDetails object {
    //     web-1         |   username: 'alex123',
    //     web-1         |   Name: 'alex123',
    //     web-1         |   password: 'alex123',
    //     web-1         |   Zcode: '123123',
    //     web-1         |   CardName: undefined,
    //     web-1         |   CardNum: 'sa'
    //     web-1         | }

async addUser(para) {
    const pass = await bcrypt.hash(para.password, 10);
    console.log("Password IN AddUser :",pass);
    var minm = 10000000; 
    var maxm = 99999999; 
    var id = Math.floor(Math.random() * (maxm - minm + 1)) + minm; 
    console.log("ID in idcreation",id,para);

    var sql = "INSERT INTO users (ID ,Fullname, Email, Password,zip_code,Card_name,two_digits) VALUES (? , ? , ?, ? , ? , ?, ?)";
    const result = await db.query(sql, [id, para.username, para.Name, para.password, para.Zcode,para.CardName,para.CardNum]);
    console.log("Result from addUser",result);
    // console.log("\nFrom add USer",result.insertId);
    // this.id = id;
    return true;
}

async addProfile(para){
    var minm = 10000000; 
    var maxm = 99999999; 
    var id = Math.floor(Math.random() * (maxm - minm + 1)) + minm; 

    var sql = "INSERT INTO user_profiles (id ,fullname, email,soundcloud_mix,instagram) VALUES (? , ? , ?, ? , ?)";
    const result = await db.query(sql, [id, para.fullname, para.email, para.soundcloud_mix, para.instagram]);
    console.log("Result from addUser",result);
    return true;
}
// new ilias code payment here//
// INSIDE Consent {
//     web-1         |   'full-name': 'Chris Steward',
//     web-1         |   role: 'House Dj',
//     web-1         |   email: 'whatever@gmail.com',
//     web-1         |   phone: '07411192543',
//     web-1         |   consent: 'on'
//     web-1         | }
async Bu_consent(bu_info){
    var minm = 10000000; 
    var maxm = 99999999; 
    var id = Math.floor(Math.random() * (maxm - minm + 1)) + minm; 
    var sql = "INSERT INTO BU_consent (fullName ,role, email,phone,consent,bu_id) VALUES (? , ? , ?, ? , ?,?)";
    const result = await db.query(sql, [bu_info.fullName, bu_info.role ,bu_info.email, bu_info.phone, bu_info.consent,id]);
    console.log("Result from addUser",result);
    return true;
}

//ends ilias code here payment//


async getUserInfo(){
    var sql = "SELECT * FROM Users WHERE users.id = ?";
    const userInfoResult = await db.query(sql, [this.id]);
    console.log("RESULTS FROM getIdFromEmail",userInfoResult);
    if (JSON.stringify(userInfoResult) != '[]') {
        this.name = userInfoResult[0].name;
        console.log("NameIn",this.name);
        return this.name;
    }
    else {
        return false;
    }
}

async setUserPassword(password) {
    const pw = await bcrypt.hash(password, 10);
    console.log("Password in setUserPassword :",pw);
    var sql = "UPDATE Users SET password = ? WHERE Users.id = ?"
    const result = await db.query(sql, [pw, this.id]);
    console.log("Result from setUserPassword",result)
    return true;
}



async EditInfo(para,id){
    const pass = await bcrypt.hash(para.password, 10);
    sql = 'Update users Set name = ?, surname=?, phone_number=?, address=?, mail=?, password=? Where id = ?';
    let result = await db.query(sql,[para.firstName, para.lastName, para.phNum, para.address,para.username, pass,id]);
    console.log("result",result);
    // .then(results => {
    //     // console.log(results);
    //     //     results.forEach(festival => {
    //         console.log("EditUserInfo", results);
        //   });
        // res.send("Information Updated successfully");
    // });

}

async authenticate(password) {
    // Get the stored, hashed password for the user
    var sql = "SELECT password FROM users WHERE id = ?";
    const result = await db.query(sql, [this.id]);
    console.log("Result from authenticate",result);
    const match = await bcrypt.compare(password, result[0].password);
    if (match == true) {
        return true;
    }
    else {
        return false;
    }
}


}

module.exports  = {
    User
}