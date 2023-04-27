import { beforeAll, describe, expect, it, vi } from 'vitest';
import { createOrganization, deleteOrganization, getAll, getOrganizationById, getOrganizationByUserId, updateOrganization, updateOrganizationResources } from '../db/controller/controller';
import app from "../index"
import { connectToDatabase } from '../db/services/database.service';


interface Response {
    status: number | any
    json: any
}

describe('Test the organization API endpoints', () => {
    beforeAll(async () => {
        await connectToDatabase()
        vi.clearAllMocks();

    });

    it('should get an existing organization', async () => {
        const req = {
            params: { id: "62d969dc498c4385d676ce43" }
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };

        await getOrganizationById(req, res, () => { });
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should not get an organization', async () => {
        const req = {
            params: { id: "62d969dc498c4385d676ce93" }
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        await getOrganizationById(req, res, () => { });
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return an organization of existing user', async () => {
        const req = {
            params: { id: "62d969dc498c4385d676ce41" }
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };

        await getOrganizationByUserId(req, res, () => { });
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should not return an organization of not existing user', async () => {
        const req = {
            params: { id: "a2d969dc498c4385d676ce42" }
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };

        await getOrganizationByUserId(req, res, () => { });
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return all organizations', async () => {
        const req = {
            body: {},
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };

        await getAll(req, res, () => { });
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should not create organization if fields are missing', async () => {
        const req = {
            body: {},
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };

        await createOrganization(req, res, () => { });
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should not update an organization if id is missing', async () => {
        const req = {
            params: {},
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };

        await updateOrganization(req, res, () => { });
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should not update organization resources if id is missing', async () => {
        const req = {
            params: {},
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };

        await updateOrganizationResources(req, res, () => { });
        expect(res.status).toHaveBeenCalledWith(400);
    });

    // it('should return a 400 status code if any required fields are missing', async () => {
    //     const req = {
    //         params: {},
    //     };
    //     const res = {
    //         status: vi.fn().mockReturnThis(),
    //         json: vi.fn(),
    //     };

    //     await deleteOrganization(req, res, () => { });
    //     expect(res.status).toHaveBeenCalledWith(400);
    // });

})