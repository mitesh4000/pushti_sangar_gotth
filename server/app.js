const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });

const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoute = require("./routes/userRoute");
const errorHandler = require("./middlewares/errorMiddleware");
const roleRoutes = require("./routes/roleRoute");
const productRoutes = require("./routes/ProductRoutes");
const productCatRoutes = require("./routes/productCatRoute");
const productSubCatRoutes = require("./routes/ProductSubCatRoutes");
const productSubSubCatRoutes = require("./routes/ProductSubSubCatRoutes");
const customerRoutes = require("./routes/customerRoute");
const orderRoutes = require("./routes/OrderRoutes");
const contentRoutes = require("./routes/contentRoutes");
const galleryRoutes = require("./routes/GalleryCatMasterRoutes");
const galleryDetailsRoutes = require("./routes/GalleryMasterRoutes");
const StocksRoutes = require("./routes/StockRoutes");
const CouponRoutes = require("./routes/couponRoutes");
const MaterialRoutes = require("./routes/MaterialRoutes");
const SeasonRoutes = require("./routes/SeasonRoutes");
const Gst = require("./routes/gstRoutes");
const DailyRatesRoutes = require("./routes/PricetypeRoutes");
const BannerRoutes = require("./routes/BannerRoutes");
const BlogRoutes = require("./routes/blogRouts");
const DashboardRoutes = require("./routes/dashboardRouts");
const ColorRoutes = require("./routes/ColorRoutes");
const SizeRoutes = require("./routes/SizeRoutes");
const BlogCatRoutes = require("./routes/BlogCategoryRoutes");
const SubscribeRoutes = require("./routes/SubscribeRoutes");
const contactRoutes = require("./routes/ContactRoutes");
const paymentGatewayRoutes = require("./routes/PaymentGateway");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

// ---------------------------------- custom morgan format ----------------------------------------
morgan.token("color-status", (req, res) => {
  const status = res.statusCode;
  let color;
  if (status >= 500) {
    color = "\x1b[31m";
  } else if (status >= 400) {
    color = "\x1b[33m";
  } else if (status >= 300) {
    color = "\x1b[36m";
  } else {
    color = "\x1b[32m";
  }
  return color + status + "\x1b[0m";
});

const customFormat = ":method :url :color-status :response-time ms";
app.use(morgan(customFormat));

const configuredOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors(
    configuredOrigins.length
      ? {
          origin(origin, callback) {
            if (!origin || configuredOrigins.includes(origin)) {
              return callback(null, true);
            }
            return callback(new Error(`Origin ${origin} is not allowed by CORS`));
          },
          credentials: true,
        }
      : { credentials: true }
  )
);

const uploadsDir = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsDir));
app.use("/gallery-images", express.static(path.join(uploadsDir, "Gallery")));
app.use("/products", express.static(path.join(uploadsDir, "Products")));
app.use("/cagtegory", express.static(path.join(uploadsDir, "Category")));
app.use("/banner", express.static(path.join(uploadsDir, "Banner")));
app.use("/blog-images", express.static(path.join(uploadsDir, "Blog")));
app.use("/color", express.static(path.join(uploadsDir, "Color")));

// Routes Middleware
app.use("/api", userRoute);
app.use("/api", roleRoutes);
app.use("/category", productCatRoutes);
app.use("/subcategory", productSubCatRoutes);
app.use("/subsubcategory", productSubSubCatRoutes);
app.use("/product", productRoutes);
app.use("/customer", customerRoutes);
app.use("/content", contentRoutes);
app.use("/gallery", galleryRoutes);
app.use("/gallerydetails", galleryDetailsRoutes);
app.use("/orders", orderRoutes);
app.use("/stocks", StocksRoutes);
app.use("/coupons", CouponRoutes);
app.use("/gst", Gst);
app.use("/dailyrates", DailyRatesRoutes);
app.use("/material", MaterialRoutes);
app.use("/season", SeasonRoutes);
app.use("/banner", BannerRoutes);
app.use("/blog", BlogRoutes);
app.use("/dashboard", DashboardRoutes);
app.use("/color", ColorRoutes);
app.use("/size", SizeRoutes);
app.use("/blogcategory", BlogCatRoutes);
app.use("/subscribe", SubscribeRoutes);
app.use("/contact", contactRoutes);
app.use("/api", paymentGatewayRoutes);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use(errorHandler);

module.exports = app;
