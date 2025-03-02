const { Router } = require('express');
const router = Router();
const dataController = require('../controllers/dataController');

//routes
router.get('/api/test', (req, res) => {
    const data = {
        "id": "1",
        "name": "API is working"
    }
    res.json(data);
});

router.get('/api/list', dataController.list);

router.get('/api/list/last', dataController.last);

router.get('/api/list/top25', dataController.top25);

router.post('/api/list/date', dataController.Date_show);

router.post('/api/list_add', dataController.add);

router.put('/api/list_update/:id', dataController.update);

router.delete('/api/list_delete/:id', dataController.delete);

router.get('/api/filter_one/:espID', dataController.filter_one)


module.exports = router;