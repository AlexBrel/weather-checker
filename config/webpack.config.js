switch (process.env.NODE_ENV) {
	case 'prod':
	case 'production':
		module.exports = require('./webpack.prod.js')('production');
		break;
	case 'dev':
	case 'development':
	default:
		module.exports = require('./webpack.dev.js')('development');
}
