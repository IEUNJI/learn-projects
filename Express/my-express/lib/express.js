const Application = require('./application');
const Router = require('./router');

const createApplication = () => new Application();

createApplication.Router = Router;

module.exports = createApplication
