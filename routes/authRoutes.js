const passport = require('passport');

module.exports = app => {
  app.get('/', (req,res)=>{
    res.send("hi there");
  });
  app.get('/auth/google', passport.authenticate('google',{
    scope : ['profile','email']
  }));
  app.get('/auth/google/callback', passport.authenticate('google')
    //,(req,res) => {res.redirect('/');}
  );
  app.get('/api/current_user',(req,res) => {
    res.send(req.user);
    //res.send(res.session);
  });
  app.get('/api/logout',(req,res) => {
    req.logout();
  })

}
