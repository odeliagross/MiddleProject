const allowOrigins=[
    'http://localhost:3000',
    'http://localhost:5500'
]

const corsOptions={
    origin:(origin,callback)=>{
        if(allowOrigins.indexOf(origin)!==-1||!origin)
        {
            callback(null,true)
        }
        else
        {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials:true,
    optionsSuccessStatus:200
}

module.exports=corsOptions