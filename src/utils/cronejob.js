const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequestModel = require("../models/connectionRequest");

cron.schedule("* * * * *", async () => {
  try {
    console.log("cron job running");
    const yesterday = subDays(new Date(), 1);

    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequestsYesterday = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [...new Set(pendingRequestsYesterday.map((request) => request.toUserId.emailId))];

    for (const email of listOfEmails) {
     try {
      const user = await UserModel.findOne({ emailId: email });
      if (user) {
        const subject = "Connection Request";
        const text = `You have a new connection request from ${pendingRequestsYesterday.fromUserId.firstName} ${pendingRequestsYesterday.fromUserId.lastName}.`;
        await sendEmail(email, subject, text);
      }
     } catch (error) {
      console.log(error);
     }
    }



  } catch (err) {
    console.log(err);
  }
});
