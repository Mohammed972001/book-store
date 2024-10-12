import Book from "../models/book.model.js";
import Order from "../models/order.model.js";
import { User } from "../models/user.model.js";

export const getAnalyticsData = async (authorId) => {
  const authorBooks = await Book.find({ authorId });

  const salesData = await Order.aggregate([
    { $unwind: "$books" },
    {
      $lookup: {
        from: "books",
        localField: "books.book",
        foreignField: "_id",
        as: "bookDetails",
      },
    },
    { $unwind: "$bookDetails" },
    {
      $match: {
        "bookDetails.authorId": authorId,
      },
    },
    {
      $group: {
        _id: "$bookDetails.authorId",
        totalUsers: { $addToSet: "$user" },
        totalSales: { $sum: "$books.quantity" },
        totalRevenue: {
          $sum: {
            $multiply: ["$books.price", "$books.quantity"],
          },
        },
      },
    },
  ]);

  const { totalSales, totalRevenue, totalUsers } = salesData[0] || {
    totalSales: 0,
    totalRevenue: 0,
    totalUsers: 0,
  };

  return {
    users: totalUsers.length||0,
    authorBooks: authorBooks.length||0,
    totalSales,
    totalRevenue,
  };
};

export const getDailySalesData = async (authorId, startDate, endDate) => {
  try {
    const dailySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      { $unwind: "$books" },
      {
        $lookup: {
          from: "books",
          localField: "books.book",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $match: {
          "bookDetails.authorId": authorId,
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            authorId: "$bookDetails.authorId",
          },
          totalUsers: { $addToSet: "$user" },
          totalSales: { $sum: "$books.quantity" },
          totalRevenue: {
            $sum: {
              $multiply: ["$books.price", "$books.quantity"],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const dateArray = getDatesInRange(startDate, endDate);
    return dateArray.map((date) => {
      const foundData = dailySalesData.find((item) => item._id.date === date);
      return {
        date,
        sales: foundData?.totalSales || 0,
        revenue: foundData?.totalRevenue || 0,
      };
    });
  } catch (error) {
    throw error;
  }
};

function getDatesInRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
