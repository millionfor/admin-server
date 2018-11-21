
let Util = {}

/**
 * 自增长id
 */
Util.countedId = () => {
  let counter = 1;
  return {type: Number, default: () => counter++};
}


module.exports = Util;