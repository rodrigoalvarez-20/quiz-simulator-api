import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT_ENV = process.env.PORT || 30000;

app.listen(PORT_ENV, () => {
  console.log(`Server on PORT: ${PORT_ENV}`);
});
