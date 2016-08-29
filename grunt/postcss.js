var buildId = require('./config/build-id');

module.exports = {
    options: {
        map: true,
        processors: [
            require('autoprefixer')({browsers: 'last 2 versions'})
        ]
    },
    dist: {
        src: 'build/atlas.' + buildId + '.css'
    }
};