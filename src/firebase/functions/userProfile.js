function userProfile(data) {
    // console.log('DATA::::::', data)
    return {
      id: data.id,
      email: data.email,
      user: data.user
    };
  }
    
  module.exports = userProfile;