import jwt from 'jsonwebtoken';

const createToken = (userId,res) => {
  const token = jwt.sign({userId},process.env.JWT_SACRET,{
    expiresIn:'5d',
  });
  res.cookie('jwt',token,{
    httpOnly:true,
    secure:true,
    samesite:'strict',
  });
};


export default createToken;