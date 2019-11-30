import * as typeorm from "typeorm";
import { User } from "../entities";
import { findAllUsers } from "./user-service";

describe("user-service", () => {
    describe("findAllUsers", () => {
        it("handles some users", () => {
            const mockGetMongoManager = ({
                find: async (_: any) => new Promise<User[]>((resolve, _reject) =>
                    resolve([
                        {
                            firstName: "Amanda",
                            lastName: "Huggenkiss"
                        } as User
                    ])
                )
            } as typeorm.MongoEntityManager);

            const mock = jest.spyOn(typeorm, "getMongoManager");
            mock.mockReturnValue(mockGetMongoManager);

            // Leave Jest to resolve the promise.
            // tslint:disable-next-line: no-floating-promises
            expect(findAllUsers()).resolves.toMatchSnapshot();
        });

        it("handles no users", () => {
            const mockGetMongoManager = ({
                find: async (_: any) => new Promise<User[]>((resolve, _reject) => resolve([]))
            } as typeorm.MongoEntityManager);

            const mock = jest.spyOn(typeorm, "getMongoManager");
            mock.mockReturnValue(mockGetMongoManager);

            // Leave Jest to resolve the promise.
            // tslint:disable-next-line: no-floating-promises
            expect(findAllUsers()).resolves.toHaveLength(0);
        });
    });
});
