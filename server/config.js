const config = {
  port: process.env.PORT || 9000,
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://192.168.99.100:27017/ordini',
  },
}

export default config
