import { PubSub } from "apollo-server";
import { getMongoManager } from "typeorm";
import { adaptUser } from "../adapters/user";
import { User } from "../entities";
import { MutationCreateUserArgs, SubscriptionUpdateType, User as GraphUser, UserPatch } from "../generated/graphql";

export const createUser = async (opts: MutationCreateUserArgs): Promise<GraphUser> => {
    const manager = getMongoManager();
    const user = manager.create(User, opts);
    await manager.save(user);
    await publishChange(SubscriptionUpdateType.Create, user);
    return adaptUser(user);
};

export const deleteUser = async (id: string): Promise<GraphUser | null> => {
    const manager = getMongoManager();
    const user = await manager.findOne(User, id);

    if (!user) {
        return null;
    }

    const userClone = { ...user };
    await manager.remove(user);
    await publishChange(SubscriptionUpdateType.Delete, user);
    return adaptUser(userClone);
};

export const deleteUsers = async (): Promise<GraphUser[]> => {
    const manager = getMongoManager();
    const allUsers = await manager.find(User);
    await manager.deleteMany(User, {});
    await Promise.all(allUsers.map(user => publishChange(SubscriptionUpdateType.Delete, user)));
    return allUsers.map(adaptUser);
};

export const findAllUsers = async (): Promise<GraphUser[]> => (await getMongoManager().find(User)).map(adaptUser);

export const subscribeToUserChanges = () => _pubsub.asyncIterator(CHANNEL_NAME);

export const updateUser = async (id: string, patch: UserPatch): Promise<GraphUser | null> => {
    const manager = getMongoManager();
    const user = await manager.findOne(User, id);

    if (!user) {
        return null;
    }

    Object.assign(user, patch);
    await manager.save(user);
    await publishChange(SubscriptionUpdateType.Update, user);
    return adaptUser(user);
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
