var mongoose = require('mongoose');
var Food_Model = mongoose.model('Food');
  
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

// POST METHOD
module.exports.new_Food = function(req, res){
    if (req.body.name){
        if (req.body.date){
            if (req.body.quantity && req.body.quantity >= 1){
                Food_Model.create(req.body ,function(err, obj) {
                    if (err) {
                      sendJSONresponse(res, 400, err);
                      return;

                    } else {
                      sendJSONresponse(res, 201, obj);
                      return;
                    }
                  });
            }else{
                sendJSONresponse(res, 404, {"message": "Invalid Quantity."});
            }    
        }else{
            sendJSONresponse(res, 404, {"message": "Date required."});
        }    
    }else{
        sendJSONresponse(res, 404, {"message": "Name required."});
    }
};


// GET MOTHOD
module.exports.get_Food = function(req, res) {
    Food_Model.find({}, function (err, food) {
        if (err) return sendJSONresponse(res, 400, err);;
        sendJSONresponse(res, 200, food);
      })
  };

  // GETTING FOOD BY ID
module.exports.getFoodById = function(req, res) {
    if (req.params.id){
        Food_Model.find({'_id': req.params.id}, function (err, food) {
            if (err) {
                return sendJSONresponse(res, 400, err);
            }
            return sendJSONresponse(res, 200, food);
          })
    }else{
        sendJSONresponse(res, 404, {"message": "Not Found."})
    }
    
  };
  


// UPDATING FOOD BY PUT METHOD
module.exports.update_Food = function(req, res) {
    if (req.params.id){
        Food_Model
            .findById(req.params.id)
            .exec(function(err, food){
                if (err){
                    sendJSONresponse(res, 404, err);
                    return;
                }else{
                    if (food){
                        food.name = req.body.name;
                        food.date = req.body.date;
                        food.expiry = req.body.expiry;
                        food.left_overs = req.body.left_overs;
                        food.quantity = req.body.quantity;
                        food.save(function(err, food){
                            if (err){
                                sendJSONresponse(res, 404, err);
                                return;
                            }else{
                                console.log(food);
                                sendJSONresponse(res, 200, food);
                                return;
                            }
                        });         
                    }else{
                        sendJSONresponse(res, 404, {"message": "not able to update the Item."});
                        return;    
                    }
                }
            });
    }
    else {
        sendJSONresponse(res, 404, {"message": "Nothing Found"});
        return;
    }
  };

// DELETING FOOD ITEM
module.exports.delete_Food = function(req, res) {
    if (req.params.id){
        Food_Model
            .findById(req.params.id)
            .exec(function(err, food){
                if (err){
                    sendJSONresponse(res, 404, err);
                }else{
                    if (food){
                        if (food.quantity > 1){
                            food.quantity = food.quantity - 1;
                            food.save(function(err, food){
                                if (err){
                                    sendJSONresponse(res, 404, err);
                                }else{
                                    sendJSONresponse(res, 200, food);
                                }
                            });
                        }else{
                            food.remove({"_id": req.params.id}, function(err, result){
                                if(err){
                                    sendJSONresponse(res, 404, err);
                                    return;
                                }else{
                                    sendJSONresponse(res, 204, null);
                                    return;
                                }
                            });
                        }
                    }else{
                        sendJSONresponse(res, 404, {"message": "Item Not Found"});
                        return;
                    }
                }
            });
    }
    else {
        sendJSONresponse(res, 404, {"message": "Nothing Found"});
        return;
    }
  };

