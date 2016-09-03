module.exports = {

  ok : function(res, content) {
    res.status(200).type('json').json(content);
  },

  notModified: function(res) {
    res.status(304).send();
  },
  
  error : function(res, reason) {
    console.log(reason);
    res.status(500).type('json').send({"message": "Problem with the server"});
  }
}