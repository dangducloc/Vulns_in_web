require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const router = require('./router/index');
const frontend = require('./router/frontend');
const logger = require('./utils/logger'); // Import Winston logger
const app = express();
const port = process.env.PORT;

morgan.token('body', (req) => JSON.stringify(req.body));


app.use(morgan(':remote-addr :method :url :status :response-time ms - :res[content-length] - Agent: :user-agent - Body: :body', {
    skip: (req) => req.method === 'GET' && req.url === '/healthz',  
    stream: {
        write: (message) => {
            logger.info(message.trim());
        }
    }
}));
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    next();
});

app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "BACKEND ",
            version: "1.0.0",
            description: "API documentation for My Project",
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ["./router/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Sample route
app.get("/", (req, res) => {
    res.json({
        "demo": {
            "success": true,
            "msg": "Welcome to My Project!!!",
            "noti": "This is made by LINH_locdd_22NS033"
        }
    });
});

// API routes
app.use("/api", router);

// Frontend
app.use("/", frontend);

// Start server
app.listen(port, "0.0.0.0", () => {
    logger.info(`Server running at http://localhost:${port}`);
});

// Example of manual logging with Winston
app.use((err, req, res, next) => {
    logger.error(`Error: ${err.message}`);
    res.status(500).send('Something went wrong!');
});
