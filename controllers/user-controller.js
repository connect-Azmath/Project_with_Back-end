const { userModal, bookModal } = require("../modals");



exports.getAllUsers = async (req, res) => {
  
  const users = await userModal.find();

  if(users.length === 0) {
    return res.status(404).json({
        message: "No User information",
        success: false, 
    });
  }
  return res.status(200).json({
        // message: "Get User information",
        success: true,
        data: users 
    });
}

exports.getSingleUserById = async (req, res) => {

    const {id} = req.params;
    const user = await userModal.findById(id);
    // const user = await userModal.find({_id: id});
    // const user = await userModal.findById({_id: id});

    if(!user) {
      return  res.status(404).json({
            message: "No matching User Found",
            success: false, 
        });
      }
      return  res.status(200).json({
            success: true,
            data: user
        });
}

exports.deleteUser = async (req, res) => {
    const {id} = req.params;
    const user = userModal.deleteOne({
        _id: id
    })

    if(!user) {
      return  res.status(404).json({
            message: "No matching User Found",
            success: false, 
        });
      }
    //   const users = userModal.find();
      return  res.status(200).json({
            message: "User information removed",
            success: true,
            // data: users 
        });
}

exports.updateUserById = async (req, res)=>{
  const {id} = req.params;
  const {data} = req.body;

  const updatedUserData = await UserModel.findOneAndUpdate({
      _id: id
  }, 
  {
      $set: {
          ...data,
      }
  },
  {
      new: true
  })

  if(!updatedUserData)
  return res.status(404).json({success: false, message: "User Does Not Exist"});



  
  return res.status(200).json({
      success: true,
      data: updatedUserData
  })
}


// exports.addNewBook = async (req, res)=>{
//     const {data} = req.body;

exports.createNewUser = async  (req, res)=>{
  const { name, surname, email, subscriptionType, subscriptionDate} = req.body;

  const newUser = await userModel.create({
      name,
      surname,
      email,
      subscriptionDate,
      subscriptionType
  })

  return res.status(201).json({
      success: true,
      data: newUser
  })
}


exports.getSubscriptionDetailsById = async (req, res) => {
  const {id} = req.params;
  const user = await userModal.findById(id);

  if(!user) {
    return  res.status(404).json({
          message: "No matching User Found",
          success: false, 
      });
    }

    const getDateInDays = (data = "") => {
      let date;
      if(data === "") {
        date = new Date();
      }else{
        date = new Date(data);
      }
      let days = Math.floor(data / (1000 * 60 * 60 * 24));
        return days;
    };


    const subscriptionType = (date) => {
      if(user.subscriptionType === "Basic"){
          date = date + 90;
      }else if(user.subscriptionType === "Standard"){
          date = date + 180;
      }else if(user.subscriptionType === "Premium"){
          date = date + 365;
      }
      return date;
  };

  // Subscription expiration calcus
  // Jan 1, 1970, UTC // milliseconds
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  const data = {
      ...user,
      subscriptionExpired: subscriptionExpiration < currentDate,
      daysLeftForExpiration: subscriptionExpiration <= currentDate ? 0 : subscriptionDate - currentDate,
      fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0, 
  }


    return res.status(200).json({
          message: "User information removed",
          success: true,
          data: data 
      });
}