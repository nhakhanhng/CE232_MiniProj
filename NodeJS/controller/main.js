const environment = require('../models/environment');
exports.addData = async(data) => {
    try
    { 
        // data.temperature = data.temperature + Math.random % 10
        // data.humidity += Math.random % 10
        // console.log(typeof(data.temperature),data.temperature)
      const newEnv = new environment({
          temp : data.temperature,
          hum: data.humidity,
        //   time: data.time,
      })
      await newEnv.save()
      console.log("Add data environment successfully!")
    }
    catch (err) {
        console.log("Create error :" + {message:err.toString()})
    }
}

exports.getDashboard = (req,res,next) => {
    res.render('chart.ejs')
}