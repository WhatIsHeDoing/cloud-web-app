import { PubSub } from "apollo-server";
import { getMongoManager } from "typeorm";
import { User } from "../entities";
import { CreateUserOptions, SubscriptionUpdateType, UserPatch } from "../models";

export const createUser = async (opts: CreateUserOptions): Promise<User> => {
    const manager = getMongoManager();
    const user = manager.create(User, opts);
    await manager.save(user);
    await publishChange("CREATE", user);
    return user;
};

export const deleteUser = async (id: string): Promise<User | null> => {
    const manager = getMongoManager();
    const user = await manager.findOne(User, id);

    if (!user) {
        return null;
    }

    const userClone = { ...user };
    await manager.remove(user);
    await publishChange("DELETE", user);
    return userClone;
};

export const deleteUsers = async (): Promise<User[]> => {
    const manager = getMongoManager();
    const allUsers = await manager.find(User);
    await manager.deleteMany(User, {});
    await Promise.all(allUsers.map(user => publishChange("DELETE", user)));
    return allUsers;
};

export const findAllUsers = (): Promise<User[]> => getMongoManager().find(User);

export const subscribeToUserChanges = () => _pubsub.asyncIterator(CHANNEL_NAME);

export const updateUser = async (id: string, patch: UserPatch): Promise<User | null> => {
    const manager = getMongoManager();
    const user = await manager.findOne(User, id);

    if (!user) {
        return null;
    }

    Object.assign(user, patch);
    await manager.save(user);
    await publishChange("UPDATE", user);
    return user;
};

const _pubsub = new PubSub();

const CHANNEL_NAME = "USER_ACTION";

const publishChange = (updateType: SubscriptionUpdateType, user: User) => _pubsub.publish(
    CHANNEL_NAME,
    {
        userUpdated: {
            updateType,
            user
        }
    });
