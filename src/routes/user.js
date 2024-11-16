const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = (require = require("../models/user"));
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// get all the pending connection request for the loggedIn User
userRouter.get("/user/connection/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    // }).populate("fromUserId", ["firstName","lastName"]);

    res.json({ message: "Data fetched successfully", data: connectionRequest });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    // const data = connectionRequest.map((row)=>row.fromUserId)

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data: data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// userRouter.get("/feed", userAuth, async (req, res) => {
//   try {

//     const loggedInUser = req.user;

//     const connectionRequest = await ConnectionRequest.find({
//       $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
//     }).select("fromUserId toUserId");

//     const hideUsersFromFeed = new Set();
//     connectionRequest.forEach((req) => {
//       hideUsersFromFeed.add(req.fromUserId.toString());
//       hideUsersFromFeed.add(req.toUserId.toString());
//     });

//     console.log(hideUsersFromFeed);

//     const users = await User.find({
//       $and: [  // $and  => ensuring both conditions true
//         { _id: { $nin: Array.from(hideUsersFromFeed) } }, // $nin => not in this array
//         { id: { $ne: loggedInUser._id } }, // $ne => not equals too
//       ],
//     }).select(USER_SAFE_DATA)

//     res.send(users);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    limit = limit > 50 ? 50 :limit
    const skip = (page-1)*limit

    // Find connection requests where the logged-in user is involved
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    // Collect user IDs to hide from the feed
    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
    
    // Add the logged-in user's ID to the set to exclude them from the results
    hideUsersFromFeed.add(loggedInUser._id.toString());

    const users = await User.find({
      _id: { $nin: Array.from(hideUsersFromFeed) }, // Exclude IDs in hideUsersFromFeed
    }).select(USER_SAFE_DATA)
    .skip(skip)
    .limit(limit)

    res.send(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = userRouter;
