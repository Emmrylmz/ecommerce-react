import User  from '../models/models.js'
import jwt  from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt'
import {} from 'dotenv/config'




export const signup = async  (req, res) => { 
    // First Validate The Request
   

  try{
    let user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        await user.save();
        res.send(user);
       
    }}
    catch(error) {
      res.status(500).json({ error: 'could not create the user 500'});
    }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token =  jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY,  {
      expiresIn: '1h',
     
  
    });
    user.token= token

    res
    .cookie("access_token", token, {
      httpOnly:false,
      
    })
    .status(200)
    .json({ user: {userid: user._id,username: user.name} });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const logout = async (req, res) => {
  
  // Replace "ACCESS_TOKEN_COOKIE_NAME" with your actual cookie name
  res.clearCookie("access_token",{path:"/"});

  // Implement token verification and session invalidation logic here
  // ...

  return res.status(200).json({ message: 'User has been logged out.' });
};
  



