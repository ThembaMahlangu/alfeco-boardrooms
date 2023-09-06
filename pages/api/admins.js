import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';

const MONGODB_URI = 'mongodb+srv://schoolapp:Themba12345678@cluster0.3rt5wsz.mongodb.net/alfeco_boardrooms?retryWrites=true&w=majority';
const DB_NAME = 'alfeco_boardrooms';

const upload = multer();

const JWT_SECRET = 'boardroomsecret2023';

const SALT_ROUNDS = 10;

const connectToDatabase = async () => {
  const client = await MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true });
  return client.db(DB_NAME);
};

export const register = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('admins');

    const { name, phone, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await collection.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const existingPhone = await collection.findOne({ phone });

    if (existingPhone) {
        return res.status(400).json({ message: 'Phone number already exists' });
    }

    if (!name || !phone || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = {
      name,
      phone,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      role: 'admin',
    };
    collection.insertOne(user).then(() => {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '777h' });
    res.status(201).json({ message: 'User registered successfully', token });
    }).catch((error) => {
      res.status(500).json({ message: error.message });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('admins');

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
      console.log({ message: 'All fields are required' });
    }

    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User Does Not Exist' });
      console.log({ message: 'User Does Not Exist' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Password is incorrect' });
      console.log({ message: 'Password is incorrect' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '777h' });

    res.status(200).json({ message: 'Authentication successful', token });
    console.log({ message: 'Authentication successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        const db = await connectToDatabase();
        const collection = db.collection('admins');

        const { newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const user = await collection.findOne({ _id: decoded.userId });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
        const updatedUser = await collection.findOneAndUpdate(
            { _id: decoded.userId },
            { $set: { password: hashedPassword, confirmPassword: hashedPassword } },
            { returnOriginal: false },
        );

        res.status(200).json({ message: 'Password changed successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('admins');

    const token = req.headers.authorization.split(' ')[1];
    let userId;

    if (token) {
      jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: 'Token is invalid' });
        } else {
          userId = decodedToken.userId;
        }
      });
    } else {
      return res.status(403).json({ message: 'Token is missing' });
    }

    const user = await collection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json({ user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (_req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('admins');

    const users = await collection.find().toArray();

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    if (req.query.action === 'register') {
      upload.none()(req, res, () => register(req, res));
    } else if (req.query.action === 'login') {
      upload.none()(req, res, () => login(req, res));
    }
  } else if (req.method === 'GET') {
    if (req.query.action === 'user') {
      upload.none()(req, res, () => getUser(req, res));
    } else if (req.query.action === 'users') {
      upload.none()(req, res, () => getUsers(req, res));
    }
  }
};

export default handler;