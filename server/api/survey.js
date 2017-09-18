var express = require('express');
var router = express.Router();
var axios = require('axios');
require('express-jsend');

//
// GET all
//
router.get('/:user', function (req, res) {

    try {

        var user = req.param('user');

        if (!user) {
            return res.jerror('error', "User indentifier required");
        }

        axios.post('https://www.tapresearch.com/supply_api/surveys/offer', {
            api_token: '9a7fb35fb5e0daa7dadfaccd41bb7ad1',
            device_identifier: '',
            user_identifier: user
          })
            .then(response => {
                res.jsend(response.data);
            })
            .catch(error => {
                res.jerror('error', error);
            });

    } catch (error) {
        res.jerror('error', error);
    }

});

module.exports = router;
