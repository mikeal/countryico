var fs = require('fs')
  , _ =
    { object: require('lodash.zipobject')
    , map: require('lodash.map')
    , invert: require('lodash.invert')
    }
  , f = fs.readFileSync('iso.txt').toString()
  ;

var iso = _.object(_.map(f.split('\n'), function (line) { return line.split(';') }))
  , riso = _.invert(iso)
  ;

function country (str, url) {
  if (!url) url = 'https://raw.github.com/mikeal/countryico/master/images/'
  if (url[url.length -1] !== '/') url += '/'
  if (str.indexOf(',')) str = str.slice(str.lastIndexOf(',')+1)
  if (str[0] === ' ') str = str.slice(1)
  str = str.toUpperCase()
  if (iso[str]) return url + iso[str].toLowerCase() + '.png'
  if (riso[str]) return url + str.toLowerCase() + '.png'
  return false
}

module.exports = country

if (process.browser) window.countryiso = country