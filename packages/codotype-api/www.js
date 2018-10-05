
// TODO - add .env & .env.example files, dotenv librargsy
const port = process.env.PORT || 3000

// Starts Express app
// TODO - can we run this app as a serverless function?
// TODO - add a postman collection & environment to this repo
// TODO - create GitHub issues for these TODOs
// TODO - add a controller and some more structure to this app
app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})
