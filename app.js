require('dotenv/config');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { router } = require('./apiV2');
const { socketController } = require('./sockets/socket.controller');

const Chat = require('./models/Chat/Chat');
const Usuario = require('./models/Usuarios');
const Message = require('./models/Message/message');
const InformacionUsuarios = require('./models/InformacionUsuarios');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

const { trim_all } = require('request_trimmer');

const { MONGODB, DBNAME } = process.env;

//Docuemntation
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./openapi.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);
app.use(trim_all);

// routes
app.use(router);
console.log(`PORT================${process.env.PORT}`);
mongoose
.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: DBNAME,
    useFindAndModify: false,
})
.then(() => {

        //Sockets
        io.on('connection', socket => {


            socket.on("get-chat", async ({id, isAdmin, patientId}) =>{

                console.log("patientId --> ", patientId);

                let userPatientId;

                if(patientId){
                    userPatientId = await InformacionUsuarios.findOne({
                        _id: patientId
                    });
                }


                const users = [];
        
                //Get User chat
                let chat = await Chat.findOne({
                    users: isAdmin? userPatientId.usuario:id 
                });


                console.log("chat ----> ",chat)
        
        
                //Creamos un chat con el administrador
                if(!chat && !isAdmin){
                    //buscamos al administrador
                    console.log("EL paciente creo el chat")
                    const admin = await Usuario.findOne({ esAdmin: true});
                    users.push(id, admin._id);
                    //enviamos el id del chat.
                } else if(!chat && isAdmin){
                    //Creamos un chat con el usuario seleccionad
                    console.log("EL administrador creo el chat")
                    users.push(id, userPatientId.usuario);
                }
                
                let messages = [];

                if(!chat){
                    chat = new Chat({ users });
                    await chat.save();
                }else{
                    messages = await Message.find({
                        chat: chat._id
                    });
                }

                console.log("messages --> ", messages);
                console.log("join to chat ---> ", chat._id);
        
                socket.join("622c3116e6178335f80afab3");
                socket.emit("getMessages", {
                    chatId: chat._id,
                    messages
                });
        
            });


            socket.on("sendMessage", async(data) => {

                console.log("message recived from server!!");

                const msg = new Message({
                    chat: data.chat,
                    message: data.message,
                    user: data.user,
                    date: new Date()
                });

                await msg.save();

                const messages = await Message.find({
                    chat: data.chat
                });

               socket.to("622c3116e6178335f80afab3").emit("rm", {
                  messages
                });


            });

            socket.on("disconnect", () => {
                console.log("disconnect")
                socket.rooms.size === 0
            });

        });

        console.log(`Succefully connected to database ${DBNAME}`);
        server.listen(process.env.PORT || 4000, () => {
            console.log(`Server running at ${process.env.PORT || 4000}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });