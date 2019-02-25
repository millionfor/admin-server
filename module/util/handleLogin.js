
let handleLogin = {}

/**
 * 判断登录失效
 */
handleLogin.loseEfficacy = function (req) {
  return new Promise((resolve, reject) => {
    if (req.session.user) {
      resolve({})
    }else{
      reject({
        code:'-1',
        msg:'登录失效',
        data:{}
      })
    }
  })
}

module.exports = handleLogin