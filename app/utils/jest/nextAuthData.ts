const nextAuthData = {
  data: {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {
      name: '강성우',
      email: 'you3667@gmail.com',
      image: 'https://lh3.googleusercontent.com/a/ACg8ocKJP_8_zdi8WHxRNSHDePNI5TN3l-X2UnsWDn_9K-4W=s96-c',
    },
  },
  status: 'authenticated',
};

export default nextAuthData;
