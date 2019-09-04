/* child.js */

// process.on监听传过来的
process.on('message', function(data) {
    console.log(data, 'mmm')
    data.sex = "na"
    process.send(data)
    process.exit()
});