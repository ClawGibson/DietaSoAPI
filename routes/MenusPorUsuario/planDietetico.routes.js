const PlanDietetico = require('../../models/MenusPorUsuario/PlanDietetico');
const moongose = require('mongoose');
const router = require('express').Router();

const buscarMenuExistente = (plan, dia, categoria) => {
    try {
        const filtered = plan.filter(
            (menu) => menu.dia === dia && menu.categoria === categoria
        );

        if (filtered.length > 0) return filtered[0];

        return {};
    } catch (error) {
        console.log('Ocurrió un error al buscar el menu existente', error);
        return error;
    }
};

const poblarMenu = async (usuario, menu) => {
    try {
        const result = await PlanDietetico.find({
            usuario: moongose.Types.ObjectId(usuario),
        }).populate({
            path: 'plan',
        });

        return result[0];
    } catch (error) {
        console.log('Ocurrió un error al poblar el menú', error);
        return null;
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
        console.log('Poblado: ', planDietetico);
        if (!planDietetico)
            return res
                .status(204)
                .send({ message: 'No se encontraron planes dietéticos' });

        const filtered = buscarMenuExistente(
            planDietetico[0].plan,
            dia,
            categoria
        );

        res.status(200).send(filtered);
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

        const populated = await poblarMenu(req.params.id);

        // Filter in populated array the menu that matches the dia and categoria
        const filtered = buscarMenuExistente(populated.plan, dia, categoria);

        if (filtered.menu) {
            // Update the menu
            const updated = await PlanDietetico.findOneAndUpdate(
                { usuario: req.params.id },
                {
                    plan: [
                        ...populated.plan.filter(
                            (menu) => menu.id !== filtered.id
                        ),
                        {
                            ...filtered,
                            menu: menu,
                        },
                    ],
                },
                { new: true }
            );

            console.log('updated: ', updated);
            if (!updated)
                return res.status(204).send({
                    message: 'No se pudo actualizar el menu',
                });
            res.status(200).send(updated);
        } else {
            // Create the menu
            console.log('Create the menu');
            console.log('Populated: ', populated);
            let newMenu = new PlanDietetico({
                usuario: req.params.id,
                plan: [...populated.plan, moongose.Types.ObjectId(menu)],
            });

            newMenu = await newMenu.save();
            console.log('newMenu: ', newMenu);
            if (!newMenu)
                return res.status(204).send({
                    message: 'No se pudo crear el menu',
                });

            res.status(200).send(newMenu);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Ocurrió un error inesperado',
            error: error,
        });
    }
});

module.exports = router;
