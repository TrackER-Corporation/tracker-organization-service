import express from 'express';
const router = express.Router();
import { createOrganization, updateOrganization, getOrganizationById, getOrganizationByUserId, deleteOrganization, getAll, updateOrganizationResources } from '../controller/controller';

router.get('/all', getAll);
router.get('/user/:id', getOrganizationByUserId);
router.get('/:id', getOrganizationById);
router.post('/', createOrganization);
router.put('/:id', updateOrganization);
router.put('/resources/:id', updateOrganizationResources);
router.delete('/:id', deleteOrganization);

export default router;