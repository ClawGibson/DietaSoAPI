const PlanDietetico = require('../../models/MenusPorUsuario/PlanDietetico');
const moongose = require('mongoose');
const router = require('express').Router();

const buscarMenuExistente = (plan, dia, categoria) => {
    try {
        const filtrado = plan.filter(
            (menu) => menu.dia === dia && menu.categoria === categoria
        );

        if (filtrado.length > 0) return filtrado[0];

        return {};
    } catch (error) {
        console.log('Ocurrió un error al buscar el menu existente', error);
        return error;
    }
};

const poblarMenu = async (usuario) => {
    try {
    } catch (error) {
        console.log('Ocurrió un error al buscar el menu existente', error);
        return error;
    }
};

router.get('/busquedaPorDia', async (req, res) => {
    try {
        const { usuario, dia, categoria } = req.query;

        const planDietetico = await PlanDietetico.find({
            usuario: moongose.Types.ObjectId(usuario),
        }).populate({
            path: 'plan',
        });

        if (!planDietetico)
            return res
                .status(204)
                .send({ message: 'No se encontraron planes dietéticos' });

        const filtrado = buscarMenuExistente(
            planDietetico[0].plan,
            dia,
            categoria
        );

        res.status(200).send(filtrado);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Ocurrió un error inesperado',
            error: error,
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const menus = await PlanDietetico.find({
            usuario: req.params.id,
        }).populate({
            path: 'plan usuario',
            select: '-contrasena',
            populate: {
                path: 'menu',
            },
        });

        if (!menus)
            return res.status(204).send({
                message: 'No se encontraron menus',
            });

        res.status(200).send(menus);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Ocurrió un error inesperado',
            error: error,
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const menus = await PlanDietetico.find().populate({
            path: 'plan',
            populate: {
                path: 'menu',
            },
        });

        if (!menus)
            return res
                .status(204)
                .send({ message: 'No se encontraron planes dietéticos' });

        res.status(200).send(menus);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Ocurrió un error inesperado',
            error: error,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { usuario, plan } = req.body;

        let menu = new PlanDietetico({
            usuario: usuario,
            plan: plan,
        });

        menu = await menu.save();

        if (!menu)
            return res.status(204).send({
                message: 'No se pudo crear el menu',
            });

        res.status(200).send(menu);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Ocurrió un error inesperado',
            error: error,
        });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { menu, dia, categoria } = req.body;

        // Verificar si en el arreglo plan existe algún registro con el campo dia igual al día del body
        const existe = buscarMenuExistente(menu, dia, categoria);
        console.log(existe);

        if (existe) {
            // Si existe, actualizar el registro
            const menuActualizado = await PlanDietetico.findOneAndUpdate(
                {
                    usuario: req.params.id,
                    plan: {
                        $elemMatch: {
                            dia: dia,
                        },
                    },
                },
                {
                    $set: {
                        'plan.$[elemento].menu': menu,
                    },
                },
                {
                    arrayFilters: [
                        {
                            'elemento.dia': dia,
                        },
                    ],
                    new: true,
                }
            );

            console.log('->', menuActualizado);
        } else {
            // Si no existe, pushear el registro al arreglo.
            const menuNuevo = new PlanDietetico({
                usuario: req.params.id,
                $push: {
                    plan: menu,
                },
            });

            console.log('menu nuevo', menuNuevo);

            //menuNuevo = await menuNuevo.save();
        }

        const planActualizado = await PlanDietetico.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    plan: menu,
                },
            }
        );

        console.log('plan actualizado', planActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Ocurrió un error inesperado',
            error: error,
        });
    }
});

module.exports = router;
